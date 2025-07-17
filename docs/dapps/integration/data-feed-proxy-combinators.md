---
title: data-feed-proxy-combinators
pageHeader: dApps → Integration
---

<PageHeader/>

# `data-feed-proxy-combinators`

The [`data-feed-proxy-combinators`](https://github.com/api3dao/data-feed-proxy-combinators) repository provides a powerful toolkit of modular smart contracts. These "combinators" allow you to create new, customized data feeds by transforming and combining existing Api3 dAPIs or even external data feeds. This is particularly useful when your dApp requires a data feed that is not directly available on the Api3 Market.

## Core Components

The repository offers a suite of composable proxy contracts. You can chain these together to build complex data feed pipelines. The primary contracts include:

- **`InverseApi3ReaderProxyV1.sol`**: Computes the inverse of a data feed's value (e.g., converting ETH/USD to USD/ETH).
- **`ProductApi3ReaderProxyV1.sol`**: Multiplies the values of two data feeds to derive a new cross-rate (e.g., `(A/B) * (B/C) = A/C`).
- **`PriceCappedApi3ReaderProxyV1.sol`**: Enforces a price ceiling and/or floor on a data feed's value.
- **`NormalizedApi3ReaderProxyV1.sol`**: Adapts an external feed using the Chainlink `AggregatorV2V3Interface` interface to the Api3 `IApi3ReaderProxy` interface, normalizing its value to 18 decimals.
- **`ScaledApi3FeedProxyV1.sol`**: An adapter that changes the decimal precision of a data feed and exposes it via the standard `AggregatorV2V3Interface` interface.

## Usage and Examples

For comprehensive instructions on how to use and deploy these contracts, including practical use-case scenarios, please refer to the [`README.md`](https://github.com/api3dao/data-feed-proxy-combinators/blob/main/README.md) file.

::: info ℹ️ Source of Truth

The Solidity contracts located in the `contracts/` directory of the repository are the ultimate source of truth for implementation details.

:::
