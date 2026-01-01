'use client'

import 'dayjs/locale/zh-cn'

import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import Image from 'next/image'
import React from 'react'
import { useQuery } from 'react-query'
import { useSnapshot } from 'valtio'

import { SparkleIcon } from '~/assets'
import { CommentMarkdown } from '~/components/CommentMarkdown'
import { type GuestbookDto } from '~/db/dto/guestbook.dto'
import { parseDisplayName } from '~/lib/string'

import {
  guestbookState,
  replyToMessage,
  setMessages,
  updateGuestbookMessage,
} from './guestbook.state'

dayjs.extend(relativeTime)

type Thread = GuestbookDto & { replies: GuestbookDto[] }

function Message({ message }: { message: GuestbookDto }) {
  const [isLiking, setIsLiking] = React.useState(false)

  const onToggleLike = React.useCallback(async () => {
    if (isLiking) {
      return
    }
    setIsLiking(true)
    const method = message.likedByMe ? 'DELETE' : 'POST'
    try {
      const res = await fetch(`/api/guestbook/${message.id}/like`, { method })
      if (!res.ok) {
        return
      }
      const data = (await res.json()) as {
        likeCount: number
        likedByMe: boolean
      }
      updateGuestbookMessage(message.id, {
        likeCount: data.likeCount,
        likedByMe: data.likedByMe,
      })
    } finally {
      setIsLiking(false)
    }
  }, [isLiking, message.id, message.likedByMe])

  return (
    <div className="relative flex items-start space-x-3">
      <Image
        src={
          message.userInfo.imageUrl ??
          `/avatars/avatar_${(message.id.length % 8) + 1}.png`
        }
        alt=""
        width={40}
        height={40}
        className="h-10 w-10 flex-shrink-0 rounded-full bg-zinc-200 ring-2 ring-zinc-200 dark:bg-zinc-800 dark:ring-zinc-800"
        unoptimized
      />
      <div className="-mt-1 flex min-w-0 flex-1 flex-col gap-2">
        <div className="flex flex-wrap items-center gap-2">
          <b className="text-sm font-bold dark:text-zinc-100">
            {parseDisplayName(message.userInfo)}
          </b>
          {message.isFeatured && (
            <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-amber-500">
              <SparkleIcon className="h-3 w-3" />
              精选
            </span>
          )}
          <time
            dateTime={message.createdAt.toString()}
            className="inline-flex select-none text-[12px] font-medium opacity-40"
          >
            {dayjs(message.createdAt).locale('zh-cn').fromNow()}
          </time>
        </div>
        <div className="comment__message text-sm">
          <CommentMarkdown>{message.message}</CommentMarkdown>
        </div>
        <div className="flex items-center gap-3 text-[11px] text-zinc-500 dark:text-zinc-400">
          <button
            type="button"
            className={`rounded-full px-2 py-1 transition ${
              message.likedByMe
                ? 'bg-zinc-900 text-white dark:bg-zinc-200 dark:text-zinc-900'
                : 'bg-zinc-100 text-zinc-600 hover:text-zinc-900 dark:bg-zinc-800 dark:text-zinc-400'
            }`}
            onClick={onToggleLike}
            disabled={isLiking}
          >
            赞 {message.likeCount ?? 0}
          </button>
          <button
            type="button"
            className="rounded-full bg-zinc-100 px-2 py-1 text-zinc-600 transition hover:text-zinc-900 dark:bg-zinc-800 dark:text-zinc-400"
            onClick={() => replyToMessage(message)}
          >
            回复
          </button>
        </div>
      </div>
    </div>
  )
}

function ThreadItem({ thread }: { thread: Thread }) {
  return (
    <li className="relative pb-8">
      <Message message={thread} />
      {thread.replies.length > 0 && (
        <div className="mt-4 space-y-4 border-l border-zinc-200/70 pl-6 dark:border-zinc-700">
          {thread.replies.map((reply) => (
            <Message key={reply.id} message={reply} />
          ))}
        </div>
      )}
    </li>
  )
}

export function GuestbookFeeds(props: { messages?: GuestbookDto[] }) {
  const { data: feed } = useQuery(
    ['guestbook'],
    async () => {
      const res = await fetch('/api/guestbook')
      const data = await res.json()
      return data as GuestbookDto[]
    },
    {
      refetchInterval: 30000,
      initialData: props.messages ?? [],
    }
  )
  const { messages } = useSnapshot(guestbookState)
  React.useEffect(() => {
    setMessages(feed ?? [])
  }, [feed])

  const threads = React.useMemo(() => {
    const parents = messages.filter((message) => !message.parentId)
    const repliesByParent = new Map<string, GuestbookDto[]>()
    messages
      .filter((message) => message.parentId)
      .forEach((message) => {
        if (!message.parentId) return
        const list = repliesByParent.get(message.parentId) ?? []
        repliesByParent.set(message.parentId, [...list, message])
      })

    const featured = parents.filter((message) => message.isFeatured)
    const regular = parents.filter((message) => !message.isFeatured)

    return [...featured, ...regular].map((parent) => {
      const replies = repliesByParent.get(parent.id) ?? []
      replies.sort(
        (a, b) =>
          new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
      )
      return {
        ...parent,
        replies,
      }
    })
  }, [messages])

  return (
    <div className="relative mt-12">
      <ul role="list" className="-mb-8 space-y-6 px-1 md:px-4">
        {threads.map((thread) => (
          <ThreadItem key={thread.id} thread={thread} />
        ))}
      </ul>
    </div>
  )
}
