import { currentUser } from '@clerk/nextjs'
import { and, eq } from 'drizzle-orm'
import { type NextRequest, NextResponse } from 'next/server'

import { db } from '~/db'
import { notifications } from '~/db/schema'

type Params = { params: { id: string } }

export async function POST(_req: NextRequest, { params }: Params) {
  const user = await currentUser()
  if (!user) {
    return NextResponse.json({ error: 'Not authenticated' }, { status: 401 })
  }

  const id = Number(params.id)
  if (!id) {
    return NextResponse.json({ error: 'Invalid id' }, { status: 400 })
  }

  await db
    .update(notifications)
    .set({ readAt: new Date() })
    .where(and(eq(notifications.id, id), eq(notifications.userId, user.id)))

  return NextResponse.json({ status: 'ok' })
}
