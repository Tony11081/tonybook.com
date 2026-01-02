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
}
type ButtonLinkProps = SharedProps &
  React.AnchorHTMLAttributes<HTMLAnchorElement> & {
    href: string
    asChild?: false
  }
type ButtonBaseProps = SharedProps &
  React.ButtonHTMLAttributes<HTMLButtonElement> & {
    href?: undefined
    asChild?: false
  }
type ButtonAsChildProps = SharedProps & {
  asChild: true
  children: React.ReactElement<{ className?: string }>
}
type ButtonProps = ButtonLinkProps | ButtonBaseProps | ButtonAsChildProps

const isLinkProps = (props: ButtonProps): props is ButtonLinkProps =>
  typeof (props as ButtonLinkProps).href === 'string'
export function Button(props: ButtonProps) {
  const variant = props.variant ?? 'primary'
  const cn = clsxm(
    'inline-flex items-center gap-2 justify-center rounded-lg py-2 px-3 text-sm outline-offset-2 transition active:transition-none',
    variantStyles[variant],
    props.className
  )

  if (props.asChild) {
    const childClassName = props.children.props.className
    return React.cloneElement(props.children, {
      className: clsxm(cn, childClassName),
    })
  }

  if (isLinkProps(props)) {
    const {
      href,
      children,
      variant: variantProp,
      className: classNameProp,
      asChild: asChildProp,
      ...rest
    } = props
    void variantProp
    void classNameProp
    void asChildProp
    return (
      <Link href={href} className={cn} {...rest}>
        {children}
      </Link>
    )
  }

  const {
    children,
    variant: variantProp,
    className: classNameProp,
    asChild: asChildProp,
    ...rest
  } = props as ButtonBaseProps
  void variantProp
  void classNameProp
  void asChildProp
  return (
    <button className={cn} {...rest}>
      {children}
    </button>
  )
}
