import { Newsletter } from '~/app/(main)/Newsletter'
import { TrackLink } from '~/components/TrackLink'
import { Button } from '~/components/ui/Button'

export function BlogPostCTA() {
  return (
    <section className="mt-16 grid grid-cols-1 gap-6 lg:grid-cols-3">
      <div className="lg:col-span-2">
        <Newsletter />
      </div>

      <div className="flex flex-col gap-4 rounded-2xl border border-zinc-200/80 bg-white/70 p-6 shadow-sm dark:border-zinc-700/60 dark:bg-zinc-900/60">
        <div>
          <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
            一对一咨询
          </p>
          <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
            针对跨境电商增长、AI视觉设计与自动化落地，获取清晰可执行的方案。
          </p>
        </div>
        <Button asChild className="mt-auto">
          <TrackLink event="consultation_cta_click" source="blog-cta" href="/consultation">
            立即预约
          </TrackLink>
        </Button>
      </div>

      <div className="flex flex-col gap-4 rounded-2xl border border-zinc-200/80 bg-white/70 p-6 shadow-sm dark:border-zinc-700/60 dark:bg-zinc-900/60">
        <div>
          <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
            资源下载
          </p>
          <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
            获取我的工具清单、模板与案例拆解，帮助你快速复用实战方法。
          </p>
        </div>
        <Button asChild variant="secondary" className="mt-auto">
          <TrackLink event="resource_cta_click" source="blog-cta" href="/library">
            前往资源库
          </TrackLink>
        </Button>
      </div>
    </section>
  )
}
