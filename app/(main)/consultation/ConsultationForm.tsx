'use client'

import React from 'react'

import { Button } from '~/components/ui/Button'

const topicOptions = [
  '跨境增长',
  'AI 视觉设计',
  '自动化系统',
  '其他',
] as const

const channelOptions = [
  { value: 'cal', label: '日程预约（Cal/Calendly）' },
  { value: 'tencent', label: '腾讯会议' },
  { value: 'unsure', label: '暂未确定' },
] as const

export function ConsultationForm() {
  const [status, setStatus] = React.useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [formData, setFormData] = React.useState({
    name: '',
    email: '',
    topic: topicOptions[0],
    channel: channelOptions[0].value,
    budget: '',
    message: '',
  })

  const onChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (status === 'loading') return
    setStatus('loading')

    const source =
      typeof document !== 'undefined'
        ? document.referrer || window.location.pathname
        : 'direct'

    try {
      const payload = Object.fromEntries(
        Object.entries({ ...formData, source }).filter(([, value]) => {
          return typeof value === 'string' && value.trim() !== ''
        })
      ) as Record<string, string>

      const res = await fetch('/api/consultation', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      if (!res.ok) {
        throw new Error('request failed')
      }

      setStatus('success')
    } catch (error) {
      setStatus('error')
    }
  }

  return (
    <form
      onSubmit={onSubmit}
      className="space-y-4 rounded-3xl border border-zinc-200/80 bg-white/70 p-6 shadow-sm dark:border-zinc-700/60 dark:bg-zinc-900/60"
    >
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div>
          <label className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-400">
            姓名
          </label>
          <input
            name="name"
            value={formData.name}
            onChange={onChange}
            placeholder="如何称呼你"
            className="mt-2 w-full rounded-xl border border-zinc-300 bg-white px-4 py-3 text-sm text-zinc-800 shadow-sm outline-none transition focus:border-zinc-500 focus:ring-2 focus:ring-zinc-300 dark:border-zinc-700 dark:bg-zinc-900/80 dark:text-zinc-200 dark:focus:border-zinc-500 dark:focus:ring-zinc-700"
          />
        </div>
        <div>
          <label className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-400">
            邮箱
          </label>
          <input
            name="email"
            type="email"
            required
            value={formData.email}
            onChange={onChange}
            placeholder="你的联系方式"
            className="mt-2 w-full rounded-xl border border-zinc-300 bg-white px-4 py-3 text-sm text-zinc-800 shadow-sm outline-none transition focus:border-zinc-500 focus:ring-2 focus:ring-zinc-300 dark:border-zinc-700 dark:bg-zinc-900/80 dark:text-zinc-200 dark:focus:border-zinc-500 dark:focus:ring-zinc-700"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div>
          <label className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-400">
            咨询方向
          </label>
          <select
            name="topic"
            value={formData.topic}
            onChange={onChange}
            className="mt-2 w-full rounded-xl border border-zinc-300 bg-white px-4 py-3 text-sm text-zinc-800 shadow-sm outline-none transition focus:border-zinc-500 focus:ring-2 focus:ring-zinc-300 dark:border-zinc-700 dark:bg-zinc-900/80 dark:text-zinc-200 dark:focus:border-zinc-500 dark:focus:ring-zinc-700"
          >
            {topicOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-400">
            预约方式
          </label>
          <select
            name="channel"
            value={formData.channel}
            onChange={onChange}
            className="mt-2 w-full rounded-xl border border-zinc-300 bg-white px-4 py-3 text-sm text-zinc-800 shadow-sm outline-none transition focus:border-zinc-500 focus:ring-2 focus:ring-zinc-300 dark:border-zinc-700 dark:bg-zinc-900/80 dark:text-zinc-200 dark:focus:border-zinc-500 dark:focus:ring-zinc-700"
          >
            {channelOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-400">
          预算范围
        </label>
        <input
          name="budget"
          value={formData.budget}
          onChange={onChange}
          placeholder="例如：¥1,000-¥3,000"
          className="mt-2 w-full rounded-xl border border-zinc-300 bg-white px-4 py-3 text-sm text-zinc-800 shadow-sm outline-none transition focus:border-zinc-500 focus:ring-2 focus:ring-zinc-300 dark:border-zinc-700 dark:bg-zinc-900/80 dark:text-zinc-200 dark:focus:border-zinc-500 dark:focus:ring-zinc-700"
        />
      </div>

      <div>
        <label className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-400">
          需求描述
        </label>
        <textarea
          name="message"
          value={formData.message}
          onChange={onChange}
          placeholder="简单描述你的目标、现状与希望解决的问题"
          rows={4}
          className="mt-2 w-full rounded-xl border border-zinc-300 bg-white px-4 py-3 text-sm text-zinc-800 shadow-sm outline-none transition focus:border-zinc-500 focus:ring-2 focus:ring-zinc-300 dark:border-zinc-700 dark:bg-zinc-900/80 dark:text-zinc-200 dark:focus:border-zinc-500 dark:focus:ring-zinc-700"
        />
      </div>

      <div className="flex items-center gap-3">
        <Button type="submit" className="h-11 px-6" disabled={status === 'loading'}>
          {status === 'loading' ? '提交中...' : '提交咨询需求'}
        </Button>
        {status === 'success' && (
          <span className="text-sm text-emerald-600 dark:text-emerald-400">
            已收到，会尽快联系你。
          </span>
        )}
        {status === 'error' && (
          <span className="text-sm text-red-600 dark:text-red-400">
            提交失败，请稍后重试。
          </span>
        )}
      </div>
    </form>
  )
}
