---
title: API3 token
pageHeader: DAO
outline: deep
---

<PageHeader/>

# API3 token

API3 is the governance token of the API3 DAO, an ERC-20 token on Ethereum mainnet.

| Property     | Value                                                                                                                 |
| ------------ | --------------------------------------------------------------------------------------------------------------------- |
| Contract     | [`0x0b38210ea11411557c13457D4dA7dC6ea731B88a`](https://etherscan.io/token/0x0b38210ea11411557c13457D4dA7dC6ea731B88a) |
| Symbol       | API3                                                                                                                  |
| Decimals     | 18                                                                                                                    |
| Total supply | 200,000,000 API3                                                                                                      |

## Supply

The contract minted 100,000,000 API3 when it was deployed.
Minting is restricted to addresses its owner marks as minters.
The DAO pool minted the staking rewards of the legacy DAO.

The migration to Snapshot closed the supply.
The pool's minter status was revoked, a final mint to the DAO's treasury multisig brought the supply to 200,000,000 API3, and the contract's ownership was transferred to the dead address, so no address can mint and none can be made a minter.

Any holder can burn their own API3 by opting in as a burner on the contract and calling `burn`.
Nothing can mint it back, so the supply can only fall from here.

## Governance

Each API3 in your wallet, in the DAO pool, scheduled for unstaking or posted as collateral in the Kabu API3/USDC market on Morpho is one vote in the `api3.eth` space (see [Voting power](/dao/voting-power)).
Exchange balances, liquidity pool tokens and tokens bridged to another chain do not count as your voting power.
Other contracts can explicitly delegate their own API3 token balance on Snapshot (see [Voting power](/dao/voting-power#what-counts)).
Posting a proposal takes 500,000 API3 of voting power (see [Posting a proposal](/dao/voting#posting-a-proposal)).

## Staking

The DAO pool of the legacy DAO holds staked API3.
Staking rewards ended with the migration and the pool mints nothing further.
Staking is no longer needed to vote, staked API3 keeps voting as described under [Voting power](/dao/voting-power#what-counts), and unstaking and withdrawing work as before.
The [legacy documentation](https://dao-docs.api3.org/members/staking.html) describes the pool.

## Collateral on Morpho

The [Kabu API3/USDC market](https://app.morpho.org/ethereum/market/0x70dfbd2705d10d5dfb4d89e07e2bb860b5a624ce2f97e209ab9f5308bf6c67a1) on Morpho takes API3 as collateral for borrowing USDC.
API3 posted there counts as voting power for the owner of the position, borrowed or not.
