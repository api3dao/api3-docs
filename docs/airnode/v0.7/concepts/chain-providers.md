---
title: Chain Providers
docSetName: Airnode v0.7
folder: Concepts and Definitions
basePath: /airnode/v0.7
tags:
---

<TitleSpan>{{$frontmatter.folder}}</TitleSpan>

# {{$frontmatter.title}}

<VersionWarning/>

<TocHeader />
<TOC class="table-of-contents" :include-level="[2,3]" />

Chain providers provide access to an evm on behalf of an API provider. Your
Airnode will interact with one or more chain providers and respond to requests.
You can use multiple chain providers for each chain and declare multiple chains
each with one of more chain providers. Below are some of the chain providers you
might use.

- [Pocket](https://www.pokt.network/)
- [Infura](https://infura.io)
- [Alchemy](https://www.alchemy.com/)

## One Chain: One Provider

As an example the `chains` field declares its use of blockchain 4, _Rinkeby_.
The `type` is set to _evm_ which is the only type currently supported by
Airnode. It then applies an arbitrary name for the blockchain provider
"infura_rinkeby" in the `providers` array.

```json
"chains": [
  {
    "authorizers": [
      "0xf18c105D0375E80980e4EED829a4A68A539E6178"
    ],
    "contracts": {
      "AirnodeRrp": "0xa0AD79D995DdeeB18a14eAef56A549A04e3Aa1Bd"
    },
    "id": "4",
    "providers": {
      "infura_rinkeby": {
        "url": "${INFURA_RINKEBY_PROVIDER_URL}"
      }
    },
    "type": "evm",
    "options": {
      "txType": "eip1559",
      "priorityFee": {
        "value": 3.12,
        "unit": "gwei"
      },
      "baseFeeMultiplier": 2,
      "fulfillmentGasLimit": 500000
    },
    "maxConcurrency": 100
  }
],
```

## One Chain: Multiple Providers

Multiple providers can be used per chain. Simply add another object to
`providers`. In this case both blockchain providers will have the same chain
`id` and `type`.

```json
"chains": [
  {
    "authorizers": [
      "0xf18c105D0375E80980e4EED829a4A68A539E6178"
    ],
    "contracts": {
      "AirnodeRrp": "0xa0AD79D995DdeeB18a14eAef56A549A04e3Aa1Bd"
    },
    "id": "4",
    "providers": {
      "infura_rinkeby": {
        "url": "${INFURA_RINKEBY_PROVIDER_URL}"
      },
      "alchemy_rinkeby": {
        "url": "${ALCHEMY_RINKEBY_PROVIDER_URL}"
      }
    },
    "type": "evm",
    "options": {
      "txType": "eip1559",
      "priorityFee": {
        "value": 3.12,
        "unit": "gwei"
      },
      "baseFeeMultiplier": 2,
      "fulfillmentGasLimit": 500000
    },
    "maxConcurrency": 100
  }
],
```

## Multiple Chains: Multiple Providers

Not as complicated as it sounds. First create two or more chain objects were
each has a unique `id` and `type` and a list of `providers` for each.

```json
"chains": [
  {
    "authorizers": [
      "0xf18c105D0375E80980e4EED829a4A68A539E6178"
    ],
    "contracts": {
      "AirnodeRrp": "0xa0AD79D995DdeeB18a14eAef56A549A04e3Aa1Bd"
    },
    "id": "4",
    "providers": {
      "infura_rinkeby": {
        "url": "${INFURA_RINKEBY_PROVIDER_URL}"
      },
      "alchemy_rinkeby": {
        "url": "${ALCHEMY_RINKEBY_PROVIDER_URL}"
      }
    },
    "type": "evm",
    "options": {
      "txType": "eip1559",
      "priorityFee": {
        "value": 3.12,
        "unit": "gwei"
      },
      "baseFeeMultiplier": 2,
      "fulfillmentGasLimit": 500000
    },
    "maxConcurrency": 100
  },
  {
    "authorizers": [
      "0xf18c105D0375E80980e4EED829a4A68A539E6178"
    ],
    "contracts": {
      "AirnodeRrp": "0xa0AD79D995DdeeB18a14eAef56A549A04e3Aa1Bd"
    },
    "id": "3",
    "providers": {
      "infura_ropsten": {
        "url": "${INFURA_ROPSTEN_PROVIDER_URL}"
      }
    },
    "type": "evm",
    "options": {
      "txType": "eip1559",
      "priorityFee": {
        "value": 3.12,
        "unit": "gwei"
      },
      "baseFeeMultiplier": 2,
      "fulfillmentGasLimit": 500000
    },
    "maxConcurrency": 100
  }
],
```
