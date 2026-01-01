import * as React from 'react'

import { emailConfig } from '../config/email'
import { Button, Heading, Hr, Link, Section, Text } from './_components'
import Layout from './Layout'

type WelcomeSequenceProps = {
  preview: string
  title: string
  paragraphs: string[]
  bullets?: string[]
  cta?: {
    label: string
    href: string
  }
}

function resolveLink(href?: string) {
  if (!href) return ''
  if (href.startsWith('http')) return href
  return `${emailConfig.baseUrl}${href.startsWith('/') ? href : `/${href}`}`
}

const WelcomeSequenceEmail = ({
  preview,
  title,
  paragraphs,
  bullets,
  cta,
}: WelcomeSequenceProps) => {
  const previewText = preview
  const ctaLink = resolveLink(cta?.href)

  return (
    <Layout previewText={previewText}>
      <Heading className="mx-0 my-[24px] p-0 text-center text-[24px] font-bold text-black">
        {title}
      </Heading>
      {paragraphs.map((paragraph, index) => (
        <Text key={`${paragraph}-${index}`} className="text-[14px] leading-[24px] text-black">
          {paragraph}
        </Text>
      ))}
      {bullets && bullets.length > 0 && (
        <Section className="my-[16px]">
          {bullets.map((item) => (
            <Text key={item} className="m-0 text-[13px] leading-[22px] text-black">
              • {item}
            </Text>
          ))}
        </Section>
      )}
      {cta && ctaLink ? (
        <Section className="mb-[24px] mt-[24px] text-center">
          <Button
            pX={20}
            pY={12}
            className="rounded-xl bg-zinc-900 text-center text-[12px] font-semibold text-white no-underline"
            href={ctaLink}
          >
            {cta.label}
          </Button>
        </Section>
      ) : null}
      {cta && ctaLink ? (
        <>
          <Hr className="mx-0 my-[20px] h-px w-full bg-zinc-100" />
          <Text className="text-[12px] leading-[20px] text-[#666666]">
            如果按钮无法打开，请复制下面的链接：
            <br />
            <Link href={ctaLink} className="text-blue-600 no-underline">
              {ctaLink}
            </Link>
          </Text>
        </>
      ) : null}
    </Layout>
  )
}

export default WelcomeSequenceEmail
