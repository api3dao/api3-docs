---
title: Overview
pageHeader: DAO
outline: deep
---

<PageHeader/>

# DAO

The API3 DAO governs through the Snapshot space [api3.eth](https://snapshot.box/#/s:api3.eth), where holders of the [API3 token](/dao/api3-token) vote on proposals.
Voting is off-chain: a vote is a signed message that Snapshot collects, and the voting power behind it is read from Ethereum mainnet at the block the proposal names.
The API3 multisigs execute a proposal once it has passed and its result has been verified.

::: info 💡 Tip

For quick reference, you can copy-paste [`llms-full.txt`](https://docs.api3.org/llms-full.txt) to your choice of AI assistant.

:::

## How it works

- [Voting power](/dao/voting-power) is counted per API3 in your wallet, in the DAO pool, during unstaking and as collateral in the Kabu API3/USDC market on Morpho, at the block a proposal names.
  [Delegation](/dao/voting-power#delegation) hands it to another address, either for your stake alone, inside the pool, or for everything you hold, on Snapshot.
- [Voting](/dao/voting) is a gasless signature on snapshot.box, For or Against, during the seven days a proposal is open.
  Anyone with 500,000 API3 of voting power can [post a proposal](/dao/voting#posting-a-proposal), and it passes with at least 10,000,000 API3 in favour and more votes for than against.
- [Independent verification](/dao/verification) recomputes a result from the chain before the API3 multisigs execute it.
  See [Snapshot assumptions](/dao/snapshot-assumptions) for the remaining trust in vote collection and the space's settings.

## Governing proposal

The primary DAO migration proposal in the [legacy DAO dashboard](https://api3.eth.limo/#/history) sets out the governance rules, mandate and charter.
These pages explain how to participate under those rules.

## DAO multisigs

| Multisig                                                                            | Role                                                                                                                |
| ----------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------- |
| [Vault](https://etherscan.io/address/0x8e03609ed680B237C7b6f8020472CA0687308b24)    | Controls `api3.eth` and its Snapshot settings. Posts proposals and votes with the pool stake delegated to it.       |
| [Agent](https://etherscan.io/address/0xBBE0dE9757F93e3306aDBfeBE906AB285EDD13DA)    | Executes operational proposals. Its own voting power is delegated to a dead address.                                |
| [Treasury](https://etherscan.io/address/0xb7fa2Cb302C5dC127e61F27b92beC411cbf0AE4A) | Holds the DAO's treasury API3. Its own voting power is delegated to a dead address, and it does not post proposals. |

Changes to the Snapshot settings and other rules of governance follow the [rule-change execution period](/dao/voting#execution).

## Legacy DAO

Governance used to run on Aragon contracts, with a staking pool and a dashboard for it.
The pool is still in use: stake in it counts as voting power and pool delegations still apply to the stake, but staking is no longer needed to vote.
The [legacy documentation](https://dao-docs.api3.org/) covers the pool, the dashboard and the contracts.
