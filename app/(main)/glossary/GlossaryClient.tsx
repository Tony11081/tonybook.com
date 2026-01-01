'use client'

import React from 'react'

const glossaryItems = [
  {
    term: 'LTV',
    category: '增长',
    definition: '用户生命周期价值，用于衡量长期收益。',
  },
  {
    term: 'CAC',
    category: '增长',
    definition: '获客成本，评估每个新客户的成本。',
  },
  {
    term: '转化率',
    category: '转化',
    definition: '从访问到成交的比例。',
  },
  {
    term: '自动化工作流',
    category: '自动化',
    definition: '通过工具与脚本连接任务，减少重复劳动。',
  },
  {
    term: '视觉一致性',
    category: 'AI 视觉',
    definition: '品牌视觉在不同场景下的统一表现。',
  },
  {
    term: '数据归因',
    category: '分析',
    definition: '识别转化来源，衡量渠道贡献。',
  },
]

const categories = ['全部', '增长', '转化', '自动化', 'AI 视觉', '分析'] as const

export function GlossaryClient() {
  const [query, setQuery] = React.useState('')
  const [category, setCategory] = React.useState<(typeof categories)[number]>(
    '全部'
  )

  const items = glossaryItems.filter((item) => {
    const matchCategory = category === '全部' || item.category === category
    const matchQuery =
      item.term.toLowerCase().includes(query.toLowerCase()) ||
      item.definition.toLowerCase().includes(query.toLowerCase())
    return matchCategory && matchQuery
  })

  return (
    <div className="mt-10 space-y-6">
      <div className="rounded-2xl border border-zinc-200/80 bg-white/70 p-6 shadow-sm dark:border-zinc-700/60 dark:bg-zinc-900/60">
        <input
          type="search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="搜索术语或概念..."
          className="w-full rounded-xl border border-zinc-300 bg-white px-4 py-3 text-sm text-zinc-800 shadow-sm outline-none transition focus:border-zinc-500 focus:ring-2 focus:ring-zinc-300 dark:border-zinc-700 dark:bg-zinc-900/80 dark:text-zinc-200 dark:focus:border-zinc-500 dark:focus:ring-zinc-700"
        />
        <div className="mt-4 flex flex-wrap items-center gap-2 text-sm">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500 dark:text-zinc-400">
            分类
          </span>
          {categories.map((item) => (
            <button
              key={item}
              type="button"
              className={`rounded-full border px-3 py-1 text-xs font-medium transition ${
                category === item
                  ? 'border-zinc-900 bg-zinc-900 text-white dark:border-zinc-200 dark:bg-zinc-200 dark:text-zinc-900'
                  : 'border-zinc-200 text-zinc-500 hover:text-zinc-800 dark:border-zinc-700 dark:text-zinc-400'
              }`}
              onClick={() => setCategory(item)}
            >
              {item}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {items.map((item) => (
          <div
            key={item.term}
            className="rounded-2xl border border-zinc-200/80 bg-white/70 p-5 shadow-sm dark:border-zinc-700/60 dark:bg-zinc-900/60"
          >
            <div className="text-xs text-zinc-500 dark:text-zinc-400">
              {item.category}
            </div>
            <h3 className="mt-2 text-lg font-semibold text-zinc-900 dark:text-zinc-100">
              {item.term}
            </h3>
            <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
              {item.definition}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}
