import { type Metadata } from 'next'
import { notFound } from 'next/navigation'

import { BlogPostPage } from '~/app/(main)/blog/BlogPostPage'
import { kvKeys } from '~/config/kv'
import { env } from '~/env.mjs'
import { url } from '~/lib'
import { redis } from '~/lib/redis'
import { getBlogPost } from '~/sanity/queries'

export const generateMetadata = async ({
  params,
}: {
  params: { slug: string }
}) => {
  const post = await getBlogPost(params.slug)
  if (!post) {
    notFound()
  }

  const { title, description, metaDescription, keywords } = post
  const ogImage = url(`/blog/${post.slug}/opengraph-image`).href

  return {
    title,
    description: metaDescription || description,
    keywords: keywords || undefined,
    openGraph: {
      title,
      description: metaDescription || description,
      images: [{ url: ogImage }],
      type: 'article',
    },
    twitter: {
      images: [{ url: ogImage }],
      title,
      description: metaDescription || description,
      card: 'summary_large_image',
      site: '@Tony11081',
      creator: '@Tony11081',
    },
  } satisfies Metadata
}

export default async function BlogPage({
  params,
  searchParams,
}: {
  params: { slug: string }
  searchParams?: { [key: string]: string | string[] | undefined }
}) {
  const post = await getBlogPost(params.slug)
  if (!post) {
    notFound()
  }

  let views: number
  if (env.VERCEL_ENV === 'production') {
    views = await redis.incr(kvKeys.postViews(post._id))
  } else {
    views = 30578
  }

  let reactions: number[] = []
  try {
    if (env.VERCEL_ENV === 'production') {
      const res = await fetch(url(`/api/reactions?id=${post._id}`), {
        next: {
          tags: [`reactions:${post._id}`],
        },
      })
      const data = await res.json()
      if (Array.isArray(data)) {
        reactions = data
      }
    } else {
      reactions = Array.from({ length: 4 }, () =>
        Math.floor(Math.random() * 50000)
      )
    }
  } catch (error) {
    console.error(error)
  }

  let relatedViews: number[] = []
  if (typeof post.related !== 'undefined' && post.related.length > 0) {
    if (env.VERCEL_ENV === 'development') {
      relatedViews = post.related.map(() => Math.floor(Math.random() * 1000))
    } else {
      const postIdKeys = post.related.map(({ _id }) => kvKeys.postViews(_id))
      relatedViews = await redis.mget<number[]>(...postIdKeys)
    }
  }

  const source =
    typeof searchParams?.from === 'string'
      ? searchParams.from
      : typeof searchParams?.utm_source === 'string'
      ? searchParams.utm_source
      : undefined

  return (
    <BlogPostPage
      post={post}
      views={views}
      relatedViews={relatedViews}
      reactions={reactions.length > 0 ? reactions : undefined}
      source={source}
    />
  )
}

export const revalidate = 60
