import { currentUser } from '@clerk/nextjs'
import { desc, eq } from 'drizzle-orm'
import { type NextRequest, NextResponse } from 'next/server'

import { db } from '~/db'
import { notifications } from '~/db/schema'

export async function GET(_req: NextRequest) {
  const user = await currentUser()
  if (!user) {
    return NextResponse.json({ error: 'Not authenticated' }, { status: 401 })
  }

  const rows = await db
    .select()
    .from(notifications)
    .where(eq(notifications.userId, user.id))
    .orderBy(desc(notifications.createdAt))
    .limit(50)

  return NextResponse.json(rows)
}
