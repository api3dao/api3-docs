---
title: Risk management
pageHeader: Curation
outline: deep
---

<PageHeader/>

# Risk management

Api3's curation risk framework builds on the same rigorous evaluation processes used for its data feed listing policies — processes that have maintained Api3's track record of never misreporting a data feed.

## Market selection

The primary prerequisite for listing a collateral asset is that it passes the Api3 data feed listing policy.
This policy avoids many common industry pitfalls — for example, it prevents listing "stablecoin" assets with weakly protected minting functions.
An asset that passes the listing policy is eligible for market creation.

Beyond the listing policy, Api3 evaluates:

- **Token liquidity** — Is there sufficient on-chain liquidity to support healthy liquidations under adverse market conditions?
- **Token volatility** — Volatile tokens can be listed as long as there is enough liquidity. In these cases, market parameters (such as LLTV) are set conservatively.
- **Smart contract risk** — Has the collateral token been audited and battle-tested in production?

Api3 also lists assets that are unique on the market to fill gaps in the lending ecosystem, even when borrowing demand is not yet established.

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

- Api3 bears the primary and largest loss in the event of bad debt.
- Every risk parameter decision — market selection, supply caps, LLTV configuration — directly affects Api3's own capital.
- External depositors benefit from the same risk management applied to protect the Api3 treasury.

This "skin in the game" model stands in contrast to curators who manage exclusively third-party capital with limited personal exposure to their risk decisions.
