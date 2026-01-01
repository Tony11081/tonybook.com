'use client'

import { parseDateTime } from '@zolplay/utils'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

import {
  CalendarIcon,
  CursorClickIcon,
  HourglassIcon,
  ScriptIcon,
} from '~/assets'
import { prettifyNumber } from '~/lib/math'
import { type Post } from '~/sanity/schemas/post'

function escapeRegExp(value: string) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}

function highlightText(text: string, highlight?: string) {
  if (!highlight) {
    return text
  }

  const safe = highlight.trim()
  if (!safe) {
    return text
  }

  const regex = new RegExp(`(${escapeRegExp(safe)})`, 'gi')
  return text.split(regex).map((part, index) => {
    if (part.match(regex)) {
      return (
        <mark
          key={`${part}-${index}`}
          className="rounded bg-lime-200/70 px-1 text-zinc-900 dark:bg-lime-300/20 dark:text-lime-100"
        >
          {part}
        </mark>
      )
    }
    return <span key={`${part}-${index}`}>{part}</span>
  })
}

export function BlogPostListItem({
  post,
  views,
  commentCount,
  highlight,
}: {
  post: Post
  views: number
  commentCount: number
  highlight?: string
}) {
  const categories = post.categories ?? []

  return (
    <article className="group relative flex gap-5 rounded-3xl border border-zinc-200/80 bg-white/70 p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md dark:border-zinc-700/60 dark:bg-zinc-900/60">
      <div className="relative hidden aspect-[4/3] w-36 shrink-0 overflow-hidden rounded-2xl md:block">
        <Image
          src={post.mainImage.asset.url}
          alt={post.title}
          fill
          className="object-cover transition duration-300 group-hover:scale-[1.03]"
          placeholder="blur"
          blurDataURL={post.mainImage.asset.lqip}
          sizes="(max-width: 768px) 100vw, 160px"
        />
      </div>

      <div className="flex flex-1 flex-col gap-3">
        <header className="flex flex-col gap-2">
          <Link
            href={`/blog/${post.slug}`}
            className="text-xl font-bold leading-snug text-zinc-900 transition hover:text-zinc-600 dark:text-zinc-100 dark:hover:text-zinc-300"
          >
            {highlightText(post.title, highlight)}
          </Link>
          <p className="line-clamp-2 text-sm text-zinc-600 dark:text-zinc-400">
            {highlightText(post.description, highlight)}
          </p>
        </header>

        <div className="flex flex-wrap items-center gap-3 text-xs text-zinc-500 dark:text-zinc-400">
          <span className="inline-flex items-center gap-1">
            <CalendarIcon />
            {parseDateTime({ date: new Date(post.publishedAt) })?.format(
              'YYYY/MM/DD'
            )}
          </span>
          <span className="inline-flex items-center gap-1">
            <HourglassIcon />
            {post.readingTime.toFixed(0)}分钟阅读
          </span>
          <span className="inline-flex items-center gap-1">
            <CursorClickIcon />
            {prettifyNumber(views, true)}
          </span>
          <span className="inline-flex items-center gap-1">
            <ScriptIcon />
            {commentCount}条评论
          </span>
        </div>

        <footer className="flex flex-wrap gap-2">
          {post.series && (
            <Link
              href={`/series/${post.series.slug}`}
              className="rounded-full border border-zinc-200/70 bg-zinc-50 px-3 py-1 text-xs font-medium text-zinc-600 transition hover:border-zinc-300 hover:text-zinc-800 dark:border-zinc-700 dark:bg-zinc-800/70 dark:text-zinc-300"
            >
              系列：{post.series.title}
            </Link>
          )}
          {categories.map((category) => (
            <Link
              key={category.title}
              href={`/blog?category=${encodeURIComponent(category.slug ?? '')}`}
              className="rounded-full border border-zinc-200/70 bg-white px-3 py-1 text-xs font-medium text-zinc-500 transition hover:border-zinc-300 hover:text-zinc-800 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-400"
            >
              {category.title}
            </Link>
          ))}
        </footer>
      </div>
    </article>
  )
}
