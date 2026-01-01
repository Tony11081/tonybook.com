ALTER TABLE "comments" ADD COLUMN IF NOT EXISTS "is_featured" boolean DEFAULT false;

ALTER TABLE "guestbook" ADD COLUMN IF NOT EXISTS "parent_id" integer;
ALTER TABLE "guestbook" ADD COLUMN IF NOT EXISTS "is_featured" boolean DEFAULT false;

CREATE TABLE IF NOT EXISTS "comment_likes" (
  "id" serial PRIMARY KEY NOT NULL,
  "comment_id" integer NOT NULL,
  "user_id" varchar(200) NOT NULL,
  "created_at" timestamp DEFAULT now()
);
CREATE INDEX IF NOT EXISTS "comment_like_comment_idx" ON "comment_likes" ("comment_id");
CREATE UNIQUE INDEX IF NOT EXISTS "comment_like_unique" ON "comment_likes" ("comment_id", "user_id");

CREATE TABLE IF NOT EXISTS "guestbook_likes" (
  "id" serial PRIMARY KEY NOT NULL,
  "guestbook_id" integer NOT NULL,
  "user_id" varchar(200) NOT NULL,
  "created_at" timestamp DEFAULT now()
);
CREATE INDEX IF NOT EXISTS "guestbook_like_guestbook_idx" ON "guestbook_likes" ("guestbook_id");
CREATE UNIQUE INDEX IF NOT EXISTS "guestbook_like_unique" ON "guestbook_likes" ("guestbook_id", "user_id");

CREATE TABLE IF NOT EXISTS "conversion_events" (
  "id" serial PRIMARY KEY NOT NULL,
  "event" varchar(120) NOT NULL,
  "source" varchar(120),
  "metadata" json,
  "created_at" timestamp DEFAULT now()
);
CREATE INDEX IF NOT EXISTS "conversion_event_idx" ON "conversion_events" ("event");
