import {
  boolean,
  index,
  integer,
  json,
  pgTable,
  serial,
  text,
  timestamp,
  uniqueIndex,
  varchar,
} from 'drizzle-orm/pg-core'

export const subscribers = pgTable('subscribers', {
  id: serial('id').primaryKey(),
  email: varchar('email', { length: 120 }),
  token: varchar('token', { length: 50 }),
  subscribedAt: timestamp('subscribed_at'),
  unsubscribedAt: timestamp('unsubscribed_at'),
  updatedAt: timestamp('updated_at').defaultNow(),
})

export const newsletters = pgTable('newsletters', {
  id: serial('id').primaryKey(),
  subject: varchar('subject', { length: 200 }),
  body: text('body'),
  sentAt: timestamp('sent_at'),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
})

export const comments = pgTable(
  'comments',
  {
    id: serial('id').primaryKey(),
    userId: varchar('user_id', { length: 200 }).notNull(),
    userInfo: json('user_info'),
    postId: varchar('post_id', { length: 100 }).notNull(),
    parentId: integer('parent_id'),
    body: json('body'),
    isFeatured: boolean('is_featured').default(false),
    createdAt: timestamp('created_at').defaultNow(),
    updatedAt: timestamp('updated_at').defaultNow(),
  },
  (table) => ({
    postIdx: index('post_idx').on(table.postId),
  })
)

export const guestbook = pgTable('guestbook', {
  id: serial('id').primaryKey(),
  userId: varchar('user_id', { length: 200 }).notNull(),
  userInfo: json('user_info'),
  message: text('message').notNull(),
  parentId: integer('parent_id'),
  isFeatured: boolean('is_featured').default(false),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
})

export const commentLikes = pgTable(
  'comment_likes',
  {
    id: serial('id').primaryKey(),
    commentId: integer('comment_id').notNull(),
    userId: varchar('user_id', { length: 200 }).notNull(),
    createdAt: timestamp('created_at').defaultNow(),
  },
  (table) => ({
    commentIdx: index('comment_like_comment_idx').on(table.commentId),
    uniqueLike: uniqueIndex('comment_like_unique').on(table.commentId, table.userId),
  })
)

export const guestbookLikes = pgTable(
  'guestbook_likes',
  {
    id: serial('id').primaryKey(),
    guestbookId: integer('guestbook_id').notNull(),
    userId: varchar('user_id', { length: 200 }).notNull(),
    createdAt: timestamp('created_at').defaultNow(),
  },
  (table) => ({
    guestbookIdx: index('guestbook_like_guestbook_idx').on(table.guestbookId),
    uniqueLike: uniqueIndex('guestbook_like_unique').on(table.guestbookId, table.userId),
  })
)

export const conversionEvents = pgTable(
  'conversion_events',
  {
    id: serial('id').primaryKey(),
    event: varchar('event', { length: 120 }).notNull(),
    source: varchar('source', { length: 120 }),
    metadata: json('metadata'),
    createdAt: timestamp('created_at').defaultNow(),
  },
  (table) => ({
    eventIdx: index('conversion_event_idx').on(table.event),
  })
)

export const searchInsights = pgTable(
  'search_insights',
  {
    id: serial('id').primaryKey(),
    query: varchar('query', { length: 200 }).notNull(),
    results: integer('results').notNull(),
    source: varchar('source', { length: 120 }),
    filters: json('filters'),
    createdAt: timestamp('created_at').defaultNow(),
  },
  (table) => ({
    queryIdx: index('search_insights_query_idx').on(table.query),
    sourceIdx: index('search_insights_source_idx').on(table.source),
  })
)

export const emailQueue = pgTable(
  'email_queue',
  {
    id: serial('id').primaryKey(),
    email: varchar('email', { length: 200 }).notNull(),
    type: varchar('type', { length: 60 }).notNull(),
    subject: varchar('subject', { length: 200 }).notNull(),
    payload: json('payload'),
    sendAt: timestamp('send_at').notNull(),
    sentAt: timestamp('sent_at'),
    createdAt: timestamp('created_at').defaultNow(),
  },
  (table) => ({
    sendAtIdx: index('email_queue_send_idx').on(table.sendAt),
    emailIdx: index('email_queue_email_idx').on(table.email),
  })
)

export const notifications = pgTable(
  'notifications',
  {
    id: serial('id').primaryKey(),
    userId: varchar('user_id', { length: 200 }).notNull(),
    type: varchar('type', { length: 60 }).notNull(),
    title: varchar('title', { length: 200 }).notNull(),
    message: text('message'),
    href: varchar('href', { length: 255 }),
    entityType: varchar('entity_type', { length: 40 }),
    entityId: varchar('entity_id', { length: 200 }),
    metadata: json('metadata'),
    readAt: timestamp('read_at'),
    createdAt: timestamp('created_at').defaultNow(),
  },
  (table) => ({
    userIdx: index('notification_user_idx').on(table.userId),
    readIdx: index('notification_read_idx').on(table.readAt),
    typeIdx: index('notification_type_idx').on(table.type),
  })
)

export const consultationRequests = pgTable(
  'consultation_requests',
  {
    id: serial('id').primaryKey(),
    name: varchar('name', { length: 120 }),
    email: varchar('email', { length: 200 }).notNull(),
    topic: varchar('topic', { length: 120 }),
    channel: varchar('channel', { length: 60 }),
    budget: varchar('budget', { length: 120 }),
    message: text('message'),
    source: varchar('source', { length: 120 }),
    metadata: json('metadata'),
    createdAt: timestamp('created_at').defaultNow(),
  },
  (table) => ({
    emailIdx: index('consultation_email_idx').on(table.email),
    topicIdx: index('consultation_topic_idx').on(table.topic),
  })
)
