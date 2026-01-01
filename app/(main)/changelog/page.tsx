import { Container } from '~/components/ui/Container'

const updates = [
  {
    date: '2024-09',
    title: '系列专题上线',
    description: '支持专题聚合与阅读进度，构建学习路径。',
  },
  {
    date: '2024-08',
    title: '博客搜索与筛选',
    description: '新增搜索、分类、阅读时长与排序筛选。',
  },
  {
    date: '2024-07',
    title: '咨询服务升级',
    description: '完善 AMA 页面与预约流程。',
  },
]

const roadmap = [
  '更多案例拆解与指标复盘',
  'AI 视觉工具模板库',
  '多语言版本与国际化内容',
]

export const metadata = {
  title: '更新日志',
  description: '站点更新与路线图。',
}

export default function ChangelogPage() {
  return (
    <Container className="mt-16 sm:mt-24">
      <header className="max-w-2xl">
        <h1 className="text-4xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100 sm:text-5xl">
          更新日志
        </h1>
        <p className="mt-4 text-base text-zinc-600 dark:text-zinc-400">
          记录网站功能与内容的更新节奏。
        </p>
      </header>

      <section className="mt-10 space-y-4">
        {updates.map((update) => (
          <div
            key={update.title}
            className="rounded-2xl border border-zinc-200/80 bg-white/70 p-6 shadow-sm dark:border-zinc-700/60 dark:bg-zinc-900/60"
          >
            <div className="text-xs font-semibold text-zinc-500 dark:text-zinc-400">
              {update.date}
            </div>
            <h2 className="mt-2 text-lg font-semibold text-zinc-900 dark:text-zinc-100">
              {update.title}
            </h2>
            <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
              {update.description}
            </p>
          </div>
        ))}
      </section>

      <section className="mt-12 rounded-3xl border border-zinc-200/80 bg-white/70 p-6 shadow-sm dark:border-zinc-700/60 dark:bg-zinc-900/60">
        <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">
          路线图
        </h2>
        <ul className="mt-4 space-y-2 text-sm text-zinc-600 dark:text-zinc-400">
          {roadmap.map((item) => (
            <li key={item}>• {item}</li>
          ))}
        </ul>
      </section>
    </Container>
  )
}
