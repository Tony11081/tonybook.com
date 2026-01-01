import { Card, Grid, Metric, Text, Title } from '@tremor/react'
import { sql } from 'drizzle-orm'
import React from 'react'

import { db } from '~/db'

export default async function AdminPage() {
  const {
    rows: [count],
  } = await db.execute<{
    comments: number
    subscribers: number
    guestbook: number
    newsletter_conversions: number
    consultation_conversions: number
    consultation_requests: number
    consultation_submits: number
  }>(
    sql`SELECT 
  (SELECT COUNT(*) FROM comments) as comments,
  (SELECT COUNT(*) FROM subscribers WHERE subscribed_at IS NOT NULL) as subscribers,
  (SELECT COUNT(*) FROM guestbook) as guestbook,
  (SELECT COUNT(*) FROM conversion_events WHERE event = 'newsletter_subscribe_confirmed') as newsletter_conversions,
  (SELECT COUNT(*) FROM conversion_events WHERE event = 'consultation_cta_click') as consultation_conversions,
  (SELECT COUNT(*) FROM consultation_requests) as consultation_requests,
  (SELECT COUNT(*) FROM conversion_events WHERE event = 'consultation_form_submit') as consultation_submits`
  )

  return (
    <>
      <Title>后台仪表盘</Title>

      <Grid numItemsMd={2} numItemsLg={3} className="mt-6 gap-6">
        <Card>
          <Text>总评论</Text>

          {count && 'comments' in count && <Metric>{count.comments}</Metric>}
        </Card>
        <Card>
          <Text>总订阅</Text>
          {count && 'subscribers' in count && (
            <Metric>{count.subscribers}</Metric>
          )}
        </Card>
        <Card>
          <Text>总留言</Text>
          {count && 'guestbook' in count && <Metric>{count.guestbook}</Metric>}
        </Card>
        <Card>
          <Text>Newsletter 转化</Text>
          {count && 'newsletter_conversions' in count && (
            <Metric>{count.newsletter_conversions}</Metric>
          )}
        </Card>
        <Card>
          <Text>咨询 CTA 点击</Text>
          {count && 'consultation_conversions' in count && (
            <Metric>{count.consultation_conversions}</Metric>
          )}
        </Card>
        <Card>
          <Text>咨询表单提交</Text>
          {count && 'consultation_submits' in count && (
            <Metric>{count.consultation_submits}</Metric>
          )}
        </Card>
        <Card>
          <Text>咨询请求量</Text>
          {count && 'consultation_requests' in count && (
            <Metric>{count.consultation_requests}</Metric>
          )}
        </Card>
      </Grid>
    </>
  )
}
