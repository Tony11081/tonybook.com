import { Container } from '~/components/ui/Container'

export const metadata = {
  title: 'Now',
  description: '我当前的关注点与正在做的事。',
}

export default function NowPage() {
  return (
    <Container className="mt-16 sm:mt-24">
      <header className="max-w-2xl">
        <h1 className="text-4xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100 sm:text-5xl">
          Now
        </h1>
        <p className="mt-4 text-base text-zinc-600 dark:text-zinc-400">
          记录我当前的关注点、正在做的项目与学习方向。
        </p>
      </header>

      <section className="mt-10 space-y-6">
        <div className="rounded-2xl border border-zinc-200/80 bg-white/70 p-6 shadow-sm dark:border-zinc-700/60 dark:bg-zinc-900/60">
          <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
            正在推进
          </h2>
          <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
            跨境电商运营自动化平台、AI 视觉内容生成系统、系列化内容输出。
          </p>
        </div>
        <div className="rounded-2xl border border-zinc-200/80 bg-white/70 p-6 shadow-sm dark:border-zinc-700/60 dark:bg-zinc-900/60">
          <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
            正在学习
          </h2>
          <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
            商品增长模型、广告投放自动化、LLM 驱动的视觉优化流程。
          </p>
        </div>
        <div className="rounded-2xl border border-zinc-200/80 bg-white/70 p-6 shadow-sm dark:border-zinc-700/60 dark:bg-zinc-900/60">
          <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
            正在分享
          </h2>
          <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
            每周持续发布跨境电商与 AI 视觉设计方法论，欢迎订阅 Newsletter。
          </p>
        </div>
      </section>
    </Container>
  )
}
