import Balancer from 'react-wrap-balancer'

import { RichLink } from '~/components/links/RichLink'
import { Container } from '~/components/ui/Container'

const title = '一对一咨询'
const description =
  'Tony 提供一对一的专业咨询服务。我在电商开发、AI视觉设计、自动化专家领域有丰富经验，专注于跨境电商与AI定制化视觉产品，可以为你解答相关的问题并提供实用建议。'

export const metadata = {
  title,
  description,
  openGraph: {
    title,
    description,
  },
  twitter: {
    title,
    description,
    card: 'summary_large_image',
  },
}

export default function AskMeAnythingPage() {
  return (
    <Container className="mt-16 sm:mt-24">
      <header className="max-w-2xl flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-4xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100 sm:text-5xl">
            一对一咨询
            <span className="block text-lg font-normal mt-2 text-zinc-600 dark:text-zinc-400">Ask Me Anything</span>
          </h1>
          <p className="mt-2 text-lg font-medium text-zinc-700 dark:text-zinc-300">
            技术 · 产品 · 商业 · AI，一次解决
          </p>
          <p className="my-4 text-base text-zinc-600 dark:text-zinc-400">
            <Balancer>{description}</Balancer>
          </p>
        </div>
        <a 
          href="#calendly-embed" 
          className="mt-4 sm:mt-0 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg shadow-md hover:shadow-lg transition-all inline-flex items-center justify-center"
        >
          立即预约
        </a>
      </header>

      <article className="prose dark:prose-invert">
        <h2>咨询内容</h2>
        <p>我可以为你解答以下相关的问题：</p>

        <div className="not-prose mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <div className="group relative overflow-hidden rounded-xl border border-zinc-200 bg-white p-6 shadow-sm transition-all hover:shadow-md dark:border-zinc-700 dark:bg-zinc-800/50 hover:scale-[1.02]">
            <div className="mb-3 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
              </svg>
            </div>
            <h3 className="mb-2 text-xl font-bold">电商开发</h3>
            <p className="text-sm text-zinc-600 dark:text-zinc-400">跨境电商技术选型、自动化爬虫、表格清单平台构建、系统架构设计等问题</p>
            <a href="#calendly-embed" className="mt-4 inline-flex items-center text-sm font-medium text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300">
              预约此项
              <svg className="ml-1 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </a>
          </div>

          <div className="group relative overflow-hidden rounded-xl border border-zinc-200 bg-white p-6 shadow-sm transition-all hover:shadow-md dark:border-zinc-700 dark:bg-zinc-800/50 hover:scale-[1.02]">
            <div className="mb-3 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-indigo-100 text-indigo-600 dark:bg-indigo-900/30 dark:text-indigo-400">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 className="mb-2 text-xl font-bold">AI 视觉设计</h3>
            <p className="text-sm text-zinc-600 dark:text-zinc-400">AI 定制化视觉产品、设计系统构建、品牌视觉优化、用户体验提升等方面的建议</p>
            <a href="#calendly-embed" className="mt-4 inline-flex items-center text-sm font-medium text-indigo-600 hover:text-indigo-700 dark:text-indigo-400 dark:hover:text-indigo-300">
              预约此项
              <svg className="ml-1 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </a>
          </div>

          <div className="group relative overflow-hidden rounded-xl border border-zinc-200 bg-white p-6 shadow-sm transition-all hover:shadow-md dark:border-zinc-700 dark:bg-zinc-800/50 hover:scale-[1.02]">
            <div className="mb-3 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <h3 className="mb-2 text-xl font-bold">自动化专家</h3>
            <p className="text-sm text-zinc-600 dark:text-zinc-400">流程自动化、效率提升、工作流优化、工具选型与集成，让业务运转更加高效</p>
            <a href="#calendly-embed" className="mt-4 inline-flex items-center text-sm font-medium text-green-600 hover:text-green-700 dark:text-green-400 dark:hover:text-green-300">
              预约此项
              <svg className="ml-1 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </a>
          </div>

          <div className="group relative overflow-hidden rounded-xl border border-zinc-200 bg-white p-6 shadow-sm transition-all hover:shadow-md dark:border-zinc-700 dark:bg-zinc-800/50 hover:scale-[1.02]">
            <div className="mb-3 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-amber-100 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 className="mb-2 text-xl font-bold">Google Ads 运营</h3>
            <p className="text-sm text-zinc-600 dark:text-zinc-400">广告投放策略、效果优化、转化提升、预算分配、跨境营销等实操建议</p>
            <a href="#calendly-embed" className="mt-4 inline-flex items-center text-sm font-medium text-amber-600 hover:text-amber-700 dark:text-amber-400 dark:hover:text-amber-300">
              预约此项
              <svg className="ml-1 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </a>
          </div>

          <div className="group relative overflow-hidden rounded-xl border border-zinc-200 bg-white p-6 shadow-sm transition-all hover:shadow-md dark:border-zinc-700 dark:bg-zinc-800/50 hover:scale-[1.02]">
            <div className="mb-3 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
              </svg>
            </div>
            <h3 className="mb-2 text-xl font-bold">跨境电商</h3>
            <p className="text-sm text-zinc-600 dark:text-zinc-400">跨境平台选择、市场分析、产品定位、运营策略、物流与供应链优化等问题</p>
            <a href="#calendly-embed" className="mt-4 inline-flex items-center text-sm font-medium text-purple-600 hover:text-purple-700 dark:text-purple-400 dark:hover:text-purple-300">
              预约此项
              <svg className="ml-1 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </a>
          </div>

          <div className="group relative overflow-hidden rounded-xl border border-zinc-200 bg-white p-6 shadow-sm transition-all hover:shadow-md dark:border-zinc-700 dark:bg-zinc-800/50 hover:scale-[1.02]">
            <div className="mb-3 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-rose-100 text-rose-600 dark:bg-rose-900/30 dark:text-rose-400">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
              </svg>
            </div>
            <h3 className="mb-2 text-xl font-bold">其他咨询</h3>
            <p className="text-sm text-zinc-600 dark:text-zinc-400">创业建议、团队管理、产品战略、职业规划、技术选型等其他专业问题</p>
            <a href="#calendly-embed" className="mt-4 inline-flex items-center text-sm font-medium text-rose-600 hover:text-rose-700 dark:text-rose-400 dark:hover:text-rose-300">
              预约此项
              <svg className="ml-1 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </a>
          </div>
        </div>

        <h2>定价</h2>
        <p>我的一对一咨询的价格为：</p>

        <div className="not-prose mt-6 mb-6">
          <div className="overflow-hidden rounded-xl border border-zinc-200 shadow-sm dark:border-zinc-700">
            <table className="w-full">
              <thead>
                <tr>
                  <th className="w-1/2 border-b border-r border-zinc-200 bg-zinc-50 px-6 py-4 text-left font-medium text-zinc-800 dark:border-zinc-700 dark:bg-zinc-800/50 dark:text-zinc-200">
                    30 分钟
                  </th>
                  <th className="relative w-1/2 border-b border-zinc-200 bg-zinc-50 px-6 py-4 text-left font-medium text-zinc-800 dark:border-zinc-700 dark:bg-zinc-800/50 dark:text-zinc-200">
                    <span className="absolute -top-px right-4 rounded-md bg-blue-600 px-2 py-0.5 text-xs font-medium text-white">推荐套餐</span>
                    60 分钟
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border-r border-zinc-200 px-6 py-5 text-lg font-medium text-zinc-900 dark:border-zinc-700 dark:text-zinc-100">
                    <span className="font-bold text-2xl">¥150</span>
                    <p className="mt-1 text-sm font-normal text-zinc-500">适合快速问题解答</p>
                  </td>
                  <td className="px-6 py-5 text-lg font-medium text-zinc-900 dark:text-zinc-100">
                    <span className="font-bold text-2xl">¥300</span>
                    <p className="mt-1 text-sm font-normal text-zinc-500">适合深入问题探讨</p>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="mt-4 text-sm text-zinc-500 dark:text-zinc-400">
            <a href="#faq" className="inline-flex items-center text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300">
              查看更多常见问题 →
            </a>
          </p>
        </div>

        <p className="flex justify-center md:block md:justify-start">
          <span className="inline-flex flex-col items-center">
            <img 
              src="/qr-alipay.png" 
              alt="支付宝付款码" 
              className="w-44 dark:brightness-90" 
            />
            <span className="mt-1 text-sm font-medium">支付宝二维码</span>
          </span>
        </p>
        <p>
          一旦你完成支付，通过{' '}
          <RichLink
            href="https://cal.com/calicastle/ask-me-anything"
            target="_blank"
          >
            这个链接
          </RichLink>
          来跟我预约一个合适你的时间。
        </p>

        <h2>预约流程</h2>
        <div className="not-prose mb-6">
          <ol className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <li className="flex flex-col rounded-xl border border-zinc-200 bg-white p-5 shadow-sm dark:border-zinc-700 dark:bg-zinc-800/50">
              <div className="mb-2 flex h-8 w-8 items-center justify-center rounded-full bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400">1</div>
              <h3 className="mb-1 text-lg font-medium">选择咨询主题</h3>
              <p className="text-sm text-zinc-600 dark:text-zinc-400">从上方卡片中选择你需要的咨询主题</p>
            </li>
            <li className="flex flex-col rounded-xl border border-zinc-200 bg-white p-5 shadow-sm dark:border-zinc-700 dark:bg-zinc-800/50">
              <div className="mb-2 flex h-8 w-8 items-center justify-center rounded-full bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400">2</div>
              <h3 className="mb-1 text-lg font-medium">完成支付</h3>
              <p className="text-sm text-zinc-600 dark:text-zinc-400">扫码完成支付，保留支付凭证</p>
            </li>
            <li className="flex flex-col rounded-xl border border-zinc-200 bg-white p-5 shadow-sm dark:border-zinc-700 dark:bg-zinc-800/50">
              <div className="mb-2 flex h-8 w-8 items-center justify-center rounded-full bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400">3</div>
              <h3 className="mb-1 text-lg font-medium">选择时间</h3>
              <p className="text-sm text-zinc-600 dark:text-zinc-400">在下方日历中选择合适的咨询时间</p>
            </li>
          </ol>
        </div>

        {/* 嵌入日历组件 */}
        <div id="calendly-embed" className="not-prose mt-8 mb-8 rounded-xl border border-zinc-200 overflow-hidden dark:border-zinc-700">
          <iframe
            src="https://cal.com/tonybook/consultation"
            width="100%"
            height="650"
            frameBorder="0"
            title="选择咨询时间"
            className="w-full"
          ></iframe>
        </div>

        <h2>用户评价</h2>
        <div className="not-prose mb-6">
          <div className="grid gap-6 sm:grid-cols-2">
            <blockquote className="rounded-xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-700 dark:bg-zinc-800/50">
              <p className="mb-4 text-zinc-700 dark:text-zinc-300">
                &ldquo;Tony的咨询让我对跨境电商有了全新认识，他的自动化方案帮我节省了大量时间，提高了运营效率。&rdquo;
              </p>
              <footer className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-zinc-100 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300">
                  <span className="text-lg font-medium">L</span>
                </div>
                <div>
                  <cite className="not-italic font-medium text-zinc-800 dark:text-zinc-200">李先生</cite>
                  <div className="text-sm text-zinc-500">跨境电商卖家</div>
                </div>
              </footer>
            </blockquote>
            
            <blockquote className="rounded-xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-700 dark:bg-zinc-800/50">
              <p className="mb-4 text-zinc-700 dark:text-zinc-300">
                &ldquo;Tony的AI视觉设计经验非常丰富，他给我的建议简单实用，直接帮我解决了困扰已久的产品呈现问题。&rdquo;
              </p>
              <footer className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-zinc-100 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300">
                  <span className="text-lg font-medium">W</span>
                </div>
                <div>
                  <cite className="not-italic font-medium text-zinc-800 dark:text-zinc-200">王女士</cite>
                  <div className="text-sm text-zinc-500">设计总监</div>
                </div>
              </footer>
            </blockquote>
          </div>
          
          <div className="mt-6 flex justify-center gap-4 sm:gap-6">
            <div className="flex items-center gap-2 rounded-lg border border-zinc-200 bg-white px-4 py-2 shadow-sm dark:border-zinc-700 dark:bg-zinc-800/50">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              <span className="text-sm font-medium">已服务 50+ 位客户</span>
            </div>
            <div className="flex items-center gap-2 rounded-lg border border-zinc-200 bg-white px-4 py-2 shadow-sm dark:border-zinc-700 dark:bg-zinc-800/50">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
              </svg>
              <span className="text-sm font-medium">98% 满意度</span>
            </div>
          </div>
        </div>

        <h2 id="faq" className="scroll-mt-16">常见问题</h2>
        <div className="not-prose space-y-4">
          <div className="rounded-xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-700 dark:bg-zinc-800/50">
            <h3 className="mb-2 text-lg font-medium text-zinc-900 dark:text-zinc-100">咨询时间能否延长？</h3>
            <p className="text-zinc-700 dark:text-zinc-300">
              可以的。如果在咨询过程中需要延长时间，可以按照每30分钟150元的价格补差价。
            </p>
          </div>
          
          <div className="rounded-xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-700 dark:bg-zinc-800/50">
            <h3 className="mb-2 text-lg font-medium text-zinc-900 dark:text-zinc-100">如何取消或改期？</h3>
            <p className="text-zinc-700 dark:text-zinc-300">
              如需取消或改期，请至少提前24小时通过预约系统操作。24小时内取消将收取50%的费用作为补偿。
            </p>
          </div>
          
          <div className="rounded-xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-700 dark:bg-zinc-800/50">
            <h3 className="mb-2 text-lg font-medium text-zinc-900 dark:text-zinc-100">咨询会议如何进行？</h3>
            <p className="text-zinc-700 dark:text-zinc-300">
              咨询会通过Zoom或腾讯会议进行，预约成功后您将收到会议链接。请确保您有稳定的网络连接和适合的设备。
            </p>
          </div>
          
          <div className="rounded-xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-700 dark:bg-zinc-800/50">
            <h3 className="mb-2 text-lg font-medium text-zinc-900 dark:text-zinc-100">可以获得咨询记录吗？</h3>
            <p className="text-zinc-700 dark:text-zinc-300">
              是的，咨询结束后，我会将咨询要点和建议整理成文档发送给您，方便您日后参考和执行。
            </p>
          </div>
        </div>
      </article>

      {/* 添加结构化数据 */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Service',
            name: '一对一咨询',
            description: description,
            provider: {
              '@type': 'Person',
              name: 'Tony',
              url: 'https://tonybook.com'
            },
            offers: [
              {
                '@type': 'Offer',
                price: '150',
                priceCurrency: 'CNY',
                description: '30分钟咨询'
              },
              {
                '@type': 'Offer',
                price: '300',
                priceCurrency: 'CNY',
                description: '60分钟咨询'
              }
            ],
            serviceType: '电商开发与AI视觉设计咨询'
          })
        }}
      />
    </Container>
  )
}
