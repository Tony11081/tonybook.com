import { Container } from '~/components/ui/Container'

const nowItems = [
  '完善订阅漏斗与欢迎序列',
  '升级评论与留言互动体验',
  '发布 Playbooks 模板库',
]

const nextItems = [
  '推出更多专题系列与学习路径',
  '优化 SEO 与内容内链结构',
  '上线案例深度拆解页面',
]

const laterItems = [
  '推出会员内容与社群',
  '搭建工具库评分系统',
  '多语言内容与海外渠道拓展',
]

export const metadata = {
  title: 'Roadmap',
  description: '网站与内容计划路线图。',
}

export default function RoadmapPage() {
  return (
    <Container className="mt-16 sm:mt-24">
      <header className="max-w-2xl">
        <h1 className="text-4xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100 sm:text-5xl">
          Roadmap
        </h1>
        <p className="mt-4 text-base text-zinc-600 dark:text-zinc-400">
          记录接下来 3-6 个月的重点方向与计划。
        </p>
      </header>

      <section className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-3">
        <div className="rounded-3xl border border-zinc-200/80 bg-white/70 p-6 shadow-sm dark:border-zinc-700/60 dark:bg-zinc-900/60">
          <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
            Now
          </h2>
          <ul className="mt-4 space-y-2 text-sm text-zinc-600 dark:text-zinc-400">
            {nowItems.map((item) => (
              <li key={item}>• {item}</li>
            ))}
          </ul>
        </div>
        <div className="rounded-3xl border border-zinc-200/80 bg-white/70 p-6 shadow-sm dark:border-zinc-700/60 dark:bg-zinc-900/60">
          <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
            Next
          </h2>
          <ul className="mt-4 space-y-2 text-sm text-zinc-600 dark:text-zinc-400">
            {nextItems.map((item) => (
              <li key={item}>• {item}</li>
            ))}
          </ul>
        </div>
        <div className="rounded-3xl border border-zinc-200/80 bg-white/70 p-6 shadow-sm dark:border-zinc-700/60 dark:bg-zinc-900/60">
          <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
            Later
          </h2>
          <ul className="mt-4 space-y-2 text-sm text-zinc-600 dark:text-zinc-400">
            {laterItems.map((item) => (
              <li key={item}>• {item}</li>
            ))}
          </ul>
        </div>
      </section>
    </Container>
  )
}
