import Image from 'next/image'
import { notFound } from 'next/navigation'

import { TrackLink } from '~/components/TrackLink'
import { Container } from '~/components/ui/Container'
import { getProjectBySlug } from '~/sanity/queries'
import { urlForImage } from '~/sanity/lib/image'

export default async function CaseStudyDetailPage({
  params,
}: {
  params: { slug: string }
}) {
  const project = await getProjectBySlug(params.slug)
  if (!project) {
    notFound()
  }

  return (
    <Container className="mt-16 sm:mt-24">
      <header className="max-w-3xl space-y-4">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-400">
          Case Study
        </p>
        <h1 className="text-4xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100 sm:text-5xl">
          {project.name}
        </h1>
        <p className="text-base text-zinc-600 dark:text-zinc-400">
          {project.description}
        </p>
        <div className="flex flex-wrap gap-3 text-xs text-zinc-500 dark:text-zinc-400">
          {project.role && <span>角色：{project.role}</span>}
          {project.url && (
            <a
              href={project.url}
              className="text-zinc-900 underline underline-offset-4 dark:text-zinc-200"
            >
              访问项目
            </a>
          )}
        </div>
      </header>

      {project.stack?.length ? (
        <section className="mt-8 flex flex-wrap gap-2">
          {project.stack.map((item) => (
            <span
              key={item}
              className="rounded-full border border-zinc-200/70 px-3 py-1 text-xs text-zinc-500 dark:border-zinc-700 dark:text-zinc-400"
            >
              {item}
            </span>
          ))}
        </section>
      ) : null}

      <section className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-3">
        {project.goals?.length ? (
          <div className="rounded-2xl border border-zinc-200/80 bg-white/70 p-5 shadow-sm dark:border-zinc-700/60 dark:bg-zinc-900/60">
            <h2 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
              目标
            </h2>
            <ul className="mt-3 space-y-2 text-sm text-zinc-600 dark:text-zinc-400">
              {project.goals.map((goal) => (
                <li key={goal}>• {goal}</li>
              ))}
            </ul>
          </div>
        ) : null}
        {project.strategy?.length ? (
          <div className="rounded-2xl border border-zinc-200/80 bg-white/70 p-5 shadow-sm dark:border-zinc-700/60 dark:bg-zinc-900/60">
            <h2 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
              策略
            </h2>
            <ul className="mt-3 space-y-2 text-sm text-zinc-600 dark:text-zinc-400">
              {project.strategy.map((item) => (
                <li key={item}>• {item}</li>
              ))}
            </ul>
          </div>
        ) : null}
        {project.results ? (
          <div className="rounded-2xl border border-zinc-200/80 bg-white/70 p-5 shadow-sm dark:border-zinc-700/60 dark:bg-zinc-900/60">
            <h2 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
              结果
            </h2>
            <p className="mt-3 text-sm text-zinc-600 dark:text-zinc-400">
              {project.results}
            </p>
          </div>
        ) : null}
      </section>

      {project.metrics?.length ? (
        <section className="mt-8 grid grid-cols-2 gap-3 md:grid-cols-4">
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
        </section>
      ) : null}

      {project.gallery?.length ? (
        <section className="mt-10 grid grid-cols-2 gap-4 md:grid-cols-3">
          {project.gallery.map((image, idx) => (
            <div
              key={`${project._id}-gallery-${idx}`}
              className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-zinc-100 dark:bg-zinc-800"
            >
              {image && (
                <Image
                  src={urlForImage(image)?.size(800, 600).url() ?? ''}
                  alt={`${project.name} ${idx + 1}`}
                  fill
                  className="object-cover"
                />
              )}
            </div>
          ))}
        </section>
      ) : null}

      <section className="mt-12 rounded-3xl border border-zinc-200/80 bg-white/70 p-6 shadow-sm dark:border-zinc-700/60 dark:bg-zinc-900/60">
        <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
          想了解更多？
        </h2>
        <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
          如果你也在推进类似目标，可以预约咨询获取更详细的方案。
        </p>
        <TrackLink
          href="/consultation"
          event="consultation_cta_click"
          source="case-study"
          className="mt-4 inline-flex rounded-full bg-zinc-900 px-5 py-2 text-sm font-semibold text-white transition hover:bg-zinc-700 dark:bg-zinc-200 dark:text-zinc-900 dark:hover:bg-zinc-300"
        >
          预约咨询
        </TrackLink>
      </section>
    </Container>
  )
}
