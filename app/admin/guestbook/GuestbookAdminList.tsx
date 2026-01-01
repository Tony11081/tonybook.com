'use client'

import React from 'react'

import { Button } from '~/components/ui/Button'
import { type GuestbookDto } from '~/db/dto/guestbook.dto'

export function GuestbookAdminList({
  initialMessages,
}: {
  initialMessages: GuestbookDto[]
}) {
  const [messages, setMessages] = React.useState(initialMessages)

  const toggleFeatured = async (id: string) => {
    const res = await fetch(`/api/guestbook/${id}/pin`, { method: 'POST' })
    if (!res.ok) {
      return
    }
    const data = (await res.json()) as { isFeatured: boolean }
    setMessages((prev) =>
      prev.map((message) =>
        message.id === id ? { ...message, isFeatured: data.isFeatured } : message
      )
    )
  }

  return (
    <div className="space-y-4">
      {messages.map((message) => (
        <div
          key={message.id}
          className="rounded-2xl border border-zinc-200/80 bg-white/70 p-5 shadow-sm dark:border-zinc-700/60 dark:bg-zinc-900/60"
        >
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
              {message.userInfo.firstName ?? '匿名'}
            </div>
            <Button
              type="button"
              variant="secondary"
              className="h-8 px-3 text-xs"
              onClick={() => toggleFeatured(message.id)}
            >
              {message.isFeatured ? '取消置顶' : '置顶'}
            </Button>
          </div>
          <p className="mt-3 text-sm text-zinc-600 dark:text-zinc-400">
            {message.message}
          </p>
        </div>
      ))}
    </div>
  )
}
