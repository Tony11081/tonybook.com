CREATE TABLE IF NOT EXISTS "search_insights" (
  "id" serial PRIMARY KEY NOT NULL,
  "query" varchar(200) NOT NULL,
  "results" integer NOT NULL,
  "source" varchar(120),
  "filters" json,
  "created_at" timestamp DEFAULT now()
);

CREATE INDEX IF NOT EXISTS "search_insights_query_idx" ON "search_insights" ("query");
CREATE INDEX IF NOT EXISTS "search_insights_source_idx" ON "search_insights" ("source");
