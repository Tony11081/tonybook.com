'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import React from 'react'
import { useInfiniteQuery } from 'react-query'

import { Button } from '~/components/ui/Button'
import { type Post } from '~/sanity/schemas/post'

import { BlogPostListItem } from './BlogPostListItem'

type Category = {
  _id: string
  title: string
  slug?: string
  description?: string
}

type PostWithMetrics = Post & { views: number; commentCount: number }

type PostsResponse = {
  posts: PostWithMetrics[]
  total: number
  page: number
  limit: number
  hasMore: boolean
}

const readingFilters = [
  { value: '', label: '全部长度' },
  { value: 'short', label: '短读' },
  { value: 'medium', label: '中等' },
  { value: 'long', label: '长文' },
] as const

const sortOptions = [
  { value: 'latest', label: '最新' },
  { value: 'views', label: '热门' },
  { value: 'comments', label: '评论数' },
] as const

function buildQuery(params: URLSearchParams) {
  const search = params.get('search') ?? ''
  const category = params.get('category') ?? ''
  const reading = params.get('reading') ?? ''
  const sort = params.get('sort') ?? 'latest'
  return { search, category, reading, sort }
}

function buildSearchParams(next: {
  search?: string
  category?: string
  reading?: string
  sort?: string
}) {
  const params = new URLSearchParams()
  if (next.search) params.set('search', next.search)
  if (next.category) params.set('category', next.category)
  if (next.reading) params.set('reading', next.reading)
  if (next.sort && next.sort !== 'latest') params.set('sort', next.sort)
  return params
}

async function fetchPosts({
  pageParam = 0,
  search,
  category,
  reading,
  sort,
  limit,
}: {
  pageParam?: number
  search?: string
  category?: string
  reading?: string
  sort?: string
  limit: number
}) {
  const params = new URLSearchParams()
  params.set('page', pageParam.toString())
  params.set('limit', limit.toString())
  if (search) params.set('search', search)
  if (category) params.set('category', category)
  if (reading) params.set('reading', reading)
  if (sort) params.set('sort', sort)

  const res = await fetch(`/api/posts?${params.toString()}`)
  if (!res.ok) {
    throw new Error('Failed to load posts')
  }
  return res.json() as Promise<PostsResponse>
}

export function BlogListClient({
  initialPosts,
  total,
  categories,
  pageSize = 10,
  initialQuery,
}: {
  initialPosts: PostWithMetrics[]
  total: number
  categories: Category[]
  pageSize?: number
  initialQuery: {
    search: string
    category: string
    reading: string
    sort: string
  }
}) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const query = React.useMemo(
    () => buildQuery(searchParams),
    [searchParams]
  )

  const [searchValue, setSearchValue] = React.useState(query.search)

  React.useEffect(() => {
    setSearchValue(query.search)
  }, [query.search])

  const isInitialQuery =
    query.search === initialQuery.search &&
    query.category === initialQuery.category &&
    query.reading === initialQuery.reading &&
    query.sort === initialQuery.sort

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isFetching,
  } = useInfiniteQuery(
    ['blog-posts', query],
    ({ pageParam = 0 }) =>
      fetchPosts({
        pageParam,
        search: query.search || undefined,
        category: query.category || undefined,
        reading: query.reading || undefined,
        sort: query.sort || undefined,
        limit: pageSize,
      }),
    {
      getNextPageParam: (lastPage) =>
        lastPage.hasMore ? lastPage.page + 1 : undefined,
      staleTime: 60000,
      refetchOnMount: !isInitialQuery,
      refetchOnWindowFocus: false,
      initialData: isInitialQuery
        ? {
            pages: [
              {
                posts: initialPosts,
                total,
                page: 0,
                limit: pageSize,
                hasMore: initialPosts.length < total,
              },
            ],
            pageParams: [0],
          }
        : undefined,
    }
  )

  const posts = data?.pages.flatMap((page) => page.posts) ?? []

  const onSubmitSearch = (event: React.FormEvent) => {
    event.preventDefault()
    const params = buildSearchParams({
      search: searchValue.trim(),
      category: query.category,
      reading: query.reading,
      sort: query.sort,
    })
    router.push(`/blog?${params.toString()}`)
  }

  const updateFilter = (next: Partial<typeof query>) => {
    const params = buildSearchParams({
      search: next.search ?? query.search,
      category: next.category ?? query.category,
      reading: next.reading ?? query.reading,
      sort: next.sort ?? query.sort,
    })
    router.push(`/blog?${params.toString()}`)
  }

  return (
    <div className="mt-10 space-y-10">
      <section className="rounded-3xl border border-zinc-200/80 bg-white/70 p-6 shadow-sm dark:border-zinc-700/60 dark:bg-zinc-900/60">
        <form onSubmit={onSubmitSearch} className="flex flex-col gap-4">
          <div className="flex flex-col gap-3 md:flex-row md:items-center">
            <input
              type="search"
              value={searchValue}
              onChange={(event) => setSearchValue(event.target.value)}
              placeholder="搜索文章、关键词或案例..."
              className="w-full rounded-xl border border-zinc-300 bg-white px-4 py-3 text-sm text-zinc-800 shadow-sm outline-none transition focus:border-zinc-500 focus:ring-2 focus:ring-zinc-300 dark:border-zinc-700 dark:bg-zinc-900/80 dark:text-zinc-200 dark:focus:border-zinc-500 dark:focus:ring-zinc-700"
            />
            <Button type="submit" className="h-11 px-6">
              搜索
            </Button>
          </div>

          <div className="flex flex-wrap items-center gap-2 text-sm">
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500 dark:text-zinc-400">
              分类
            </span>
            <button
              type="button"
              className={`rounded-full border px-3 py-1 text-xs font-medium transition ${
                !query.category
                  ? 'border-zinc-900 bg-zinc-900 text-white dark:border-zinc-200 dark:bg-zinc-200 dark:text-zinc-900'
                  : 'border-zinc-200 text-zinc-500 hover:text-zinc-800 dark:border-zinc-700 dark:text-zinc-400'
              }`}
              onClick={() => updateFilter({ category: '' })}
            >
              全部
            </button>
            {categories.map((category) => (
              <button
                key={category._id}
                type="button"
                className={`rounded-full border px-3 py-1 text-xs font-medium transition ${
                  query.category === category.slug
                    ? 'border-zinc-900 bg-zinc-900 text-white dark:border-zinc-200 dark:bg-zinc-200 dark:text-zinc-900'
                    : 'border-zinc-200 text-zinc-500 hover:text-zinc-800 dark:border-zinc-700 dark:text-zinc-400'
                }`}
                onClick={() => updateFilter({ category: category.slug ?? '' })}
              >
                {category.title}
              </button>
            ))}
          </div>

          <div className="flex flex-wrap items-center gap-2 text-sm">
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500 dark:text-zinc-400">
              阅读时长
            </span>
            {readingFilters.map((filter) => (
              <button
                key={filter.value}
                type="button"
                className={`rounded-full border px-3 py-1 text-xs font-medium transition ${
                  query.reading === filter.value
                    ? 'border-zinc-900 bg-zinc-900 text-white dark:border-zinc-200 dark:bg-zinc-200 dark:text-zinc-900'
                    : 'border-zinc-200 text-zinc-500 hover:text-zinc-800 dark:border-zinc-700 dark:text-zinc-400'
                }`}
                onClick={() => updateFilter({ reading: filter.value })}
              >
                {filter.label}
              </button>
            ))}
          </div>

          <div className="flex flex-wrap items-center gap-2 text-sm">
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500 dark:text-zinc-400">
              排序
            </span>
            {sortOptions.map((option) => (
              <button
                key={option.value}
                type="button"
                className={`rounded-full border px-3 py-1 text-xs font-medium transition ${
                  query.sort === option.value
                    ? 'border-zinc-900 bg-zinc-900 text-white dark:border-zinc-200 dark:bg-zinc-200 dark:text-zinc-900'
                    : 'border-zinc-200 text-zinc-500 hover:text-zinc-800 dark:border-zinc-700 dark:text-zinc-400'
                }`}
                onClick={() => updateFilter({ sort: option.value })}
              >
                {option.label}
              </button>
            ))}
          </div>
        </form>
      </section>

      <section className="space-y-6">
        {posts.length === 0 && !isFetching && (
          <div className="rounded-2xl border border-dashed border-zinc-300 p-10 text-center text-sm text-zinc-500 dark:border-zinc-700 dark:text-zinc-400">
            暂无符合条件的文章，试试换个关键词。
          </div>
        )}

        {posts.map((post) => (
          <BlogPostListItem
            key={post._id}
            post={post}
            views={post.views}
            commentCount={post.commentCount}
            highlight={query.search}
          />
        ))}

        <div className="flex justify-center">
          {hasNextPage ? (
            <Button
              type="button"
              onClick={() => fetchNextPage()}
              disabled={isFetchingNextPage}
              className="h-11 px-6"
            >
              {isFetchingNextPage ? '加载中...' : '加载更多'}
            </Button>
          ) : (
            posts.length > 0 && (
              <span className="text-xs text-zinc-500 dark:text-zinc-400">
                已经到底了
              </span>
            )
          )}
        </div>
      </section>
    </div>
  )
}
