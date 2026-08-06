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

Api3 operates multiple vaults across Ethereum mainnet, Base, and the Robinhood chain.
All vaults share the same [role structure](/curation/roles-and-operations) and [risk framework](/curation/risk-management).

| Vault                          | Network   | Asset | Strategy                           | Collateral                                   |
| ------------------------------ | --------- | ----- | ---------------------------------- | -------------------------------------------- |
| [Api3&nbsp;Core](#api3-core)   | Ethereum  | USDC  | Conservative, blue-chip collateral | wstETH, cbBTC, kBTC                          |
| [Kabu](#kabu)                  | Ethereum  | USDC  | Mid-cap governance tokens          | MORPHO, EIGEN, ONDO, BAL, SYRUP, COMP, FLUID |
| [Kabu](#kabu)                  | Base      | WETH  | Mid-cap governance tokens          | AERO, VVV, MORPHO, VIRTUAL                   |
| [Api3&nbsp;dCOMP](#api3-dcomp) | Ethereum  | USDC  | Dedicated dCOMP collateral market  | dCOMP                                        |
| [Purinta](#purinta)            | Ethereum  | USDC  | Meme token collateral markets      | PEPE, SPX6900, SHIB                          |
| [Purinta](#purinta)            | Robinhood | USDG  | Meme token collateral markets      | CASHCAT                                      |

Each vault section below lists the markets it supplies, with the liquidation loan-to-value (LLTV) ratio and supply cap configured for each.
An LLTV is fixed for the lifetime of a Morpho market, while [supply caps](/curation/risk-management#supply-caps) are reviewed and adjusted as conditions evolve — follow the vault links below for current values.

### Api3 Core

Api3 Core is Api3's flagship conservative vault.
It supplies USDC to lending markets backed by blue-chip collateral — Lido wrapped staked ETH (wstETH), and wrapped BTC issued by Coinbase (cbBTC) and Kraken (kBTC).

These are high-liquidity, battle-tested assets with deep on-chain liquidity and well-established oracle infrastructure.
The vault targets stable, lower-risk yield from borrowing demand against these widely held collateral types.

| Market                                                                                                                     | Market ID         | LLTV | Supply cap |
| -------------------------------------------------------------------------------------------------------------------------- | ----------------- | ---- | ---------- |
| [wstETH / USDC](https://app.morpho.org/ethereum/market/0x6d2fba32b8649d92432d036c16aa80779034b7469b63abc259b17678857f31c2) | `0x6d2fba32…31c2` | 86%  | 10M USDC   |
| [cbBTC / USDC](https://app.morpho.org/ethereum/market/0xba3ba077d9c838696b76e29a394ae9f0d1517a372e30fd9a0fc19c516fb4c5a7)  | `0xba3ba077…c5a7` | 86%  | 10M USDC   |
| [kBTC / USDC](https://app.morpho.org/ethereum/market/0x7f1224a8598b97a8455d298bd58b0f720f1b4f19a815198b8cdecc9feedada93)   | `0x7f1224a8…da93` | 86%  | 1M USDC    |

### Kabu

Kabu is a pair of vaults supplying lending markets backed by mid-cap governance and protocol tokens: a USDC vault on Ethereum mainnet and a WETH vault on Base.
These markets serve borrowers who wish to access liquidity against their governance token holdings without selling.
Given the higher volatility and lower liquidity of these assets compared to blue-chip collateral, supply caps and risk parameters are set more conservatively on a per-market basis.

**Ethereum (USDC)**

| Market                                                                                                                     | Market ID         | LLTV  | Supply cap |
| -------------------------------------------------------------------------------------------------------------------------- | ----------------- | ----- | ---------- |
| [MORPHO / USDC](https://app.morpho.org/ethereum/market/0x6d95bf5fad1b0427205ee2b595f80b52e22394173de0832efa79fde88abb8525) | `0x6d95bf5f…8525` | 62.5% | 2M USDC    |
| [EIGEN / USDC](https://app.morpho.org/ethereum/market/0x6d1dae6238f6f296abb77d9e17a8429132458146bc89d1d2b20516b87a40dee7)  | `0x6d1dae62…dee7` | 62.5% | 1M USDC    |
| [ONDO / USDC](https://app.morpho.org/ethereum/market/0x7dea3baf843210ce0a4a9e6374cea47dcd55384fb36d2d701e69b221867b39e5)   | `0x7dea3baf…39e5` | 62.5% | 1M USDC    |
| [BAL / USDC](https://app.morpho.org/ethereum/market/0xf57808b9489bcbe7e7c67fd5227b0a4267a384ebb80301a097e4fa1f3fcb3234)    | `0xf57808b9…3234` | 62.5% | 250k USDC  |
| [SYRUP / USDC](https://app.morpho.org/ethereum/market/0x38fa7d75c15a0f11cc46e2d1987a05c26a836d0da6b4430657ec5ece38a25a45)  | `0x38fa7d75…5a45` | 62.5% | 200k USDC  |
| [COMP / USDC](https://app.morpho.org/ethereum/market/0x9b966d26e14749cdf3be6fcf44ef404f1428b3c2f8c9e9a5172437e440597715)   | `0x9b966d26…7715` | 62.5% | 100k USDC  |
| [FLUID / USDC](https://app.morpho.org/ethereum/market/0xaf53761f4931911877474ab8c7ff856987207ee7ec15e8513ff9cf86939229a0)  | `0xaf53761f…29a0` | 62.5% | 60k USDC   |

**Base (WETH)**

| Market                                                                                                                  | Market ID         | LLTV  | Supply cap |
| ----------------------------------------------------------------------------------------------------------------------- | ----------------- | ----- | ---------- |
| [AERO / WETH](https://app.morpho.org/base/market/0x17cbb67e84acfbaf2a3b73f9fe697d9503a8fd2fce30f851429726fa04bc5afe)    | `0x17cbb67e…5afe` | 77%   | 350 WETH   |
| [VVV / WETH](https://app.morpho.org/base/market/0xa84351c9d5be1d05f6b2d93df58ff8764ba54b70daa6c41529278ac4d1bc3c5b)     | `0xa84351c9…3c5b` | 62.5% | 110 WETH   |
| [MORPHO / WETH](https://app.morpho.org/base/market/0x71511d934dddf124c73b7d7328e2ed4a7d13deeecf9ef061dad924a56b72a87f)  | `0x71511d93…a87f` | 77%   | 80 WETH    |
| [VIRTUAL / WETH](https://app.morpho.org/base/market/0x23c2ad09b57469016831bc5ff9b13a7ddfc559698b42876d3625298e6dd7ef9d) | `0x23c2ad09…ef9d` | 77%   | 55 WETH    |

### Api3 dCOMP

Api3 dCOMP is a vault built around a dedicated lending market collateralized by [dCOMP](https://github.com/api3dao/dcomp) — a lightweight, ownable wrapper for the COMP governance token configured with a specific delegate.

While preserving the inherent voting power of the underlying COMP, this wrapper allows the owner to reassign the delegated address. Users can wrap their COMP to receive dCOMP tokens, which can then be deposited as collateral. By wrapping COMP into dCOMP, users can effectively amplify the voting power of the designated delegate.

The Api3 dCOMP vault supplies the USDC borrow-side liquidity for this market, making the mechanism viable.

| Market                                                                                                                    | Market ID         | LLTV  | Supply cap |
| ------------------------------------------------------------------------------------------------------------------------- | ----------------- | ----- | ---------- |
| [dCOMP / USDC](https://app.morpho.org/ethereum/market/0x24852d8d7464402ddcd717415e009d42bf7427d6a8893487f83c75ee0f4a0ea6) | `0x24852d8d…0ea6` | 62.5% | 10M USDC   |

### Purinta

Purinta is a pair of meme token lending vaults curated by Api3: a USDC vault on Ethereum mainnet and a USDG vault on the Robinhood chain.
Each supplies the borrow-side liquidity for a set of isolated meme token markets.

Meme tokens are more volatile and higher-risk than blue-chip collateral, so a market is only listed when its token has enough on-chain liquidity to support healthy swaps and liquidations. Supply caps and LLTVs are configured conservatively to limit that exposure.

**Ethereum (USDC)**

| Market                                                                                                                      | Market ID         | LLTV  | Supply cap |
| --------------------------------------------------------------------------------------------------------------------------- | ----------------- | ----- | ---------- |
| [PEPE / USDC](https://app.morpho.org/ethereum/market/0xde2bb82278de27e7851625e2d7c25280adc6d499c000cc6904eb0ab29124a481)    | `0xde2bb822…a481` | 62.5% | 1M USDC    |
| [SPX6900 / USDC](https://app.morpho.org/ethereum/market/0x31a277fde40c1bd37dd00cb2167fe1d5831b450efecc63323679228a101e9979) | `0x31a277fd…9979` | 62.5% | 500k USDC  |
| [SHIB / USDC](https://app.morpho.org/ethereum/market/0x87753839ac836a59dd13f66ea6ea5481ba2374ae76dfdfbe8c4861e835833646)    | `0x87753839…3646` | 62.5% | 80k USDC   |

**Robinhood (USDG)**

| Market                                                                                                                             | Market ID         | LLTV  | Supply cap |
| ---------------------------------------------------------------------------------------------------------------------------------- | ----------------- | ----- | ---------- |
| [CASHCAT / USDG](https://app.morpho.org/robinhood-chain/market/0x039503b6308d6d818d181e626d3fbc667d6e68393c3d74332a6124cd2dd6e755) | `0x039503b6…e755` | 38.5% | 500k USDG  |

These markets are surfaced to borrowers through [Purinta app](https://purinta.xyz), a meme token lending interface.

## Liquidity adapter

Alongside its collateral markets, each vault designates one deep, blue-chip market as its **liquidity adapter**, which serves two purposes.

It is the route deposits and withdrawals take: every deposit is allocated into that market as it arrives, and withdrawals are deallocated back out of it.

It also holds whatever the collateral markets cannot currently absorb, so that liquidity keeps earning yield rather than sitting idle in the vault (see [allocation and rebalancing](/curation/roles-and-operations#allocation-and-rebalancing)).

Because this market is a yield destination for unallocated liquidity, not part of a vault's collateral strategy, it is listed separately from the tables above.

| Vault                                             | Network   | Market                                                                                                                          | Market ID         | LLTV  |
| ------------------------------------------------- | --------- | ------------------------------------------------------------------------------------------------------------------------------- | ----------------- | ----- |
| Api3&nbsp;Core, Kabu,<br>Api3&nbsp;dCOMP, Purinta | Ethereum  | [wstETH / USDC](https://app.morpho.org/ethereum/market/0xb323495f7e4148be5643a4ea4a8221eef163e4bccfdedc2a6f4696baacbc86cc)      | `0xb323495f…86cc` | 86%   |
| Kabu                                              | Base      | [wstETH / WETH](https://app.morpho.org/base/market/0x3a4048c64ba1b375330d376b1ce40e4047d03b47ab4d48af484edec9fec801ba)          | `0x3a4048c6…01ba` | 94.5% |
| Purinta                                           | Robinhood | [USDe / USDG](https://app.morpho.org/robinhood-chain/market/0xc845da65a020ddca5f132efa8fea79676d8edfdea504226a4c01e7a9e34cddd6) | `0xc845da65…ddd6` | 91.5% |

## Accessing the vaults

Each of the vaults can be also accessed through the Morpho app, where Api3 operates as a [verified curator.](https://forum.morpho.org/c/vaults/api3/57) Live figures - total deposits, APY, enabled markets, and current supply caps - are shown there.

| Vault           | Network   | Address                                      | Link                                                                                                                   |
| --------------- | --------- | -------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------- |
| Api3&nbsp;Core  | Ethereum  | `0xe2221Aa07ec3266DA87763E2b1e28d07A8a4e53b` | [View on Morpho](https://app.morpho.org/ethereum/vault/0xe2221Aa07ec3266DA87763E2b1e28d07A8a4e53b/api3-core-usdc)      |
| Kabu            | Ethereum  | `0x54210d3f1A066413891AF9E17210E787d5C6e3f4` | [View on Morpho](https://app.morpho.org/ethereum/vault/0x54210d3f1A066413891AF9E17210E787d5C6e3f4/kabu-usdc)           |
| Kabu            | Base      | `0x4D72Fed1b6cE42F8Dea811F7b6685EbE4Ec04E01` | [View on Morpho](https://app.morpho.org/base/vault/0x4D72Fed1b6cE42F8Dea811F7b6685EbE4Ec04E01/kabu-weth)               |
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
