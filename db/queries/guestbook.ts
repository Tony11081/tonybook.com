import { and, desc, eq, inArray, sql } from 'drizzle-orm'

import { db } from '~/db'
import { type GuestbookDto, GuestbookHashids } from '~/db/dto/guestbook.dto'
import { guestbook, guestbookLikes } from '~/db/schema'

export async function fetchGuestbookMessages({
  limit = 200,
  userId,
}: { limit?: number; userId?: string } = {}) {
  const data = await db
    .select({
      id: guestbook.id,
      userId: guestbook.userId,
      userInfo: guestbook.userInfo,
      message: guestbook.message,
      parentId: guestbook.parentId,
      isFeatured: guestbook.isFeatured,
      createdAt: guestbook.createdAt,
    })
    .from(guestbook)
    .orderBy(desc(guestbook.isFeatured), desc(guestbook.createdAt))
    .limit(limit)

  const ids = data.map((item) => item.id)

  const likeCounts = ids.length
    ? await db
        .select({
          guestbookId: guestbookLikes.guestbookId,
          count: sql<number>`count(*)`,
        })
        .from(guestbookLikes)
        .where(inArray(guestbookLikes.guestbookId, ids))
        .groupBy(guestbookLikes.guestbookId)
    : []

  const likedByUser = userId && ids.length
    ? await db
        .select({
          guestbookId: guestbookLikes.guestbookId,
        })
        .from(guestbookLikes)
        .where(
          and(
            inArray(guestbookLikes.guestbookId, ids),
            eq(guestbookLikes.userId, userId)
          )
        )
    : []

  const likeCountMap = new Map(
    likeCounts.map((row) => [row.guestbookId, Number(row.count) || 0])
  )
  const likedSet = new Set(likedByUser?.map((row) => row.guestbookId))

  return data.map(
    ({ id, parentId, ...rest }) =>
      ({
        ...rest,
        id: GuestbookHashids.encode(id),
        parentId: parentId ? GuestbookHashids.encode(parentId) : null,
        likeCount: likeCountMap.get(id) ?? 0,
        likedByMe: likedSet.has(id),
      } as GuestbookDto)
  )
}
