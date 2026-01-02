import { currentUser } from '@clerk/nextjs'
import { eq } from 'drizzle-orm'
import { type NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'

import { emailConfig } from '~/config/email'
import { db } from '~/db'
import { type GuestbookDto, GuestbookHashids } from '~/db/dto/guestbook.dto'
import { fetchGuestbookMessages } from '~/db/queries/guestbook'
import { guestbook } from '~/db/schema'
import NewGuestbookEmail from '~/emails/NewGuestbook'
import { env } from '~/env.mjs'
import { url } from '~/lib'
import { getIP } from '~/lib/ip'
import { resend } from '~/lib/mail'
import { createNotification } from '~/lib/notifications'
import { ratelimit, redis } from '~/lib/redis'

function getKey(id?: string) {
  return `guestbook${id ? `:${id}` : ''}`
}

export async function GET(req: NextRequest) {
  try {
    const user = await currentUser()
    const { success } = await ratelimit.limit(getKey(req.ip ?? ''))
    if (!success) {
      return new Response('Too Many Requests', {
        status: 429,
      })
    }

    return NextResponse.json(
      await fetchGuestbookMessages({ userId: user?.id })
    )
  } catch (error) {
    return NextResponse.json({ error }, { status: 400 })
  }
}

const SignGuestbookSchema = z.object({
  message: z.string().min(1).max(600),
  parentId: z.string().optional().nullable(),
})

export async function POST(req: NextRequest) {
  const user = await currentUser()
  if (!user) {
    return NextResponse.json({ error: 'Not authenticated' }, { status: 401 })
  }

  const { success } = await ratelimit.limit(getKey(user.id))
  if (!success) {
    return new Response('Too Many Requests', {
      status: 429,
    })
  }

  try {
    const data = await req.json()
    const { message, parentId: hashedParentId } =
      SignGuestbookSchema.parse(data)

    const ip = getIP(req)
    const spamKey = `guestbook:spam:${user.id}:${ip}`
    const previous = await redis.get<string>(spamKey)
    if (previous && previous === message) {
      return NextResponse.json({ error: 'Duplicate content' }, { status: 429 })
    }
    const linkMatches = message.match(/https?:\/\//gi) ?? []
    if (linkMatches.length > 2 || (linkMatches.length > 0 && message.length < 24)) {
      return NextResponse.json({ error: 'Suspicious content' }, { status: 400 })
    }
    await redis.set(spamKey, message, { ex: 120 })

    const [parentId] = GuestbookHashids.decode(hashedParentId ?? '')
    const [parentUserFromDb] = parentId
      ? await db
          .select({
            userId: guestbook.userId,
            message: guestbook.message,
          })
          .from(guestbook)
          .where(eq(guestbook.id, parentId as number))
      : []

    const guestbookData = {
      userId: user.id,
      message,
      parentId: parentId ? (parentId as number) : null,
      userInfo: {
        firstName: user.firstName,
        lastName: user.lastName,
        imageUrl: user.imageUrl,
      },
    }

    if (env.NODE_ENV === 'production' && env.SITE_NOTIFICATION_EMAIL_TO) {
      await resend.emails.send({
        from: emailConfig.from,
        to: env.SITE_NOTIFICATION_EMAIL_TO,
        subject: '有人刚刚在留言墙留言了',
        react: NewGuestbookEmail({
          link: url(`/guestbook`).href,
          userFirstName: user.firstName,
          userLastName: user.lastName,
          userImageUrl: user.imageUrl,
          commentContent: message,
        }),
      })
    }

    const [newGuestbook] = await db
      .insert(guestbook)
      .values(guestbookData)
      .returning({
        newId: guestbook.id,
      })

    const encodedGuestbookId = GuestbookHashids.encode(newGuestbook.newId)

    if (parentUserFromDb && parentUserFromDb.userId !== user.id) {
      await createNotification({
        userId: parentUserFromDb.userId,
        type: 'guestbook_reply',
        title: '有人回复了你的留言',
        message: message.slice(0, 120),
        href: '/guestbook',
        entityType: 'guestbook',
        entityId: encodedGuestbookId,
        metadata: {
          parentMessage: parentUserFromDb.message?.slice(0, 120),
        },
        ctaLabel: '查看回复',
      })
    }

    return NextResponse.json(
      {
        ...guestbookData,
        id: encodedGuestbookId,
        createdAt: new Date(),
        parentId: hashedParentId ?? null,
        likeCount: 0,
        likedByMe: false,
        isFeatured: false,
      } satisfies GuestbookDto,
      {
        status: 201,
      }
    )
  } catch (error) {
    return NextResponse.json({ error }, { status: 400 })
  }
}
