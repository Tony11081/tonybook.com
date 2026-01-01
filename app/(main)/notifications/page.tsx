import { currentUser } from '@clerk/nextjs'
import { desc, eq } from 'drizzle-orm'
import Link from 'next/link'

import { Container } from '~/components/ui/Container'
import { db } from '~/db'
import { notifications } from '~/db/schema'

export const metadata = {
  title: '通知',
  description: '评论、点赞与互动提醒。',
}

export default async function NotificationsPage() {
  const user = await currentUser()
  if (!user) {
    return (
      <Container className="mt-16 sm:mt-24">
        <header className="max-w-2xl">
          <h1 className="text-4xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100 sm:text-5xl">
            通知
          </h1>
          <p className="mt-4 text-base text-zinc-600 dark:text-zinc-400">
            登录后查看评论与互动提醒。
          </p>
        </header>
        <Link
          href="/sign-in"
          className="mt-8 inline-flex items-center rounded-full border border-zinc-200/70 px-5 py-2 text-sm font-semibold text-zinc-600 transition hover:text-zinc-900 dark:border-zinc-700 dark:text-zinc-400"
        >
          去登录
        </Link>
      </Container>
    )
  }

  const rows = await db
    .select()
    .from(notifications)
    .where(eq(notifications.userId, user.id))
    .orderBy(desc(notifications.createdAt))
    .limit(50)

  return (
    <Container className="mt-16 sm:mt-24">
      <header className="max-w-2xl">
        <h1 className="text-4xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100 sm:text-5xl">
          通知
        </h1>
        <p className="mt-4 text-base text-zinc-600 dark:text-zinc-400">
          最新互动提醒会显示在这里。
        </p>
      </header>

      <section className="mt-10 space-y-4">
        {rows.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-zinc-300 p-8 text-center text-sm text-zinc-500 dark:border-zinc-700 dark:text-zinc-400">
            暂无通知。
          </div>
        ) : (
          rows.map((item) => (
            <div
              key={item.id}
              className={`rounded-2xl border p-5 shadow-sm transition ${
                item.readAt
                  ? 'border-zinc-200/60 bg-white/70 dark:border-zinc-700/50 dark:bg-zinc-900/60'
                  : 'border-zinc-900/80 bg-white dark:border-zinc-200/80 dark:bg-zinc-900'
              }`}
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                    {item.title}
                  </h3>
                  {item.message && (
                    <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
                      {item.message}
                    </p>
                  )}
                </div>
                {!item.readAt && (
                  <span className="rounded-full bg-lime-200/70 px-2 py-1 text-xs font-semibold text-zinc-800 dark:bg-lime-300/20 dark:text-lime-200">
                    新
                  </span>
                )}
              </div>
              {item.href && (
                <Link
                  href={item.href}
                  className="mt-3 inline-flex text-xs font-semibold text-zinc-900 underline underline-offset-4 dark:text-zinc-200"
                >
                  查看详情
                </Link>
              )}
            </div>
          ))
        )}
      </section>
    </Container>
  )
}
