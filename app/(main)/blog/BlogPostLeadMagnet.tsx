'use client'

import React from 'react'

import { Newsletter } from '~/app/(main)/Newsletter'
import { XIcon } from '~/assets'
import { TrackLink } from '~/components/TrackLink'

const STORAGE_KEY = 'lead-magnet-dismissed-until'
const DISMISS_DAYS = 14

function getDismissUntil() {
  if (typeof window === 'undefined') return 0
  const raw = window.localStorage.getItem(STORAGE_KEY)
  if (!raw) return 0
  const value = Number(raw)
  return Number.isNaN(value) ? 0 : value
}

function setDismissUntil() {
  if (typeof window === 'undefined') return
  const next = Date.now() + DISMISS_DAYS * 24 * 60 * 60 * 1000
  window.localStorage.setItem(STORAGE_KEY, String(next))
}

export function BlogPostLeadMagnet() {
  const [open, setOpen] = React.useState(false)

  React.useEffect(() => {
    const dismissedUntil = getDismissUntil()
    if (dismissedUntil && dismissedUntil > Date.now()) {
      return
    }

    let triggered = false

    const maybeOpen = () => {
      if (!triggered) {
        triggered = true
        setOpen(true)
      }
    }

    const onScroll = () => {
      const doc = document.documentElement
      const total = doc.scrollHeight - doc.clientHeight
      if (total <= 0) return
      const progress = window.scrollY / total
      if (progress > 0.45) {
        maybeOpen()
      }
    }

    const onMouseLeave = (event: MouseEvent) => {
      if (event.clientY <= 0) {
        maybeOpen()
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    document.addEventListener('mouseleave', onMouseLeave)

    return () => {
      window.removeEventListener('scroll', onScroll)
      document.removeEventListener('mouseleave', onMouseLeave)
    }
  }, [])

  const onDismiss = () => {
    setOpen(false)
    setDismissUntil()
  }

  if (!open) return null

  return (
    <div className="fixed bottom-6 right-6 z-40 w-[min(92vw,420px)] rounded-3xl border border-zinc-200/80 bg-white/95 p-5 shadow-xl backdrop-blur dark:border-zinc-700/60 dark:bg-zinc-900/95">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-400">
            Lead Magnet
          </p>
          <h3 className="mt-2 text-lg font-semibold text-zinc-900 dark:text-zinc-100">
            领取增长与自动化清单
          </h3>
          <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
            订阅后自动发送「增长清单 + 自动化流程图」，帮助你快速落地。
          </p>
        </div>
        <button
          type="button"
          onClick={onDismiss}
          aria-label="关闭"
          className="rounded-full border border-zinc-200/80 p-1 text-zinc-500 transition hover:text-zinc-800 dark:border-zinc-700/60 dark:text-zinc-400"
        >
          <XIcon className="h-4 w-4" />
        </button>
      </div>

      <div className="mt-4">
        <Newsletter
          source="blog-lead-magnet"
          leadMagnet="增长清单 + 自动化流程图"
          title="订阅获取资源"
          description="每月一封高密度干货，随时可取消。"
        />
        <div className="mt-3 text-xs text-zinc-500 dark:text-zinc-400">
          也可以直接查看资源库：
          <TrackLink
            href="/playbooks?utm_source=blog-lead-magnet"
            event="lead_magnet_click"
            source="blog-lead-magnet"
            className="ml-1 text-zinc-900 underline underline-offset-4 dark:text-zinc-200"
          >
            前往 Playbooks
          </TrackLink>
        </div>
      </div>
    </div>
  )
}
