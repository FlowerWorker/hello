-- This file should undo anything in `up.sql`
ALTER TABLE tasks DROP COLUMN progress;
ALTER TABLE tasks DROP COLUMN title;