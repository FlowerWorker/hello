use solana_program::{
    account_info::{next_account_info, AccountInfo},
    entrypoint::ProgramResult,
    msg,
    program::invoke,
    pubkey::Pubkey,
};
use spl_token::instruction as token_ix;
use std::collections::HashMap;

pub struct GovernanceContract {
    total_staked: u64,
    user_stakes: HashMap<String, u64>,
    lock_period: HashMap<String, u64>,
    reward_pool: u64,
    penalty_pool: u64,
    user_votes: HashMap<String, HashMap<u64, bool>>, // user -> (proposal_id -> bool)
}

impl GovernanceContract {
    pub fn new() -> Self {
        GovernanceContract {
            total_staked: 0,
            user_stakes: HashMap::new(),
            lock_period: HashMap::new(),
            reward_pool: 0,
            penalty_pool: 0,
            user_votes: HashMap::new(),
        }
    }

    pub fn create_proposal(
        &mut self,
        _program_id: &Pubkey,
        _accounts: &[AccountInfo],
        description: &str,
    ) -> ProgramResult {
        msg!("Created proposal with description: {}", description);
        Ok(())
    }

    pub fn execute_proposal(
        &mut self,
        _program_id: &Pubkey,
        _accounts: &[AccountInfo],
        proposal_id: u64,
    ) -> ProgramResult {
        msg!("Executing proposal with ID: {}", proposal_id);
        Ok(())
    }

    pub fn vote_on_proposal(
        &mut self,
        _program_id: &Pubkey,
        accounts: &[AccountInfo],
        proposal_id: u64,
        vote_in_favor: bool,
    ) -> ProgramResult {
        msg!("Voting on proposal: {}, in favor: {}", proposal_id, vote_in_favor);

        let account_info_iter = &mut accounts.iter();
        let voter_acc = next_account_info(account_info_iter)?;
        let voter_key = voter_acc.key.to_string();
        let vote_map = self.user_votes.entry(voter_key).or_insert_with(HashMap::new);
        vote_map.insert(proposal_id, vote_in_favor);

        Ok(())
    }
}