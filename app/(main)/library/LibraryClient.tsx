'use client'

import React from 'react'

const libraryItems = [
  {
    id: 'book-1',
    title: '增长黑客',
    type: '书籍',
    rating: 4,
    link: '#',
    note: '适合建立增长思维框架。',
  },
  {
    id: 'book-2',
    title: '事实',
    type: '书籍',
    rating: 5,
    link: '#',
    note: '用数据校准判断。',
  },
  {
    id: 'course-1',
    title: 'Google Ads 实战课',
    type: '课程',
    rating: 5,
    link: '#',
    note: '从投放到归因的闭环。'
  },
  {
    id: 'course-2',
    title: 'AI 视觉设计速成',
    type: '课程',
    rating: 4,
    link: '#',
    note: '快速建立视觉策略与产能。'
  },
  {
    id: 'tool-1',
    title: 'Figma',
    type: '工具',
    rating: 5,
    link: 'https://www.figma.com',
    note: '视觉与协作的核心。'
  },
  {
    id: 'tool-2',
    title: 'Notion',
    type: '工具',
    rating: 4,
    link: 'https://www.notion.so',
    note: '知识与项目管理。'
  },
]

const typeOptions = ['全部', '书籍', '课程', '工具'] as const
const ratingOptions = [
  { label: '全部', value: 0 },
  { label: '4★+', value: 4 },
  { label: '5★', value: 5 },
]

export function LibraryClient() {
  const [typeFilter, setTypeFilter] =
    React.useState<(typeof typeOptions)[number]>('全部')
  const [minRating, setMinRating] = React.useState(0)
  const [search, setSearch] = React.useState('')

  const items = libraryItems.filter((item) => {
    const matchType = typeFilter === '全部' || item.type === typeFilter
    const matchRating = item.rating >= minRating
    const matchSearch =
      item.title.includes(search) || item.note.includes(search)
    return matchType && matchRating && matchSearch
  })

  return (
    <div className="mt-10 space-y-8">
      <div className="flex flex-col gap-4 rounded-2xl border border-zinc-200/80 bg-white/70 p-6 shadow-sm dark:border-zinc-700/60 dark:bg-zinc-900/60">
        <input
          type="search"
          placeholder="搜索书籍、课程或工具..."
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          className="w-full rounded-xl border border-zinc-300 bg-white px-4 py-3 text-sm text-zinc-800 shadow-sm outline-none transition focus:border-zinc-500 focus:ring-2 focus:ring-zinc-300 dark:border-zinc-700 dark:bg-zinc-900/80 dark:text-zinc-200 dark:focus:border-zinc-500 dark:focus:ring-zinc-700"
        />
        <div className="flex flex-wrap items-center gap-2 text-sm">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500 dark:text-zinc-400">
            类型
          </span>
          {typeOptions.map((option) => (
            <button
              key={option}
              type="button"
              className={`rounded-full border px-3 py-1 text-xs font-medium transition ${
                typeFilter === option
                  ? 'border-zinc-900 bg-zinc-900 text-white dark:border-zinc-200 dark:bg-zinc-200 dark:text-zinc-900'
                  : 'border-zinc-200 text-zinc-500 hover:text-zinc-800 dark:border-zinc-700 dark:text-zinc-400'
              }`}
              onClick={() => setTypeFilter(option)}
            >
              {option}
            </button>
          ))}
        </div>
        <div className="flex flex-wrap items-center gap-2 text-sm">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500 dark:text-zinc-400">
            评分
          </span>
          {ratingOptions.map((option) => (
            <button
              key={option.label}
              type="button"
              className={`rounded-full border px-3 py-1 text-xs font-medium transition ${
                minRating === option.value
                  ? 'border-zinc-900 bg-zinc-900 text-white dark:border-zinc-200 dark:bg-zinc-200 dark:text-zinc-900'
                  : 'border-zinc-200 text-zinc-500 hover:text-zinc-800 dark:border-zinc-700 dark:text-zinc-400'
              }`}
              onClick={() => setMinRating(option.value)}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {items.map((item) => (
          <a
            key={item.id}
            href={item.link}
            className="rounded-2xl border border-zinc-200/80 bg-white/70 p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md dark:border-zinc-700/60 dark:bg-zinc-900/60"
          >
            <div className="text-xs text-zinc-500 dark:text-zinc-400">
              {item.type} · {item.rating}★
            </div>
            <h3 className="mt-2 text-lg font-semibold text-zinc-900 dark:text-zinc-100">
              {item.title}
            </h3>
            <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
              {item.note}
            </p>
          </a>
        ))}
      </div>
    </div>
  )
}
