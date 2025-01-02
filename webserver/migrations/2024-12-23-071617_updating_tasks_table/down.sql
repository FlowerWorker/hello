-- This file should undo anything in `up.sql`
ALTER TABLE tasks
DROP COLUMN priority,
DROP COLUMN created_at,
DROP COLUMN due_date;