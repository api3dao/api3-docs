---
title: Voting
pageHeader: DAO
outline: deep
---

<PageHeader/>

# Voting

Proposals of the API3 DAO are listed in the [api3.eth](https://snapshot.box/#/s:api3.eth) space on snapshot.box.
Voting opens when Snapshot's sequencer accepts a proposal, with no delay, and closes seven days later.

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
- If you delegated on Snapshot, your base voting power goes to your delegate.
  You can still vote with incoming Snapshot delegations.
  Clear your delegation before the proposal's block to vote with your own holdings (see [Delegation](/dao/voting-power#delegation)).
- Abstain is not on the ballot.
  The ballot shows For and Against, the abstain option is hidden, and an abstain cast through the Snapshot API counts for nothing.
- To vote from a Safe, open Snapshot inside the Safe app and collect the required confirmations.
  Confirming a Safe message alone does not guarantee that it was delivered to Snapshot.
  Check that the vote appears in the proposal's vote list before voting closes.

## Posting a proposal

Posting a proposal takes 500,000 API3 of voting power, held or delegated to you.
Snapshot checks it at the latest block when it receives the proposal, and the [independent verification](/dao/verification) checks it again at the proposal's snapshot block.

A proposal says exactly what it asks for: the action, the amount, the recipient, the timing and what counts as done, as far as each applies.
A rule change says which text or setting changes and to what.
The API3 multisigs do not execute a proposal that leaves any of these open.
Snapshot limits the length of a proposal, so the full text goes on IPFS and the Snapshot post carries a summary and the link.

Proposals are discussed on the [API3 Discord](https://discord.gg/api3dao), before or during the vote, and discussion is optional.

1. Open [New proposal](https://snapshot.box/#/s:api3.eth/create) in the space and connect the wallet that holds the voting power.
2. Write the title, and a summary with the link to the full text as the body.
   The voting system is basic voting with the choices For and Against.
3. Leave the snapshot block at its default, the latest block (see [Snapshot block](#snapshot-block)).
4. Publish by signing.
   Voting starts when the sequencer accepts the proposal.

To post from a Safe, open snapshot.box in the Safe app, collect the required confirmations within a day of the first signature and deliver the signed proposal to Snapshot.
Check that the proposal appears in the space.
The author can delete their own proposal.

### Snapshot block

The author picks the block when posting, and Snapshot only checks that the block exists.
The DAO's rule is that the block is at most 7,200 blocks, about a day, before Snapshot received the proposal.
A proposal outside this window is not verified and is not executed.

Snapshot sets the proposal's creation time when its sequencer accepts it and moves a signed start time in the past forward, so voting always runs the full seven days from acceptance.
The snapshot block is fixed when the proposal is prepared, so a Safe has to collect its confirmations and deliver the proposal while the block is still within the window.

## Passing

A proposal passes when at least 10,000,000 API3 was cast in favour and there are more votes for than against.

Snapshot's quorum bar counts every vote cast, against included, while the DAO's rule counts the votes in favour only.
The bar on snapshot.box can therefore show the quorum as met before the rule is.
The [independent verification](/dao/verification) applies the rule.

## Execution

Within seven days of passing, the [API3 multisigs](/dao/#treasuries) verify the result and execute the proposal.
They also check that the proposal is fully specified and that the [charter](/dao/#governing-proposal) does not rule it out.
If they cannot execute in time, they say so publicly before the seven days are up, with the reason and a new date at most seven days later, once per proposal.

A proposal that changes the rules of governance executes 30 days after passing, and a proposal that cancels such a change executes within seven days.
The rules of governance are the voting rules, the DAO's [mandate and charter](/dao/#governing-proposal), the voting power strategy, the space settings, the verification tool, the ownership of `api3.eth` and which multisig holds the treasury or executes.
An emergency move to a new Safe under the charter is confirmed by a proposal afterwards.
Whether a proposal is a rule change follows from its content, not from anything the author declares.

## Space settings

The settings of the `api3.eth` space that carry these rules, as set on Snapshot:

| Setting            | Value                        |
| ------------------ | ---------------------------- |
| Network            | Ethereum mainnet             |
| Voting type        | Basic                        |
| Proposal threshold | 500,000 API3                 |
| Voting delay       | None                         |
| Voting period      | 7 days                       |
| Quorum             | 10,000,000 API3 in favour    |
| Abstain            | Hidden                       |
| Vote privacy       | Public                       |
| Who can vote       | Any voting power holder      |
| Posting access     | Anyone meeting the threshold |

Snapshot enforces the threshold, the voting type and the timing.
The quorum in favour, the majority and the 30 days of a rule change are checked by the API3 multisigs before executing, with the [independent verification](/dao/verification).
