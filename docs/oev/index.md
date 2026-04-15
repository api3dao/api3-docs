---
title: Overview
pageHeader: OEV
outline: deep
---

<PageHeader/>

# Overview

Oracle Extractable Value (OEV) is a subset of Maximal Extractable Value (MEV) that occurs as a result of an oracle update.

The idea is that different oracle updates have different importance.
Some updates expose profitable opportunities on the market. Searchers actively compete
with each other to be the first to realize these - paying a majority of the exposed value
to block validators in the process. This dynamic is unhealthy, because the
majority of the value should be split between the dApp and the searcher that
realizes the opportunity.

OEV solves this problem by offering the exclusive rights to execute the
oracle update(s), allowing searchers to atomically update the price feed(s) used
by the dApps and profit from the opportunities on the market. The exclusive update
rights guarantee no competition and searchers avoid paying premiums on gas fees.

Api3 facilitates OEV using two ways:

1. Private auctions performed via partnered searchers on non-delayed data.
2. Searching using public Signed APIs on delayed data, open for anyone to participate.

::: info 💡 Tip

For quick reference, you can copy-paste [`llms-full.txt`](https://docs.api3.org/llms-full.txt) to your choice of AI assistant.

:::

## Practical example

Imagine an overcollateralized lending platform that uses Api3 price feeds.
Borrowers in the protocol can be liquidated with an incentive whenever their
position becomes unhealthy to ensure the protocol remains solvent. Say
liquidations can occur if the loan-to-value ratio exceeds 90%. Let's look at
what happens with the protocol's health over time.

Assume that initially there are no unhealthy positions. Many of the price feed
updates that happen are "unnecessary" because they don't expose any unhealthy
positions and the protocol remains healthy. However, after some time there is a
price drop that causes many positions using that asset as collateral to approach
the 90% liquidation threshold.

In this scenario, the next price update that causes a position to become
unhealthy is valuable. Api3 partnered searchers monitor the dApp and public Api3 data sources and notice that a position will become unhealthy after the next oracle update. They submit a transaction that executes the oracle update and perform the liquidation
atomically.

The concept of OEV is not limited to liquidations, but can occur anywhere where
price feed updates potentially expose profitable opportunities, such as
arbitrage and many others.

## OEV distribution

Thus, the majority of the OEV is distributed to the dApp and the
searchers.

Api3 searching revenue is split between:

1. Paying the dApps in the form of [OEV Rewards](/dapps/oev-rewards/).
2. Api3 protocol fee.

For Api3-curated markets, the entirety of the OEV belongs to Api3.

## Get started with OEV

Here are resources to help you get started with OEV:

1. See [OEV Dashboard](https://oev-dashboard.api3.org/) to browse the past OEV performance.
2. Dive deeper into OEV by reading the
   [OEV Litepaper](https://raw.githubusercontent.com/api3dao/oev-litepaper/main/oev-litepaper.pdf).
3. Connect with other developers and OEV enthusiasts in our
   [OEV Discord channel](https://discord.com/channels/758003776174030948/1062909222347603989).
4. Follow Api3 on [X](https://x.com/api3dao) for the latest news and updates on
   OEV.
