---
title: Roles and operations
pageHeader: Curation
outline: deep
---

<PageHeader/>

# Roles and operations

All Api3 vaults share the same role structure and operational setup.
This page describes who controls what, and how the vaults are managed day-to-day.

## Roles

Morpho Vaults define a set of onchain roles that govern what actions can be taken and by whom.
Api3 configures these roles identically across all its vaults.

### Owner

The **Api3 DAO Multisig** is the owner of all Api3 vaults.
The owner is the highest-privilege role and can:

- Set and revoke all other roles (curator, allocator, guardian)
- Enable new markets and set supply caps
- Change performance fees and fee recipient addresses
- Adjust timelock durations

### Curator

The **Api3 DAO Multisig** also holds the curator role.
The curator manages the vault's market configuration:

- Enable or disable lending markets
- Set and adjust supply caps per market
- Configure the withdrawal queue order

### Allocator

The **Api3 DAO Multisig** holds the allocator role on the V2 vault.

On the V1 vault (which performs the actual market allocations), there are two allocators:

- **[Morpho Public Allocator](https://docs.morpho.org/morpho-vaults/concepts/public-allocator/)** — A permissionless Morpho protocol contract that allows anyone to trigger reallocation of idle liquidity, improving capital efficiency across markets.
- **Api3 automated bot** — A dedicated bot operated by Api3 that continuously rebalances allocations to ensure reasonable APY across all enabled markets.

### Guardian

The **Api3 monitoring team** operates the guardian role, following [Morpho best practices](https://docs.morpho.org/) for vault security.
The guardian can:

- Revoke pending timelock actions before they execute
- Serve as a safety mechanism against misconfigured or malicious governance proposals

The monitoring team also maintains an emergency fund for manual liquidations in the event that automated liquidation bots fail.

## Operations

### Allocation and rebalancing

Capital allocation across markets is automated.
The Api3 allocation bot monitors market conditions and rebalances the vault's positions to maintain target utilization and competitive APY.
The [Morpho Public Allocator](https://docs.morpho.org/morpho-vaults/concepts/public-allocator/) complements this by enabling permissionless reallocation when liquidity is needed.

A portion of vault deposits is kept idle to ensure depositors can withdraw without delays.

### Monitoring

Api3 leverages its existing data feed infrastructure to monitor token liquidity and market conditions — the same infrastructure that powers its oracle operations.
This includes:

- **Liquidity bots** — Ensure smooth and automatic management of vault positions and market allocations.
- **Risk engine alerts** — An alerts-based system that flags suspicious activity, unusual market conditions, or parameter deviations.
- **24/7 monitoring team** — Api3's operations team handles escalations from the risk engine around the clock.

### Liquidations

Healthy liquidation markets are essential for vault safety.
When borrowers become undercollateralized, third-party liquidation bots repay their debt and claim collateral at a discount, keeping the vault solvent.

In the event that automated liquidation bots fail to act, the Api3 monitoring team can execute manual liquidations using a dedicated emergency fund.
