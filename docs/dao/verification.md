---
title: Independent verification
pageHeader: DAO
outline: deep
---

<PageHeader/>

# Independent verification

The DAO relies on Snapshot to run its votes.
The space settings, the strategies that compute voting power and the sequencer and hub that collect and tally the votes are Snapshot's, and the DAO trusts them to work as described.
A vote's signature proves who signed it and what they signed, not when Snapshot received it: Snapshot cannot forge a vote, but it could omit a signed vote or accept one after the deadline with a backdated timestamp.
Voters should check that their vote appears in the proposal's vote list while voting is open.

The DAO verifies the rest.
A passed vote moves nothing by itself: before executing a proposal, the [API3 multisigs](/dao/#treasuries) recompute its result from the chain with the [Snapshot voting verifier](https://github.com/api3dao/snapshot-voting-verifier), never taking a result off a website.
The tool's source is public, anyone can run it on any proposal of the space, and its README says how.

The DAO's rules also go further than Snapshot's settings can express, such as counting only the votes in favour toward the quorum and the window for the snapshot block.
The verification enforces those too, so a proposal that Snapshot shows as passed can still fail a check and not be executed.

## What it establishes

Given a proposal, the tool reads every vote the Snapshot hub lists and establishes, independently of Snapshot's own computation, that:

- Every listed vote was signed by the voter it is listed under, names one of the proposal's choices and has a signed timestamp within the voting window.
- Every listed voter's power matches the proposal's recorded strategies at the proposal's block, delegations included, recomputed from an Ethereum archive node and the delegate registry rather than from Snapshot's scoring service (see [Voting power](/dao/voting-power)).
- The tally follows from those powers.
- The proposal met the posting rules: the proposer's 500,000 API3 at the proposal's block, a snapshot block and a signed timestamp within their windows (see [Snapshot block](/dao/voting#snapshot-block)), and seven days of voting with no delay.

It then judges the result on what it recomputed: at least 10,000,000 API3 in favour and more votes for than against (see [Passing](/dao/voting#passing)).
The run ends by saying whether the result is verified, and lists every problem it found.
A verified result is one whose votes and tally match the recomputation, so it can still be a rejected proposal, and only a verified and passed proposal is executed.

Matching the recorded strategies does not by itself establish that a change to the strategies or the space settings was authorized, and the tool does not judge whether a proposal is a change of the rules of governance.
The multisig signers check both from the proposal's content (see [Execution](/dao/voting#execution)).
