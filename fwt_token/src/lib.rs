use solana_program::{
    account_info::{next_account_info, AccountInfo},
    entrypoint,
    entrypoint::ProgramResult,
    msg,
    program::invoke,
    pubkey::Pubkey,
};
use tokio::runtime::Runtime;

mod ai_contract;
mod governance_contract;
mod staking_contract;
mod cross_chain_bridge_contract;

// Main TokenContract struct
pub struct TokenContract;

impl TokenContract {
    /// Initialize a token
    pub fn initialize_token(
        _program_id: &Pubkey,
        _accounts: &[AccountInfo],
    ) -> ProgramResult {
        msg!("Initializing token...");
        Ok(())
    }

    /// Transfer tokens
    pub fn transfer_tokens(
        _program_id: &Pubkey,
        _accounts: &[AccountInfo],
        amount: u64,
    ) -> ProgramResult {
        msg!("Transferring tokens: {}", amount);
        Ok(())
    }

    /// Burn tokens
    pub fn burn_tokens(
        _program_id: &Pubkey,
        _accounts: &[AccountInfo],
        amount: u64,
    ) -> ProgramResult {
        msg!("Burning tokens: {}", amount);
        Ok(())
    }
}

#[allow(dead_code)]
pub fn distribute_rewards(
    _program_id: &Pubkey,
    _accounts: &[AccountInfo],
    reward: u64,
) -> ProgramResult {
    msg!("Distributing rewards: {}", reward);
    Ok(())
}

// Entrypoint for the Solana program
entrypoint!(process_instruction);

fn process_instruction(
    program_id: &Pubkey,
    accounts: &[AccountInfo],
    data: &[u8],
) -> ProgramResult {
    if data.is_empty() {
        return Err(solana_program::program_error::ProgramError::InvalidInstructionData);
    }

    let (tag, rest) = data.split_at(1);

    match tag[0] {
        0 => TokenContract::initialize_token(program_id, accounts),
        1 => {
            let amount = parse_amount(rest)?;
            TokenContract::transfer_tokens(program_id, accounts, amount)
        }
        2 => {
            let amount = parse_amount(rest)?;
            TokenContract::burn_tokens(program_id, accounts, amount)
        }
        3 => {
            // Stake
            let amount = parse_amount(rest)?;
            let lock_period_in_days = parse_amount(&rest[8..])?;
            let mut staking_contract = staking_contract::StakingContract::new();
            staking_contract.stake_tokens(program_id, accounts, amount, lock_period_in_days)
        }
        4 => {
            // Unstake
            let amount = parse_amount(rest)?;
            let mut staking_contract = staking_contract::StakingContract::new();
            staking_contract.unstake_tokens(program_id, accounts, amount)
        }
        5 => {
            // Governance: create proposal
            let description = String::from_utf8_lossy(rest);
            let mut governance = governance_contract::GovernanceContract::new();
            governance.create_proposal(program_id, accounts, &description)
        }
        6 => {
            // Governance: execute proposal
            let proposal_id = parse_amount(rest)?;
            let mut governance = governance_contract::GovernanceContract::new();
            governance.execute_proposal(program_id, accounts, proposal_id)
        }
        7 => {
            // Governance: vote on proposal
            let proposal_id = parse_amount(rest)?;
            let vote = rest.get(8).cloned().unwrap_or(0) == 1;
            let mut governance = governance_contract::GovernanceContract::new();
            governance.vote_on_proposal(program_id, accounts, proposal_id, vote)
        }
        8 => {
            // Cross-chain bridge: lock tokens
            let amount = parse_amount(rest)?;
            cross_chain_bridge_contract::CrossChainBridge::lock_tokens_for_bridge(program_id, accounts, amount)
        }
        9 => {
            // Cross-chain bridge: release tokens
            let target_chain = String::from_utf8_lossy(rest);
            cross_chain_bridge_contract::CrossChainBridge::release_tokens_on_target_chain(&target_chain, 100)
        }
        10 => {
            // AI service
            let client_requirements = String::from_utf8_lossy(rest).to_string();
            let rt = Runtime::new().expect("Failed to create runtime");
            match rt.block_on(ai_contract::match_consultant(&client_requirements)) {
                Ok(_) => Ok(()),
                Err(_) => Err(solana_program::program_error::ProgramError::Custom(1)),
            }
        }
        _ => Err(solana_program::program_error::ProgramError::InvalidInstructionData),
    }
}

fn parse_amount(data: &[u8]) -> Result<u64, solana_program::program_error::ProgramError> {
    if data.len() < 8 {
        return Err(solana_program::program_error::ProgramError::InvalidInstructionData);
    }
    let mut bytes = [0u8; 8];
    bytes.copy_from_slice(&data[..8]);
    Ok(u64::from_le_bytes(bytes))
}

#[cfg(test)]
mod tests {
    use super::*;
    use solana_program::pubkey::Pubkey;
    use solana_program::account_info::AccountInfo;

    const TEST_DATA_LEN: usize = 128;
    const TEST_LAMPORTS: u64 = 1_000_000;

    #[test]
    fn test_initialize_1b_supply() {
        let program_id = Pubkey::new_unique();
        let mint_pubkey = Pubkey::new_unique();
        let payer_pubkey = Pubkey::new_unique();

        let mut mint_lamports = TEST_LAMPORTS;
        let mut payer_lamports = TEST_LAMPORTS;
        let mut mint_data = vec![0u8; TEST_DATA_LEN];
        let mut payer_data = vec![0u8; TEST_DATA_LEN];

        let mint_acc = AccountInfo::new(
            &mint_pubkey,
            true,
            true,
            &mut mint_lamports,
            &mut mint_data,
            &program_id,
            false,
            Default::default(),
        );
        let payer_acc = AccountInfo::new(
            &payer_pubkey,
            false,
            true,
            &mut payer_lamports,
            &mut payer_data,
            &program_id,
            false,
            Default::default(),
        );

        let accounts = vec![mint_acc, payer_acc];
        let res = TokenContract::initialize_token(&program_id, &accounts);
        assert!(res.is_ok());
    }

    #[test]
    fn test_transfer_tokens() {
        let program_id = Pubkey::new_unique();
        let sender_pubkey = Pubkey::new_unique();
        let receiver_pubkey = Pubkey::new_unique();
        let auth_pubkey = Pubkey::new_unique();

        let mut sender_lamports = TEST_LAMPORTS;
        let mut receiver_lamports = 0;
        let mut auth_lamports = 0;

        let mut sender_data = vec![0u8; TEST_DATA_LEN];
        let mut receiver_data = vec![0u8; TEST_DATA_LEN];
        let mut auth_data = vec![0u8; 64];

        let sender_acc = AccountInfo::new(
            &sender_pubkey,
            true,
            true,
            &mut sender_lamports,
            &mut sender_data,
            &program_id,
            false,
            Default::default(),
        );
        let receiver_acc = AccountInfo::new(
            &receiver_pubkey,
            false,
            true,
            &mut receiver_lamports,
            &mut receiver_data,
            &program_id,
            false,
            Default::default(),
        );
        let auth_acc = AccountInfo::new(
            &auth_pubkey,
            true,
            true,
            &mut auth_lamports,
            &mut auth_data,
            &program_id,
            false,
            Default::default(),
        );

        let accounts = vec![sender_acc, receiver_acc, auth_acc];
        let res = TokenContract::transfer_tokens(&program_id, &accounts, 500);
        assert!(res.is_ok());
    }
}