---
title: Snapshot assumptions
pageHeader: DAO
outline: deep
---

<PageHeader/>

# Snapshot assumptions

Snapshot voting is off-chain.
The [independent verification](/dao/verification) recomputes voting power and the tally, while vote collection still relies on Snapshot.

## Vote collection

The Snapshot sequencer receives signed votes and decides whether they arrived before the deadline.
The hub supplies the list of accepted votes.
A signature proves who signed a vote and what they signed, including its timestamp, but does not independently prove when Snapshot received it.

Snapshot cannot forge a voter's signature.
It could omit a signed vote or accept one after the deadline with a backdated signed timestamp.
Recomputing the final tally alone cannot rule those cases out.
Voters should check that their vote appears in the proposal's vote list.

The verification tool archives the vote list on each run and compares it with the previous archive.
Running it at least daily while voting is open, and again at the close, helps detect votes that were inserted, removed or changed.
Those archives improve visibility into changes, but do not remove the trust in Snapshot's receipt and inclusion of votes.

## Proposal timing

Snapshot sets a proposal's creation time when the sequencer accepts it.
If its signed start time is in the past, the sequencer moves the start forward and keeps the full configured voting period.
For `api3.eth`, voting starts without a delay and runs for seven days.
Time spent collecting Safe confirmations does not shorten that period.

The snapshot block is still the block chosen when preparing the proposal.
It can become too old while confirmations are collected, so a proposal must also meet the DAO's [snapshot block window](/dao/voting#snapshot-block).

## Voting power and settings

The verifier reads balances and contract state from an Ethereum archive RPC at the proposal's snapshot block, and delegations from the delegate registry's events.
It does not use Snapshot's score API or delegation subgraph for that recomputation.
The RPC must serve the correct Ethereum history.

The recomputation uses the strategies recorded on the proposal.
Agreement with those strategies does not itself establish that a strategy or settings change was authorized.
The API3 multisigs also check that the proposal uses the DAO's approved governance rules before executing it.

## Execution

A passed Snapshot vote does not automatically move funds or change contracts.
The [DAO multisigs](/dao/#dao-multisigs) execute the verified result under the [governing proposal](/dao/#governing-proposal), including the execution period for a change to the rules of governance.
