'use client'

import React from 'react'

type ReaderSize = 'sm' | 'md' | 'lg'
type ReaderLeading = 'tight' | 'relaxed'

const sizeOptions: { value: ReaderSize; label: string }[] = [
  { value: 'sm', label: 'A-' },
  { value: 'md', label: 'A' },
  { value: 'lg', label: 'A+' },
]

const leadingOptions: { value: ReaderLeading; label: string }[] = [
  { value: 'tight', label: '紧凑' },
  { value: 'relaxed', label: '舒展' },
]

function applyReaderPreferences(size: ReaderSize, leading: ReaderLeading) {
  document.documentElement.setAttribute('data-reader-size', size)
  document.documentElement.setAttribute('data-reader-leading', leading)
  localStorage.setItem('reader-size', size)
  localStorage.setItem('reader-leading', leading)
}

export function BlogPostReadingControls() {
  const [size, setSize] = React.useState<ReaderSize>('md')
  const [leading, setLeading] = React.useState<ReaderLeading>('relaxed')

  React.useEffect(() => {
    const savedSize =
      (localStorage.getItem('reader-size') as ReaderSize | null) ?? 'md'
    const savedLeading =
      (localStorage.getItem('reader-leading') as ReaderLeading | null) ??
      'relaxed'

    setSize(savedSize)
    setLeading(savedLeading)
    applyReaderPreferences(savedSize, savedLeading)
  }, [])

  const onChangeSize = (next: ReaderSize) => {
    setSize(next)
    applyReaderPreferences(next, leading)
  }

  const onChangeLeading = (next: ReaderLeading) => {
    setLeading(next)
    applyReaderPreferences(size, next)
  }

  return (
    <div className="flex flex-wrap items-center gap-3 rounded-full border border-zinc-200/70 bg-white/80 px-4 py-2 text-xs font-medium text-zinc-600 shadow-sm dark:border-zinc-700 dark:bg-zinc-900/80 dark:text-zinc-300">
      <div className="flex items-center gap-1">
        {sizeOptions.map((option) => (
          <button
            key={option.value}
            type="button"
            onClick={() => onChangeSize(option.value)}
            className={`rounded-full px-2 py-1 transition ${
              size === option.value
                ? 'bg-zinc-900 text-white dark:bg-zinc-200 dark:text-zinc-900'
                : 'text-zinc-500 hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-200'
            }`}
          >
            {option.label}
          </button>
        ))}
      </div>
      <span className="h-4 w-px bg-zinc-200 dark:bg-zinc-700" />
      <div className="flex items-center gap-1">
        {leadingOptions.map((option) => (
          <button
            key={option.value}
            type="button"
            onClick={() => onChangeLeading(option.value)}
            className={`rounded-full px-2 py-1 transition ${
              leading === option.value
                ? 'bg-zinc-900 text-white dark:bg-zinc-200 dark:text-zinc-900'
                : 'text-zinc-500 hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-200'
            }`}
          >
            {option.label}
          </button>
        ))}
      </div>
    </div>
  )
}
