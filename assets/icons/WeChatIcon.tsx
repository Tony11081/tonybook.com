import type { IconProps } from '..'

export function WeChatIcon({ className, ...props }: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      {...props}
    >
      <path d="M9.5 9.5C9.5 8.12 10.62 7 12 7C13.38 7 14.5 8.12 14.5 9.5C14.5 10.88 13.38 12 12 12C10.62 12 9.5 10.88 9.5 9.5Z" />
      <path d="M16 15.5C16 14.12 17.12 13 18.5 13C19.88 13 21 14.12 21 15.5C21 16.88 19.88 18 18.5 18C17.12 18 16 16.88 16 15.5Z" />
      <path d="M9 15.5C9 16.88 7.88 18 6.5 18C5.12 18 4 16.88 4 15.5C4 14.12 5.12 13 6.5 13C7.88 13 9 14.12 9 15.5Z" />
      <path d="M9.5 9.5C9.5 8.12 8.38 7 7 7C5.62 7 4.5 8.12 4.5 9.5C4.5 10.88 5.62 12 7 12C8.38 12 9.5 10.88 9.5 9.5Z" />
      <path d="M14.5 9.5C14.5 10.88 15.62 12 17 12C18.38 12 19.5 10.88 19.5 9.5C19.5 8.12 18.38 7 17 7C15.62 7 14.5 8.12 14.5 9.5Z" />
      <path d="M9 15.5C9 14.12 10.12 13 11.5 13C12.88 13 14 14.12 14 15.5C14 16.88 12.88 18 11.5 18C10.12 18 9 16.88 9 15.5Z" />
    </svg>
  )
} 