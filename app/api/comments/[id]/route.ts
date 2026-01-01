import { clerkClient, currentUser } from '@clerk/nextjs'
import { Ratelimit } from '@upstash/ratelimit'
import { and, asc, desc, eq, inArray, sql } from 'drizzle-orm'
import { type NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'

import { emailConfig } from '~/config/email'
import { db } from '~/db'
import {
  type CommentDto,
  CommentHashids,
  type PostIDLessCommentDto,
} from '~/db/dto/comment.dto'
import { commentLikes, comments } from '~/db/schema'
import NewReplyCommentEmail from '~/emails/NewReplyComment'
import { env } from '~/env.mjs'
import { getIP } from '~/lib/ip'
import { createNotification } from '~/lib/notifications'
import { url } from '~/lib'
import { resend } from '~/lib/mail'
import { redis } from '~/lib/redis'
import { client } from '~/sanity/lib/client'

const ratelimit = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(10, '10 s'),
  analytics: true,
})

function getKey(id: string) {
  return `comments:${id}`
}

type Params = { params: { id: string } }
export async function GET(req: NextRequest, { params }: Params) {
  try {
    const postId = params.id
    const user = await currentUser()

    const { success } = await ratelimit.limit(
      getKey(postId) + `_${req.ip ?? ''}`
    )
    if (!success) {
      return new Response('Too Many Requests', {
        status: 429,
      })
    }

    const data = await db
      .select({
        id: comments.id,
        userId: comments.userId,
        userInfo: comments.userInfo,
        body: comments.body,
        createdAt: comments.createdAt,
        parentId: comments.parentId,
        isFeatured: comments.isFeatured,
      })
      .from(comments)
      .where(eq(comments.postId, postId))
      .orderBy(desc(comments.isFeatured), asc(comments.createdAt))

    const ids = data.map((item) => item.id)

    const likeCounts = ids.length
      ? await db
          .select({
            commentId: commentLikes.commentId,
            count: sql<number>`count(*)`,
          })
          .from(commentLikes)
          .where(inArray(commentLikes.commentId, ids))
          .groupBy(commentLikes.commentId)
      : []

    const likedByUser =
      user && ids.length
        ? await db
            .select({ commentId: commentLikes.commentId })
            .from(commentLikes)
            .where(
              and(
                inArray(commentLikes.commentId, ids),
                eq(commentLikes.userId, user.id)
              )
            )
        : []

    const likeCountMap = new Map(
      likeCounts.map((row) => [row.commentId, Number(row.count) || 0])
    )
    const likedSet = new Set(likedByUser?.map((row) => row.commentId))

    return NextResponse.json(
      data.map(
        ({ id, parentId, ...rest }) =>
          ({
            ...rest,
            id: CommentHashids.encode(id),
            parentId: parentId ? CommentHashids.encode(parentId) : null,
            likeCount: likeCountMap.get(id) ?? 0,
            likedByMe: likedSet.has(id),
          }) as PostIDLessCommentDto
      )
    )
  } catch (error) {
    return NextResponse.json({ error }, { status: 400 })
  }
}

const CreateCommentSchema = z.object({
  body: z.object({
    blockId: z.string().optional(),
    text: z.string().min(1).max(999),
  }),
  parentId: z.string().nullable().optional(),
})

export async function POST(req: NextRequest, { params }: Params) {
  const user = await currentUser()
  if (!user) {
    return NextResponse.json({ error: 'Not authenticated' }, { status: 401 })
  }

  const postId = params.id

  const { success } = await ratelimit.limit(getKey(postId) + `_${req.ip ?? ''}`)
  if (!success) {
    return new Response('Too Many Requests', {
      status: 429,
    })
  }

  const post = await client.fetch<
    { slug: string; title: string; imageUrl: string } | undefined
  >(
    '*[_type == "post" && _id == $id][0]{ "slug": slug.current, title, "imageUrl": mainImage.asset->url }',
    {
      id: postId,
    }
  )
  if (!post) {
    return NextResponse.json({ error: 'Post not found' }, { status: 412 })
  }

  try {
    const data = await req.json()
    const { body, parentId: hashedParentId } = CreateCommentSchema.parse(data)

    const ip = getIP(req)
    const spamKey = `comment:spam:${postId}:${user.id}:${ip}`
    const previous = await redis.get<string>(spamKey)
    if (previous && previous === body.text) {
      return NextResponse.json({ error: 'Duplicate content' }, { status: 429 })
    }
    const linkMatches = body.text.match(/https?:\/\//gi) ?? []
    if (linkMatches.length > 2 || (linkMatches.length > 0 && body.text.length < 24)) {
      return NextResponse.json({ error: 'Suspicious content' }, { status: 400 })
    }
    await redis.set(spamKey, body.text, { ex: 120 })

    const [parentId] = CommentHashids.decode(hashedParentId ?? '')
    const commentData = {
      postId,
      userId: user.id,
      body,
      userInfo: {
        firstName: user.firstName,
        lastName: user.lastName,
        imageUrl: user.imageUrl,
      },
      parentId: parentId ? (parentId as number) : null,
    }

    const [parentUserFromDb] = parentId
      ? await db
          .select({
            userId: comments.userId,
          })
          .from(comments)
          .where(eq(comments.id, parentId as number))
      : []

    if (parentUserFromDb && parentUserFromDb.userId !== user.id) {
      if (env.NODE_ENV === 'production') {
        const { primaryEmailAddressId, emailAddresses } =
          await clerkClient.users.getUser(parentUserFromDb.userId)
        const primaryEmailAddress = emailAddresses.find(
          (emailAddress) => emailAddress.id === primaryEmailAddressId
        )
        if (primaryEmailAddress) {
          await resend.emails.send({
            from: emailConfig.from,
            to: primaryEmailAddress.emailAddress,
            subject: '有人回复了你的评论',
            react: NewReplyCommentEmail({
              postTitle: post.title,
              postLink: url(`/blog/${post.slug}`).href,
              postImageUrl: post.imageUrl,
              userFirstName: user.firstName,
              userLastName: user.lastName,
              userImageUrl: user.imageUrl,
              commentContent: body.text,
            }),
          })
        }
      }
    }

    const [newComment] = await db
      .insert(comments)
      .values(commentData)
      .returning({
        newId: comments.id,
      })

    const encodedCommentId = CommentHashids.encode(newComment.newId)

    if (parentUserFromDb && parentUserFromDb.userId !== user.id) {
      await createNotification(
        {
          userId: parentUserFromDb.userId,
          type: 'comment_reply',
          title: '有人回复了你的评论',
          message: body.text.slice(0, 120),
          href: `/blog/${post.slug}`,
          entityType: 'comment',
          entityId: encodedCommentId,
          metadata: {
            postId,
            postTitle: post.title,
          },
          ctaLabel: '查看回复',
        },
        { sendEmail: false }
      )
    }

    return NextResponse.json({
      ...commentData,
      id: encodedCommentId,
      createdAt: new Date(),
      parentId: hashedParentId,
      likeCount: 0,
      likedByMe: false,
      isFeatured: false,
    } satisfies CommentDto)
  } catch (error) {
    return NextResponse.json({ error }, { status: 400 })
  }
}
