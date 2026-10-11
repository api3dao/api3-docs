# AGENTS.md

Source of the API3 documentation at https://docs.api3.org.

Read [CONTRIBUTING.md](./CONTRIBUTING.md) first. It is the source of truth for the repository layout, the page and writing conventions, the checks and the pull request flow. The notes below only cover what automated changes tend to get wrong.

- Before finishing, run `pnpm format`, then `pnpm lint` and `pnpm docs:build`, then the link validation described in CONTRIBUTING.md. Never hand-format.
- The API3 spelling rule has exceptions. Contract names such as `Api3ReaderProxyV1` and deployed product names such as the `Api3 Core` vault are correct as they are.
- Before changing a number, an address or quoted CLI output, verify it against its source, such as the `api3dao/contracts` repository, on-chain state or API3 Market.
