import { clsxm } from '@zolplay/utils'
import Link from 'next/link'
import React from 'react'

const variantStyles = {
  primary:
    'bg-zinc-800 font-semibold text-zinc-100 hover:bg-zinc-700 active:bg-zinc-800 active:text-zinc-100/70 dark:bg-zinc-200 dark:text-black dark:hover:bg-zinc-300 dark:active:bg-zinc-300/70',
  secondary:
    'group rounded-full bg-gradient-to-b from-zinc-50/50 to-white/90 px-3 py-2 shadow-lg shadow-zinc-800/5 ring-1 ring-zinc-900/5 backdrop-blur transition dark:from-zinc-900/50 dark:to-zinc-800/90 dark:ring-white/10 dark:hover:ring-white/20',
}

type SharedProps = {
  variant?: keyof typeof variantStyles
  className?: string
  asChild?: boolean
  children?: React.ReactNode
}
type ButtonLinkProps = SharedProps &
  React.AnchorHTMLAttributes<HTMLAnchorElement> & {
    href: string
  }
type ButtonBaseProps = SharedProps &
  React.ButtonHTMLAttributes<HTMLButtonElement> & {
    href?: undefined
  }
type ButtonProps = ButtonLinkProps | ButtonBaseProps
export function Button({
  variant = 'primary',
  className,
  href,
  asChild,
  children,
  ...props
}: ButtonProps) {
  const cn = clsxm(
    'inline-flex items-center gap-2 justify-center rounded-lg py-2 px-3 text-sm outline-offset-2 transition active:transition-none',
    variantStyles[variant],
    className
  )

  if (asChild && React.isValidElement(children)) {
    const child = children as React.ReactElement<Record<string, unknown>>
    const childClassName =
      typeof child.props.className === 'string' ? child.props.className : undefined
    const mergedProps: Record<string, unknown> = {
      ...(href ? { href } : {}),
      ...props,
      className: clsxm(cn, childClassName),
    }
    return React.cloneElement(child, {
      ...mergedProps,
    })
  }

  return href ? (
    <Link href={href} className={cn} {...props}>
      {children}
    </Link>
  ) : (
    <button className={cn} {...props}>
      {children}
    </button>
  )
}
