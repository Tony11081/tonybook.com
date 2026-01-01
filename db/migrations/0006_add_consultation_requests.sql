CREATE TABLE IF NOT EXISTS "consultation_requests" (
  "id" serial PRIMARY KEY NOT NULL,
  "name" varchar(120),
  "email" varchar(200) NOT NULL,
  "topic" varchar(120),
  "channel" varchar(60),
  "budget" varchar(120),
  "message" text,
  "source" varchar(120),
  "metadata" json,
  "created_at" timestamp DEFAULT now()
);

CREATE INDEX IF NOT EXISTS "consultation_email_idx" ON "consultation_requests" ("email");
CREATE INDEX IF NOT EXISTS "consultation_topic_idx" ON "consultation_requests" ("topic");
