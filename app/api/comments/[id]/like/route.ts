import { currentUser } from '@clerk/nextjs'
import { and, eq, sql } from 'drizzle-orm'
import { type NextRequest, NextResponse } from 'next/server'

import { db } from '~/db'
import { CommentHashids } from '~/db/dto/comment.dto'
import { commentLikes, comments } from '~/db/schema'
import { createNotification } from '~/lib/notifications'

type Params = { params: { id: string } }

async function getLikeCount(commentId: number) {
  const [row] = await db
    .select({ count: sql<number>`count(*)` })
    .from(commentLikes)
    .where(eq(commentLikes.commentId, commentId))
  return Number(row?.count) || 0
}

export async function POST(_req: NextRequest, { params }: Params) {
  const user = await currentUser()
  if (!user) {
    return NextResponse.json({ error: 'Not authenticated' }, { status: 401 })
  }

  const [decoded] = CommentHashids.decode(params.id)
  const commentId = Number(decoded)
  if (!commentId) {
    return NextResponse.json({ error: 'Invalid comment' }, { status: 400 })
  }

  const [existing] = await db
    .select({ id: commentLikes.id })
    .from(commentLikes)
    .where(
      and(
        eq(commentLikes.commentId, commentId),
        eq(commentLikes.userId, user.id)
      )
    )

  if (!existing) {
    await db.insert(commentLikes).values({ commentId, userId: user.id })

    const [comment] = await db
      .select({
        userId: comments.userId,
        body: comments.body,
        postId: comments.postId,
      })
      .from(comments)
      .where(eq(comments.id, commentId))

    if (comment && comment.userId !== user.id) {
      const snippet =
        typeof comment.body === 'object' && comment.body && 'text' in comment.body
          ? String(comment.body.text).slice(0, 120)
          : '你的评论收到新的点赞。'

      await createNotification({
        userId: comment.userId,
        type: 'comment_like',
        title: '有人点赞了你的评论',
        message: snippet,
        href: '/blog',
        entityType: 'comment',
        entityId: params.id,
        metadata: {
          postId: comment.postId,
        },
        ctaLabel: '查看评论',
      })
    }
  }

  return NextResponse.json({
    likeCount: await getLikeCount(commentId),
    likedByMe: true,
  })
}

export async function DELETE(_req: NextRequest, { params }: Params) {
  const user = await currentUser()
  if (!user) {
    return NextResponse.json({ error: 'Not authenticated' }, { status: 401 })
  }

  const [decoded] = CommentHashids.decode(params.id)
  const commentId = Number(decoded)
  if (!commentId) {
    return NextResponse.json({ error: 'Invalid comment' }, { status: 400 })
  }

  await db
    .delete(commentLikes)
    .where(and(eq(commentLikes.commentId, commentId), eq(commentLikes.userId, user.id)))

  return NextResponse.json({
    likeCount: await getLikeCount(commentId),
    likedByMe: false,
  })
}
