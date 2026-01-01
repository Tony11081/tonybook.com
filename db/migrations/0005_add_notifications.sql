CREATE TABLE IF NOT EXISTS "notifications" (
  "id" serial PRIMARY KEY NOT NULL,
  "user_id" varchar(200) NOT NULL,
  "type" varchar(60) NOT NULL,
  "title" varchar(200) NOT NULL,
  "message" text,
  "href" varchar(255),
  "entity_type" varchar(40),
  "entity_id" varchar(200),
  "metadata" json,
  "read_at" timestamp,
  "created_at" timestamp DEFAULT now()
);

CREATE INDEX IF NOT EXISTS "notification_user_idx" ON "notifications" ("user_id");
CREATE INDEX IF NOT EXISTS "notification_read_idx" ON "notifications" ("read_at");
CREATE INDEX IF NOT EXISTS "notification_type_idx" ON "notifications" ("type");
