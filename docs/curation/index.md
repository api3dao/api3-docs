---
title: Overview
pageHeader: Curation
outline: deep
---

<PageHeader/>

# Curation

Api3 operates as a vault curator on [Morpho,](https://morpho.org/) the largest decentralized lending protocol on Ethereum.
Morpho is a permissionless protocol that allows anyone to create isolated lending markets with custom parameters.
Morpho Vaults aggregate deposits and allocate them across these markets, abstracting the complexity of individual market selection for depositors.

As a curator, Api3 selects lending markets, manages risk parameters, and allocates capital to generate yield for vault depositors.
Api3 operates a set of USDC vaults on Ethereum mainnet, each targeting different markets and strategies.

::: info 💡 Tip

For quick reference, you can copy-paste [`llms-full.txt`](https://docs.api3.org/llms-full.txt) to your choice of AI assistant.

:::

## Skin in the game

Unlike most curators who manage third-party capital exclusively, Api3 deploys a majority of its own treasury as the primary supplier in its vaults.
This means Api3 has direct financial exposure to every market it enables and every risk decision it makes.

External depositors are welcome to supply alongside the Api3 treasury, benefiting from the same risk management and yield strategies, with the assurance that Api3's own capital is subject to identical conditions.

## OEV advantage

Api3 is uniquely positioned as a curator because it is also the oracle provider for its own markets.
This creates a competitive advantage that no other lending protocol or curator has.

During market turmoil, liquidations on lending markets generate [Oracle Extractable Value (OEV)](/oev/) — value that the oracle has priority in capturing by batching additional operations with price updates.
On Api3 curated markets, the entirety of this OEV belongs to Api3 as protocol revenue.
At best, other protocols receive only a smaller portion of the OEV generated on their markets.

This allows Api3 to set lower curation fees to attract borrowers, which in turn decreases the cost of borrowing.
While this means supply-side APY is slightly lower during calm markets, it makes Api3 markets more attractive to borrowers, driving higher utilization and a healthier lending ecosystem.
The OEV captured during volatile periods more than compensates, providing Api3 with a sustainable revenue stream that is independent of the fee structure.

## Vaults

Api3 operates three USDC vaults on Ethereum mainnet.
All vaults share the same [role structure](/curation/roles-and-operations) and [risk framework.](/curation/risk)

| Vault                             | Strategy                           | Markets                                      |
| --------------------------------- | ---------------------------------- | -------------------------------------------- |
| [Api3 Core USDC](#api3-core-usdc) | Conservative, blue-chip collateral | wstETH, cbBTC                                |
| [Kabu](#kabu)                     | Mid-cap governance tokens          | COMP, MORPHO, EIGEN, SYRUP, FLUID, ONDO, BAL |
| [Api3 dCOMP](#api3-dcomp)         | Market specific to dCOMP           | dCOMP                                        |

### Api3 Core USDC

Api3 Core USDC is the conservative, flagship vault.
It supplies USDC to lending markets backed by blue-chip collateral assets — wstETH (Lido wrapped staked ETH) and cbBTC (Coinbase wrapped BTC).
These are high-liquidity, battle-tested assets with deep on-chain liquidity and well-established oracle infrastructure.
The vault targets stable, lower-risk yield from borrowing demand against these widely held collateral types.

### Kabu

Kabu supplies USDC to lending markets backed by mid-cap governance and protocol tokens — COMP, MORPHO, EIGEN, SYRUP, FLUID, ONDO, and BAL.
These markets serve borrowers who wish to access liquidity against their governance token holdings without selling.
Given the higher volatility and lower liquidity of these assets compared to blue-chip collateral, supply caps and risk parameters are set more conservatively on a per-market basis.

### Api3 dCOMP

TODO: dCOMP description — what it is (wrapped governance token of Compound) and why it was created.

## Fees

All Api3 vaults use a V1 vault as an intermediary layer that handles the actual market allocations (see [vault architecture](/curation/roles-and-operations#vault-architecture)).
A **5% performance fee** on earned interest is charged at the V1 vault layer. This is the only fee — the V2 (user-facing) vault charges nothing additional.

| Layer                   | Fee type        | Amount |
| ----------------------- | --------------- | ------ |
| V2 Vault (user-facing)  | Performance fee | 0%     |
| V1 Vault (intermediary) | Performance fee | 5%     |

The fee is charged only on interest earned from borrowers, not on deposited principal.

::: info ⚠️ Disclaimer

TODO: Legal disclosure.

:::
