import { desc } from 'drizzle-orm'
import React from 'react'

import { db } from '~/db'
import { type GuestbookDto, GuestbookHashids } from '~/db/dto/guestbook.dto'
import { guestbook } from '~/db/schema'

import { GuestbookAdminList } from './GuestbookAdminList'

export default async function AdminGuestbookPage() {
  const rows = await db
    .select({
      id: guestbook.id,
      userId: guestbook.userId,
      userInfo: guestbook.userInfo,
      message: guestbook.message,
      createdAt: guestbook.createdAt,
      isFeatured: guestbook.isFeatured,
      parentId: guestbook.parentId,
    })
    .from(guestbook)
    .orderBy(desc(guestbook.isFeatured), desc(guestbook.createdAt))
    .limit(80)

  const messages: GuestbookDto[] = rows.map((row) => ({
    ...row,
    id: GuestbookHashids.encode(row.id),
    parentId: row.parentId ? GuestbookHashids.encode(row.parentId) : null,
  }))

  return (
    <>
      <h1 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-100">
        留言管理
      </h1>
      <div className="mt-6">
        <GuestbookAdminList initialMessages={messages} />
      </div>
    </>
  )
}
