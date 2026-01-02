import { eq } from 'drizzle-orm'
import { redirect } from 'next/navigation'

import { Container } from '~/components/ui/Container'
import { emailConfig } from '~/config/email'
import { db } from '~/db'
import { conversionEvents, emailQueue, subscribers } from '~/db/schema'
import WelcomeSequenceEmail from '~/emails/WelcomeSequence'
import { env } from '~/env.mjs'
import { resend } from '~/lib/mail'
import { welcomeSequence } from '~/lib/welcome-sequence'

import { SubbedCelebration } from './SubbedCelebration'

export const metadata = {
  title: '感谢你的订阅',
}

export default async function ConfirmPage({
  params,
}: {
  params: { token: string }
}) {
  const [subscriber] = await db
    .select()
    .from(subscribers)
    .where(eq(subscribers.token, params.token))

  if (!subscriber || subscriber.subscribedAt) {
    redirect('/')
  }

  const subscribedAt = new Date()

  await db
    .update(subscribers)
    .set({ subscribedAt, token: null })
    .where(eq(subscribers.id, subscriber.id))

  await db.insert(conversionEvents).values({
    event: 'newsletter_subscribe_confirmed',
    source: 'confirm',
    metadata: { email: subscriber.email ?? '' },
  })

  if (env.NODE_ENV === 'production' && subscriber.email) {
    const [firstStep, ...restSteps] = welcomeSequence
    if (firstStep) {
      await resend.emails.send({
        from: emailConfig.from,
        to: subscriber.email,
        subject: firstStep.subject,
        react: WelcomeSequenceEmail({
          preview: firstStep.preview,
          title: firstStep.title,
          paragraphs: firstStep.paragraphs,
          bullets: firstStep.bullets,
          cta: firstStep.cta,
        }),
      })
    }

    if (restSteps.length > 0) {
      const queued = restSteps.map((step) => {
        const sendAt = new Date(subscribedAt)
        sendAt.setDate(sendAt.getDate() + step.delayDays)
        return {
          email: subscriber.email ?? '',
          type: 'welcome_sequence',
          subject: step.subject,
          payload: step,
          sendAt,
        }
      })
      await db.insert(emailQueue).values(queued)
    }
  }

  return (
    <Container className="mt-16 sm:mt-32">
      <header className="relative mx-auto flex w-full max-w-2xl items-center justify-center">
        <h1
          className="w-full text-center text-4xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100 sm:text-5xl"
          id="subbed-celebration"
        >
          🥳 感谢你的订阅 🎉
        </h1>
        <p className="mt-6 text-base text-zinc-600 dark:text-zinc-400"></p>
      </header>
      <SubbedCelebration />
    </Container>
  )
}
