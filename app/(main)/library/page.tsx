import { Container } from '~/components/ui/Container'

import { LibraryClient } from './LibraryClient'

export const metadata = {
  title: '资源库',
  description: '书籍、课程、工具与方法论推荐。',
}

export default function LibraryPage() {
  return (
    <Container className="mt-16 sm:mt-24">
      <header className="max-w-2xl">
        <h1 className="text-4xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100 sm:text-5xl">
          资源库
        </h1>
        <p className="mt-4 text-base text-zinc-600 dark:text-zinc-400">
          我在跨境电商与 AI 视觉设计中反复验证过的资源与工具清单。
        </p>
      </header>

      <LibraryClient />
    </Container>
  )
}
