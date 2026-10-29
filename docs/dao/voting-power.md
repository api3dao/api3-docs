---
title: Voting power
pageHeader: DAO
outline: deep
---

<PageHeader/>

# Voting power

Voting power is counted in API3: each API3 held in one of the places below is one vote.
Staking is not needed to vote, and any amount votes.
The 500,000 API3 threshold applies to posting a proposal, not to voting.
Snapshot shows voting power under the symbol vpAPI3.

## What counts

At the block a proposal is measured at, your base voting power is the sum of:

- API3 in your wallet.
- API3 staked in the DAO pool, locked rewards included.
  Stake you delegated inside the pool counts for your delegate instead, and stake delegated to you counts for you unless you delegated inside the pool yourself.
- API3 deposited in the pool but not staked, including API3 whose unstaking has completed but was not withdrawn yet.
- API3 scheduled for unstaking, during the waiting period.
- API3 posted as collateral in the Kabu API3/USDC market on Morpho.

API3 held for you by an exchange or custodian does not count as yours.
Neither do liquidity pool tokens, lending receipts or tokens bridged to another chain.

API3 held by other contracts counts for you only if the contract explicitly delegates its own API3 token balance to you on Snapshot.
Owning a share of a contract does not give you voting power over its underlying assets.

[Snapshot delegation](#snapshot-delegation) applies on top of this sum: a delegation gives all of it to the delegate.
Power delegated to you on Snapshot is added separately and is not delegated onward.

## When it is measured

Each proposal names a block, chosen by its author when posting.
Voting power is read at that block and does not change for the rest of the vote.
Tokens bought, staked, moved or delegated after that block count from the next proposal on.
The block is at most 7,200 blocks, about a day, before the proposal was posted (see [Snapshot block](/dao/voting#snapshot-block)).

The vote dialog of a proposal on snapshot.box shows your voting power at its block.

## How it is computed

The space computes voting power with Snapshot's `with-delegation` strategy, which applies Snapshot delegation on top of five sources read on Ethereum mainnet.
The strategy is set in the [space settings](https://snapshot.box/#/s:api3.eth/settings) on Snapshot.

| Source                    | Contract                                                | Read                                                                                                                                           |
| ------------------------- | ------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------- |
| API3 in the wallet        | API3 token `0x0b38210ea11411557c13457D4dA7dC6ea731B88a` | The token balance                                                                                                                              |
| API3 staked               | API3 pool `0x6dd655f10d4b9E242aE186D9050B68F725c76d76`  | `userVotingPower`, the user's own shares plus the shares delegated to them in the pool, converted to API3 with `totalStake` over `totalShares` |
| API3 deposited            | API3 pool                                               | `users`, the `unstaked` field                                                                                                                  |
| API3 unstaking            | API3 pool                                               | `users`, the `unstakeAmount` field                                                                                                             |
| API3 as Morpho collateral | Morpho `0xBBBBBbbBBb9cC5e90e3b3Af64bdAF62C37EEFFCb`     | `position`, the `collateral` field, in the Kabu API3/USDC market `0x70dfbd2705d10d5dfb4d89e07e2bb860b5a624ce2f97e209ab9f5308bf6c67a1`          |

Reading `userVotingPower` rather than the user's own stake is what makes pool delegation apply: the pool reports a delegating user's shares under the delegate and gives the delegating user zero.

## Delegation

Delegation hands your voting power to another address, which votes with it.
There are two kinds, and they behave differently.

|                                              | Pool delegation                                   | Snapshot delegation                                                            |
| -------------------------------------------- | ------------------------------------------------- | ------------------------------------------------------------------------------ |
| Made in                                      | The pool contract                                 | The [Delegates](https://snapshot.box/#/s:api3.eth/delegates) page of the space |
| What is delegated                            | Your stake in the pool                            | Your base voting power, stake delegated to you in the pool included            |
| Follows a delegate who delegates on Snapshot | Yes                                               | No                                                                             |
| Changing it                                  | A transaction, then a week before the next change | A transaction                                                                  |

### Pool delegation

Existing pool delegations carry over for the stake only.
If you delegated your stake in the pool, it keeps voting with your delegate.
Your wallet balance, deposits, unstaking amount and collateral still vote with you.

The pool refuses a delegation change within a week of the last one.
After delegating, you wait a week before you can undelegate or change the delegate, and after undelegating, a week before you can delegate again.

The legacy dashboard stays online until the end of March 2028 for unstaking, withdrawing and undelegating, and its Undelegate button clears a pool delegation.
To inspect or change a pool delegation without the dashboard, follow [Using the pool on Etherscan](https://dao-docs.api3.org/members/etherscan.html#changing-a-pool-delegation) in the legacy documentation.
The pool refuses a new delegate who is already delegating inside the pool.

### Snapshot delegation

Snapshot delegation gives your delegate your base voting power, stake that others delegated to you in the pool included.
You can still vote with power delegated to you on Snapshot, because Snapshot delegation does not chain.
If you have no incoming Snapshot delegations, your voting power is zero.
It is recorded in Snapshot's delegate registry on Ethereum mainnet, so setting, changing or clearing it is a transaction.

A delegation can be set under `api3.eth` or under all spaces.
A delegation under `api3.eth` overrides one under all spaces.

To delegate, open the [Delegates](https://snapshot.box/#/s:api3.eth/delegates) page of the space, connect your wallet, choose the delegate and sign the transaction.

### Details that matter

- Snapshot delegation does not chain.
  If you delegate to someone who has delegated to a third person, your power stays with your delegate, who votes with it.
  Only their own holdings go on to the third person.
- Pool delegation does pass through.
  If you delegated your stake in the pool to someone who delegates on Snapshot, your stake follows them to their delegate.
- A pool delegation to someone who has since delegated inside the pool counts for nobody.
  The pool gives a delegating user no voting power at all, received delegations included, and does not pass them on.
  Re-delegate or undelegate in the pool to fix it.
- Voting yourself after delegating does not take your base voting power back from your delegate.
  You can still use any incoming Snapshot delegations.
  To vote with your own holdings again, clear the applicable space and all-spaces delegations before the proposal's block.
- Changing or clearing a delegation counts from the next proposal's block.
  A proposal already posted keeps the delegations as they were at its block.
- To put your own holdings with one delegate, clear any outgoing pool delegation first, then delegate on Snapshot.
  While a pool delegation stands, that stake follows the pool delegate's Snapshot delegation, not yours.
  Incoming Snapshot delegations stay with you and cannot be passed on.

## Other cases

- API3 held for you by an exchange or a custodian is in their wallet, not yours, and does not vote as yours.
- A Safe can vote directly through the Safe app (see [Voting](/dao/voting)).
  Other contract wallets need a compatible signing method or must explicitly delegate their own API3 balance.
- Collateral on Morpho counts for the owner of the position, in the Kabu API3/USDC market only.
  Borrowing against it changes nothing.
- The Vault votes with the pool stake delegated to it.
  The Agent and Treasury delegate their own voting power to a dead address and do not vote (see [Treasuries](/dao/#treasuries)).
