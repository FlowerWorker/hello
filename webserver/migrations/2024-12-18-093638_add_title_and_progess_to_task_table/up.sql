-- Your SQL goes here


ALTER TABLE tasks ADD COLUMN progress VARCHAR NOT NULL DEFAULT 'to_do';
ALTER TABLE tasks ADD COLUMN title VARCHAR NOT NULL DEFAULT 'Untitled';