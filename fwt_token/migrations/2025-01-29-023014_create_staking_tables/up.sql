CREATE TABLE staking_positions (
    id BIGSERIAL PRIMARY KEY,
    user_pubkey VARCHAR NOT NULL,
    staked_amount BIGINT NOT NULL,
    lock_period_days INT NOT NULL DEFAULT 0,
    created_at TIMESTAMP NOT NULL DEFAULT NOW()
);

-- You can create more tables here if needed
