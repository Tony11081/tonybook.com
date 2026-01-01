import { Container } from '~/components/ui/Container'

const sections = [
  {
    title: '硬件',
    items: ['MacBook Pro 16"', 'LG UltraFine 显示器', 'Keychron 键盘'],
  },
  {
    title: '软件',
    items: ['Arc', 'Figma', 'Notion', 'Raycast', 'Linear', 'Warp'],
  },
  {
    title: '服务',
    items: ['Vercel', 'Sanity', 'Neon', 'Resend', 'Clerk'],
  },
]

export const metadata = {
  title: 'Uses',
  description: '我日常使用的硬件、软件与服务。',
}

export default function UsesPage() {
  return (
    <Container className="mt-16 sm:mt-24">
      <header className="max-w-2xl">
        <h1 className="text-4xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100 sm:text-5xl">
          Uses
        </h1>
        <p className="mt-4 text-base text-zinc-600 dark:text-zinc-400">
          我用于构建产品与内容的工具清单。
        </p>
      </header>

      <section className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-3">
        {sections.map((section) => (
          <div
            key={section.title}
            className="rounded-2xl border border-zinc-200/80 bg-white/70 p-6 shadow-sm dark:border-zinc-700/60 dark:bg-zinc-900/60"
          >
            <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
              {section.title}
            </h2>
            <ul className="mt-3 space-y-2 text-sm text-zinc-600 dark:text-zinc-400">
              {section.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        ))}
      </section>
    </Container>
  )
}
