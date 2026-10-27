---
title: Voting
pageHeader: DAO
outline: deep
---

<PageHeader/>

# Voting

Proposals of the API3 DAO are listed in the [api3.eth](https://snapshot.box/#/s:api3.eth) space on snapshot.box.
Voting opens when a proposal is posted, with no delay, and closes seven days later.

## Casting a vote

1. Open the proposal on snapshot.box and connect the wallet that holds the voting power.
2. Choose For or Against.
3. Sign the vote.
   It is a signature, not a transaction, and costs no gas.

Your vote appears in the proposal's vote list with the voting power it carries.
Votes are public while the proposal is open.

## What to know

- Your voting power is read at the block the proposal names, so tokens or delegations changed after that block do not count (see [Voting power](/dao/voting-power#when-it-is-measured)).
- Any amount of voting power votes.
  The 500,000 API3 threshold applies to posting a proposal, not to voting.
- If you delegated on Snapshot, your own power is zero and voting yourself does nothing.
  Clear the delegation before the proposal's block to vote yourself (see [Delegation](/dao/voting-power#delegation)).
- Abstain is not on the ballot.
  The ballot shows For and Against, the abstain option is hidden, and an abstain cast through the Snapshot API counts for nothing.
- A Safe or another contract wallet votes by signing through the Safe app.

## Posting a proposal

Posting a proposal takes 500,000 API3 of voting power, held or delegated to you.
Snapshot checks it at the latest block when it receives the proposal, and the [independent verification](/dao/verification) checks it again at the proposal's snapshot block.

Proposals are discussed on the [API3 Discord](https://discord.gg/api3dao).

1. Open [New proposal](https://snapshot.box/#/s:api3.eth/create) in the space and connect the wallet that holds the voting power.
2. Write the title and the body.
   The voting system is basic voting with the choices For and Against.
3. Leave the snapshot block at its default, the latest block (see [Snapshot block](#snapshot-block)).
4. Publish by signing.
   Voting starts at once.

To post from a Safe, open snapshot.box in the Safe app and collect the signatures within a day, since the proposal has to reach Snapshot within a day of the signed timestamp.
The author can delete their own proposal.

### Snapshot block

The author picks the block when posting, and Snapshot only checks that the block exists.
The DAO's rule is that the block is not later than the signed timestamp and at most 7,200 blocks, about a day, before the proposal was posted.
A proposal measured at a block outside this window is not verified and is not executed.
The signed timestamp has to precede Snapshot's receipt of the proposal by at most a day, since voting starts at the signed timestamp and a backdated signature would shorten the seven days.

## Passing

A proposal passes when at least 10,000,000 API3 was cast in favour and there are more votes for than against.

Snapshot's quorum bar counts every vote cast, against included, while the DAO's rule counts the votes in favour only.
The bar on snapshot.box can therefore show the quorum as met before the rule is.
The [independent verification](/dao/verification) applies the rule.

## Execution

Within seven days of passing, the API3 multisigs verify the result and execute the proposal.

A proposal that changes the rules of governance executes 30 days after passing, and a proposal that cancels such a change executes within seven days.
The rules of governance are the voting rules, the DAO's mandate, the charter, the voting power strategy, the space settings, the verification tool, the `api3.eth` name and which multisig holds the treasury.
Whether a proposal is a rule change follows from its content, not from anything the author declares.

## Space settings

The settings of the `api3.eth` space that carry these rules, as set on Snapshot:

| Setting            | Value                     |
| ------------------ | ------------------------- |
| Network            | Ethereum mainnet          |
| Voting type        | Basic                     |
| Proposal threshold | 500,000 API3              |
| Voting delay       | None                      |
| Voting period      | 7 days                    |
| Quorum             | 10,000,000 API3 in favour |

Snapshot enforces the threshold, the voting type and the timing.
The quorum in favour, the majority and the 30 days of a rule change are checked by the API3 multisigs before executing, with the [independent verification](/dao/verification).
