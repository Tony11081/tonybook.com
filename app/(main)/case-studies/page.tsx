import Image from 'next/image'
import Link from 'next/link'

import { Container } from '~/components/ui/Container'
import { urlForImage } from '~/sanity/lib/image'
import { getSettings } from '~/sanity/queries'

export const metadata = {
  title: '案例拆解',
  description: '项目目标、策略与结果的完整复盘。',
}

export default async function CaseStudiesPage() {
  const projects = (await getSettings())?.projects ?? []

  return (
    <Container className="mt-16 sm:mt-24">
      <header className="max-w-3xl">
        <h1 className="text-4xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100 sm:text-5xl">
          案例拆解
        </h1>
        <p className="mt-4 text-base text-zinc-600 dark:text-zinc-400">
          关注目标、策略与结果，强调可复用的增长路径。
        </p>
      </header>

      <section className="mt-12 space-y-8">
        {projects.map((project) => (
          <article
            key={project._id}
            className="rounded-3xl border border-zinc-200/80 bg-white/70 p-6 shadow-sm dark:border-zinc-700/60 dark:bg-zinc-900/60"
          >
            <div className="flex flex-wrap items-center gap-4">
              {project.icon && (
                <div className="relative h-14 w-14 overflow-hidden rounded-2xl bg-zinc-100 dark:bg-zinc-800">
                  <Image
                    src={urlForImage(project.icon)?.size(120, 120).url() ?? ''}
                    alt={project.name}
                    fill
                    className="object-cover"
                  />
                </div>
              )}
              <div className="flex-1">
                <h2 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-100">
                  {project.name}
                </h2>
                <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
                  {project.description}
                </p>
                {project.slug && (
                  <Link
                    href={`/case-studies/${project.slug}`}
                    className="mt-3 inline-flex text-xs font-semibold text-zinc-900 underline underline-offset-4 dark:text-zinc-200"
                  >
                    查看完整拆解
                  </Link>
                )}
              </div>
              {project.url && (
                <a
                  href={project.url}
                  className="rounded-full border border-zinc-200/70 px-4 py-2 text-xs font-semibold text-zinc-500 transition hover:text-zinc-900 dark:border-zinc-700 dark:text-zinc-400"
                >
                  访问站点
                </a>
              )}
            </div>

            <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-3">
              {project.goals?.length ? (
                <div>
                  <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                    目标
                  </h3>
                  <ul className="mt-2 space-y-1 text-sm text-zinc-600 dark:text-zinc-400">
                    {project.goals.map((goal) => (
                      <li key={goal}>• {goal}</li>
                    ))}
                  </ul>
                </div>
              ) : null}
              {project.strategy?.length ? (
                <div>
                  <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                    策略
                  </h3>
                  <ul className="mt-2 space-y-1 text-sm text-zinc-600 dark:text-zinc-400">
                    {project.strategy.map((item) => (
                      <li key={item}>• {item}</li>
                    ))}
                  </ul>
                </div>
              ) : null}
              {project.results ? (
                <div>
                  <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                    结果
                  </h3>
                  <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
                    {project.results}
                  </p>
                </div>
              ) : null}
            </div>

            {project.metrics?.length ? (
              <div className="mt-6 grid grid-cols-2 gap-3 md:grid-cols-4">
                {project.metrics.map((metric) => (
                  <div
                    key={metric.label}
                    className="rounded-2xl border border-zinc-200/70 bg-white/60 p-4 text-center text-sm dark:border-zinc-700 dark:bg-zinc-900/60"
                  >
                    <div className="text-xs text-zinc-500 dark:text-zinc-400">
                      {metric.label}
                    </div>
                    <div className="mt-1 text-lg font-semibold text-zinc-900 dark:text-zinc-100">
                      {metric.value}
                    </div>
                  </div>
                ))}
              </div>
            ) : null}

            {project.gallery?.length ? (
              <div className="mt-6 grid grid-cols-2 gap-3 md:grid-cols-3">
                {project.gallery.map((image, idx) => (
                  <div
                    key={`${project._id}-gallery-${idx}`}
                    className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-zinc-100 dark:bg-zinc-800"
                  >
                    {image && (
                      <Image
                        src={urlForImage(image)?.size(600, 450).url() ?? ''}
                        alt={`${project.name} ${idx + 1}`}
                        fill
                        className="object-cover"
                      />
                    )}
                  </div>
                ))}
              </div>
            ) : null}
          </article>
        ))}
      </section>
    </Container>
  )
}
