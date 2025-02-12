-- This file should undo anything in `up.sql`
ALTER TABLE subtask_assignees
DROP COLUMN task_id,
DROP COLUMN assigned_at;
