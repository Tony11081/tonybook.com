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

  const hrefValue = props.href
  const isExternal =
    typeof hrefValue === 'string' &&
    /^(https?:|mailto:|tel:)/.test(hrefValue)
  const isDownload = props.download !== undefined && props.download !== false

  if (isExternal || (isDownload && typeof hrefValue === 'string')) {
    const {
      href,
      prefetch,
      replace,
      scroll,
      shallow,
      locale,
      legacyBehavior,
      passHref,
      ...anchorProps
    } = props

    void prefetch
    void replace
    void scroll
    void shallow
    void locale
    void legacyBehavior
    void passHref

    return (
      <a {...anchorProps} href={href as string} onClick={handleClick} />
    )
  }

  return <Link {...props} onClick={handleClick} />
}
