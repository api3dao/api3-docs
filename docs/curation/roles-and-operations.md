---
title: Roles and operations
pageHeader: Curation
outline: deep
---

<PageHeader/>

# Roles and operations

All Api3 vaults share the same role structure and operational setup.

## Roles

Api3 configures the Morpho vault roles identically across all its vaults:

| Role | Held by |
| --- | --- |
| Owner | Api3 DAO Multisig |
| Curator | Api3 DAO Multisig |
| Allocator | Api3 DAO Multisig |
| Guardian | Api3 monitoring team |

The Api3 DAO Multisig holds the owner, curator, and allocator roles, consolidating governance and operational control under a single trusted entity.

The guardian role is operated by the Api3 monitoring team, who can revoke pending actions in case of misconfiguration.
The monitoring team also maintains an emergency fund for manual liquidations in the event that automated liquidation bots fail.

## Vault architecture

All Api3 vaults follow a two-layer architecture:

```
Depositor → V2 Vault → V1 Vault → Morpho Markets
```

1. **V2 Vault** — The user-facing vault where depositors supply USDC and receive vault shares. Configured with the Api3 role structure and governance controls described above.

2. **V1 Vault** — The intermediary vault that executes the actual market allocations. The V1 vault holds two allocators:
   - The **Morpho Public Allocator**, which enables permissionless reallocation to improve liquidity across markets.
   - An **Api3 automated bot** that rebalances allocations to maintain reasonable APY across all enabled markets.

The owner of the V1 vault is also the Api3 DAO Multisig. The 5% performance fee is charged at this layer (see [Fees](/curation/#fees)).

## Allocation and rebalancing

Capital allocation across markets is automated.
The Api3 allocation bot monitors market conditions and rebalances the vault's positions to maintain target utilization and competitive APY.
The Morpho Public Allocator complements this by enabling permissionless reallocation when liquidity is needed.

A portion of vault deposits is kept idle to ensure depositors can withdraw without delays.

## Monitoring

Api3 leverages its existing data feed infrastructure to monitor token liquidity and market conditions — the same infrastructure that powers its oracle operations.

- **Liquidity bots** — Ensure smooth and automatic management of vault positions and market allocations.
- **Risk engine alerts** — An alerts-based system that flags suspicious activity, unusual market conditions, or parameter deviations.
- **24/7 monitoring team** — Api3's operations team handles escalations from the risk engine around the clock.

## Liquidations

Healthy liquidation markets are essential for vault safety.
When borrowers become undercollateralized, third-party liquidation bots repay their debt and claim collateral at a discount, keeping the vault solvent.

In the event that automated liquidation bots fail to act, the Api3 monitoring team can execute manual liquidations using a dedicated emergency fund.
