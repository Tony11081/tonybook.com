export const seo = {
  title: 'Tony | 电商开发者、AI 视觉设计师、自动化专家、Tonybook 创始人',
  description:
    '我是Tony，Tonybook 创始人兼 CEO，专注跨境电商与 AI 定制化视觉产品。带领团队构建自动化爬虫表格清单平台，运营 Google Ads 收入，推动从技术到运营的全流程高效化。',
  url: new URL(
    process.env.NODE_ENV === 'production'
      ? 'https://tonybook.com'
      : 'http://localhost:3000'
  ),
} as const
