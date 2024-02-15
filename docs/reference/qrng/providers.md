---
title: Providers
sidebarHeader: QRNG
sidebarSubHeader:
pageHeader: Reference → QRNG
path: /reference/qrng/providers.html
outline: deep
tags:
---

<PageHeader/>

<SearchHighlight/>

<FlexStartTag/>

# {{$frontmatter.title}}

API3 QRNG is built on [Airnode RRP](/reference/airnode/latest/concepts/), and as
a result is provider-agnostic. See below for the providers that are currently
available. Each provider has an Airnode address with an extended public key
(xpub) and two endpoint IDs.

- <b>`airnode`</b>: The address that belongs to the Airnode that will be called
  to get the QRNG data via its endpoints. This is not AirnodeRrpV0 contract
  address.

- <b>`xpub`</b>: The extended public key of the Airnode (`airnode`).

- <b>`endpointIdUint256`</b>: The Airnode endpoint ID that returns one random
  number of type `uint256`.

- <b>`endpointIdUint256Array`</b>: The Airnode endpoint ID that returns multiple
  random numbers of type `uint256[]`. Takes one parameter named `size` of type
  `uint256` (maximum value: 512).

## ANU Quantum Random Numbers

Australian National University is one of the leading research universities in
Australia. Visit their website at
[https://quantumnumbers.anu.edu.au](https://quantumnumbers.anu.edu.au/).

ANU Quantum Random Numbers are only available on
[mainnets](/reference/qrng/chains.md#anu). For testnets use
[Testnet Random Numbers](/reference/qrng/providers.md#testnet-random-numbers).
[Quintessence](/reference/qrng/providers.md#quintessence-quantum-random-numbers)
is available on mainnets and a few testnets.

### `airnode`

<div style="word-wrap:break-word;margin-top:25px;">
<div style="margin-top:15px;margin-left:15px">
    <span style="font-family:courier">0x9d3C147cA16DB954873A498e0af5852AB39139f2</span>
    <CopyIcon text="0x9d3C147cA16DB954873A498e0af5852AB39139f2"/>
</div>
</div>

### `xpub`

<div style="word-wrap:break-word;margin-top:25px;">
<div style="margin-top:15px;margin-left:15px">
    <span style="font-family:courier">xpub6DXSDTZBd4aPVXnv6Q3SmnGUweFv6j24SK77W4qrSFuhGgi666awUiXakjXruUSCDQhhctVG7AQt67gMdaRAsDnDXv23bBRKsMWvRzo6kbf</span>
    <CopyIcon text="xpub6DXSDTZBd4aPVXnv6Q3SmnGUweFv6j24SK77W4qrSFuhGgi666awUiXakjXruUSCDQhhctVG7AQt67gMdaRAsDnDXv23bBRKsMWvRzo6kbf"/>
</div>
</div>

### `endpointIdUint256`

<div style="word-wrap:break-word;margin-top:15px;margin-left:15px">
    <span style="font-family:courier">0xfb6d017bb87991b7495f563db3c8cf59ff87b09781947bb1e417006ad7f55a78</span>
    <CopyIcon text="0xfb6d017bb87991b7495f563db3c8cf59ff87b09781947bb1e417006ad7f55a78"/>
</div>

### `endpointIdUint256Array`

<div style="word-wrap:break-word;margin-top:15px;margin-left:15px;">
    <span style="font-family:courier">0x27cc2713e7f968e4e86ed274a051a5c8aaee9cca66946f23af6f29ecea9704c3</span>
    <CopyIcon text="0x27cc2713e7f968e4e86ed274a051a5c8aaee9cca66946f23af6f29ecea9704c3"/>
</div>

## Testnet Random Numbers

Testnet Random Numbers emulates QRNG using
[pseudorandom numbers](https://www.mathworks.com/help/stats/generating-random-data.html)
on testnets to get familiar with QRNG.

### `airnode`

<div style="word-wrap:break-word;margin-top:25px;">
<div style="margin-top:15px;margin-left:15px">
    <span style="font-family:courier">0x6238772544f029ecaBfDED4300f13A3c4FE84E1D</span>
    <CopyIcon text="0x6238772544f029ecaBfDED4300f13A3c4FE84E1D"/>
</div>
</div>

### `xpub`

<div style="word-wrap:break-word;margin-top:25px;">
<div style="margin-top:15px;margin-left:15px">
    <span style="font-family:courier">xpub6CuDdF9zdWTRuGybJPuZUGnU4suZowMmgu15bjFZT2o6PUtk4Lo78KGJUGBobz3pPKRaN9sLxzj21CMe6StP3zUsd8tWEJPgZBesYBMY7Wo</span>
    <CopyIcon text="xpub6CuDdF9zdWTRuGybJPuZUGnU4suZowMmgu15bjFZT2o6PUtk4Lo78KGJUGBobz3pPKRaN9sLxzj21CMe6StP3zUsd8tWEJPgZBesYBMY7Wo"/>
</div>
</div>

### `endpointIdUint256`

<div style="word-wrap:break-word;margin-top:15px;margin-left:15px">
    <span style="font-family:courier">0x94555f83f1addda23fdaa7c74f27ce2b764ed5cc430c66f5ff1bcf39d583da36</span>
    <CopyIcon text="0x94555f83f1addda23fdaa7c74f27ce2b764ed5cc430c66f5ff1bcf39d583da36"/>
</div>

### `endpointIdUint256Array`

<div style="word-wrap:break-word;margin-top:15px;margin-left:15px;">
    <span style="font-family:courier">0x9877ec98695c139310480b4323b9d474d48ec4595560348a2341218670f7fbc2</span>
    <CopyIcon text="0x9877ec98695c139310480b4323b9d474d48ec4595560348a2341218670f7fbc2"/>
</div>

## Quintessence Quantum Random Numbers

Australian-based [Quintessence Labs](https://www.quintessencelabs.com/) is a
global leader in quantum cybersecurity, recognized for its advanced
quantum-resilient data protection capabilities. Its trademarked
[qStream](https://www.quintessencelabs.com/products#qrng) generator creates
perfectly unpredictable true random numbers.

<!-- Need css for mobile -->

### `airnode`

<div style="word-wrap:break-word;margin-top:25px;">
<div style="margin-top:15px;margin-left:15px">
    <span style="font-family:courier">0x224e030f03Cd3440D88BD78C9BF5Ed36458A1A25</span>
    <CopyIcon text="0x224e030f03Cd3440D88BD78C9BF5Ed36458A1A25"/>
</div>
</div>

### `xpub`

<div style="word-wrap:break-word;margin-top:25px;">
<div style="margin-top:15px;margin-left:15px">
    <span style="font-family:courier">xpub6CyZcaXvbnbqGfqqZWvWNUbGvdd5PAJRrBeAhy9rz1bbnFmpVLg2wPj1h6TyndFrWLUG3kHWBYpwacgCTGWAHFTbUrXEg6LdLxoEBny2YDz</span>
    <CopyIcon text="xpub6CyZcaXvbnbqGfqqZWvWNUbGvdd5PAJRrBeAhy9rz1bbnFmpVLg2wPj1h6TyndFrWLUG3kHWBYpwacgCTGWAHFTbUrXEg6LdLxoEBny2YDz"/>
</div>
</div>

### `endpointIdUint256`

<div style="word-wrap:break-word;margin-top:15px;margin-left:15px">
    <span style="font-family:courier">0xffd1bbe880e7b2c662f6c8511b15ff22d12a4a35d5c8c17202893a5f10e25284</span>
    <CopyIcon text="0xffd1bbe880e7b2c662f6c8511b15ff22d12a4a35d5c8c17202893a5f10e25284"/>
</div>

### `endpointIdUint256Array`

<div style="word-wrap:break-word;margin-top:15px;margin-left:15px;">
    <span style="font-family:courier">0x4554e958a68d68de6a4f6365ff868836780e84ac3cba75ce3f4c78a85faa8047</span>
    <CopyIcon text="0x4554e958a68d68de6a4f6365ff868836780e84ac3cba75ce3f4c78a85faa8047"/>
</div>

## Quantum Blockchains Random Numbers

[Quantum Blockchains](https://www.quantumblockchains.io/) is driven by two
primary objectives: enhancing blockchain security and fostering the broader
adoption of quantum cryptography.

Given this backdrop, blockchains emerge as the premier platform for the
development and implementation of formidable quantum-resistant cryptographic
strategies. Quantum Blockchains dedication to fortifying blockchain security not
only advances this specific realm but also positions us at the forefront of
broader cryptographic challenges, underscoring the imperative of
quantum-resistant cryptography advancements.

<!-- Need css for mobile -->

### `airnode`

<div style="word-wrap:break-word;margin-top:25px;">
<div style="margin-top:15px;margin-left:15px">
    <span style="font-family:courier">0x07D7F4EcaC8aDf3f0412ab058a051fD8b8507348</span>
    <CopyIcon text="0x07D7F4EcaC8aDf3f0412ab058a051fD8b8507348"/>
</div>
</div>

### `xpub`

<div style="word-wrap:break-word;margin-top:25px;">
<div style="margin-top:15px;margin-left:15px">
    <span style="font-family:courier">xpub6C7WhXL7KNoa9GnCwEfLCWzf326hXhqD3nUyKg4ZxzXvjcmFeVQ9GZENgKtHxLfo3uPa13GBHCAb1nRgdUnP5YGJFX97KqpeFvHQzpjhmoi</span>
    <CopyIcon text="xpub6C7WhXL7KNoa9GnCwEfLCWzf326hXhqD3nUyKg4ZxzXvjcmFeVQ9GZENgKtHxLfo3uPa13GBHCAb1nRgdUnP5YGJFX97KqpeFvHQzpjhmoi"/>
</div>
</div>

### `endpointIdUint256`

<div style="word-wrap:break-word;margin-top:15px;margin-left:15px">
    <span style="font-family:courier">0x8cf0e7205eff59b8695db96b34ffe7a5a125a3ed263afa3353aef6c3d82debf9</span>
    <CopyIcon text="0x8cf0e7205eff59b8695db96b34ffe7a5a125a3ed263afa3353aef6c3d82debf9"/>
</div>

### `endpointIdUint256Array`

<div style="word-wrap:break-word;margin-top:15px;margin-left:15px;">
    <span style="font-family:courier">0x09fd3663fdc0ab359a5ebcba098571122ddb2a80b00a503960b32e67491f52d7</span>
    <CopyIcon text="0x09fd3663fdc0ab359a5ebcba098571122ddb2a80b00a503960b32e67491f52d7"/>
</div>

<FlexEndTag/>
