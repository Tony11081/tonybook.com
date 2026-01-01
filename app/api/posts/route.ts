import { inArray, sql } from 'drizzle-orm'
import { type NextRequest, NextResponse } from 'next/server'

import { kvKeys } from '~/config/kv'
import { db } from '~/db'
import { comments, searchInsights } from '~/db/schema'
import { env } from '~/env.mjs'
import { redis } from '~/lib/redis'
import { getBlogPosts } from '~/sanity/queries'
import { type Post } from '~/sanity/schemas/post'

const DEFAULT_LIMIT = 10
const MAX_LIMIT = 30

type SortMode = 'latest' | 'views' | 'comments'
type ReadingFilter = 'short' | 'medium' | 'long'

type PostWithMetrics = Post & { views: number; commentCount: number }

function toInt(value: string | null, fallback: number) {
  if (!value) {
    return fallback
  }
  const parsed = Number.parseInt(value, 10)
  return Number.isNaN(parsed) ? fallback : parsed
}

async function getViews(postIds: string[]) {
  if (postIds.length === 0) {
    return []
  }

  if (env.VERCEL_ENV === 'production') {
    const keys = postIds.map((id) => kvKeys.postViews(id))
    return redis.mget<number[]>(...keys)
  }

  return postIds.map(() => 0)
}

async function getCommentCounts(postIds: string[]) {
  if (postIds.length === 0) {
    return new Map<string, number>()
  }

  const rows = await db
    .select({
      postId: comments.postId,
      count: sql<number>`count(*)`,
    })
    .from(comments)
    .where(inArray(comments.postId, postIds))
    .groupBy(comments.postId)

  return new Map(rows.map((row) => [row.postId, Number(row.count) || 0]))
}

function attachMetrics(
  posts: Post[],
  views: number[],
  commentCounts: Map<string, number>
) {
  return posts.map((post, idx) => ({
    ...post,
    views: views[idx] ?? 0,
    commentCount: commentCounts.get(post._id) ?? 0,
  }))
}

async function logSearchInsight({
  search,
  total,
  category,
  reading,
  sort,
  source,
}: {
  search?: string
  total: number
  category?: string
  reading?: ReadingFilter
  sort?: SortMode
  source?: string
}) {
  if (!search) {
    return
  }

  const keyword = search.trim()
  if (keyword.length < 2) {
    return
  }

  const day = new Date().toISOString().slice(0, 10)
  const dedupeKey = `search:insight:${keyword.toLowerCase()}:${day}`

  try {
    const cached = await redis.get<string>(dedupeKey)
    if (cached) {
      return
    }
    await redis.set(dedupeKey, '1', { ex: 60 * 60 * 24 })
  } catch (error) {
    console.error('[search-insight]', error)
  }

  try {
    await db.insert(searchInsights).values({
      query: keyword,
      results: total,
      source: source ?? 'blog',
      filters: { category, reading, sort },
    })
  } catch (error) {
    console.error('[search-insight]', error)
  }
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)

  const page = Math.max(0, toInt(searchParams.get('page'), 0))
  const limit = Math.min(MAX_LIMIT, Math.max(1, toInt(searchParams.get('limit'), DEFAULT_LIMIT)))

  const search = searchParams.get('search') ?? undefined
  const category = searchParams.get('category') ?? undefined
  const reading = (searchParams.get('reading') as ReadingFilter | null) ?? undefined
  const sort = (searchParams.get('sort') as SortMode | null) ?? 'latest'
  const source =
    searchParams.get('source') ?? searchParams.get('utm_source') ?? undefined

  const offset = page * limit

  const shouldSortByMetrics = sort === 'views' || sort === 'comments'
  const take = shouldSortByMetrics ? Math.max(limit * (page + 1), DEFAULT_LIMIT) : limit

  const { posts, total } = await getBlogPosts({
    limit: take,
    offset: shouldSortByMetrics ? 0 : offset,
    search,
    category,
    reading,
    forDisplay: true,
  })

  const postIds = posts.map((post) => post._id)
  const [views, commentCounts] = await Promise.all([
    getViews(postIds),
    getCommentCounts(postIds),
  ])

  let withMetrics: PostWithMetrics[] = attachMetrics(posts, views, commentCounts)

  if (sort === 'views') {
    withMetrics = withMetrics.sort((a, b) => b.views - a.views)
  }

  if (sort === 'comments') {
    withMetrics = withMetrics.sort((a, b) => b.commentCount - a.commentCount)
  }

  const sliced = shouldSortByMetrics
    ? withMetrics.slice(offset, offset + limit)
    : withMetrics

  if (page === 0 && search) {
    await logSearchInsight({
      search,
      total,
      category,
      reading,
      sort,
      source,
    })
  }

  return NextResponse.json({
    posts: sliced,
    total,
    page,
    limit,
    hasMore: offset + limit < total,
  })
}
