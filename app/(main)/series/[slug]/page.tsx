import { notFound } from 'next/navigation'

import { Container } from '~/components/ui/Container'
import { url } from '~/lib'
import { getSeriesBySlug } from '~/sanity/queries'

import { BlogPostListItem } from '../../blog/BlogPostListItem'

export async function generateMetadata({
  params,
}: {
  params: { slug: string }
}) {
  const series = await getSeriesBySlug(params.slug)
  if (!series) {
    return {}
  }

  return {
    title: series.title,
    description: series.description,
    openGraph: {
      title: series.title,
      description: series.description,
      images: [
        {
          url: url(`/series/${params.slug}/opengraph-image`).href,
        },
      ],
    },
    twitter: {
      title: series.title,
      description: series.description,
      images: [
        {
          url: url(`/series/${params.slug}/opengraph-image`).href,
        },
      ],
    },
  }
}

export default async function SeriesDetailPage({
  params,
}: {
  params: { slug: string }
}) {
  const series = await getSeriesBySlug(params.slug)
  if (!series) {
    notFound()
  }

  const total = series.plannedCount ?? series.posts.length
  const progress =
    total && total > 0
      ? Math.min(100, Math.round((series.posts.length / total) * 100))
      : 0

  return (
    <Container className="mt-16 sm:mt-24">
      <header className="max-w-3xl space-y-4">
        <div className="flex flex-wrap items-center gap-3 text-xs text-zinc-500 dark:text-zinc-400">
          <span className="rounded-full border border-zinc-200/70 px-3 py-1 dark:border-zinc-700">
            系列专题
          </span>
          {series.level && (
            <span className="rounded-full border border-zinc-200/70 px-3 py-1 dark:border-zinc-700">
              {series.level}
            </span>
          )}
        </div>
        <h1 className="text-4xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100 sm:text-5xl">
          {series.title}
        </h1>
        {series.description && (
          <p className="text-base text-zinc-600 dark:text-zinc-400">
            {series.description}
          </p>
        )}

        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs text-zinc-500 dark:text-zinc-400">
            <span>已发布 {series.posts.length} 篇</span>
            {total ? <span>计划 {total} 篇</span> : null}
          </div>
          <div className="h-2 overflow-hidden rounded-full bg-zinc-100 dark:bg-zinc-800">
            <div
              className="h-full rounded-full bg-zinc-900 dark:bg-zinc-200"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </header>

      <section className="mt-12 space-y-6">
        {series.posts.map((post) => (
          <BlogPostListItem
            key={post._id}
            post={{
              ...post,
              categories: post.categories ?? [],
              series: {
                _id: series._id,
                title: series.title,
                slug: series.slug,
                description: series.description,
              },
            }}
            views={0}
            commentCount={0}
          />
        ))}
      </section>
    </Container>
  )
}
