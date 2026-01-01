import Link from 'next/link'

import { Container } from '~/components/ui/Container'

const timeline = [
  {
    year: '2018',
    title: '跨境电商自动化实践',
    description: '从广告投放到数据采集，搭建第一套自动化增长系统。',
  },
  {
    year: '2020',
    title: 'AI 视觉与设计系统',
    description: '用生成式视觉与模板体系，将设计产能提升到可复用层级。',
  },
  {
    year: '2022',
    title: 'Tonybook 成立',
    description: '专注跨境电商与 AI 视觉产品化，沉淀方法论与工具。',
  },
  {
    year: '2024',
    title: '咨询与知识体系化',
    description: '把项目经验整理为专题系列与可执行的增长路径。',
  },
]

const values = [
  {
    title: '系统化',
    description: '把经验变成可复用的流程、工具和模板。',
  },
  {
    title: '可衡量',
    description: '所有策略都需要可以量化的指标与验证路径。',
  },
  {
    title: '可交付',
    description: '输出能落地的方案，而不仅是想法。',
  },
]

const process = [
  {
    step: '01',
    title: '问题定义',
    description: '明确业务目标、约束和核心瓶颈。',
  },
  {
    step: '02',
    title: '策略拆解',
    description: '把目标拆成可执行的模块与路径。',
  },
  {
    step: '03',
    title: '验证迭代',
    description: '小步快跑验证策略并优化落地效率。',
  },
  {
    step: '04',
    title: '成果交付',
    description: '输出文档、工具与复盘，确保复用。',
  },
]

const media = [
  { name: '少数派', url: '#' },
  { name: '36Kr', url: '#' },
  { name: 'Product Hunt', url: '#' },
]

export const metadata = {
  title: '关于我',
  description: 'Tony 的个人故事、价值观与合作方式。',
}

export default function AboutPage() {
  return (
    <Container className="mt-16 sm:mt-24">
      <header className="max-w-3xl">
        <h1 className="text-4xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100 sm:text-5xl">
          关于我
        </h1>
        <p className="mt-4 text-base text-zinc-600 dark:text-zinc-400">
          Tonybook 创始人，专注跨境电商自动化与 AI 视觉产品化。喜欢把复杂业务拆成
          可复用的系统。
        </p>
        <div className="mt-6 flex flex-wrap gap-3 text-sm">
          <Link
            href="/projects"
            className="rounded-full border border-zinc-200/70 px-4 py-2 text-zinc-500 transition hover:text-zinc-900 dark:border-zinc-700 dark:text-zinc-400"
          >
            查看项目
          </Link>
          <Link
            href="/case-studies"
            className="rounded-full border border-zinc-200/70 px-4 py-2 text-zinc-500 transition hover:text-zinc-900 dark:border-zinc-700 dark:text-zinc-400"
          >
            案例拆解
          </Link>
          <Link
            href="/work-with-me"
            className="rounded-full border border-zinc-200/70 px-4 py-2 text-zinc-500 transition hover:text-zinc-900 dark:border-zinc-700 dark:text-zinc-400"
          >
            合作方式
          </Link>
        </div>
      </header>

      <section className="mt-12">
        <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">
          时间线
        </h2>
        <div className="mt-6 space-y-4">
          {timeline.map((item) => (
            <div
              key={item.year}
              className="rounded-2xl border border-zinc-200/80 bg-white/70 p-5 shadow-sm dark:border-zinc-700/60 dark:bg-zinc-900/60"
            >
              <div className="text-xs font-semibold text-zinc-500 dark:text-zinc-400">
                {item.year}
              </div>
              <h3 className="mt-2 text-lg font-semibold text-zinc-900 dark:text-zinc-100">
                {item.title}
              </h3>
              <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-12">
        <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">
          价值观
        </h2>
        <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-3">
          {values.map((value) => (
            <div
              key={value.title}
              className="rounded-2xl border border-zinc-200/80 bg-white/70 p-5 shadow-sm dark:border-zinc-700/60 dark:bg-zinc-900/60"
            >
              <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
                {value.title}
              </h3>
              <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
                {value.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-12">
        <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">
          合作流程
        </h2>
        <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">
          {process.map((item) => (
            <div
              key={item.step}
              className="rounded-2xl border border-zinc-200/80 bg-white/70 p-5 shadow-sm dark:border-zinc-700/60 dark:bg-zinc-900/60"
            >
              <div className="text-xs font-semibold text-zinc-500 dark:text-zinc-400">
                {item.step}
              </div>
              <h3 className="mt-2 text-lg font-semibold text-zinc-900 dark:text-zinc-100">
                {item.title}
              </h3>
              <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-12">
        <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">
          媒体与背书
        </h2>
        <div className="mt-6 flex flex-wrap gap-3">
          {media.map((item) => (
            <a
              key={item.name}
              href={item.url}
              className="rounded-full border border-zinc-200/70 px-4 py-2 text-sm text-zinc-500 transition hover:text-zinc-900 dark:border-zinc-700 dark:text-zinc-400"
            >
              {item.name}
            </a>
          ))}
        </div>
      </section>
    </Container>
  )
}

