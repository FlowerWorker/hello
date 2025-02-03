-- Your SQL goes here
CREATE TABLE governance_proposals (
    id SERIAL PRIMARY KEY,
    proposal_text TEXT NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT now()
);

CREATE TABLE governance_votes (
    id SERIAL PRIMARY KEY,
    proposal_id INT REFERENCES governance_proposals(id),
    voter_pubkey TEXT NOT NULL,
    vote BOOLEAN NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT now()
);