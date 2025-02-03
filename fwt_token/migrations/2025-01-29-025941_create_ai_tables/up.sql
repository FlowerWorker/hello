CREATE TABLE ai_consultants (
    id SERIAL PRIMARY KEY,
    consultant_pubkey TEXT NOT NULL,
    consultant_skills TEXT NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT now()
);

CREATE TABLE ai_matches (
    id SERIAL PRIMARY KEY,
    consultant_id INT REFERENCES ai_consultants(id),
    client_requirements TEXT NOT NULL,
    match_timestamp TIMESTAMP NOT NULL DEFAULT now()
);-- Your SQL goes here
