use solana_program::{
    account_info::{next_account_info, AccountInfo},
    entrypoint::ProgramResult,
    msg,
    program::invoke,
    pubkey::Pubkey,
};
use spl_token::instruction as token_ix;
use std::collections::HashMap;

pub struct StakingContract {
    total_staked: u64,
    user_stakes: HashMap<String, u64>,
    lock_period: HashMap<String, u64>,
    reward_pool: u64,
    penalty_pool: u64,
    // Remove user_votes from here if it's only used in governance:
    // user_votes: HashMap<String, HashMap<u64, bool>>,
}

impl StakingContract {
    pub fn new() -> Self {
        StakingContract {
            total_staked: 0,
            user_stakes: HashMap::new(),
            lock_period: HashMap::new(),
            reward_pool: 0,
            penalty_pool: 0,
        }
    }

    pub fn stake_tokens(
        &mut self,
        program_id: &Pubkey,
        accounts: &[AccountInfo],
        amount: u64,
        lock_period_in_days: u64,
    ) -> ProgramResult {
        let account_info_iter = &mut accounts.iter();
        let staker_acc = next_account_info(account_info_iter)?;
        let pool_acc = next_account_info(account_info_iter)?;
        let staker_auth = next_account_info(account_info_iter)?;

        msg!(
            "Staking {} tokens from staker to pool with lock period of {} days",
            amount,
            lock_period_in_days
        );

        self.total_staked += amount;
        self.user_stakes.insert(staker_acc.key.to_string(), amount);
        self.lock_period
            .insert(staker_acc.key.to_string(), lock_period_in_days);

        let ix = token_ix::transfer(
            &spl_token::id(),
            staker_acc.key,
            pool_acc.key,
            staker_auth.key,
            &[],
            amount,
        )?;
        invoke(&ix, &[staker_acc.clone(), pool_acc.clone(), staker_auth.clone()])?;

        Ok(())
    }

    pub fn unstake_tokens(
        &mut self,
        program_id: &Pubkey,
        accounts: &[AccountInfo],
        _amount: u64,
    ) -> ProgramResult {
        let account_info_iter = &mut accounts.iter();
        let pool_acc = next_account_info(account_info_iter)?;
        let staker_acc = next_account_info(account_info_iter)?;
        let staker_auth = next_account_info(account_info_iter)?;

        msg!("Unstaking tokens from pool to staker");

        let lock_period = *self.lock_period.get(&staker_acc.key.to_string()).unwrap_or(&0);
        let staked_amount = *self.user_stakes.get(&staker_acc.key.to_string()).unwrap_or(&0);

        let penalty = if lock_period > 180 {
            10
        } else if lock_period > 90 {
            7
        } else {
            5
        };

        let penalty_amount = (staked_amount * penalty) / 100;
        let final_amount = staked_amount.saturating_sub(penalty_amount);

        self.user_stakes.remove(&staker_acc.key.to_string());
        self.lock_period.remove(&staker_acc.key.to_string());
        self.total_staked = self.total_staked.saturating_sub(staked_amount);

        self.penalty_pool += penalty_amount;

        let ix = token_ix::transfer(
            &spl_token::id(),
            pool_acc.key,
            staker_acc.key,
            staker_auth.key,
            &[],
            final_amount,
        )?;
        invoke(&ix, &[pool_acc.clone(), staker_acc.clone(), staker_auth.clone()])?;

        self.redistribute_penalty();

        Ok(())
    }

    pub fn redistribute_penalty(&mut self) {
        // If total_staked < penalty_pool, be careful with underflow:
        let total_remaining_staked = self.total_staked.saturating_sub(self.penalty_pool);

        for user in self.user_stakes.keys() {
            let user_stake = *self.user_stakes.get(user).unwrap_or(&0);
            if total_remaining_staked == 0 {
                // Edge case: if no one is staked
                break;
            }
            let user_share = user_stake as f64 / total_remaining_staked as f64;
            let redistributed_penalty = (self.penalty_pool as f64 * user_share) as u64;
            // Implementation: normally you'd transfer to user
        }

        self.penalty_pool = 0;
    }

    pub fn calculate_rewards(&self, user: String) -> u64 {
        if self.total_staked == 0 {
            return 0;
        }
        let user_share = *self.user_stakes.get(&user).unwrap_or(&0) as f64 / self.total_staked as f64;
        let reward = (user_share * self.reward_pool as f64) as u64;

        let lock_period = self.lock_period.get(&user).unwrap_or(&0);
        let multiplier = match *lock_period {
            30 => 1.0,
            90 => 1.25,
            180 => 1.5,
            _ => 1.0,
        };

        (reward as f64 * multiplier) as u64
    }

    pub fn distribute_rewards(&self) {
        for user in self.user_stakes.keys() {
            let reward = self.calculate_rewards(user.clone());
            // Transfer reward to user, etc.
        }
    }

    pub fn calculate_governance_rewards(&self, _user: String) -> u64 {
        // If you truly want governance logic here, either replicate or remove entirely if it’s only in governance.
        0
    }

    // If you do keep a “governance participation” concept, remove references to user_votes unless you define it here.
    pub fn calculate_governance_participation(&self, _user: String) -> f64 {
        1.0
    }

    pub fn distribute_staking_and_governance_rewards(&self) {
        for user in self.user_stakes.keys() {
            let staking_reward = self.calculate_rewards(user.clone());
            let governance_reward = self.calculate_governance_rewards(user.clone());
            let total_reward = staking_reward + governance_reward;
            // Transfer total_reward
        }
    }

    pub fn update_reward_pool(&mut self, year: u64) {
        match year {
            1 => self.reward_pool = 15_000_000,
            2 => self.reward_pool = 14_000_000,
            3 => self.reward_pool = 13_000_000,
            _ => self.reward_pool = 12_000_000,
        }
    }
}