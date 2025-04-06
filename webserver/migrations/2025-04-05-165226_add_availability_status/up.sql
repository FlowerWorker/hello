-- Your SQL goes here
CREATE TABLE availability_status (
 user_id INTEGER NOT NULL PRIMARY KEY REFERENCES users(id) ,
 status VARCHAR NOT NULL,
 updated_at TIMESTAMP NOT NULL DEFAULT NOW()
);