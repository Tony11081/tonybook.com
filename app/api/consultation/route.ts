import { type NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'

import { emailConfig } from '~/config/email'
import { db } from '~/db'
import { consultationRequests, conversionEvents } from '~/db/schema'
import { env } from '~/env.mjs'
import { resend } from '~/lib/mail'

const ConsultationSchema = z.object({
  name: z.string().min(1).max(120).optional(),
  email: z.string().email(),
  topic: z.string().min(1).max(120).optional(),
  channel: z.string().min(1).max(60).optional(),
  budget: z.string().min(1).max(120).optional(),
  message: z.string().min(1).max(2000).optional(),
  source: z.string().optional(),
})

export async function POST(req: NextRequest) {
  try {
    const payload = ConsultationSchema.parse(await req.json())

    await db.insert(consultationRequests).values({
      name: payload.name,
      email: payload.email,
      topic: payload.topic,
      channel: payload.channel,
      budget: payload.budget,
      message: payload.message,
      source: payload.source,
    })

    await db.insert(conversionEvents).values({
      event: 'consultation_form_submit',
      source: payload.source,
      metadata: {
        topic: payload.topic ?? '',
        channel: payload.channel ?? '',
      },
    })

    if (env.NODE_ENV === 'production' && env.SITE_NOTIFICATION_EMAIL_TO) {
      await resend.emails.send({
        from: emailConfig.from,
        to: env.SITE_NOTIFICATION_EMAIL_TO,
        subject: '新的咨询需求已提交',
        text: [
          `姓名: ${payload.name ?? '未填写'}`,
          `邮箱: ${payload.email}`,
          `方向: ${payload.topic ?? '未填写'}`,
          `渠道: ${payload.channel ?? '未填写'}`,
          `预算: ${payload.budget ?? '未填写'}`,
          `描述: ${payload.message ?? '未填写'}`,
          `来源: ${payload.source ?? 'direct'}`,
        ].join('\n'),
      })
    }

    return NextResponse.json({ status: 'ok' })
  } catch (error) {
    return NextResponse.json({ error }, { status: 400 })
  }
}
