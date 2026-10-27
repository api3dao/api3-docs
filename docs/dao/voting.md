---
title: Voting
pageHeader: DAO
outline: deep
---

<PageHeader/>

# Voting

Proposals of the API3 DAO are listed in the [api3.eth](https://snapshot.box/#/s:api3.eth) space on snapshot.box.
Voting opens when a proposal is posted and closes seven days later.

## Casting a vote

1. Open the proposal on snapshot.box and connect the wallet that holds the voting power.
2. Choose For or Against.
3. Sign the vote.
   It is a signature, not a transaction, and costs no gas.

Your vote appears in the proposal's vote list with the voting power it carries.
Votes are public while the proposal is open.

## Rules to know

- Your voting power is read at the block the proposal names, so tokens or delegations changed after that block do not count (see [Voting power](/dao/voting-power#when-it-is-measured)).
- Voting has no minimum.
- If you delegated on Snapshot, your own power is zero and voting yourself does nothing.
  Clear the delegation before the proposal's block to vote yourself (see [Delegation](/dao/delegation)).
- Abstain is not on the ballot.
  The ballot shows For and Against, the abstain option is hidden, and an abstain cast through the Snapshot API counts for nothing.
- A Safe or another contract wallet votes by signing through the Safe app.
- A proposal passes with at least 10,000,000 API3 in favour and more votes for than against (see [Proposals](/dao/proposals#passing)).
