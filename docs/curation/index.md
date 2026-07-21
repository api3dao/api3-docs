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
Api3 operates a set of vaults across multiple networks, each targeting different markets and strategies.

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
On Api3-curated markets, the entirety of this OEV belongs to Api3 as protocol revenue.
Other protocols, at best, capture only a fraction of the OEV generated on their markets.

This allows Api3 to set lower curation fees to attract borrowers, which in turn decreases the cost of borrowing.
While this means supply-side APY may be lower during calm markets, it makes Api3 markets more attractive to borrowers, driving higher utilization and a healthier lending ecosystem.
The OEV captured during volatile periods more than compensates, providing Api3 with a sustainable revenue stream that is independent of the fee structure.

## Vaults

Api3 operates five vaults across Ethereum mainnet and the Robinhood chain.
All vaults share the same [role structure](/curation/roles-and-operations) and [risk framework](/curation/risk-management).

| Vault                          | Network   | Asset | Strategy                           | Collateral                                   |
| ------------------------------ | --------- | ----- | ---------------------------------- | -------------------------------------------- |
| [Api3&nbsp;Core](#api3-core)   | Ethereum  | USDC  | Conservative, blue-chip collateral | wstETH, cbBTC, kBTC                          |
| [Kabu](#kabu)                  | Ethereum  | USDC  | Mid-cap governance tokens          | COMP, MORPHO, EIGEN, SYRUP, FLUID, ONDO, BAL |
| [Api3&nbsp;dCOMP](#api3-dcomp) | Ethereum  | USDC  | Dedicated dCOMP collateral market  | dCOMP                                        |
| [Purinta](#purinta)            | Ethereum  | USDC  | Meme token collateral markets      | PEPE, SPX6900, SHIB                          |
| [Purinta](#purinta)            | Robinhood | USDG  | Meme token collateral markets      | CASHCAT                                      |

### Api3 Core

Api3 Core is Api3's flagship conservative vault.
It supplies USDC to lending markets backed by blue-chip collateral assets — wstETH (Lido wrapped staked ETH), cbBTC (Coinbase wrapped BTC), and kBTC (Kraken wrapped BTC).
These are high-liquidity, battle-tested assets with deep on-chain liquidity and well-established oracle infrastructure.
The vault targets stable, lower-risk yield from borrowing demand against these widely held collateral types.

### Kabu

Kabu supplies USDC to lending markets backed by mid-cap governance and protocol tokens — COMP, MORPHO, EIGEN, SYRUP, FLUID, ONDO, and BAL.
These markets serve borrowers who wish to access liquidity against their governance token holdings without selling.
Given the higher volatility and lower liquidity of these assets compared to blue-chip collateral, supply caps and risk parameters are set more conservatively on a per-market basis.

### Api3 dCOMP

Api3 dCOMP is a vault built around a dedicated lending market collateralized by [dCOMP](https://github.com/api3dao/dcomp) — a lightweight, ownable wrapper for the COMP governance token configured with a specific delegate.

While preserving the inherent voting power of the underlying COMP, this wrapper allows the owner to reassign the delegated address. Users can wrap their COMP to receive dCOMP tokens, which can then be deposited as collateral. By wrapping COMP into dCOMP, users can effectively amplify the voting power of the designated delegate.

The Api3 dCOMP vault supplies the USDC borrow-side liquidity for this market, making the mechanism viable.

### Purinta

Purinta is a pair of meme token lending vaults curated by Api3: a USDC vault on Ethereum mainnet and a USDG vault on the Robinhood chain.
Each supplies the borrow-side liquidity for a set of isolated meme token markets — PEPE, SPX6900 and SHIB on Ethereum, and CASHCAT on Robinhood.

Meme tokens are more volatile and higher-risk than blue-chip collateral, so a market is only listed when its token has enough on-chain liquidity to support healthy swaps and liquidations. Supply caps and LLTVs are configured conservatively to limit that exposure.

These markets are surfaced to borrowers through [Purinta app](https://purinta.xyz), a meme token lending interface.

### Accessing the vaults

All five vaults can be viewed and accessed through the Morpho app, where Api3 operates as a [verified curator.](https://forum.morpho.org/c/vaults/api3/57) Live figures - total deposits, APY, enabled markets, and current supply caps - are shown there.

| Vault           | Network   | Address                                      | Link                                                                                                                   |
| --------------- | --------- | -------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------- |
| Api3&nbsp;Core  | Ethereum  | `0xe2221Aa07ec3266DA87763E2b1e28d07A8a4e53b` | [View on Morpho](https://app.morpho.org/ethereum/vault/0xe2221Aa07ec3266DA87763E2b1e28d07A8a4e53b/api3-core-usdc)      |
| Kabu            | Ethereum  | `0x54210d3f1A066413891AF9E17210E787d5C6e3f4` | [View on Morpho](https://app.morpho.org/ethereum/vault/0x54210d3f1A066413891AF9E17210E787d5C6e3f4/kabu-usdc)           |
| Api3&nbsp;dCOMP | Ethereum  | `0x36cfe1568461E499391ef0A555300F1ae2da2439` | [View on Morpho](https://app.morpho.org/ethereum/vault/0x36cfe1568461E499391ef0A555300F1ae2da2439/api3-dcomp-usdc)     |
| Purinta         | Ethereum  | `0xc92A37Fd0250F4eecF092960a2F70A1334217528` | [View on Morpho](https://app.morpho.org/ethereum/vault/0xc92A37Fd0250F4eecF092960a2F70A1334217528/purinta-usdc)        |
| Purinta         | Robinhood | `0x37788ff0c1d4e45A7FE06BC7e71e0cc00121d0A8` | [View on Morpho](https://app.morpho.org/robinhood-chain/vault/0x37788ff0c1d4e45A7FE06BC7e71e0cc00121d0A8/purinta-usdg) |

## Fees

Each Api3 vault charges a single **5% performance fee** on the interest earned from borrowers (see [vault architecture](/curation/roles-and-operations#vault-architecture)).
There is no management fee on assets under management.

| Fee type        | Amount |
| --------------- | ------ |
| Performance fee | 5%     |
| Management fee  | 0%     |

The performance fee is charged only on interest earned from borrowers, not on deposited principal.
