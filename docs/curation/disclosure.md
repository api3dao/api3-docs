---
title: Disclosure
pageHeader: Curation
outline: deep
---

<PageHeader/>

# Disclosure

This page describes the scope of Api3's role as a Morpho vault curator, the risks involved in interacting with Api3-curated vaults, and the limits of Api3's responsibility and ability.
By depositing into, withdrawing from, or otherwise interacting with any vault curated by Api3, you acknowledge and accept the Api3 [terms and conditions,](https://api3.org/terms-and-conditions/) which apply to all services and software provided by the API3 Foundation ("Api3"), as well as the additional supplemental disclosures in these docs.

## Scope of curation

Api3's role as a curator is limited to setting on-chain vault parameters within the [Morpho Protocol](https://morpho.org/) — selecting enabled markets, configuring supply caps, assigning roles, and operating the automation described elsewhere in these docs.

Api3 does not hold, control, or take custody of any user assets.
All deposits, withdrawals, and market interactions occur directly through Morpho's open-source, non-custodial smart contracts.
Users remain solely responsible for the custody and security of their private keys and digital assets.

Interactions with Morpho's smart contracts, interfaces, and other services are governed by Morpho's own [terms](https://morpho.org/terms-of-use/) and documentation. Api3 has no responsibility for nor ability to affect the Morpho Protocol services, smart contracts, nor its operation or maintenance.

## No offer, no advice

Nothing in this documentation, nor any parameters, strategies, or materials related to Api3-curated vaults, constitutes:

- An offer to sell or solicitation to buy any financial instrument, investment product, or security.
- Financial, investment, legal, tax, accounting, or other professional advice.
- A recommendation to take or refrain from taking any action.

Api3 does not act as your broker, investment adviser, fiduciary, or asset manager. All information is provided for general informational purposes only, and users are expected to conduct their own due diligence before interacting with any vault, including the verification of any transaction settings and parameters whether or not shown or suggested by any Api3 service or site.

## Risks

Interacting with Api3-curated vaults involves significant risks. These include, but are not limited to:

- **Market risk** — Collateral assets may experience extreme volatility or illiquidity, leading to bad debt in the underlying lending markets that cannot be fully liquidated.
- **Smart contract risk** — Vulnerabilities or bugs in the Morpho Protocol, the collateral tokens, the oracle infrastructure, or any other contract in the stack may result in partial or total loss of funds.
- **Oracle risk** — Although Api3 operates as the oracle provider for its own markets, oracle systems can fail, be manipulated, or behave unexpectedly during adverse market conditions.
- **Parameter and governance risk** — Market configurations, supply caps, role assignments, and other parameters may be changed. Such changes may adversely affect vault performance or withdrawal availability.
- **Liquidity risk** — Under stressed market conditions, withdrawals may be temporarily delayed pending the availability of idle liquidity or successful rebalancing across markets.
- **Regulatory risk** — Legal and regulatory treatment of vaults, tokenized positions, and DeFi lending may change in ways that adversely affect users.

Past performance does not guarantee future results. Vault strategies may be changed, expanded, or discontinued at any time, and parameter changes are at Api3's sole discretion.

## No guarantees

Api3's curation services are provided on an "as is" basis, without warranties of any kind, whether express or implied.
Api3 makes no representation or guarantee as to:

- The safety of assets deposited into any vault.
- The accuracy or appropriateness of any parameter or risk classification.
- The future yield or performance of any strategy.
- The availability of withdrawal liquidity at any given time.

The fact that Api3 deploys a portion of its own treasury into the vaults it curates (as described under [Skin in the game](/curation/#skin-in-the-game)) reflects alignment of incentives, but is not a guarantee, backstop, or commitment to compensate third-party depositors for any loss.

## Restricted access

To Api3's knowledge, Morpho's vaults (whether or not Api3-curated) are not registered with, or approved by, any financial regulatory authority in any jurisdiction.
They are not available to, and must not be accessed by, persons or entities located, incorporated, or resident in jurisdictions where such access is restricted or prohibited — including, without limitation, jurisdictions subject to comprehensive sanctions administered by the UN, OFAC or other competent authorities.

By interacting with an Api3-curated vault, you represent that you are not a prohibited person and that you are acting in full compliance with Api3's terms and all laws applicable to you.

## Limitation of liability

Api3's role is limited to setting vault parameters within the Morpho Protocol. Api3 has no contractual relationship with vault users and assumes no liability nor responsibility for any losses, damages, or claims arising out of or in connection with the use of any vault nor any of the Risks enumerated above, including but not limited to those caused by:

- Smart contract failures, exploits, or forks of the underlying protocols.
- Failures or inaccuracies of any third-party data source, valuation, or price feed.
- User error, loss of private keys, or compromised wallets.
- Regulatory actions, changes in law, or force majeure events (including cyberattacks and network failures).

To the maximum extent permitted by law, Api3 shall not be liable for any direct, indirect, incidental, special, consequential, or punitive damages arising from your use of any Api3-curated vault or other service. In the event of any conflict between these disclosures and the Api3 [terms and conditions](https://api3.org/terms-and-conditions/), the Api3 terms and conditions shall control.
