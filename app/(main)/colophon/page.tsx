import { Container } from '~/components/ui/Container'

export const metadata = {
  title: 'Colophon',
  description: '关于本站的设计与技术栈。',
}

export default function ColophonPage() {
  return (
    <Container className="mt-16 sm:mt-24">
      <header className="max-w-2xl">
        <h1 className="text-4xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100 sm:text-5xl">
          Colophon
        </h1>
        <p className="mt-4 text-base text-zinc-600 dark:text-zinc-400">
          本站的技术栈、设计理念与部署细节。
        </p>
      </header>

      <section className="mt-10 space-y-4">
        <div className="rounded-2xl border border-zinc-200/80 bg-white/70 p-6 shadow-sm dark:border-zinc-700/60 dark:bg-zinc-900/60">
          <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
            技术栈
          </h2>
          <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
            Next.js + Sanity + Drizzle + Neon + Vercel，配合 Clerk 与 Resend
            完成身份与邮件流。
          </p>
        </div>
        <div className="rounded-2xl border border-zinc-200/80 bg-white/70 p-6 shadow-sm dark:border-zinc-700/60 dark:bg-zinc-900/60">
          <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
            设计与排版
          </h2>
          <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
            以克制的黑白为基底，搭配清晰的层级与细腻的光感，突出内容本身。
          </p>
        </div>
        <div className="rounded-2xl border border-zinc-200/80 bg-white/70 p-6 shadow-sm dark:border-zinc-700/60 dark:bg-zinc-900/60">
          <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
            部署
          </h2>
          <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
            Vercel 自动部署、边缘缓存、图片优化与分析，确保稳定与性能。
          </p>
        </div>
      </section>
    </Container>
  )
}
