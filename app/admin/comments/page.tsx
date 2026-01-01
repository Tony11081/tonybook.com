import { Card, Grid, Metric, Text, Title } from '@tremor/react'
import { desc, sql } from 'drizzle-orm'
import React from 'react'

import { db } from '~/db'
import { CommentHashids } from '~/db/dto/comment.dto'
import { comments } from '~/db/schema'
import { client } from '~/sanity/lib/client'
import { truncate } from '~/lib/string'

import { CommentsAdminTable } from './CommentsAdminTable'

export default async function AdminCommentsPage() {
  const {
    rows: [commentsCount],
  } = await db.execute<{
    today_count: number
    this_week_count: number
    this_month_count: number
  }>(
    sql`SELECT 
  (SELECT COUNT(*) FROM comments WHERE created_at::date = CURRENT_DATE) AS today_count,
  (SELECT COUNT(*) FROM comments WHERE EXTRACT('YEAR' FROM created_at) = EXTRACT('YEAR' FROM CURRENT_DATE) AND EXTRACT('WEEK' FROM created_at) = EXTRACT('WEEK' FROM CURRENT_DATE)) AS this_week_count,
  (SELECT COUNT(*) FROM comments WHERE EXTRACT(YEAR FROM created_at) = EXTRACT(YEAR FROM CURRENT_DATE) AND EXTRACT(MONTH FROM created_at) = EXTRACT(MONTH FROM CURRENT_DATE)) AS this_month_count`
  )

  const latestComments = await db
    .select({
      id: comments.id,
      postId: comments.postId,
      userId: comments.userId,
      userInfo: comments.userInfo,
      body: comments.body,
      createdAt: comments.createdAt,
      parentId: comments.parentId,
      isFeatured: comments.isFeatured,
    })
    .from(comments)
    .orderBy(desc(comments.createdAt))
    .limit(20)

  const postIds = [...new Set(latestComments.map((comment) => comment.postId))]
  const posts = await client.fetch<
    { _id: string; title: string; slug: string }[]
  >(
    `*[_type == "post" && (_id in [${postIds
      .map((v) => `"${v}"`)
      .join(',')}])]{ _id, title, "slug":slug.current }`
  )
  const postMap = new Map(posts.map((post) => [post._id, post]))

  const commentRows = latestComments.map((comment) => ({
    ...comment,
    id: CommentHashids.encode(comment.id),
    body: {
      ...(comment.body as { text?: string; blockId?: string }),
      text: truncate((comment.body as { text?: string }).text ?? ''),
    },
    postTitle: postMap.get(comment.postId)?.title,
    postSlug: postMap.get(comment.postId)?.slug,
  }))

  return (
    <>
      <Title>评论</Title>

      <Grid numItemsMd={2} numItemsLg={3} className="mt-6 gap-6">
        <Card>
          <Text>今日评论数</Text>
          {commentsCount && 'today_count' in commentsCount && (
            <Metric>{commentsCount.today_count}</Metric>
          )}
        </Card>
        <Card>
          <Text>本周评论数</Text>
          {commentsCount && 'this_week_count' in commentsCount && (
            <Metric>{commentsCount.this_week_count}</Metric>
          )}
        </Card>
        <Card>
          <Text>本月评论数</Text>
          {commentsCount && 'this_month_count' in commentsCount && (
            <Metric>{commentsCount.this_month_count}</Metric>
          )}
        </Card>
      </Grid>

      <CommentsAdminTable initialComments={commentRows} />
    </>
  )
}
