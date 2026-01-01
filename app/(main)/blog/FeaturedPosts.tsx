import Image from 'next/image'
import Link from 'next/link'

import { getLatestBlogPosts } from '~/sanity/queries'

export async function FeaturedPosts() {
  const posts = (await getLatestBlogPosts({ limit: 3, forDisplay: true })) || []

  return (
    <>
      {posts.map((post) => {
        const category = post.categories?.[0]?.title
        return (
          <article
            key={post._id}
            className="group relative flex flex-col overflow-hidden rounded-xl border border-zinc-200 bg-white transition-all hover:shadow-md dark:border-zinc-700 dark:bg-zinc-800/50"
          >
            <div className="relative h-48 overflow-hidden">
              <Image
                src={post.mainImage.asset.url}
                alt={post.title}
                fill
                className="object-cover"
                placeholder="blur"
                blurDataURL={post.mainImage.asset.lqip}
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw"
              />
              {category && (
                <div className="absolute right-2 top-2 z-10">
                  <span className="inline-flex items-center rounded-full bg-zinc-100 px-2.5 py-0.5 text-xs font-medium text-zinc-800 dark:bg-zinc-800/70 dark:text-zinc-300">
                    {category}
                  </span>
                </div>
              )}
            </div>

            <div className="flex flex-1 flex-col justify-between p-6">
              <div>
                <h3 className="mb-2 text-xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100">
                  <Link
                    href={`/blog/${post.slug}`}
                    className="hover:text-zinc-600 dark:hover:text-zinc-400"
                  >
                    {post.title}
                  </Link>
                </h3>
                <p className="line-clamp-2 text-zinc-600 dark:text-zinc-400">
                  {post.description}
                </p>
              </div>

              <div className="mt-6">
                <Link
                  href={`/blog/${post.slug}`}
                  className="inline-flex items-center text-sm font-medium text-zinc-800 hover:text-zinc-600 dark:text-zinc-300 dark:hover:text-zinc-400"
                >
                  阅读全文
                  <svg
                    className="ml-1 h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </Link>
              </div>
            </div>
          </article>
        )
      })}
    </>
  )
}

