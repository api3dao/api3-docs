---
title: Roles and operations
pageHeader: Curation
outline: deep
---

<PageHeader/>

# Roles and operations

All API3 vaults share the same role structure and operational setup stewarded by the API3 Foundation.

## Roles

| Role      | Held by                                          |
| --------- | ------------------------------------------------ |
| Owner     | API3 Foundation Multisig                         |
| Curator   | API3 Foundation                                  |
| Allocator | API3 allocation bot and API3 Foundation Multisig |
| Sentinel  | API3 monitoring team                             |

All four roles are controlled by API3, consolidating governance and operational control under a single entity whose express mission is the development, operation, and maintenance of API3 services and operations. The API3 Foundation Multisig holds the owner role, which controls top-level permissions and appoints the curator and sentinels. The curator configures risk parameters - enabled markets, supply caps, fees, and interest rate limits. The allocator role, held by an automated API3 bot alongside the multisig, moves capital between enabled markets. Role names correspond to terminology in underlying smart contracts and protocols, and do not carry any legal nor other significance or meaning.

The sentinel role is operated by the API3 monitoring team, who can reactively reduce risk - deallocating assets, decreasing caps, or revoking pending timelocked actions - in case of misconfiguration or adverse market conditions.
The monitoring team also maintains an emergency fund for manual liquidations in the event that automated liquidation bots fail. API3 provides no guarantee of the effectiveness or sufficiency of such bots or emergency fund's operation.

## Vault architecture

Each API3 vault is a [Morpho Vault V2](https://docs.morpho.org/learn/concepts/vault-v2/) that supplies the assets directly to a curated set of isolated Morpho markets:

```
Depositor → Vault → Adapter → Morpho Markets
```

Depositors supply the vault's asset (such as USDC) and receive vault shares. The vault routes capital into the underlying Morpho markets through a market adapter, and the API3 role structure and governance controls described above apply at the vault level. The 5% performance fee is charged here (see [Fees](/curation/#fees)).

Changes that could increase risk to depositors - adding a market adapter or raising a supply cap - are subject to a 7-day timelock, giving depositors advance notice before they take effect. The sentinel can act immediately to reduce risk.

## Allocation and rebalancing

Capital allocation across markets is automated.
The API3 allocation bot monitors market conditions and rebalances the vault's positions to maintain target utilization and competitive APY.
When an enabled market lacks borrowing demand, the bot can supply the vault's otherwise-idle assets to a deep, blue-chip market (such as wstETH/USDC) so that they continue to earn yield.

A portion of vault liquidity is kept readily withdrawable to assist with depositor withdrawals and mitigate delays. In addition, the Vault V2 design lets anyone permissionlessly pull supplied liquidity back from a market into the vault - a forced deallocation, subject to a small penalty - when liquidity is needed. Neither mechanism guarantees delay-free withdrawal.

## Monitoring

API3 leverages its existing data feed infrastructure to monitor token liquidity and market conditions - the same infrastructure that powers its oracle operations.

- **Liquidity bots** - Ensure smooth and automatic management of vault positions and market allocations.
- **Risk engine alerts** - An alerts-based system that flags suspicious activity, unusual market conditions, or parameter deviations.
- **24/7 monitoring team** - API3's monitoring team handles escalations from the risk engine around the clock.

## Liquidations

Healthy liquidation markets are essential for vault safety.
When borrowers become undercollateralized, third-party liquidation bots may repay their debt and claim collateral at a discount, aiming to keep the vault solvent.

In the event that automated liquidation bots fail to act, the API3 monitoring team can execute manual liquidations using a dedicated emergency fund. The amount and usage of such fund is at API3's sole discretion.
