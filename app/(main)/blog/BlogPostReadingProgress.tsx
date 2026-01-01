'use client'

import React from 'react'

export function BlogPostReadingProgress() {
  const [progress, setProgress] = React.useState(0)

  React.useEffect(() => {
    const updateProgress = () => {
      const article = document.querySelector<HTMLElement>('article[data-postid]')
      if (!article) {
        return
      }

      const articleTop = article.getBoundingClientRect().top + window.scrollY
      const total = article.scrollHeight - window.innerHeight
      const current = window.scrollY - articleTop

      if (total <= 0) {
        setProgress(0)
        return
      }

      const percentage = Math.min(100, Math.max(0, (current / total) * 100))
      setProgress(percentage)
    }

    updateProgress()
    window.addEventListener('scroll', updateProgress, { passive: true })
    window.addEventListener('resize', updateProgress)

    return () => {
      window.removeEventListener('scroll', updateProgress)
      window.removeEventListener('resize', updateProgress)
    }
  }, [])

  return (
    <div className="fixed left-0 top-0 z-40 h-1 w-full bg-transparent">
      <div
        className="h-full bg-zinc-900 transition-[width] dark:bg-zinc-100"
        style={{ width: `${progress}%` }}
      />
    </div>
  )
}
