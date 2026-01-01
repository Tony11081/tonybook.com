import { desc, ilike } from 'drizzle-orm'

import { Newsletter } from '~/app/(main)/Newsletter'
import { Container } from '~/components/ui/Container'
import { db } from '~/db'
import { newsletters } from '~/db/schema'

export const metadata = {
  title: 'Newsletter 归档',
  description: '阅读往期 Newsletter，按主题检索。',
}

export default async function NewslettersArchivePage({
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[] | undefined }
}) {
  const search = typeof searchParams?.search === 'string' ? searchParams.search : ''

  const baseQuery = db
    .select({
      id: newsletters.id,
      subject: newsletters.subject,
      sentAt: newsletters.sentAt,
      createdAt: newsletters.createdAt,
    })
    .from(newsletters)

  const rows = await (search
    ? baseQuery
        .where(ilike(newsletters.subject, `%${search}%`))
        .orderBy(desc(newsletters.sentAt), desc(newsletters.createdAt))
        .limit(50)
    : baseQuery.orderBy(desc(newsletters.sentAt), desc(newsletters.createdAt)).limit(50))

  return (
    <Container className="mt-16 sm:mt-24">
      <header className="max-w-2xl">
        <h1 className="text-4xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100 sm:text-5xl">
          Newsletter 归档
        </h1>
        <p className="mt-4 text-base text-zinc-600 dark:text-zinc-400">
          订阅后每月收到最新方法论与实战拆解。
        </p>
      </header>

      <section className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-[2fr,1fr]">
        <div className="space-y-6">
          <form className="flex flex-col gap-3 sm:flex-row" method="get">
            <input
              name="search"
              defaultValue={search}
              placeholder="搜索主题或关键词..."
              className="w-full rounded-xl border border-zinc-300 bg-white px-4 py-3 text-sm text-zinc-800 shadow-sm outline-none transition focus:border-zinc-500 focus:ring-2 focus:ring-zinc-300 dark:border-zinc-700 dark:bg-zinc-900/80 dark:text-zinc-200 dark:focus:border-zinc-500 dark:focus:ring-zinc-700"
            />
            <button
              type="submit"
              className="inline-flex h-11 items-center justify-center rounded-lg bg-zinc-900 px-6 text-sm font-semibold text-white transition hover:bg-zinc-700 dark:bg-zinc-200 dark:text-zinc-900 dark:hover:bg-zinc-300"
            >
              搜索
            </button>
          </form>

          <div className="space-y-4">
            {rows.length === 0 ? (
              <div className="rounded-2xl border border-dashed border-zinc-300 p-8 text-center text-sm text-zinc-500 dark:border-zinc-700 dark:text-zinc-400">
                暂无匹配的 Newsletter。
              </div>
            ) : (
              rows.map((row) => (
                <a
                  key={row.id}
                  href={`/newsletters/${row.id}`}
                  className="block rounded-2xl border border-zinc-200/80 bg-white/70 p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md dark:border-zinc-700/60 dark:bg-zinc-900/60"
                >
                  <p className="text-sm text-zinc-500 dark:text-zinc-400">
                    {row.sentAt || row.createdAt
                      ? new Date(row.sentAt ?? row.createdAt ?? '').toISOString().split('T')[0]
                      : '未发送'}
                  </p>
                  <h3 className="mt-2 text-lg font-semibold text-zinc-900 dark:text-zinc-100">
                    {row.subject}
                  </h3>
                </a>
              ))
            )}
          </div>
        </div>

        <aside className="lg:pt-14">
          <Newsletter />
        </aside>
      </section>
    </Container>
  )
}
