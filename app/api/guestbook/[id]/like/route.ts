import { currentUser } from '@clerk/nextjs'
import { and, eq, sql } from 'drizzle-orm'
import { type NextRequest, NextResponse } from 'next/server'

import { db } from '~/db'
import { GuestbookHashids } from '~/db/dto/guestbook.dto'
import { guestbook, guestbookLikes } from '~/db/schema'
import { createNotification } from '~/lib/notifications'

type Params = { params: { id: string } }

async function getLikeCount(guestbookId: number) {
  const [row] = await db
    .select({ count: sql<number>`count(*)` })
    .from(guestbookLikes)
    .where(eq(guestbookLikes.guestbookId, guestbookId))
  return Number(row?.count) || 0
}

export async function POST(_req: NextRequest, { params }: Params) {
  const user = await currentUser()
  if (!user) {
    return NextResponse.json({ error: 'Not authenticated' }, { status: 401 })
  }

  const [decoded] = GuestbookHashids.decode(params.id)
  const guestbookId = Number(decoded)
  if (!guestbookId) {
    return NextResponse.json({ error: 'Invalid message' }, { status: 400 })
  }

  const [existing] = await db
    .select({ id: guestbookLikes.id })
    .from(guestbookLikes)
    .where(
      and(
        eq(guestbookLikes.guestbookId, guestbookId),
        eq(guestbookLikes.userId, user.id)
      )
    )

  if (!existing) {
    await db
      .insert(guestbookLikes)
      .values({ guestbookId, userId: user.id })

    const [message] = await db
      .select({
        userId: guestbook.userId,
        message: guestbook.message,
      })
      .from(guestbook)
      .where(eq(guestbook.id, guestbookId))

    if (message && message.userId !== user.id) {
      await createNotification({
        userId: message.userId,
        type: 'guestbook_like',
        title: '有人点赞了你的留言',
        message: message.message.slice(0, 120),
        href: '/guestbook',
        entityType: 'guestbook',
        entityId: params.id,
        ctaLabel: '查看留言',
      })
    }
  }

  return NextResponse.json({
    likeCount: await getLikeCount(guestbookId),
    likedByMe: true,
  })
}

export async function DELETE(_req: NextRequest, { params }: Params) {
  const user = await currentUser()
  if (!user) {
    return NextResponse.json({ error: 'Not authenticated' }, { status: 401 })
  }

  const [decoded] = GuestbookHashids.decode(params.id)
  const guestbookId = Number(decoded)
  if (!guestbookId) {
    return NextResponse.json({ error: 'Invalid message' }, { status: 400 })
  }

  await db
    .delete(guestbookLikes)
    .where(
      and(
        eq(guestbookLikes.guestbookId, guestbookId),
        eq(guestbookLikes.userId, user.id)
      )
    )

  return NextResponse.json({
    likeCount: await getLikeCount(guestbookId),
    likedByMe: false,
  })
}
