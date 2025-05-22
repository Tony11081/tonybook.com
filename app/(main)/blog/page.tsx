import Balancer from 'react-wrap-balancer'

import { SocialLink } from '~/components/links/SocialLink'
import { Container } from '~/components/ui/Container'

import { BlogPosts } from './BlogPosts'
import { FeaturedPosts } from './FeaturedPosts'

const description =
  '专注跨境电商开发、AI视觉设计与自动化工具的技术分享。从Google Ads优化到爬虫表格清单平台构建，全方位提升电商运营效率与转化率。'
export const metadata = {
  title: '技术博客',
  description,
  openGraph: {
    title: '跨境电商技术 · AI视觉设计 · 自动化专家',
    description,
  },
  twitter: {
    title: '跨境电商技术 · AI视觉设计 · 自动化专家',
    description,
    card: 'summary_large_image',
  },
}

// TODO: add pagination or infinite scroll
export default function BlogPage() {
  return (
    <Container className="mt-16 sm:mt-24">
      {/* 添加客户端脚本 */}
      <script src="/js/blog-scripts.js" async></script>
      
      <header className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100 sm:text-5xl text-center">
          跨境电商技术 · AI视觉设计 · 自动化专家
        </h1>
        <p className="mt-4 text-xl text-center text-zinc-600 dark:text-zinc-400 font-medium">
          <Balancer>系统化方法与实战经验，助你打造高效电商体系与AI视觉应用</Balancer>
        </p>
        
        {/* 搜索框 */}
        <div className="mt-8 max-w-xl mx-auto">
          <div className="relative">
            <input 
              type="search" 
              placeholder="搜索文章..." 
              className="w-full px-4 py-3 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800/90 focus:outline-none focus:ring-2 focus:ring-zinc-500 dark:text-zinc-200"
            />
            <button className="absolute right-3 top-3 text-zinc-500 dark:text-zinc-400">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
          </div>
        </div>
        
        {/* 分类标签 */}
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <a href="/blog?cat=ecommerce" className="px-4 py-2 rounded-full bg-zinc-100 text-zinc-800 dark:bg-zinc-800/70 dark:text-zinc-300 font-medium text-sm hover:bg-zinc-200 dark:hover:bg-zinc-700/50 transition-colors">跨境电商</a>
          <a href="/blog?cat=ai" className="px-4 py-2 rounded-full bg-zinc-100 text-zinc-800 dark:bg-zinc-800/70 dark:text-zinc-300 font-medium text-sm hover:bg-zinc-200 dark:hover:bg-zinc-700/50 transition-colors">AI视觉设计</a>
          <a href="/blog?cat=automation" className="px-4 py-2 rounded-full bg-zinc-100 text-zinc-800 dark:bg-zinc-800/70 dark:text-zinc-300 font-medium text-sm hover:bg-zinc-200 dark:hover:bg-zinc-700/50 transition-colors">自动化工具</a>
          <a href="/blog?cat=google-ads" className="px-4 py-2 rounded-full bg-zinc-100 text-zinc-800 dark:bg-zinc-800/70 dark:text-zinc-300 font-medium text-sm hover:bg-zinc-200 dark:hover:bg-zinc-700/50 transition-colors">Google Ads</a>
          <a href="/blog?cat=data" className="px-4 py-2 rounded-full bg-zinc-100 text-zinc-800 dark:bg-zinc-800/70 dark:text-zinc-300 font-medium text-sm hover:bg-zinc-200 dark:hover:bg-zinc-700/50 transition-colors">数据分析</a>
          <a href="/blog?cat=startup" className="px-4 py-2 rounded-full bg-zinc-100 text-zinc-800 dark:bg-zinc-800/70 dark:text-zinc-300 font-medium text-sm hover:bg-zinc-200 dark:hover:bg-zinc-700/50 transition-colors">运营策略</a>
        </div>
        
        <div className="mt-8 flex items-center justify-center gap-4">
          <SocialLink href="/feed.xml" platform="rss" aria-label="RSS订阅" />
          <span className="text-zinc-500 dark:text-zinc-400">订阅更新</span>
        </div>
      </header>
      
      {/* 精选文章区域 */}
      <section className="mt-12 sm:mt-16">
        <h2 className="text-2xl font-bold text-zinc-800 dark:text-zinc-100 mb-6">精选文章</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <FeaturedPosts />
        </div>
      </section>
      
      <div className="relative">
        {/* 阅读进度条 - 通过JS实现 */}
        <div id="reading-progress" className="fixed top-0 left-0 h-1 bg-zinc-800 z-50" style={{ width: '0%' }}></div>
        
        <h2 className="text-2xl font-bold text-zinc-800 dark:text-zinc-100 mb-6">最新文章</h2>
        <div className="mt-8 grid grid-cols-1 gap-8 sm:mt-12 lg:grid-cols-2 lg:gap-8">
          <BlogPosts limit={20} />
        </div>
      </div>
      
      {/* 结构化数据 */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Blog",
            "name": "Tonybook技术博客",
            "url": "https://tonybook.com/blog",
            "description": description,
            "author": {
              "@type": "Person",
              "name": "Tony",
              "url": "https://tonybook.com",
              "jobTitle": "跨境电商开发者 & AI视觉设计师"
            },
            "breadcrumb": {
              "@type": "BreadcrumbList",
              "itemListElement": [
                {
                  "@type": "ListItem",
                  "position": 1,
                  "name": "首页",
                  "item": "https://tonybook.com"
                },
                {
                  "@type": "ListItem",
                  "position": 2,
                  "name": "技术博客",
                  "item": "https://tonybook.com/blog"
                }
              ]
            }
          })
        }}
      />
    </Container>
  )
}

export const revalidate = 60
