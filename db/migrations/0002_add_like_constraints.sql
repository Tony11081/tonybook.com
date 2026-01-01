DELETE FROM comment_likes a
USING comment_likes b
WHERE a.id > b.id
  AND a.comment_id = b.comment_id
  AND a.user_id = b.user_id;

DELETE FROM guestbook_likes a
USING guestbook_likes b
WHERE a.id > b.id
  AND a.guestbook_id = b.guestbook_id
  AND a.user_id = b.user_id;

CREATE UNIQUE INDEX IF NOT EXISTS comment_like_unique
  ON comment_likes (comment_id, user_id);

CREATE UNIQUE INDEX IF NOT EXISTS guestbook_like_unique
  ON guestbook_likes (guestbook_id, user_id);
