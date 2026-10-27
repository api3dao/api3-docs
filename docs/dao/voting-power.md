---
title: Voting power
pageHeader: DAO
outline: deep
---

<PageHeader/>

# Voting power

One API3 is one vote, wherever it sits.
Staking is not needed to vote, and voting has no minimum.
Snapshot shows voting power under the symbol vpAPI3.

## What counts

At the block a proposal is measured at, your voting power is the sum of:

- API3 in your wallet.
- API3 staked in the DAO pool, locked rewards included.
  Stake you delegated inside the pool counts for your delegate instead, and stake delegated to you counts for you unless you delegated inside the pool yourself.
- API3 deposited in the pool but not staked, including API3 whose unstaking has completed but was not withdrawn yet.
- API3 scheduled for unstaking, during the waiting period.
- API3 posted as collateral in the Kabu API3/USDC market on Morpho.

Nothing else counts: API3 on an exchange, in a liquidity pool, lent out, bridged to another chain or held in any other contract.

[Snapshot delegation](/dao/delegation#snapshot-delegation) applies on top of this sum: a delegation moves all of it to the delegate.

## When it is measured

Each proposal names a block, chosen by its author when posting.
Voting power is read at that block and does not change for the rest of the vote.
Tokens bought, staked, moved or delegated after that block count from the next proposal on.
The block is at most 7,200 blocks, about a day, before the proposal was posted (see [Snapshot block](/dao/proposals#snapshot-block)).

## How it is computed

The space computes voting power with Snapshot's `with-delegation` strategy, which applies Snapshot delegation on top of five sources read on Ethereum mainnet.
The strategy is set in the [space settings](https://snapshot.box/#/s:api3.eth/settings) on Snapshot, and the [verification](/dao/verification) recomputes it from the chain.

| Source                    | Contract                                                | Read                                                                                                                                           |
| ------------------------- | ------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------- |
| API3 in the wallet        | API3 token `0x0b38210ea11411557c13457D4dA7dC6ea731B88a` | The token balance                                                                                                                              |
| API3 staked               | API3 pool `0x6dd655f10d4b9E242aE186D9050B68F725c76d76`  | `userVotingPower`, the user's own shares plus the shares delegated to them in the pool, converted to API3 with `totalStake` over `totalShares` |
| API3 deposited            | API3 pool                                               | `users`, the `unstaked` field                                                                                                                  |
| API3 unstaking            | API3 pool                                               | `users`, the `unstakeAmount` field                                                                                                             |
| API3 as Morpho collateral | Morpho `0xBBBBBbbBBb9cC5e90e3b3Af64bdAF62C37EEFFCb`     | `position`, the `collateral` field, in the Kabu API3/USDC market `0x70dfbd2705d10d5dfb4d89e07e2bb860b5a624ce2f97e209ab9f5308bf6c67a1`          |

Reading `userVotingPower` rather than the user's own stake is what makes pool delegation apply: the pool reports a delegating user's shares under the delegate and gives the delegating user zero.

## Other cases

- API3 held for you by an exchange or a custodian is in their wallet, not yours, and does not vote as yours.
- A Safe or another contract wallet has voting power like any wallet and votes by signing through the Safe app (see [Voting](/dao/voting)).
- Collateral on Morpho counts for the owner of the position, in the Kabu API3/USDC market only.
  Borrowing against it changes nothing.
- An API3 multisig that pool delegations name votes with the stake delegated to it.
- The API3 multisig that holds the DAO's own API3 has its voting power delegated to a dead address and does not vote.

## Checking your voting power

Open a proposal on [snapshot.box](https://snapshot.box/#/s:api3.eth): the vote dialog shows your voting power at the proposal's block.
The [verification tool](/dao/verification) recomputes it from the chain for any address and block.
