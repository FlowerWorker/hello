-- Your SQL goes here
CREATE TABLE user_profiles (
   user_id INTEGER NOT NULL PRIMARY KEY REFERENCES users(id),
   full_name VARCHAR NOT NULL,
   email VARCHAR NOT NULL,
   phone_number VARCHAR NOT NULL,
   department_or_team VARCHAR NOT NULL,
   job_title VARCHAR NOT NULL,
   created_at TIMESTAMP NOT NULL DEFAULT NOW(),
   updated_at TIMESTAMP NOT NULL DEFAULT NOW()
);
