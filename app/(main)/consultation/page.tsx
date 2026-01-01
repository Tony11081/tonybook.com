import Balancer from 'react-wrap-balancer'

import { TrackLink } from '~/components/TrackLink'
import { Container } from '~/components/ui/Container'

import { ConsultationForm } from './ConsultationForm'

const title = '咨询入口'
const description =
  '把跨境增长、AI 视觉与自动化问题拆解成可执行方案。先提交需求，我们会在 24 小时内回复。'

export const metadata = {
  title,
  description,
}

export default function ConsultationPage() {
  return (
    <Container className="mt-16 sm:mt-24">
      <header className="max-w-3xl">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-400">
          Work With Me
        </p>
        <h1 className="mt-2 text-4xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100 sm:text-5xl">
          {title}
        </h1>
        <p className="mt-4 text-base text-zinc-600 dark:text-zinc-400">
          <Balancer>{description}</Balancer>
        </p>
      </header>

      <section className="mt-10 grid grid-cols-1 gap-8 lg:grid-cols-[1.2fr,1fr]">
        <ConsultationForm />

        <div className="space-y-6">
          <div className="rounded-3xl border border-zinc-200/80 bg-white/70 p-6 shadow-sm dark:border-zinc-700/60 dark:bg-zinc-900/60">
            <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
              日程预约
            </h2>
            <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
              选择日程后系统会自动确认时间，你也可以在表单里备注偏好。
            </p>
            <div className="mt-4 flex flex-wrap gap-3">
              <TrackLink
                href="#consultation-cal"
                event="consultation_schedule_click"
                source="consultation"
                className="inline-flex items-center rounded-full bg-zinc-900 px-5 py-2 text-sm font-semibold text-white transition hover:bg-zinc-700 dark:bg-zinc-200 dark:text-zinc-900 dark:hover:bg-zinc-300"
              >
                Cal/Calendly 预约
              </TrackLink>
              <TrackLink
                href="/guestbook"
                event="consultation_tencent_click"
                source="consultation"
                className="inline-flex items-center rounded-full border border-zinc-200/70 px-5 py-2 text-sm font-semibold text-zinc-600 transition hover:text-zinc-900 dark:border-zinc-700 dark:text-zinc-400"
              >
                腾讯会议预约
              </TrackLink>
            </div>
          </div>

          <div className="rounded-3xl border border-zinc-200/80 bg-white/70 p-6 shadow-sm dark:border-zinc-700/60 dark:bg-zinc-900/60">
            <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
              适合的合作场景
            </h2>
            <ul className="mt-3 space-y-2 text-sm text-zinc-600 dark:text-zinc-400">
              <li>• 跨境电商增长策略与转化诊断</li>
              <li>• AI 视觉设计系统与内容产能升级</li>
              <li>• 自动化流程与工具栈搭建</li>
              <li>• 复盘与下一步增长规划</li>
            </ul>
          </div>
        </div>
      </section>

      <section
        id="consultation-cal"
        className="mt-12 rounded-3xl border border-zinc-200/80 bg-white/70 p-6 shadow-sm dark:border-zinc-700/60 dark:bg-zinc-900/60"
      >
        <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
          选择可用时间
        </h2>
        <div className="mt-4 overflow-hidden rounded-2xl border border-zinc-200 dark:border-zinc-700">
          <div style={{ width: '100%', height: '650px', overflow: 'scroll' }} id="consultation-cal-inline" />
          <script
            dangerouslySetInnerHTML={{
              __html: `
                (function (C, A, L) {
                  let p = function (a, ar) { a.q.push(ar); };
                  let d = C.document;
                  C.Cal = C.Cal || function () {
                    let cal = C.Cal;
                    let ar = arguments;
                    if (!cal.loaded) {
                      cal.ns = {};
                      cal.q = cal.q || [];
                      d.head.appendChild(d.createElement(\"script\")).src = A;
                      cal.loaded = true;
                    }
                    if (ar[0] === L) {
                      const api = function () { p(api, arguments); };
                      const namespace = ar[1];
                      api.q = api.q || [];
                      if(typeof namespace === \"string\"){
                        cal.ns[namespace] = cal.ns[namespace] || api;
                        p(cal.ns[namespace], ar);
                        p(cal, [\"initNamespace\", namespace]);
                      } else p(cal, ar);
                      return;
                    }
                    p(cal, ar);
                  };
                })(window, \"https://app.cal.com/embed/embed.js\", \"init\");

                Cal(\"init\", \"30min\", {origin:\"https://cal.com\"});

                Cal.ns[\"30min\"](\"inline\", {
                  elementOrSelector:\"#consultation-cal-inline\",
                  config: {\"layout\":\"month_view\"},
                  calLink: \"tony-book-imy4ja/30min\",
                });

                Cal.ns[\"30min\"](\"ui\", {\"hideEventTypeDetails\":false,\"layout\":\"month_view\"});
              `,
            }}
          />
        </div>
      </section>
    </Container>
  )
}
