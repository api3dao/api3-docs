---
title: Verification
pageHeader: DAO
outline: deep
---

<PageHeader/>

# Verification

The API3 multisigs execute only a result they recomputed from the chain, never one read off a website.
The [Snapshot voting verifier](https://github.com/api3dao/snapshot-voting-verifier) is the open source tool for that recomputation.
Anyone can run it on any proposal of the space, and its README says how.

## What it establishes

Given a proposal, the tool reads every vote the Snapshot hub lists and establishes, independently of Snapshot's own computation, that:

- Every vote was signed by the voter it is listed under, names one of the proposal's choices and was cast while the vote was open.
- Every voter's power is what the [voting power](/dao/voting-power) rules give them at the proposal's block, delegations included.
- The tally follows from those powers.
- The proposal met the posting rules: the proposer's 500,000 API3 at the proposal's block, a snapshot block and a signed timestamp within their windows (see [Snapshot block](/dao/proposals#snapshot-block)), and seven days of voting with no delay.

It then judges the result on what it recomputed: at least 10,000,000 API3 in favour and more votes for than against (see [Passing](/dao/proposals#passing)).
The run ends by saying whether the result is verified, and lists every problem it found.
A proposal that fails a check is not executed.

The tool does not judge whether a proposal is a change of the rules of governance.
The multisig signers read that from the proposal's content (see [Execution](/dao/proposals#execution)).
