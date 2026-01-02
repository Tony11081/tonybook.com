import Balancer from 'react-wrap-balancer'

import { SocialLink } from '~/components/links/SocialLink'
import { Container } from '~/components/ui/Container'
import { url } from '~/lib'
import { getCategories } from '~/sanity/queries'
import { type Post } from '~/sanity/schemas/post'

import { BlogListClient } from './BlogListClient'
import { FeaturedPosts } from './FeaturedPosts'

const description =
  '聚焦跨境电商、AI视觉设计与自动化工具的实战分享，覆盖增长、效率、产品与系统搭建。'
export const metadata = {
  title: '技术博客',
  description,
  openGraph: {
    title: '跨境电商技术 · AI视觉设计 · 自动化专栏',
    description,
  },
  twitter: {
    title: '跨境电商技术 · AI视觉设计 · 自动化专栏',
    description,
    card: 'summary_large_image',
  },
}

export default async function BlogPage({
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[] | undefined }
}) {
  const search = typeof searchParams?.search === 'string' ? searchParams.search : ''
  const category =
    typeof searchParams?.category === 'string' ? searchParams.category : ''
  const reading = typeof searchParams?.reading === 'string' ? searchParams.reading : ''
  const sort = typeof searchParams?.sort === 'string' ? searchParams.sort : 'latest'

  const params = new URLSearchParams({
    page: '0',
    limit: '10',
  })
  if (search) params.set('search', search)
  if (category) params.set('category', category)
  if (reading) params.set('reading', reading)
  if (sort) params.set('sort', sort)

  const [categories, data] = await Promise.all([
    getCategories(),
    fetch(url(`/api/posts?${params.toString()}`).href, {
      next: { revalidate: 60 },
    }).then(
      async (res) =>
        (await res.json()) as {
          posts: Array<
            Post & {
              views: number
              commentCount: number
            }
          >
          total: number
        }
    ),
  ])

  return (
    <Container className="mt-16 sm:mt-24">
      <header className="mx-auto max-w-3xl text-center">
        <h1 className="text-4xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100 sm:text-5xl">
          跨境电商技术 · AI视觉设计 · 自动化专栏
        </h1>
        <p className="mt-4 text-xl font-medium text-zinc-600 dark:text-zinc-400">
          <Balancer>
            系统化方法与实战经验，帮助你打造高效电商体系与AI视觉应用
          </Balancer>
        </p>

        <div className="mt-8 flex items-center justify-center gap-4">
          <SocialLink href="/feed.xml" platform="rss" aria-label="RSS订阅" />
          <span className="text-zinc-500 dark:text-zinc-400">订阅更新</span>
        </div>
      </header>

      <section className="mt-12 sm:mt-16">
        <h2 className="mb-6 text-2xl font-bold text-zinc-800 dark:text-zinc-100">
          精选文章
        </h2>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          <FeaturedPosts />
        </div>
      </section>

      <section className="mt-12 sm:mt-16">
        <h2 className="mb-6 text-2xl font-bold text-zinc-800 dark:text-zinc-100">
          最新文章
        </h2>
        <BlogListClient
          initialPosts={data.posts}
          total={data.total}
          categories={categories}
          initialQuery={{ search, category, reading, sort }}
        />
      </section>
    </Container>
  )
}

export const revalidate = 60

