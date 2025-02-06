-- Your SQL goes here
-- Add new fields to `sub_tasks`
ALTER TABLE sub_tasks
    ADD COLUMN progress VARCHAR NOT NULL DEFAULT 'to_do',
    ADD COLUMN user_id INT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    ADD COLUMN completed BOOLEAN NOT NULL DEFAULT FALSE;

-- Rename `assignee_id` to `assignee_user` (optional if it's not needed in this table)
ALTER TABLE sub_tasks
    DROP COLUMN assignee_id;

-- Create `subtask_assignees` join table
CREATE TABLE subtask_assignees (
    id SERIAL PRIMARY KEY,
    sub_task_id INT NOT NULL REFERENCES sub_tasks(id) ON DELETE CASCADE,
    user_id INT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    UNIQUE (sub_task_id, user_id)
);
