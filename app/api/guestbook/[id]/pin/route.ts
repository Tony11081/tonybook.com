import { currentUser } from '@clerk/nextjs'
import { eq } from 'drizzle-orm'
import { type NextRequest, NextResponse } from 'next/server'

import { db } from '~/db'
import { GuestbookHashids } from '~/db/dto/guestbook.dto'
import { guestbook } from '~/db/schema'
import { createNotification } from '~/lib/notifications'

type Params = { params: { id: string } }

export async function POST(_req: NextRequest, { params }: Params) {
  const user = await currentUser()
  if (!user || !user.publicMetadata?.siteOwner) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 403 })
  }

  const [decoded] = GuestbookHashids.decode(params.id)
  const guestbookId = Number(decoded)
  if (!guestbookId) {
    return NextResponse.json({ error: 'Invalid message' }, { status: 400 })
  }

  const [current] = await db
    .select({
      isFeatured: guestbook.isFeatured,
      userId: guestbook.userId,
      message: guestbook.message,
    })
    .from(guestbook)
    .where(eq(guestbook.id, guestbookId))

  const nextValue = !current?.isFeatured

  await db
    .update(guestbook)
    .set({ isFeatured: nextValue })
    .where(eq(guestbook.id, guestbookId))

  if (nextValue && current?.userId && current.userId !== user.id) {
    await createNotification({
      userId: current.userId,
      type: 'guestbook_featured',
      title: '你的留言被作者精选',
      message: current.message.slice(0, 120),
      href: '/guestbook',
      entityType: 'guestbook',
      entityId: params.id,
      ctaLabel: '查看留言',
    })
  }

  return NextResponse.json({ isFeatured: nextValue })
}
