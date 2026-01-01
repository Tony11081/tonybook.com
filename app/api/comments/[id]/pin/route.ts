import { currentUser } from '@clerk/nextjs'
import { eq } from 'drizzle-orm'
import { type NextRequest, NextResponse } from 'next/server'

import { db } from '~/db'
import { CommentHashids } from '~/db/dto/comment.dto'
import { comments } from '~/db/schema'
import { createNotification } from '~/lib/notifications'

type Params = { params: { id: string } }

export async function POST(_req: NextRequest, { params }: Params) {
  const user = await currentUser()
  if (!user || !user.publicMetadata?.siteOwner) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 403 })
  }

  const [decoded] = CommentHashids.decode(params.id)
  const commentId = Number(decoded)
  if (!commentId) {
    return NextResponse.json({ error: 'Invalid comment' }, { status: 400 })
  }

  const [current] = await db
    .select({
      isFeatured: comments.isFeatured,
      userId: comments.userId,
      body: comments.body,
      postId: comments.postId,
    })
    .from(comments)
    .where(eq(comments.id, commentId))

  const nextValue = !current?.isFeatured

  await db
    .update(comments)
    .set({ isFeatured: nextValue })
    .where(eq(comments.id, commentId))

  if (nextValue && current?.userId && current.userId !== user.id) {
    const snippet =
      typeof current.body === 'object' && current.body && 'text' in current.body
        ? String(current.body.text).slice(0, 120)
        : '你的评论被作者精选。'

    await createNotification({
      userId: current.userId,
      type: 'comment_featured',
      title: '你的评论被作者精选',
      message: snippet,
      href: '/blog',
      entityType: 'comment',
      entityId: params.id,
      metadata: {
        postId: current.postId,
      },
      ctaLabel: '查看评论',
    })
  }

  return NextResponse.json({ isFeatured: nextValue })
}
