---
title: Independent verification
pageHeader: DAO
outline: deep
---

<PageHeader/>

# Independent verification

Before executing a proposal, the API3 multisigs recompute its result from the chain with the [Snapshot voting verifier](https://github.com/api3dao/snapshot-voting-verifier), never taking a result off a website.
The tool's source is public, anyone can run it on any proposal of the space, and its README says how.
The remaining trust in Snapshot's vote collection and settings is described under [Snapshot assumptions](/dao/snapshot-assumptions).

The DAO's rules also go further than Snapshot's settings can express, such as counting only the votes in favour toward the quorum and the window for the snapshot block.
The verification enforces those too, so a proposal that Snapshot shows as passed can still fail a check and not be executed.

## What it establishes

Given a proposal, the tool reads every vote the Snapshot hub lists and establishes, independently of Snapshot's own computation, that:

- Every listed vote was signed by the voter it is listed under, names one of the proposal's choices and has a signed timestamp within the voting window.
- Every listed voter's power matches the proposal's recorded strategies at the proposal's block, delegations included (see [Voting power](/dao/voting-power)).
- The tally follows from those powers.
- The proposal met the posting rules: the proposer's 500,000 API3 at the proposal's block, a snapshot block within its window (see [Snapshot block](/dao/voting#snapshot-block)), and seven days of voting with no delay.

It then judges the result on what it recomputed: at least 10,000,000 API3 in favour and more votes for than against (see [Passing](/dao/voting#passing)).
The run ends by saying whether the result is verified, and lists every problem it found.
`VERIFIED` means the listed votes and tally match the recomputation.
A verified result can still be a rejected proposal, so execution also requires `Outcome: passed`.
A proposal that fails a check is not executed.

The tool does not judge whether a proposal is a change of the rules of governance.
The multisig signers read that from the proposal's content (see [Execution](/dao/voting#execution)).
