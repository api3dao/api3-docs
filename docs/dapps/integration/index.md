---
title: Using API3 Market
pageHeader: dApps → Integration
outline: deep
---

<PageHeader/>

# Using API3 Market

See the [Quickstart](/dapps/quickstart/index.md) page for a basic guide on how to use [API3 Market.](https://market.api3.org/)
This page provides further details about using it in production.

## Update parameters

Update parameters specify the conditions that trigger a data feed update.
API3 Market supports two update parameters: [deviation threshold](#deviation-threshold) and [heartbeat interval](#heartbeat-interval).

### Deviation threshold

Deviation is the difference between the on-chain and off-chain values of a data feed.
It is measured as a percentage, and an update is initiated when the deviation exceeds the **deviation threshold**.
For example, if the deviation threshold is 1% and the on-chain value of the data feed is 100, an update is initiated when the off-chain value goes below 99 or above 101.

::: info ℹ️ Info

Note that it is not possible to guarantee a maximum deviation amount, as there is no theoretical limit to how fast the off-chain value of a data feed can change.

When we refer to a 1% deviation threshold, we mean that at the time of a deviation threshold-related update, the deviation will have exceeded 1%.

:::

API3 Market offers the following deviation threshold options:

- 5%
- 1%
- 0.5%
- 0.25%

::: info ⚠️ Warning

We assume that lower deviation thresholds are always more desirable, and thus do not validate if updates are necessary according to the update parameters.
In simpler terms, a data feed with a 1% deviation threshold can be updated even if it has only deviated by 0.5%.
For rare use cases that require different behavior, we do not recommend using API3 data feeds.

:::

Upholding a lower deviation threshold requires more frequent data feed updates.
Consequently, you can expect higher [prices](#pricing) for lower deviation thresholds.

### Heartbeat interval

A heartbeat is a data feed update that is made to uphold a maximum period of time between two consecutive updates, which is called the **heartbeat interval**.

API3 Market only offers a 24-hour heartbeat interval.

::: info ℹ️ Info

Similar to how the deviation threshold works, an update is expected to be initiated when the on-chain value is older than the heartbeat interval.
However, we have observed that some users include `require()` statements in their contracts to verify that the heartbeat interval is upheld.
To reduce the probability of this usage pattern causing transactions to revert, we initiate heartbeat interval-related updates 2 minutes earlier than necessary.
Note that this still does not provide a hard guarantee, and your contract should be able to handle cases where the on-chain value is older than the heartbeat interval.

:::

## Plan durations

API3 Market offers 7-day plans on testnets and 6-month plans on mainnets.
Each purchased plan has an expiration date, and the respective update parameters will stop being upheld after that.
Let's go over a few example cases:

- BTC/USD on Ethereum is inactive.
  The user purchases a 1% deviation threshold for 6 months.
  The data feed will immediately activate and deactivate 6 months later.
- BTC/USD on Ethereum is active with a 1% deviation threshold, set to expire 3 months later.
  The user purchases a 1% deviation threshold for 6 months (with a [discount](#discounts)).
  The expiration will be extended to 6 months from now.
- BTC/USD on Ethereum is active with a 5% deviation threshold, set to expire 3 months later.
  The user purchases a 1% deviation threshold for 6 months (with a [discount](#discounts)).
  The data feed will switch to a 1% deviation threshold and deactivate 6 months later.
- BTC/USD on Ethereum is active with a 0.5% deviation threshold, set to expire 3 months later.
  The user purchases a 1% deviation threshold for 6 months (with a [discount](#discounts)).
  The data feed will continue running with a 0.5% deviation threshold for 3 months, switch to a 1% deviation threshold, run for another 3 months, and deactivate.

When plans with different deviation parameters are queued, the API3 Market interface displays them as shown below.

<center><img src="./images/queue.png"></center>

::: info 💡 Tip

Once a plan has been purchased, API3 guarantees that the [update parameters](#update-parameters) will be upheld for the [plan duration](#plan-durations).
However, it is the user's responsibility to ensure that plans are purchased to keep the data feed active as long as necessary.
You can use the "Set Reminder" button under the expiration date to avoid forgetting to renew your plans.

:::

## Pricing

The gas cost of operating a data feed is a function of:

- The expense of data feed updates
- The frequency of data feed updates
- The duration of data feed operation

We maintain a history of data feed update gas costs and update counts required to uphold the offered deviation thresholds, and estimate the future operational costs of the offered plans based on these.

::: info 💰 Financial

The prices you see on API3 Market are the exact operational costs that we estimate (or $0.1/day, whichever is higher).
This means that it is unlikely that you will find a better bargain.

We do not plan to monetize data feed plans at any point.
Our monetization model is designed around OEV, which makes this pricing strategy sustainable.

:::

### Discounts

It is not possible to estimate the future gas cost of operating a data feed with perfect accuracy.
If we underestimate and find that the price was below the gas cost, we cover the difference.

::: info ⚠️ Warning

**On testnets only**, we stop updating if the payment runs out, even if the plan has not expired yet.
To resume updates in such cases, simply purchase a new plan.

:::

If we overestimate the price, the remainder rolls over to the next plan purchased for the same network–data feed pair, which appears as a **discount** on API3 Market.
Similarly, when a user purchases a plan for a data feed that is already active, the remainder of the payments made for earlier purchases will appear as a discount.

::: info 💰 Financial

In some cases, the discount allows you to get the plan for free.

:::

<center><img src="./images/discount.png"></center>

### Gas grants

You can request a gas grant for your dApp by filling out [this form,](https://api3dao.typeform.com/to/TBTu8bJt) where you can ask us to purchase plans for you.

## Integration information

Clicking "Integrate" on a data feed page will display the information needed for a [contract integration.](./contract-integration.md)
By default, you will see that "Skip OEV Rewards" is selected and an Api3ReaderProxyV1 address is displayed.
If you wish to forgo OEV Rewards, you can simply use this address in your integration.

<center><img src="./images/skip-oev-rewards.png"></center>

Alternatively, you can select the "Earn OEV Rewards" option, provide the name of your dApp and (if the proxy has not been deployed earlier) click the "Deploy Proxy" button to send a transaction.
Once the transaction goes through, the Api3ReaderProxyV1 address you should use in your integration will be displayed.
Note that this address is different than the one displayed when "Skip OEV Rewards" is selected.

<center><img src="./images/earn-oev-rewards.png"></center>

::: info 💡 Tip

You can't find your dApp?
You need to follow the OEV Rewards [onboarding flow](../oev-rewards/index.md#how-to-get-onboard) first.

:::
