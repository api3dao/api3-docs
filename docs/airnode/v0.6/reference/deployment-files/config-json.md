---
title: config.json
docSetName: Airnode v0.6
folder: Reference > Deployment Files
basePath: /airnode/v0.6
tags:
---

<TitleSpan>{{$frontmatter.folder}}</TitleSpan>

# {{$frontmatter.title}}

<VersionWarning/>

<TocHeader />
<TOC class="table-of-contents" :include-level="[2, 4]" />

The `config.json` defines a single Airnode deployment. The file contents are a
single JSON object. Each config object can be thought of as the static NoSQL
database of an Airnode deployment. It contains five fields as show below.

```json
{
  "chains": [],
  "nodeSettings": {},
  "triggers": {},
  "templates": [],
  "ois": [],
  "apiCredentials": []
}
```

- [chains](./config-json.md#chains): Blockchains the Airnode deployment will
  serve on and configuration details
- [nodeSettings](./config-json.md#nodesettings): General deployment parameters
  such as node version and deployment configuration.
- [triggers](./config-json.md#triggers): Which on-chain endpoints will be usable
  by which an available protocol (currently only RRP) and under what endpoint
  ID.
- [templates](./config-json.md#templates):
- [ois](./config-json.md#ois): API specifications and the corresponding on-chain
  endpoints, kept as [OIS](/ois/v1.0/ois.md) objects.
- [apiCredentials](./config-json.md#apicredentials): Which API credentials will
  be usable by which OIS and security scheme.

## chains

Lists the blockchains the Airnode deployment will serve on and specifies
respective parameters.

<!--  -->

```json
// chains
[
  {
    "authorizers": [
      "0xf18c105D0375E80980e4EED829a4A68A539E6178",
      "0xCE5e...1abc"
    ],
    "contracts": {
      "AirnodeRrp": "0xa0AD79D995DdeeB18a14eAef56A549A04e3Aa1Bd"
    },
    "id": "1",
    "providers": {
      "selfHostedMainnet": {
        "url": "${CP_SELF_HOSTED_MAINNET_URL}"
      },
      "infuraMainnet": {
        "url": "${CP_INFURA_MAINNET_URL}"
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
    "maxConcurrency": 100,

    "blockHistoryLimit": 300,
    "minConfirmations": 0
  },
  {
    "authorizers": [],
    "contracts": {
      "AirnodeRrp": "0xa0AD79D995DdeeB18a14eAef56A549A04e3Aa1Bd"
    },
    "id": "3",
    "providers": {
      "infuraRopsten": {
        "url": "${CP_INFURA_ROPSTEN_URL}"
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
    "maxConcurrency": 100,
    "blockHistoryLimit": 300,
    "minConfirmations": 0
  }
]
```

### `authorizers`

[<InfoBtnBlue/>](../../grp-providers/guides/build-an-airnode/configuring-airnode.md#authorizers)
(required) - The list of authorizer contract addresses specifying the
authorization patterns that the Airnode should use. An empty array would
allow-all.

### `contracts`

[<InfoBtnBlue/>](../../grp-providers/guides/build-an-airnode/configuring-airnode.md#contracts)
(required) - An object that keeps the addresses of the protocol contracts
deployed on the respective chain. It must include the `AirnodeRrp` contract
address.

### `id`

[<InfoBtnBlue/>](../../grp-providers/guides/build-an-airnode/configuring-airnode.md#id)
(required) - The corresponding chain (or network) ID. If this is an
Ethereum-based chain, `id` should be the chain ID as described in
[EIP-155](https://github.com/ethereum/EIPs/blob/master/EIPS/eip-155.md#list-of-chain-ids).
Refer to the documentations of the chain you will be using to find its chain ID.

### `providers`

[<InfoBtnBlue/>](../../grp-providers/guides/build-an-airnode/configuring-airnode.md#providers)
(required) - List of chain providers that will be used. Note that multiple of
them can be used simultaneously. The Airnode deployment will expect to find the
URLs of each of these chain providers in their respective `url` fields.

### `type`

[<InfoBtnBlue/>](../../grp-providers/guides/build-an-airnode/configuring-airnode.md#type)
(required) - The type of chain. Currently only `evm` is supported.

### `options`

[<InfoBtnBlue/>](../../grp-providers/guides/build-an-airnode/configuring-airnode.md#options)
(required) - An object that configures chain-related options.

#### `options.txType`

(required) - The transaction type to use:

- `"legacy"` - Legacy Transaction Type
- `"eip1559"` -
  [EIP-1559 Transaction Type](https://eips.ethereum.org/EIPS/eip-1559)

#### `options.priorityFee`

(optional) - An object that configures the EIP-1559 Priority Fee. Defaults:
`{"value": 3.12, "unit": "gwei"}`.

##### `options.priorityFee.value`

(required) - A number specifying the EIP-1559 priority fee value.

##### `options.priorityFee.unit`

(required) - The unit of the priority fee value. It can be one of the following:

- `wei`
- `kwei`
- `mwei`
- `gwei`
- `szabo`
- `finney`
- `ether`

#### `options.baseFeeMultiplier`

(optional) - Configures the EIP-1559 Base Fee to Maximum Fee Multiplier
(defaults to `2`)

The resulting Maximum Fee will equal
`(Base Fee * baseFeeMultiplier) + priorityFee`

#### `options.fulfillmentGasLimit`

(required) - The maximum gas limit allowed when Airnode responds to a request.
See
[chain-related options](../../grp-providers/guides/build-an-airnode/configuring-airnode.md#options)
for additional details.

### `maxConcurrency`

[<InfoBtnBlue/>](../../grp-providers/guides/build-an-airnode/configuring-airnode.md#maxconcurrency)
(required) - The maximum concurrency specifies the maximum number of concurrent
handler calls per single Airnode invocation.

### `blockHistoryLimit`

[<InfoBtnBlue/>](../../grp-providers/guides/build-an-airnode/configuring-airnode.md#blockhistorylimit)
(optional) - The number of blocks in the past that the Airnode deployment should
search for requests. Defaults to `300` (roughly 1 hour for Ethereum).

### `minConfirmations`

[<InfoBtnBlue/>](../../grp-providers/guides/build-an-airnode/configuring-airnode.md#minconfirmations)
(optional) - The number of confirmations required for a request to be considered
valid. Minimum confirmations refers to the number of blocks that have elapsed
since the current confirmed block. Defaults to `0`.

## nodeSettings

An object containing general deployment parameters of an Airnode.

```json
// nodeSettings
{
  "nodeVersion": "0.6.7",
  "cloudProvider": {
    "type": "gcp",
    "region": "us-east1",
    "disableConcurrencyReservations": false,
    "projectId": "${GCP_PROJECT_ID}"
  },
  "stage": "testnet",
  "airnodeWalletMnemonic": "${AIRNODE_WALLET_MNEMONIC}",
  "heartbeat": {
    "enabled": true,
    "url": "${HEARTBEAT_URL}",
    "apiKey": "${HEARTBEAT_API_KEY}",
    "id": "${HEARTBEAT_ID}"
  },
  "httpGateway": {
    "enabled": true,
    "apiKey": "${HTTP_GATEWAY_API_KEY}",
    "maxConcurrency": 20
  },
  "httpSignedDataGateway": {
    "enabled": true,
    "apiKey": "${HTTP_SIGNED_DATA_GATEWAY_API_KEY}",
    "maxConcurrency": 20
  },
  "logFormat": "json",
  "logLevel": "INFO"
}
```

### `cloudProvider`

[<InfoBtnBlue/>](../../grp-providers/guides/build-an-airnode/configuring-airnode.md#cloudprovider)
(required) - The cloud provider that the node will be deployed at and its
configuration.

#### `cloudProvider.type`

(required) - Currently `aws` and `gcp` are supported for serverless
([deployer-image](../../grp-providers/docker/deployer-image.md)). Use `local` if
you want to run Airnode as a docker container locally
([client-image](../../grp-providers/docker/client-image.md)).

#### `cloudProvider.region`

(required for AWS and GCP) - The cloud provider region that the node will be
deployed at. See the cloud provider's documentation for possible values. Some
AWS regions are disabled by default, you must enable them before you can create
and manage resources, see
[Enabling a Region](https://docs.aws.amazon.com/general/latest/gr/rande-manage.html).
When using GCP, make sure to choose a **region** and not a zone. Note that
transferring a deployment from one region to the other is not trivial (i.e., it
does not take one command like deployment, but rather three). Therefore, try to
choose a region and stick to it for this specific deployment.

#### `cloudProvider.disableConcurrencyReservations`

(required for AWS and GCP) - Disables concurrency reservations for spawned cloud
functions. For more information refer to the
[maxConcurrency](../../grp-providers/guides/build-an-airnode/configuring-airnode.md#maxconcurrency)
section.

#### `cloudProvider.projectId`

(required for GCP) - Project ID of the GCP project the Airnode will be deployed
under.

### `airnodeWalletMnemonic`

[<InfoBtnBlue/>](../../grp-providers/guides/build-an-airnode/configuring-airnode.md#airnodewalletmnemonic)
(required) - The wallet mnemonic that will be used by the Airnode.

### `heartbeat`

[<InfoBtnBlue/>](../../grp-providers/guides/build-an-airnode/configuring-airnode.md#heartbeat)
(required) - The Airnode's "call home" functionality. Airnode can periodically
make a request to the specified URL signaling that it's active. There are plans
in the future to allow the sending of a payload with information for reporting
purposes.

#### `heartbeat.enabled`

(required) - Enable/disable, using true/false, Airnode's heartbeat.

#### `heartbeat.apiKey`

(only if enabled) - The API key to authenticate against the heartbeat URL.

#### `heartbeat.id`

(only if enabled) - The Airnode heartbeat ID for accounting purposes.

#### `heartbeat.url`

(only if enabled) - The URL to make the heartbeat request to.

### `httpGateway`

[<InfoBtnBlue/>](../../grp-providers/guides/build-an-airnode/configuring-airnode.md#httpgateway)
(required) - The Airnode's HTTP gateway can request endpoints without using the
blockchain.

#### `httpGateway.enabled`

(required) - Enable/disable, using true/false, Airnode's access to the HTTP
gateway.

#### `httpGateway.apiKey`

(only if enabled) - The API key to authenticate against the gateway. Do not use
the same key for `httpGateway` and `httpSignedDataGateway`.

#### `httpGateway.maxConcurrency`

(only if enabled, optional) - A number higher than zero representing the maximum
number of serverless functions serving HTTP gateway requests running at the same
time. When omitted, there is no maximum concurrency set.

### `httpSignedDataGateway`

[<InfoBtnBlue/>](../../grp-providers/guides/build-an-airnode/configuring-airnode.md#httpsigneddatagateway)
(required) - The Airnode's HTTP gateway can request endpoints without using the
blockchain.

#### `httpSignedDataGateway.enabled`

(required) - Enable/disable, using true/false, Airnode's access to the HTTP
gateway.

#### `httpSignedDataGateway.apiKey`

(only if enabled) - The API key to authenticate against the gateway. Do not use
the same key for `httpGateway` and `httpSignedDataGateway`.

#### `httpSignedDataGateway.maxConcurrency`

(only if enabled, optional) - A number higher than zero representing the maximum
number of serverless functions serving HTTP gateway requests running at the same
time. When omitted, there is no maximum concurrency set.

### `logFormat`

[<InfoBtnBlue/>](../../grp-providers/guides/build-an-airnode/configuring-airnode.md#logformat)
(required) - The format that will be used to output logs. Either `json` or
`plain`.

### `logLevel`

[<InfoBtnBlue/>](../../grp-providers/guides/build-an-airnode/configuring-airnode.md#loglevel)
(required) - The highest verbosity level of the logs that will be outputted.
`DEBUG`, `INFO`, `WARN` or `ERROR`.

### `nodeVersion`

[<InfoBtnBlue/>](../../grp-providers/guides/build-an-airnode/configuring-airnode.md#nodeversion)
(required) - The version of the node (Airnode) that will be deployed with this
config object.

### `stage`

[<InfoBtnBlue/>](../../grp-providers/guides/build-an-airnode/configuring-airnode.md#stage)
(required) - The label used to distinguish between multiple deployments of the
same Airnode on a cloud provider. For example, the same Airnode may have
multiple deployments with `stage` set to a different value (dev, public, prod).
`stage` cannot be longer than 16 characters and can only include lowercase
alphanumeric characters (`a–z`, `0–9`) and hyphens (`-`).

### `skipValidation`

[<InfoBtnBlue/>](../../grp-providers/guides/build-an-airnode/configuring-airnode.md#skipvalidation)
(optional) - Whether the config.json validation should be skipped. Defaults to
`false`.

## triggers

An array that maps external triggers such as a request made through RRP (or a
subscription made through PSP, which is not implemented yet) to an endpoint
defined in an OIS.

```json
// triggers
{
  "rrp": [
    {
      "endpointId": "0xd7ddc8ee64d6e540682ec844a5dd9737663ec3afe5751102eb4f966744751838",
      "oisTitle": "myOisTitle",
      "endpointName": "myEndpointName"
    }
  ],
  "http": [
    {
      "endpointId": "0xd7ddc8ee64d6e540682ec844a5dd9737663ec3afe5751102eb4f966744751838",
      "oisTitle": "myOisTitle",
      "endpointName": "myEndpointName"
    }
  ],
  "httpSignedData": [
    {
      "endpointId": "0xd7ddc8ee64d6e540682ec844a5dd9737663ec3afe5751102eb4f966744751838",
      "oisTitle": "myOisTitle",
      "endpointName": "myEndpointName"
    }
  ]
}
```

In the example above, the Airnode deployment has an OIS with the title
`myOisTitle`. This OIS has an endpoint with the name `myEndpointName`. When the
Airnode deployment detects a [request](../../concepts/request.md) that
references its [`airnodeAddress`](../../concepts/airnode.md#airnodeaddress) and
<code style="overflow-wrap: break-word;">0xd7ddc8ee64d6e540682ec844a5dd9737663ec3afe5751102eb4f966744751838</code>
as the [`endpointId`](../../concepts/endpoint.md#endpointid), it will call the
specified endpoint (`myOisTitle`-`myEndpointName`) with the parameters provided
in the request to fulfill it. See the
[endpoint id documentation](../../concepts/endpoint.md#endpointid) for the
default convention for deriving the `endpointId`.

### `rrp`

[<InfoBtnBlue/>](../../grp-providers/guides/build-an-airnode/configuring-airnode.md#rrp)
(required) - An array of endpoints from OIS that the Airnode will respond to for
the RRP protocol.

#### `rrp[n].endpointId`

(required) - A identifier derived for an oisTitle/endpointName pair, see
[derive-endpoint-id](../packages/admin-cli.md#derive-endpoint-id).

#### `rrp[n].oisTitle`

(required) - The title of an OIS object.

#### `rrp[n].endpointName`

(required) - The endpoint name of an OIS endpoint.

### `http`

[<InfoBtnBlue/>](../../grp-providers/guides/build-an-airnode/configuring-airnode.md#http)
(required) - An array of endpoints from OIS that the Airnode will respond to.

#### `http[n].endpointId`

(required) - A identifier derived for an oisTitle/endpointName pair, see
[derive-endpoint-id](../packages/admin-cli.md#derive-endpoint-id).

#### `http[n].oisTitle`

(required) - The title of an OIS object.

#### `http[n].endpointName`

(required) - The endpoint name of an OIS endpoint.

### `httpSignedData`

[<InfoBtnBlue/>](../../grp-providers/guides/build-an-airnode/configuring-airnode.md#httpsigneddata)
(required) - An array of endpoints from OIS that the Airnode will respond to.

#### `httpSignedData[n].endpointId`

(required) - A identifier derived for an oisTitle/endpointName pair, see
[derive-endpoint-id](../packages/admin-cli.md#derive-endpoint-id).

#### `httpSignedData[n].oisTitle`

(required) - The title of an OIS object.

#### `httpSignedData[n].endpointName`

(required) - The endpoint name of an OIS endpoint.

## templates

An array that includes the necessary information to make
[template requests](../../concepts/request.md#template-request)

```json
// templates
[
  {
    "templateId": "0x02834eb43d56133982b7d6e5aa8b466c7ea4ba0fadf697698c1fee0996bba0fc",
    "endpointId": "0xd9e8c9bcc8960df5f954c0817757d2f7f9601bd638ea2f94e890ae5481681153",
    "encodedParameters": "0x3173000000000000000000000000000000000000000000000000000000000000636f696e49640000000000000000000000000000000000000000000000000000657468657265756d000000000000000000000000000000000000000000000000"
  }
]
```

### `templates`

(required) - An array of templates which can be left empty if no templates are
used. Valid templates will be used to make template requests without calling the
contract to fetch the template from the chain. For details see:
[using templates](../../grp-developers/using-templates.md)

#### `templateId`

(required) - An identifier derived by hashing the Airnode address, the
endpointId and the encoded parameters of the template. For derivation see:
[templates](../../concepts/template.md#templateid).

#### `endpointId`

(required) - An identifier derived for an oisTitle/endpointName pair. For
derivation see:
[derive-endpoint-id](../packages/admin-cli.md#derive-endpoint-id).

#### `encodedParameters`

(required) - The encoded request parameters.

## ois

A list of OIS objects. Since each OIS specifies the integration of an API to an
oracle, a single Airnode deployment can serve multiple APIs. To avoid
duplication of content, see the
[Oracle Integration Specifications (OIS)](/ois/v1.0/) for a complete example and
the explanation of its fields.

## apiCredentials

Each entry in `apiCredentials` maps to a security scheme defined in an OIS
(`ois[n].components.securitySchemes.{securitySchemeName}`), where `oisTitle` is
the `title` field of the related OIS, and `securitySchemeName` is the name of
the respective security scheme. These would be `myOisTitle` and
`mySecurityScheme` in the example below. `securitySchemeValue` is the value used
for the authentication with the security scheme (e.g., the API key) which would
be in `secrets.env` in the example below.

The `security` field in the OIS object must be included and hold the names of
all security schemes the API operation

Use of apiCredentials is not required, leave its array empty.

```json
// apiCredentials
[
  {
    "oisTitle": "myOisTitle",
    "securitySchemeName": "mySecurityScheme",
    "securitySchemeValue": "${SS_MY_API_KEY}"
  }
]

// components and security field in OIS object
{
"title": "myOisTitle",
...,
"components": {
  "securitySchemes": {
    "mySecurityScheme": {
      "in": "header",
      "type": "apiKey",
      "name": "X-api-key"
    }
  }
},
"security": {
  "mySecurityScheme" []
}
...
}
```

### `oisTitle`

[<InfoBtnBlue/>](../../grp-providers/guides/build-an-airnode/configuring-airnode.md#oistitle)
(required) - The `ois.title` of the OIS where the `securitySchemeName` can be
found.

### `securitySchemeName`

[<InfoBtnBlue/>](../../grp-providers/guides/build-an-airnode/configuring-airnode.md#securityschemename)
(required) - The name of a security scheme from
`ois[n].components.securitySchemes.{securitySchemeName}`.

### `securitySchemeValue`

[<InfoBtnBlue/>](../../grp-providers/guides/build-an-airnode/configuring-airnode.md#securityschemevalue)
(required) - The value of the security scheme used (as defined by
`ois[n].components.securitySchemes.{securitySchemeName}` for the authentication.
Usually stored in `secrets.env`.
