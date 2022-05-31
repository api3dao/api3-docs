---
title: readerCanReadDataFeed()
folder: dApp Developers
---

<TitleSpan>{{$frontmatter.folder}}</TitleSpan>

# {{$frontmatter.title}}

<VersionWarning/>

<TocHeader />
<TOC class="table-of-contents" :include-level="[2,3]" />

For on-chain smart contracts, the function
[readerCanReadDataFeed()](https://github.com/api3dao/airnode-protocol-v1/blob/v0.5.0/contracts/dapis/DapiServer.sol#L771-L781)
returns true if the `reader` parameter can access the `dataFeedId` parameter
meaning that the reader address has been whitelisted. Please contact the
[API3 Business Development API Team](https://api3.org) to be whitelisted.

Calling from off-chain code (_using a library such as `ether.js`_) is not
subject to whitelisting. Off-chain code is beyond the scope of this doc.

## Example Code

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.3;

import "@api3/airnode-protocol-v1/contracts/dapis/interfaces/IDapiServer.sol";
contract mySmartContract {


  function myVerifyReadable(
    address _dapiServerContractAddress,
    bytes32 _datafeedId
  ) external {
    bool private canRead;

    // Calling the DapiServer for reader status
    // where "this" is the contract address of this contract (myVerifyReadable).
    (canRead) =
      IDapiServer(_dapiServerContractAddress).readerCanRereaderCanReadDataFeedadBeacon(_datafeedId, address(this));
  }
}

```

## Parameters

`readerCanReadDataFeed(bytes32 datafeedId, address reader)`

- `bytes32 datafeedId` - The ID of the dAPI datafeed.
- `address reader` - The address to verify such as the reader's smart contract
  address or another address.

## Returns

- `bool` - Whether the address passed is whitelisted and therefore can read the
  dAPI data feed passed.