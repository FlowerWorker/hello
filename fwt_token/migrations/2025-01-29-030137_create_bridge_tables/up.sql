CREATE TABLE cross_chain_bridge_locks (
    id SERIAL PRIMARY KEY,
    locker_pubkey TEXT NOT NULL,
    amount_locked NUMERIC(20,0) NOT NULL,        -- or BIGINT, depending on your usage
    source_chain TEXT NOT NULL,
    lock_timestamp TIMESTAMP NOT NULL DEFAULT now()
);

CREATE TABLE cross_chain_bridge_releases (
    id SERIAL PRIMARY KEY,
    receiver_pubkey TEXT NOT NULL,
    amount_released NUMERIC(20,0) NOT NULL,
    target_chain TEXT NOT NULL,
    release_timestamp TIMESTAMP NOT NULL DEFAULT now()
);-- Your SQL goes here
