import Link from 'next/link'

// 这里可以连接到你的 CMS 或 Sanity 查询来获取实际的精选文章
// 目前使用模拟数据
export function FeaturedPosts() {
  const featuredPosts = [
    {
      id: 'featured-1',
      title: '跨境电商爬虫系统：从数据采集到自动化清单生成',
      slug: 'ecommerce-scraper-automated-listing',
      excerpt: '如何构建一个高效率的电商数据爬虫系统，实现从竞品分析到自动生成优化清单的全流程。',
      coverImage: '/images/blog/featured-ecommerce.jpg',
      category: '跨境电商'
    },
    {
      id: 'featured-2',
      title: 'Google Ads高ROI投放策略：电商实战指南',
      slug: 'google-ads-roi-ecommerce-guide',
      excerpt: '从预算分配到广告创意优化，系统讲解如何提升广告投放效率，降低获客成本。',
      coverImage: '/images/blog/featured-google-ads.jpg',
      category: 'Google Ads'
    },
    {
      id: 'featured-3',
      title: 'AI视觉设计在产品页面的应用与转化率提升',
      slug: 'ai-visual-design-conversion-optimization',
      excerpt: '如何利用Midjourney和DALL-E创建吸引人的产品图片，优化电商页面体验并提高转化。',
      coverImage: '/images/blog/featured-ai-design.jpg',
      category: 'AI视觉设计'
    }
  ]

  return (
    <>
      {featuredPosts.map(post => (
        <article key={post.id} className="group relative flex flex-col overflow-hidden rounded-xl border border-zinc-200 bg-white transition-all hover:shadow-md dark:border-zinc-700 dark:bg-zinc-800/50">
          <div className="relative h-48 overflow-hidden">
            {/* 这里使用占位图，你可以替换为实际的封面图 */}
            <div className="absolute inset-0 bg-gradient-to-br from-zinc-300/20 to-zinc-500/20" />
            <div className="absolute top-2 right-2 z-10">
              <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium bg-zinc-100 text-zinc-800 dark:bg-zinc-800/70 dark:text-zinc-300`}>
                {post.category}
              </span>
            </div>
          </div>
          
          <div className="flex flex-1 flex-col justify-between p-6">
            <div>
              <h3 className="mb-2 text-xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100">
                <Link href={`/blog/${post.slug}`} className="hover:text-zinc-600 dark:hover:text-zinc-400">
                  {post.title}
                </Link>
              </h3>
              <p className="line-clamp-2 text-zinc-600 dark:text-zinc-400">
                {post.excerpt}
              </p>
            </div>
            
            <div className="mt-6">
              <Link 
                href={`/blog/${post.slug}`}
                className="inline-flex items-center text-sm font-medium text-zinc-800 hover:text-zinc-600 dark:text-zinc-300 dark:hover:text-zinc-400"
              >
                阅读全文
                <svg className="ml-1 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </div>
        </article>
      ))}
    </>
  )
} 