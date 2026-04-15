---
title: Risk management
pageHeader: Curation
outline: deep
---

<PageHeader/>

# Risk management

Api3's curation risk framework builds on the same rigorous evaluation processes used for its data feed listing policies — processes that have maintained Api3's track record of never misreporting a data feed.

## Market selection

Before enabling a new lending market, Api3 evaluates:

- **Borrowing demand** — Is there genuine, sustained demand to borrow against the collateral asset?
- **Token liquidity** — Is there sufficient on-chain liquidity to support healthy liquidations under adverse market conditions?
- **Oracle quality** — Does a reliable, battle-tested price feed exist for the collateral asset?
- **Smart contract risk** — Has the collateral token been audited and battle-tested in production?
- **Collateral characteristics** — What is the asset's volatility profile, correlation to other vault collateral, and historical behavior during market stress?

Markets are only enabled after passing this evaluation. Exceptions can be made after careful assessment of the benefits, but are rare.

## Supply caps

Each enabled market is assigned a supply cap that limits the maximum amount of USDC the vault can allocate to that market.
Supply caps are set according to Api3's internal risk guidelines and are calibrated based on:

- The collateral asset's on-chain liquidity depth
- Historical and expected borrowing demand
- The liquidation loan-to-value (LLTV) ratio configured for the market
- The overall portfolio concentration across all enabled markets

Caps are reviewed and adjusted as market conditions evolve.

## Treasury-backed risk alignment

A distinguishing feature of Api3's curation is that Api3 deploys a majority of its own treasury as vault supply.
This creates a direct alignment of incentives:

- Api3 bears the first and largest loss in the event of bad debt.
- Every risk parameter decision — market selection, supply caps, LLTV configuration — directly affects Api3's own capital.
- External depositors benefit from the same risk management applied to protect the Api3 treasury.

This "skin in the game" model stands in contrast to curators who manage exclusively third-party capital with limited personal exposure to their risk decisions.
