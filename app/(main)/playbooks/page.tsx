import { Newsletter } from '~/app/(main)/Newsletter'
import { TrackLink } from '~/components/TrackLink'
import { Container } from '~/components/ui/Container'

const playbooks = [
  {
    title: '增长清单',
    description: '从目标到转化的关键动作清单。',
    href: '/downloads/tonybook-growth-checklist.txt',
    tag: '增长',
  },
  {
    title: '自动化流程图',
    description: '高频任务自动化的流程模板。',
    href: '/downloads/tonybook-automation-flow.txt',
    tag: '自动化',
  },
  {
    title: 'AI 视觉提示词',
    description: '常用视觉场景 Prompt 集合。',
    href: '/downloads/tonybook-ai-visual-prompts.txt',
    tag: 'AI 视觉',
  },
]

export const metadata = {
  title: 'Playbooks',
  description: '可下载的清单、脚本与流程图。',
}

export default function PlaybooksPage() {
  return (
    <Container className="mt-16 sm:mt-24">
      <header className="max-w-3xl">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-400">
          Playbooks
        </p>
        <h1 className="mt-3 text-4xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100 sm:text-5xl">
          模板与清单库
        </h1>
        <p className="mt-4 text-base text-zinc-600 dark:text-zinc-400">
          把策略变成可执行模板，直接拿去落地。
        </p>
      </header>

      <section className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-3">
        {playbooks.map((item) => (
          <div
            key={item.title}
            className="rounded-3xl border border-zinc-200/80 bg-white/70 p-6 shadow-sm dark:border-zinc-700/60 dark:bg-zinc-900/60"
          >
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-400">
              {item.tag}
            </span>
            <h2 className="mt-3 text-xl font-semibold text-zinc-900 dark:text-zinc-100">
              {item.title}
            </h2>
            <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
              {item.description}
            </p>
            <TrackLink
              href={item.href}
              event="playbook_download"
              source="playbooks"
              download
              className="mt-6 inline-flex text-sm font-semibold text-zinc-900 underline underline-offset-4 dark:text-zinc-200"
            >
              下载模板
            </TrackLink>
          </div>
        ))}
      </section>

      <section className="mt-12">
        <Newsletter
          source="playbooks"
          leadMagnet="模板与清单合集"
          title="订阅获取更多模板"
          description="订阅后会持续收到最新模板与实战拆解。"
        />
      </section>
    </Container>
  )
}
