import { type NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'

import { db } from '~/db'
import { conversionEvents } from '~/db/schema'
import { getIP } from '~/lib/ip'

const TrackSchema = z.object({
  event: z.string().min(1),
  source: z.string().optional(),
  metadata: z.record(z.string()).optional(),
})

export async function POST(req: NextRequest) {
  try {
    const payload = TrackSchema.parse(await req.json())
    const ip = getIP(req)

    await db.insert(conversionEvents).values({
      event: payload.event,
      source: payload.source,
      metadata: { ...payload.metadata, ip },
    })

    return NextResponse.json({ status: 'ok' })
  } catch (error) {
    return NextResponse.json({ error }, { status: 400 })
  }
}
