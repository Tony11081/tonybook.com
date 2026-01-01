import Link from 'next/link'

import { Container } from '~/components/ui/Container'

const updates = [
  {
    title: 'Now',
    description: '最近正在做的事情与重点。',
    href: '/now',
  },
  {
    title: 'Uses',
    description: '我正在使用的工具与系统。',
    href: '/uses',
  },
  {
    title: 'Roadmap',
    description: '未来 3-6 个月的计划。',
    href: '/roadmap',
  },
]

export const metadata = {
  title: 'Updates',
  description: '近况、工具与路线图组合页。',
}

export default function UpdatesPage() {
  return (
    <Container className="mt-16 sm:mt-24">
      <header className="max-w-2xl">
        <h1 className="text-4xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100 sm:text-5xl">
          Updates
        </h1>
        <p className="mt-4 text-base text-zinc-600 dark:text-zinc-400">
          用一个页面快速了解我的近况、工具与计划。
        </p>
      </header>

      <section className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-3">
        {updates.map((item) => (
          <Link
            key={item.title}
            href={item.href}
            className="rounded-3xl border border-zinc-200/80 bg-white/70 p-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md dark:border-zinc-700/60 dark:bg-zinc-900/60"
          >
            <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
              {item.title}
            </h2>
            <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
              {item.description}
            </p>
          </Link>
        ))}
      </section>
    </Container>
  )
}
