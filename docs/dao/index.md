---
title: Overview
pageHeader: DAO
outline: deep
---

<PageHeader/>

# DAO

The API3 DAO governs through the Snapshot space [api3.eth](https://snapshot.box/#/s:api3.eth) on Ethereum mainnet.
Holders of the API3 token vote there, and the API3 multisigs execute a proposal once it has passed and its result has been verified.

::: info 💡 Tip

For quick reference, you can copy-paste [`llms-full.txt`](https://docs.api3.org/llms-full.txt) to your choice of AI assistant.

:::

## How it works

- [Voting power](/dao/voting-power) is one vote per API3, counted in your wallet, in the DAO pool, during unstaking and as collateral in the Kabu API3/USDC market on Morpho, at the block a proposal names.
- [Delegation](/dao/delegation) hands your voting power to another address, either for your stake alone, inside the pool, or for everything you hold, on Snapshot.
- [Voting](/dao/voting) is a gasless signature on snapshot.box, For or Against, while the proposal is open.
- [Proposals](/dao/proposals) can be posted by anyone with 500,000 API3 of voting power, run for seven days and pass with at least 10,000,000 API3 in favour and more votes for than against.
- [Verification](/dao/verification) recomputes a result from the chain before the API3 multisigs execute it.

## Before Snapshot

The DAO moved its governance from the Aragon-based DAO contracts to Snapshot.
The DAO pool from that period remains in use: API3 staked in it still counts as voting power and pool delegations still move the stake, but staking is no longer needed to vote.
The [legacy documentation](https://old-docs.api3.org/dao-members/) describes the DAO pool, the dashboard and the governance contracts of the Aragon-based DAO.
