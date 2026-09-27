# AGENTS.md

Source of the API3 documentation at https://docs.api3.org, built with VitePress. Content is Markdown under `docs/`, one directory per section, each with its own `sidebar.js`. Sections are registered in `docs/.vitepress/config.js`. [CONTRIBUTING.md](./CONTRIBUTING.md) is the full contributor guide.

## Commands

```sh
pnpm install
pnpm docs:dev
pnpm format
pnpm lint
pnpm docs:build
```

`pnpm format` formats the whole project with Prettier. Never hand-format. `pnpm docs:build` regenerates `docs/public/llms.txt` and `llms-full.txt` before building.

Link validation, the same check CI runs:

```sh
pnpm docs:build
pnpm docs:serve &
node ./libs/link-validator.js http://localhost:8082 ./docs/.vitepress/dist/
```

## Content rules

- Every page listed in a sidebar declares `title` and `pageHeader` in its frontmatter and starts its body with `<PageHeader/>`. A missing `<PageHeader/>` fails the build.
- A new page goes into the section's `sidebar.js`. A new section needs its own directory with a `sidebar.js` and entries in `config.js` under both `sidebar` and `nav`.
- Images live next to the page that uses them. Anything linked by URL from prose goes in `docs/public`.
- `docs/public/llms.txt` and `llms-full.txt` are generated and gitignored. Never edit them.
- Verify numbers, addresses and quoted CLI output against their source, such as the `api3dao/contracts` repository, on-chain state or API3 Market, before changing them.

## Writing rules

- Write API3 in capitals. Lowercase `api3` only in identifiers: package names, paths, URLs and the logo wordmark. Contract names such as `Api3ReaderProxyV1` and deployed product names such as the `Api3 Core` vault keep their own spelling.
- `dAPI` and `dApp` in prose, `dapi` and `dapp` in code identifiers.
- Hyphens instead of long dashes. No semicolons in prose.
- Name the acting entity, such as API3 or the Market frontend, rather than writing "we" in new text.
- Do not write facts that the next change turns false: exact counts of things that grow, closed-world claims about a set, or lists that need an edit whenever an entry appears. Link to the source instead.

## Pull requests

- Target `main` and reference the issue in the description, for example `Closes #1`.
- CI runs `pnpm lint`, `pnpm docs:build` and the link validator. Every pull request gets a Firebase preview deployment.
