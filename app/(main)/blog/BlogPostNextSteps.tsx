'use client'

import Link from 'next/link'

import { prettifyNumber } from '~/lib/math'
import { type Post, type PostDetail } from '~/sanity/schemas/post'

function readingBucket(minutes: number) {
  if (minutes <= 5) return 'short'
  if (minutes <= 10) return 'medium'
  return 'long'
}

function pickByReadingTime(
  current: PostDetail,
  candidates: Post[]
): Post | null {
  if (candidates.length === 0) return null

  const bucket = readingBucket(current.readingTime)
  let target = current.readingTime
  if (bucket === 'short') target = 9
  if (bucket === 'medium') target = 5
  if (bucket === 'long') target = 4

  const sorted = [...candidates].sort(
    (a, b) =>
      Math.abs(a.readingTime - target) - Math.abs(b.readingTime - target)
  )

  return sorted[0] ?? null
}

function buildSeriesNext(post: PostDetail) {
  const seriesPosts = post.seriesPosts ?? []
  const index = seriesPosts.findIndex((item) => item._id === post._id)
  if (index < 0) return null
  return seriesPosts[index + 1] ?? null
}

function sourceLabel(source?: string) {
  if (!source) return null
  if (source.includes('newsletter')) return '来自 Newsletter 的读者偏爱继续系列'
  if (source.includes('search')) return '搜索读者常接着看相关路径'
  if (source.includes('series')) return '系列读者常走完整条路线'
  return null
}

export function BlogPostNextSteps({
  post,
  source,
}: {
  post: PostDetail
  source?: string
}) {
  const seriesNext = buildSeriesNext(post)
  const related = post.related ?? []
  const readingNext = pickByReadingTime(post, related.filter((p) => p._id !== post._id))

  const nextPrimary = seriesNext
    ? {
        title: `继续系列：${seriesNext.title}`,
        href: `/blog/${seriesNext.slug}`,
        reason: '基于系列进度推荐',
      }
    : readingNext
    ? {
        title: readingNext.title,
        href: `/blog/${readingNext.slug}`,
        reason: `基于阅读时长推荐（${prettifyNumber(readingNext.readingTime, true)} 分钟）`,
      }
    : null

  const pathAction = post.series
    ? {
        title: '查看系列路径',
        href: `/series/${post.series.slug}`,
        reason: '系统化学习路线',
      }
    : {
        title: 'Start Here 新手路径',
        href: '/start-here',
        reason: '快速建立阅读路线',
      }

  const label = sourceLabel(source)

  return (
    <section className="mt-12 rounded-3xl border border-zinc-200/80 bg-white/70 p-6 shadow-sm dark:border-zinc-700/60 dark:bg-zinc-900/60">
      <header className="flex flex-col gap-2">
        <span className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-400">
          下一步推荐
        </span>
        {label && (
          <p className="text-sm text-zinc-500 dark:text-zinc-400">{label}</p>
        )}
      </header>

      <div className="mt-5 grid grid-cols-1 gap-4 md:grid-cols-2">
        {nextPrimary && (
          <Link
            href={nextPrimary.href}
            className="flex flex-col gap-2 rounded-2xl border border-zinc-200/70 bg-white p-4 transition hover:-translate-y-0.5 hover:shadow-md dark:border-zinc-700 dark:bg-zinc-900"
          >
            <span className="text-xs uppercase tracking-[0.2em] text-zinc-400">
              下一篇
            </span>
            <span className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
              {nextPrimary.title}
            </span>
            <span className="text-xs text-zinc-500 dark:text-zinc-400">
              {nextPrimary.reason}
            </span>
          </Link>
        )}

        <Link
          href={pathAction.href}
          className="flex flex-col gap-2 rounded-2xl border border-dashed border-zinc-300/80 bg-white p-4 transition hover:-translate-y-0.5 hover:shadow-md dark:border-zinc-700 dark:bg-zinc-900"
        >
          <span className="text-xs uppercase tracking-[0.2em] text-zinc-400">
            学习路径
          </span>
          <span className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
            {pathAction.title}
          </span>
          <span className="text-xs text-zinc-500 dark:text-zinc-400">
            {pathAction.reason}
          </span>
        </Link>
      </div>
    </section>
  )
}
