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

Each enabled market is assigned a supply cap that limits the maximum amount the vault can allocate to that market.
Supply caps are set according to Api3's internal risk guidelines and are calibrated based on:

- The collateral asset's on-chain liquidity depth
- Historical and expected borrowing demand
- The liquidation loan-to-value (LLTV) ratio configured for the market
- The overall portfolio concentration across all enabled markets

Caps are reviewed and adjusted as market conditions evolve.

## Oracles

Every lending market relies on a price feed to value collateral and trigger liquidations. The markets Api3 creates and curates are priced by Api3's own data feeds, read on-chain through [Api3ReaderProxyV1](/dapps/integration/contract-integration).

These are first-party feeds: prices are signed by the data sources themselves, with no third-party node operators sitting between the source and the chain. Removing that intermediary layer eliminates a common source of oracle manipulation and downtime, and underpins Api3's track record of never misreporting a data feed. This considerably reduces the oracle risk that depositors are exposed to compared with markets that rely on third-party oracles.

Because Api3 is both the curator and the oracle provider for these markets, the party setting risk parameters and the party operating the price feed are one and the same. Api3 also captures the [Oracle Extractable Value (OEV)](/oev/) generated during liquidations as protocol revenue.

## Smart contract security

The vaults are built on Morpho's audited contracts. Morpho Blue (the underlying market protocol), the Morpho Vault V2 standard, and the market adapter through which the vaults supply liquidity have each been reviewed by multiple independent firms, including Spearbit, OpenZeppelin, Zellic, ChainSecurity, and Certora. The full list is published in [Morpho's audit overview.](https://docs.morpho.org/overview/resources/audits/)

The [dCOMP](https://github.com/api3dao/dcomp) wrapper used by the Api3 dCOMP vault is an intentionally minimal, source-verified contract built by Api3 and provided as-is. As with any smart contract, residual risk remains; see the [disclosure](/curation/disclosure#risks) for the full statement on smart contract risk.

## Treasury-backed risk alignment

A distinguishing feature of Api3's curation is that Api3 deploys a majority of its own treasury as vault supply.
This creates a direct alignment of incentives:

- Api3 bears the primary and largest loss in the event of bad debt.
- Every risk parameter decision — market selection, supply caps, LLTV configuration — directly affects Api3's own capital.
- External depositors benefit from the same risk management applied to protect the Api3 treasury.

This "skin in the game" model stands in contrast to curators who manage exclusively third-party capital with limited personal exposure to their risk decisions.

## Bad debt and shortfalls

A lending market incurs bad debt when a borrower's collateral can no longer cover their debt and the position cannot be fully liquidated - typically during sharp price moves or when collateral liquidity dries up. Conservative supply caps, LLTV settings, and healthy [liquidation markets](/curation/roles-and-operations#liquidations) are the primary defenses against this.

When bad debt does occur in a Morpho market, it is borne proportionally across all of that market's suppliers. Because Api3 supplies the majority of each vault from its own treasury, it is the largest supplier and absorbs the largest share of any such loss. This is the practical meaning of Api3's [skin in the game](/curation/#skin-in-the-game): it is an alignment of incentives, not a backstop, and Api3 does not commit to compensate third-party depositors for losses (see the [disclosure](/curation/disclosure#no-guarantees)).
