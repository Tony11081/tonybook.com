import { TrackLink } from '~/components/TrackLink'
import { Container } from '~/components/ui/Container'

const services = [
  {
    title: '增长策略诊断',
    description: '梳理投放、转化漏斗与增长路径，输出可执行的策略清单。',
  },
  {
    title: '自动化系统搭建',
    description: '从数据采集到流程自动化，构建可复用的效率系统。',
  },
  {
    title: 'AI 视觉优化',
    description: '用视觉系统与 AI 生成工具提升内容与产品呈现。',
  },
]

const deliverables = [
  '增长诊断报告 + 关键指标地图',
  '可复用的策略拆解与执行清单',
  '自动化流程图与工具配置说明',
  '复盘与下一步行动建议',
]

const pricing = [
  {
    title: '策略诊断包',
    price: '¥1,500 起',
    description: '适合快速找准增长瓶颈与突破口。',
  },
  {
    title: '系统搭建包',
    price: '¥4,800 起',
    description: '适合需要完整落地方案与流程搭建的团队。',
  },
]

const faqs = [
  {
    question: '合作周期多长？',
    answer: '通常为 2-4 周，视项目复杂度而定。',
  },
  {
    question: '是否提供落地工具与模板？',
    answer: '会提供完整的策略文档、模板与关键工具配置说明。',
  },
  {
    question: '如何开始合作？',
    answer: '先预约 30 分钟咨询，确认目标与合作方式。',
  },
]

export const metadata = {
  title: '合作方式',
  description: '增长、自动化与 AI 视觉的合作服务。',
}

export default function WorkWithMePage() {
  return (
    <Container className="mt-16 sm:mt-24">
      <header className="max-w-3xl">
        <h1 className="text-4xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100 sm:text-5xl">
          Work With Me
        </h1>
        <p className="mt-4 text-base text-zinc-600 dark:text-zinc-400">
          我可以帮助你从增长策略、自动化系统到 AI 视觉设计，建立可持续的电商增长引擎。
        </p>
      </header>

      <section className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-3">
        {services.map((service) => (
          <div
            key={service.title}
            className="rounded-2xl border border-zinc-200/80 bg-white/70 p-6 shadow-sm dark:border-zinc-700/60 dark:bg-zinc-900/60"
          >
            <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
              {service.title}
            </h2>
            <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
              {service.description}
            </p>
          </div>
        ))}
      </section>

      <section className="mt-12 grid grid-cols-1 gap-4 md:grid-cols-2">
        {pricing.map((plan) => (
          <div
            key={plan.title}
            className="rounded-2xl border border-zinc-200/80 bg-white/70 p-6 shadow-sm dark:border-zinc-700/60 dark:bg-zinc-900/60"
          >
            <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
              {plan.title}
            </h2>
            <p className="mt-2 text-2xl font-bold text-zinc-900 dark:text-zinc-100">
              {plan.price}
            </p>
            <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
              {plan.description}
            </p>
          </div>
        ))}
      </section>

      <section className="mt-12 rounded-3xl border border-zinc-200/80 bg-white/70 p-8 shadow-sm dark:border-zinc-700/60 dark:bg-zinc-900/60">
        <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">
          交付样例
        </h2>
        <ul className="mt-4 grid grid-cols-1 gap-3 text-sm text-zinc-600 dark:text-zinc-400 md:grid-cols-2">
          {deliverables.map((item) => (
            <li key={item} className="rounded-2xl border border-zinc-200/60 bg-white/80 px-4 py-3 dark:border-zinc-700 dark:bg-zinc-900/70">
              {item}
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-12 rounded-3xl border border-zinc-200/80 bg-white/70 p-8 shadow-sm dark:border-zinc-700/60 dark:bg-zinc-900/60">
        <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">
          合作流程
        </h2>
        <ol className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-3">
          <li className="rounded-2xl border border-zinc-200/60 bg-white/80 p-4 text-sm text-zinc-600 dark:border-zinc-700 dark:bg-zinc-900/70 dark:text-zinc-400">
            1. 需求沟通与目标对齐
          </li>
          <li className="rounded-2xl border border-zinc-200/60 bg-white/80 p-4 text-sm text-zinc-600 dark:border-zinc-700 dark:bg-zinc-900/70 dark:text-zinc-400">
            2. 策略拆解与执行计划
          </li>
          <li className="rounded-2xl border border-zinc-200/60 bg-white/80 p-4 text-sm text-zinc-600 dark:border-zinc-700 dark:bg-zinc-900/70 dark:text-zinc-400">
            3. 交付与复盘
          </li>
        </ol>
        <div className="mt-6 flex flex-wrap gap-3">
          <TrackLink
            href="/consultation"
            event="consultation_cta_click"
            source="work-with-me"
            className="rounded-full bg-zinc-900 px-5 py-2 text-sm font-semibold text-white transition hover:bg-zinc-700 dark:bg-zinc-200 dark:text-zinc-900 dark:hover:bg-zinc-300"
          >
            预约咨询
          </TrackLink>
          <TrackLink
            href="/guestbook"
            event="contact_cta_click"
            source="work-with-me"
            className="rounded-full border border-zinc-200/70 px-5 py-2 text-sm font-semibold text-zinc-500 transition hover:text-zinc-900 dark:border-zinc-700 dark:text-zinc-400"
          >
            留言沟通
          </TrackLink>
        </div>
      </section>

      <section className="mt-12">
        <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">
          常见问题
        </h2>
        <div className="mt-6 space-y-3">
          {faqs.map((faq) => (
            <div
              key={faq.question}
              className="rounded-2xl border border-zinc-200/80 bg-white/70 p-5 shadow-sm dark:border-zinc-700/60 dark:bg-zinc-900/60"
            >
              <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                {faq.question}
              </h3>
              <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
                {faq.answer}
              </p>
            </div>
          ))}
        </div>
      </section>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: faqs.map((faq) => ({
              '@type': 'Question',
              name: faq.question,
              acceptedAnswer: {
                '@type': 'Answer',
                text: faq.answer,
              },
            })),
          }),
        }}
      />
    </Container>
  )
}
