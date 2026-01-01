import { clerkClient } from '@clerk/nextjs'

import { emailConfig } from '~/config/email'
import { db } from '~/db'
import { notifications } from '~/db/schema'
import InteractionNotificationEmail from '~/emails/InteractionNotification'
import { env } from '~/env.mjs'
import { resend } from '~/lib/mail'

type NotificationInput = {
  userId: string
  type: string
  title: string
  message: string
  href?: string
  entityType?: string
  entityId?: string
  metadata?: Record<string, unknown>
  ctaLabel?: string
}

type NotificationOptions = {
  sendEmail?: boolean
  emailSubject?: string
  emailPreview?: string
}

export async function createNotification(
  payload: NotificationInput,
  options: NotificationOptions = {}
) {
  const { sendEmail = true } = options

  await db.insert(notifications).values({
    userId: payload.userId,
    type: payload.type,
    title: payload.title,
    message: payload.message,
    href: payload.href,
    entityType: payload.entityType,
    entityId: payload.entityId,
    metadata: {
      ...(payload.metadata ?? {}),
      ctaLabel: payload.ctaLabel,
    },
  })

  if (!sendEmail || env.NODE_ENV !== 'production') {
    return
  }

  const user = await clerkClient.users.getUser(payload.userId)
  const { primaryEmailAddressId, emailAddresses } = user
  const primaryEmail = emailAddresses.find(
    (email) => email.id === primaryEmailAddressId
  )

  if (!primaryEmail) {
    return
  }

  await resend.emails.send({
    from: emailConfig.from,
    to: primaryEmail.emailAddress,
    subject: options.emailSubject ?? payload.title,
    react: InteractionNotificationEmail({
      preview: options.emailPreview ?? payload.title,
      title: payload.title,
      message: payload.message,
      cta: payload.href
        ? {
            label: payload.ctaLabel ?? '查看详情',
            href: payload.href,
          }
        : undefined,
    }),
  })
}
