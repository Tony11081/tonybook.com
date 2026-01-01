import { and, eq, isNull, lte } from 'drizzle-orm'
import { type NextRequest, NextResponse } from 'next/server'

import { emailConfig } from '~/config/email'
import { db } from '~/db'
import { emailQueue } from '~/db/schema'
import WelcomeSequenceEmail from '~/emails/WelcomeSequence'
import { env } from '~/env.mjs'
import { resend } from '~/lib/mail'
import { type WelcomeSequenceStep } from '~/lib/welcome-sequence'

const MAX_BATCH = 20

function isAuthorized(req: NextRequest) {
  if (!env.CRON_SECRET) {
    return true
  }

  const header = req.headers.get('authorization') ?? ''
  const token = header.replace('Bearer ', '')
  const secret = req.nextUrl.searchParams.get('secret') ?? token
  return secret === env.CRON_SECRET
}

export async function GET(req: NextRequest) {
  if (!isAuthorized(req)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const now = new Date()
  const queued = await db
    .select()
    .from(emailQueue)
    .where(
      and(
        eq(emailQueue.type, 'welcome_sequence'),
        isNull(emailQueue.sentAt),
        lte(emailQueue.sendAt, now)
      )
    )
    .limit(MAX_BATCH)

  let sent = 0

  for (const item of queued) {
    const payload = (item.payload ?? {}) as WelcomeSequenceStep
    try {
      await resend.emails.send({
        from: emailConfig.from,
        to: item.email,
        subject: item.subject,
        react: WelcomeSequenceEmail({
          preview: payload.preview ?? '',
          title: payload.title ?? item.subject,
          paragraphs: payload.paragraphs ?? [],
          bullets: payload.bullets ?? [],
          cta: payload.cta,
        }),
      })

      await db
        .update(emailQueue)
        .set({ sentAt: new Date() })
        .where(eq(emailQueue.id, item.id))

      sent += 1
    } catch (error) {
      console.error('[welcome-sequence]', error)
    }
  }

  return NextResponse.json({ queued: queued.length, sent })
}
