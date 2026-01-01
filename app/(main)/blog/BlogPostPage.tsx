'use client'

import { parseDateTime } from '@zolplay/utils'
import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import Balancer from 'react-wrap-balancer'

import { BlogPostStateLoader } from '~/app/(main)/blog/BlogPostStateLoader'
import { BlogReactions } from '~/app/(main)/blog/BlogReactions'
import {
  CalendarIcon,
  CursorClickIcon,
  HourglassIcon,
  PencilSwooshIcon,
  ScriptIcon,
  UTurnLeftIcon,
} from '~/assets'
import { ClientOnly } from '~/components/ClientOnly'
import { PostPortableText } from '~/components/PostPortableText'
import { Prose } from '~/components/Prose'
import { Button } from '~/components/ui/Button'
import { Container } from '~/components/ui/Container'
import { prettifyNumber } from '~/lib/math'
import { type PostDetail } from '~/sanity/schemas/post'

import { BlogPostCTA } from './BlogPostCTA'
import { BlogPostLeadMagnet } from './BlogPostLeadMagnet'
import { BlogPostMobileToc } from './BlogPostMobileToc'
import { BlogPostNextSteps } from './BlogPostNextSteps'
import { BlogPostReadingControls } from './BlogPostReadingControls'
import { BlogPostReadingProgress } from './BlogPostReadingProgress'
import { BlogPostCard } from './BlogPostCard'
import { BlogPostTableOfContents } from './BlogPostTableOfContents'

export function BlogPostPage({
  post,
  views,
  reactions,
  relatedViews,
  source,
}: {
  post: PostDetail
  views?: number
  reactions?: number[]
  relatedViews: number[]
  source?: string
}) {
  const seriesPosts = post.seriesPosts ?? []
  const seriesIndex = seriesPosts.findIndex((item) => item._id === post._id)
  const seriesPosition = seriesIndex >= 0 ? seriesIndex + 1 : 0
  const seriesTotal = seriesPosts.length
  const seriesProgress =
    seriesTotal > 0 ? Math.round((seriesPosition / seriesTotal) * 100) : 0
  const seriesPrev = seriesIndex > 0 ? seriesPosts[seriesIndex - 1] : null
  const seriesNext =
    seriesIndex >= 0 && seriesIndex < seriesTotal - 1
      ? seriesPosts[seriesIndex + 1]
      : null
  const prevPost = seriesPrev ?? post.previous ?? null
  const nextPost = seriesNext ?? post.next ?? null

  return (
    <>
      <BlogPostReadingProgress />
      <Container className="mt-16 lg:mt-32">
        <div className="w-full md:flex md:justify-between xl:relative">
        <aside className="hidden w-[160px] shrink-0 lg:block">
          <div className="sticky top-2 pt-20">
            <BlogPostTableOfContents headings={post.headings} />
          </div>
        </aside>
        <div className="max-w-2xl md:flex-1 md:shrink-0">
          <Button
            href="/blog"
            variant="secondary"
            aria-label="返回博客页面"
            className="group mb-8 flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-md shadow-zinc-800/5 ring-1 ring-zinc-900/5 transition dark:border dark:border-zinc-700/50 dark:bg-zinc-800 dark:ring-0 dark:ring-white/10 dark:hover:border-zinc-700 dark:hover:ring-white/20 lg:absolute lg:-left-5 lg:-mt-2 lg:mb-0 xl:-top-1.5 xl:left-0 xl:mt-0"
          >
            <UTurnLeftIcon className="h-8 w-8 stroke-zinc-500 transition group-hover:stroke-zinc-700 dark:stroke-zinc-500 dark:group-hover:stroke-zinc-400" />
          </Button>
          <article data-postid={post._id}>
            <header className="relative flex flex-col items-center pb-5 after:absolute after:-bottom-1 after:block after:h-px after:w-full after:rounded after:bg-gradient-to-r after:from-zinc-400/20 after:via-zinc-200/10 after:to-transparent dark:after:from-zinc-600/20 dark:after:via-zinc-700/10">
              <motion.div
                className="relative mb-7 aspect-[240/135] w-full md:mb-12 md:w-[120%]"
                initial={{ opacity: 0, scale: 0.96, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{
                  duration: 0.35,
                  type: 'spring',
                  stiffness: 120,
                  damping: 20,
                }}
              >
                <div className="absolute z-0 hidden aspect-[240/135] w-full blur-xl saturate-150 after:absolute after:inset-0 after:hidden after:bg-white/50 dark:after:bg-black/50 md:block md:after:block">
                  <Image
                    src={post.mainImage.asset.url}
                    alt=""
                    className="select-none"
                    unoptimized
                    fill
                    aria-hidden={true}
                  />
                </div>
                <Image
                  src={post.mainImage.asset.url}
                  alt={post.title}
                  className="select-none rounded-2xl ring-1 ring-zinc-900/5 transition dark:ring-0 dark:ring-white/10 dark:hover:border-zinc-700 dark:hover:ring-white/20 md:rounded-3xl"
                  placeholder="blur"
                  blurDataURL={post.mainImage.asset.lqip}
                  unoptimized
                  fill
                />
              </motion.div>
              <motion.div
                className="flex w-full items-center space-x-4 text-sm font-medium text-zinc-600/80 dark:text-zinc-400/80"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.15,
                  type: 'spring',
                  stiffness: 150,
                  damping: 20,
                  delay: 0.1,
                }}
              >
                <time
                  dateTime={post.publishedAt}
                  className="flex items-center space-x-1.5"
                >
                  <CalendarIcon />
                  <span>
                    {parseDateTime({
                      date: new Date(post.publishedAt),
                    })?.format('YYYY/MM/DD')}
                  </span>
                </time>
                <span className="inline-flex items-center space-x-1.5">
                  <ScriptIcon />
                  <span className="flex flex-wrap items-center gap-2">
                    {post.series && (
                      <Link
                        href={`/series/${post.series.slug}`}
                        className="rounded-full border border-zinc-300/50 px-2 py-0.5 text-xs text-zinc-600 transition hover:text-zinc-900 dark:border-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-200"
                      >
                        系列：{post.series.title}
                      </Link>
                    )}
                    {post.categories?.map((category) => (
                      <Link
                        key={category.title}
                        href={`/blog?category=${encodeURIComponent(
                          category.slug ?? ''
                        )}`}
                        className="rounded-full border border-zinc-300/50 px-2 py-0.5 text-xs text-zinc-600 transition hover:text-zinc-900 dark:border-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-200"
                      >
                        {category.title}
                      </Link>
                    ))}
                  </span>
                </span>
              </motion.div>
              <motion.h1
                className="mt-6 w-full text-4xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100 sm:text-5xl"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.2,
                  type: 'spring',
                  stiffness: 150,
                  damping: 30,
                  delay: 0.2,
                }}
              >
                <Balancer>{post.title}</Balancer>
              </motion.h1>
              <motion.p
                className="my-5 w-full text-sm font-medium text-zinc-500"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.2,
                  type: 'spring',
                  stiffness: 150,
                  damping: 20,
                  delay: 0.23,
                }}
              >
                {post.description}
              </motion.p>
              <motion.div
                className="flex w-full items-center space-x-4 text-sm font-medium text-zinc-700/50 dark:text-zinc-300/50"
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.15,
                  type: 'spring',
                  stiffness: 150,
                  damping: 20,
                  delay: 0.255,
                }}
              >
                <span
                  className="inline-flex items-center space-x-1.5"
                  title={views?.toString()}
                >
                  <CursorClickIcon />
                  <span>{prettifyNumber(views ?? 0, true)}次点击</span>
                </span>

                <span className="inline-flex items-center space-x-1.5">
                  <HourglassIcon />
                  <span>{post.readingTime.toFixed(0)}分钟阅读</span>
                </span>
              </motion.div>
            </header>

            {post.series && seriesTotal > 0 && (
              <div className="mt-6 rounded-2xl border border-zinc-200/80 bg-white/70 p-4 shadow-sm dark:border-zinc-700/60 dark:bg-zinc-900/60">
                <div className="flex items-center justify-between text-xs text-zinc-500 dark:text-zinc-400">
                  <Link href={`/series/${post.series.slug}`}>
                    系列进度
                  </Link>
                  <span>
                    {seriesPosition}/{seriesTotal}
                  </span>
                </div>
                <div className="mt-2 h-1 overflow-hidden rounded-full bg-zinc-100 dark:bg-zinc-800">
                  <div
                    className="h-full rounded-full bg-zinc-900 dark:bg-zinc-200"
                    style={{ width: `${seriesProgress}%` }}
                  />
                </div>
              </div>
            )}

            <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-400">
                阅读设置
              </span>
              <BlogPostReadingControls />
            </div>
            <Prose className="mt-8">
              <PostPortableText value={post.body} />
            </Prose>
          </article>

          <BlogPostCTA />
          <BlogPostLeadMagnet />

          <BlogPostNextSteps post={post} source={source} />

          {(prevPost || nextPost) && (
            <section className="mt-12 grid grid-cols-1 gap-4 md:grid-cols-2">
              {prevPost && (
                <Link
                  href={`/blog/${prevPost.slug}`}
                  className="flex flex-col gap-2 rounded-2xl border border-zinc-200/80 bg-white/70 p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md dark:border-zinc-700/60 dark:bg-zinc-900/60"
                >
                  <span className="text-xs uppercase tracking-[0.2em] text-zinc-400">
                    {seriesPrev ? '系列上一篇' : '上一篇'}
                  </span>
                  <span className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
                    {prevPost.title}
                  </span>
                </Link>
              )}
              {nextPost && (
                <Link
                  href={`/blog/${nextPost.slug}`}
                  className="flex flex-col gap-2 rounded-2xl border border-zinc-200/80 bg-white/70 p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md dark:border-zinc-700/60 dark:bg-zinc-900/60"
                >
                  <span className="text-xs uppercase tracking-[0.2em] text-zinc-400">
                    {seriesNext ? '系列下一篇' : '下一篇'}
                  </span>
                  <span className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
                    {nextPost.title}
                  </span>
                </Link>
              )}
            </section>
          )}
        </div>
        <aside className="hidden w-[90px] shrink-0 lg:block">
          <div className="sticky top-2 flex justify-end pt-20">
            <BlogReactions
              _id={post._id}
              mood={post.mood}
              reactions={reactions}
            />
          </div>
        </aside>
      </div>

      {post.related && post.related.length > 0 ? (
        <section className="mb-12 mt-32">
          <h2 className="mb-6 flex items-center justify-center text-lg font-bold text-zinc-900 dark:text-zinc-100">
            <PencilSwooshIcon className="h-5 w-5 flex-none" />
            <span className="ml-2">相关文章</span>
          </h2>

          <div className="mt-6 grid grid-cols-1 justify-center gap-6 md:grid-cols-[repeat(auto-fit,75%)] lg:grid-cols-[repeat(auto-fit,45%)] lg:gap-8">
            {post.related.map((post, idx) => (
              <BlogPostCard
                post={post}
                views={relatedViews[idx] ?? 0}
                key={post._id}
              />
            ))}
          </div>
        </section>
      ) : null}

      <ClientOnly>
        <BlogPostStateLoader post={post} />
      </ClientOnly>
    </Container>
    <BlogPostMobileToc headings={post.headings} />
    </>
  )
}
