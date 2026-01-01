import { Container } from '~/components/ui/Container'

import { GlossaryClient } from './GlossaryClient'

export const metadata = {
  title: '术语与概念库',
  description: '跨境增长、AI 视觉与自动化的核心概念。',
}

export default function GlossaryPage() {
  return (
    <Container className="mt-16 sm:mt-24">
      <header className="max-w-2xl">
        <h1 className="text-4xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100 sm:text-5xl">
          术语与概念库
        </h1>
        <p className="mt-4 text-base text-zinc-600 dark:text-zinc-400">
          用于快速理解增长、视觉与自动化的关键概念。
        </p>
      </header>

      <GlossaryClient />
    </Container>
  )
}
