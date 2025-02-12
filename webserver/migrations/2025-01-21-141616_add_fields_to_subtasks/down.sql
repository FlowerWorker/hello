-- This file should undo anything in `up.sql`

ALTER TABLE sub_tasks
    DROP COLUMN progress,
    DROP COLUMN user_id,
    DROP COLUMN completed;

ALTER TABLE sub_tasks
    ADD COLUMN assignee_id INT REFERENCES users(id);

DROP TABLE IF EXISTS subtask_assignees;