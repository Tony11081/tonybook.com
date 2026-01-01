import Link from 'next/link'

import { Container } from '~/components/ui/Container'
import { getSeriesList } from '~/sanity/queries'

const paths = [
  {
    title: '跨境增长路径',
    description: '从流量、转化到复购的系统化打法。',
    href: '/blog?search=跨境',
    focus: ['增长策略', '转化优化', '投放结构'],
  },
  {
    title: 'AI 视觉路径',
    description: '品牌视觉与内容生产体系的 AI 升级。',
    href: '/blog?search=AI',
    focus: ['视觉系统', '素材规模化', '品牌一致性'],
  },
  {
    title: '自动化路径',
    description: '用自动化与工作流打造高效率团队。',
    href: '/blog?search=自动化',
    focus: ['流程设计', '工具集成', '效率提升'],
  },
]

export const metadata = {
  title: 'Start Here',
  description: '三条路径快速了解 Tonybook 的内容体系。',
}

export default async function StartHerePage() {
  const seriesList = await getSeriesList()
  const topSeries = [...seriesList]
    .sort((a, b) => b.postCount - a.postCount)
    .slice(0, 3)

  return (
    <Container className="mt-16 sm:mt-24">
      <header className="max-w-3xl">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-400">
          Start Here
        </p>
        <h1 className="mt-3 text-4xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100 sm:text-5xl">
          新手导航
        </h1>
        <p className="mt-4 text-base text-zinc-600 dark:text-zinc-400">
          选择一条最符合你现状的路径，快速进入高密度内容与可复用方法论。
        </p>
      </header>

      <section className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-3">
        {paths.map((path) => (
          <div
            key={path.title}
            className="rounded-3xl border border-zinc-200/80 bg-white/70 p-6 shadow-sm dark:border-zinc-700/60 dark:bg-zinc-900/60"
          >
            <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100">
              {path.title}
            </h2>
            <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
              {path.description}
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              {path.focus.map((item) => (
                <span
                  key={item}
                  className="rounded-full border border-zinc-200/70 px-3 py-1 text-xs text-zinc-500 dark:border-zinc-700 dark:text-zinc-400"
                >
                  {item}
                </span>
              ))}
            </div>
            <Link
              href={path.href}
              className="mt-6 inline-flex text-sm font-semibold text-zinc-900 underline underline-offset-4 dark:text-zinc-200"
            >
              开始阅读
            </Link>
          </div>
        ))}
      </section>

      <section className="mt-14">
        <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">
          必读系列
        </h2>
        <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-3">
          {topSeries.map((series) => (
            <Link
              key={series._id}
              href={`/series/${series.slug}`}
              className="rounded-2xl border border-zinc-200/80 bg-white/70 p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md dark:border-zinc-700/60 dark:bg-zinc-900/60"
            >
              <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
                {series.title}
              </h3>
              {series.description && (
                <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
                  {series.description}
                </p>
              )}
              <span className="mt-3 inline-flex text-xs text-zinc-500 dark:text-zinc-400">
                已发布 {series.postCount} 篇
              </span>
            </Link>
          ))}
        </div>
      </section>
    </Container>
  )
}
