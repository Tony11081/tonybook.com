import Image from 'next/image'
import Link from 'next/link'

import { Container } from '~/components/ui/Container'
import { getSeriesList } from '~/sanity/queries'

export const metadata = {
  title: '专题系列',
  description: '按主题聚合的学习路径与实战系列，持续更新。',
}

export default async function SeriesPage() {
  const seriesList = await getSeriesList()

  return (
    <Container className="mt-16 sm:mt-24">
      <header className="max-w-2xl">
        <h1 className="text-4xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100 sm:text-5xl">
          专题系列
        </h1>
        <p className="mt-4 text-base text-zinc-600 dark:text-zinc-400">
          按主题聚合的学习路径与实战系列，包含进度与核心内容。
        </p>
      </header>

      <section className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2">
        {seriesList.map((series) => {
          const total = series.plannedCount ?? series.postCount
          const progress =
            total && total > 0
              ? Math.min(100, Math.round((series.postCount / total) * 100))
              : 0

          return (
            <Link
              key={series._id}
              href={`/series/${series.slug}`}
              className="group flex flex-col gap-4 rounded-3xl border border-zinc-200/80 bg-white/70 p-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md dark:border-zinc-700/60 dark:bg-zinc-900/60"
            >
              <div className="flex items-center gap-4">
                <div className="relative h-16 w-16 overflow-hidden rounded-2xl bg-zinc-100 dark:bg-zinc-800">
                  {series.cover?.asset?.url ? (
                    <Image
                      src={series.cover.asset.url}
                      alt={series.title}
                      fill
                      className="object-cover"
                      placeholder="blur"
                      blurDataURL={series.cover.asset.lqip}
                      sizes="64px"
                    />
                  ) : null}
                </div>
                <div className="flex-1">
                  <h2 className="text-xl font-bold text-zinc-900 transition group-hover:text-zinc-700 dark:text-zinc-100 dark:group-hover:text-zinc-300">
                    {series.title}
                  </h2>
                  {series.description && (
                    <p className="mt-1 line-clamp-2 text-sm text-zinc-600 dark:text-zinc-400">
                      {series.description}
                    </p>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs text-zinc-500 dark:text-zinc-400">
                  <span>已发布 {series.postCount} 篇</span>
                  {total ? <span>计划 {total} 篇</span> : null}
                </div>
                <div className="h-2 overflow-hidden rounded-full bg-zinc-100 dark:bg-zinc-800">
                  <div
                    className="h-full rounded-full bg-zinc-900 transition-all dark:bg-zinc-200"
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>
            </Link>
          )
        })}
      </section>
    </Container>
  )
}
