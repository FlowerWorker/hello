-- Your SQL goes here
ALTER TABLE subtask_assignees
ADD COLUMN task_id INT NOT NULL REFERENCES tasks(id) ON DELETE CASCADE,
ADD COLUMN assigned_at TIMESTAMP DEFAULT NOW();
