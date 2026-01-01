CREATE TABLE IF NOT EXISTS "email_queue" (
  "id" serial PRIMARY KEY NOT NULL,
  "email" varchar(200) NOT NULL,
  "type" varchar(60) NOT NULL,
  "subject" varchar(200) NOT NULL,
  "payload" json,
  "send_at" timestamp NOT NULL,
  "sent_at" timestamp,
  "created_at" timestamp DEFAULT now()
);

CREATE INDEX IF NOT EXISTS "email_queue_send_idx" ON "email_queue" ("send_at");
CREATE INDEX IF NOT EXISTS "email_queue_email_idx" ON "email_queue" ("email");
