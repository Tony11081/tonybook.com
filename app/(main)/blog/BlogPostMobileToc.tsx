'use client'

import React from 'react'

import { Button } from '~/components/ui/Button'
import { Dialog } from '~/components/ui/Dialog'

import { BlogPostTableOfContents } from './BlogPostTableOfContents'

export function BlogPostMobileToc({ headings }: { headings: any[] }) {
  const [open, setOpen] = React.useState(false)

  if (!headings || headings.length === 0) {
    return null
  }

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger asChild>
        <Button
          type="button"
          className="fixed bottom-6 right-5 z-40 h-12 w-12 rounded-full md:hidden"
        >
          目录
        </Button>
      </Dialog.Trigger>
      <Dialog.Content className="max-h-[70vh] w-[92vw] overflow-hidden rounded-2xl border border-zinc-200/80 bg-white/95 p-6 dark:border-zinc-700 dark:bg-zinc-900/95 sm:max-w-md">
        <Dialog.Header>
          <Dialog.Title>目录</Dialog.Title>
        </Dialog.Header>
        <div className="max-h-[50vh] overflow-y-auto pr-2">
          <BlogPostTableOfContents
            headings={headings}
            onNavigate={() => setOpen(false)}
          />
        </div>
      </Dialog.Content>
    </Dialog.Root>
  )
}
