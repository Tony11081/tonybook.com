'use client'

import Link from 'next/link'
import React from 'react'

type TrackLinkProps = React.ComponentProps<typeof Link> & {
  event: string
  source?: string
  metadata?: Record<string, string>
}

export function TrackLink({
  event,
  source,
  metadata,
  onClick,
  ...props
}: TrackLinkProps) {
  const handleClick = React.useCallback(
    (evt: React.MouseEvent<HTMLAnchorElement>) => {
      onClick?.(evt)
      fetch('/api/track', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ event, source, metadata }),
        keepalive: true,
      }).catch(() => undefined)
    },
    [event, source, metadata, onClick]
  )

  return <Link {...props} onClick={handleClick} />
}
