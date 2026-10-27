---
title: Proposals
pageHeader: DAO
outline: deep
---

<PageHeader/>

# Proposals

## Who can post

Posting a proposal takes 500,000 API3 of voting power, held or delegated to you.
Snapshot checks it at the latest block when it receives the proposal, and the [verification](/dao/verification) checks it again at the proposal's snapshot block.

## Posting

Proposals are discussed on the [API3 Discord](https://discord.gg/api3dao).

1. Open [New proposal](https://snapshot.box/#/s:api3.eth/create) in the space and connect the wallet that holds the voting power.
2. Write the title and the body.
   The voting system is basic voting with the choices For and Against.
3. Leave the snapshot block at its default, the latest block (see [Snapshot block](#snapshot-block)).
4. Publish by signing.
   Voting starts at once.

To post from a Safe, open snapshot.box in the Safe app and collect the signatures within a day, since the proposal has to reach Snapshot within a day of the signed timestamp.
The author can delete their own proposal.

## Snapshot block

The author picks the block when posting, and Snapshot only checks that the block exists.
The DAO's rule is that the block is not later than the signed timestamp and at most 7,200 blocks, about a day, before the proposal was posted.
A proposal measured at a block outside this window is not verified and is not executed.
The signed timestamp has to precede Snapshot's receipt of the proposal by at most a day, since voting starts at the signed timestamp and a backdated signature would shorten the seven days.

## Timing

Voting starts when the proposal is posted, with no delay, and runs seven days.

## Passing

A proposal passes when at least 10,000,000 API3 was cast in favour and there are more votes for than against.

Snapshot's quorum bar counts every vote cast, against included, while the DAO's rule counts the votes in favour only.
The bar on snapshot.box can therefore show the quorum as met before the rule is.
The [verification](/dao/verification) applies the rule.

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
The quorum in favour, the majority and the 30 days of a rule change are checked by the API3 multisigs before executing, with the [verification](/dao/verification).
