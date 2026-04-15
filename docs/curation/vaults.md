---
title: Vaults
pageHeader: Curation
outline: deep
---

<PageHeader/>

# Vaults

All Api3 vaults are [Morpho V2 vaults](https://docs.morpho.org/morpho-vaults/concepts/vault/) deployed on Ethereum mainnet, denominated in native USDC.
Each V2 vault uses a corresponding V1 vault as an intermediary, which handles the automated reallocation of capital across enabled markets.

## Api3 Core USDC

Api3 Core USDC is the conservative, flagship vault.
It supplies USDC to Morpho lending markets backed by blue-chip collateral assets:

- **wstETH** — Lido wrapped staked ETH
- **cbBTC** — Coinbase wrapped BTC

These are high-liquidity, battle-tested assets with deep on-chain liquidity and well-established oracle infrastructure.
The vault targets stable, lower-risk yield from borrowing demand against these widely held collateral types.

## Kabu

Kabu supplies USDC to Morpho lending markets backed by mid-cap governance and protocol tokens:

- **COMP** — Compound governance token
- **MORPHO** — Morpho governance token
- **EIGEN** — EigenLayer token
- **SYRUP** — Maple Finance token
- **FLUID** — Fluid protocol token
- **ONDO** — Ondo Finance token
- **BAL** — Balancer governance token

These markets serve borrowers who wish to access liquidity against their governance token holdings without selling.
Given the higher volatility and lower liquidity of these assets compared to blue-chip collateral, supply caps and risk parameters are set more conservatively on a per-market basis.

## Api3 dCOMP

TODO

## Vault architecture

All Api3 V2 vaults follow the same two-layer architecture:

```
Depositor → V2 Vault → V1 Vault → Morpho Markets
```

1. **V2 Vault** — The user-facing vault where depositors supply USDC and receive vault shares. The V2 vault is configured with the Api3 [role structure](/curation/roles-and-operations#roles) and governance controls.

2. **V1 Vault** — The intermediary vault that executes the actual market allocations. The V1 vault holds two allocators:
   - The [Morpho Public Allocator,](https://docs.morpho.org/morpho-vaults/concepts/public-allocator/) which enables permissionless reallocation to improve liquidity across markets.
   - An Api3 automated bot that rebalances allocations to maintain reasonable APY across all enabled markets.

The V1 vault is the only layer where a fee is charged — a **5% performance fee** on earned interest. The V2 vault charges no additional fee.

## Fees

| Layer | Fee type | Amount |
| --- | --- | --- |
| V2 Vault | Performance fee | 0% |
| V1 Vault | Performance fee | 5% |

The 5% performance fee is charged only on interest earned from borrowers. It is not charged on deposited principal.
