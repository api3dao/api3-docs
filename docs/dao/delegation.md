---
title: Delegation
pageHeader: DAO
outline: deep
---

<PageHeader/>

# Delegation

Delegation hands your voting power to another address, which votes with it.
There are two kinds, and they behave differently.

|                                              | Pool delegation                    | Snapshot delegation                                                            |
| -------------------------------------------- | ---------------------------------- | ------------------------------------------------------------------------------ |
| Made in                                      | The DAO dashboard                  | The [Delegates](https://snapshot.box/#/s:api3.eth/delegates) page of the space |
| What moves                                   | Your stake in the pool             | Everything that counts for you, stake delegated to you in the pool included    |
| Follows a delegate who delegates on Snapshot | Yes                                | No                                                                             |
| Changing it                                  | A transaction, at most once a week | A transaction                                                                  |

## Pool delegation

Pool delegation is made in the DAO dashboard and carries over for the stake only.
If you delegated your stake in the pool, it keeps voting with your delegate.
Your wallet balance, deposits, unstaking amount and collateral still vote with you.
The pool allows one delegation change a week.

The dashboard dates from the Aragon-based DAO (see [Before Snapshot](/dao/#before-snapshot)), and the [legacy documentation](https://old-docs.api3.org/dao-members/dashboard/voting.html) describes delegating in it.

## Snapshot delegation

Snapshot delegation moves everything you hold to your delegate, stake that others delegated to you in the pool included.
You then vote with zero.
It is recorded in Snapshot's delegate registry on Ethereum mainnet, so setting, changing or clearing it is a transaction.

A delegation can be set under `api3.eth` or under all spaces.
A delegation under `api3.eth` overrides one under all spaces.

To delegate, open the [Delegates](https://snapshot.box/#/s:api3.eth/delegates) page of the space, connect your wallet, choose the delegate and sign the transaction.

## Details that matter

- Snapshot delegation does not chain.
  If you delegate to someone who has delegated to a third person, your power stays with your delegate, who votes with it.
  Only their own holdings move on.
- Pool delegation does pass through.
  If you delegated your stake in the pool to someone who delegates on Snapshot, your stake follows them to their delegate.
- A pool delegation to someone who has since delegated inside the pool counts for nobody.
  The pool gives a delegating user no voting power at all, received delegations included, and does not pass them on.
  Re-delegate or undelegate in the pool to fix it.
- Voting yourself after delegating does nothing.
  Your own power is zero while the delegation stands.
  Clear it before the proposal's block to vote yourself.
- Changing or clearing a delegation counts from the next proposal's block.
  A proposal already posted keeps the delegations as they were at its block.
- To put everything with one delegate, delegate on Snapshot.
  Pool delegation alone leaves the rest of your holdings with you.
