---
title: Independent verification
pageHeader: DAO
outline: deep
---

<PageHeader/>

# Independent verification

The DAO relies on Snapshot to run its votes.
The space settings, the strategies that compute voting power and the hub that collects and tallies the votes are Snapshot's, and the DAO trusts them to work as described.
It verifies them all the same: before executing a proposal, the API3 multisigs recompute its result from the chain with the [Snapshot voting verifier](https://github.com/api3dao/snapshot-voting-verifier), never taking a result off a website.
The tool is open source, anyone can run it on any proposal of the space, and its README says how.

The DAO's rules also go further than Snapshot's settings can express, such as counting only the votes in favour toward the quorum and the window for the snapshot block.
The verification enforces those too, so a proposal that Snapshot shows as passed can still fail a check and not be executed.

## What it establishes

Given a proposal, the tool reads every vote the Snapshot hub lists and establishes, independently of Snapshot's own computation, that:

- Every vote was signed by the voter it is listed under, names one of the proposal's choices and was cast while the vote was open.
- Every voter's power is what the [voting power](/dao/voting-power) rules give them at the proposal's block, delegations included.
- The tally follows from those powers.
- The proposal met the posting rules: the proposer's 500,000 API3 at the proposal's block, a snapshot block and a signed timestamp within their windows (see [Snapshot block](/dao/voting#snapshot-block)), and seven days of voting with no delay.

It then judges the result on what it recomputed: at least 10,000,000 API3 in favour and more votes for than against (see [Passing](/dao/voting#passing)).
The run ends by saying whether the result is verified, and lists every problem it found.
A proposal that fails a check is not executed.

The tool does not judge whether a proposal is a change of the rules of governance.
The multisig signers read that from the proposal's content (see [Execution](/dao/voting#execution)).
