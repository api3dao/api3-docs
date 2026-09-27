# Contributing

The docs are a [VitePress](https://vitepress.dev/) site. Content is Markdown under [`docs/`](./docs), one directory per top-level section, and each section owns the `sidebar.js` that defines its navigation. Sections are registered in [`docs/.vitepress/config.js`](./docs/.vitepress/config.js), which the `llms.txt` generator reads too. The landing page is [`docs/index.md`](./docs/index.md).

## Local setup

```sh
pnpm install
pnpm docs:dev
```

`pnpm docs:build` writes the production build to `docs/.vitepress/dist` and `pnpm docs:serve` serves that build locally.

Both `docs:dev` and `docs:build` first run [`scripts/generate-llms-files.js`](./scripts/generate-llms-files.js), which writes `llms.txt` and `llms-full.txt` into `docs/public` from the section sidebars. Both files are gitignored. Do not edit them by hand.

## Writing a page

- Start the frontmatter with `title` and `pageHeader`, and the body with `<PageHeader/>`. The generator reads the frontmatter for the page headings and fails the build when `<PageHeader/>` is missing.
- Add the page to the section's `sidebar.js`. A new section needs its own directory with a `sidebar.js`, plus an entry in `config.js` under both `sidebar` and `nav`.
- Put images next to the page that uses them. Anything linked by URL from prose goes in `docs/public`, so its path stays stable across builds.
- Write API3 in capitals. Lowercase `api3` is only for identifiers such as package names, paths and URLs, and for the logo wordmark. Contract names such as `Api3ReaderProxyV1` and deployed product names such as the `Api3 Core` vault keep their own spelling.
- Use `dAPI` and `dApp` in prose, `dapi` and `dapp` in code identifiers.
- Use hyphens rather than long dashes, and avoid semicolons in prose.
- Keep pages high level and link to the authoritative source, such as a repository, a contract or API3 Market, instead of duplicating detail that goes stale.

## Checks

Prettier is the only formatter. `pnpm format` formats the whole project and `pnpm format:check` verifies it. The husky pre-push hook runs the check.

VitePress dead link detection is disabled in the config on purpose. CI builds the site, serves it and checks every internal and external link, including anchors, with [`libs/link-validator.js`](./libs/link-validator.js). Reproduce it locally with:

```sh
pnpm docs:build
pnpm docs:serve &
node ./libs/link-validator.js http://localhost:8082 ./docs/.vitepress/dist/
```

Hosts that block automated requests are listed in [`libs/link-validator-ignore.json`](./libs/link-validator-ignore.json).

## Issues and pull requests

Check the existing issues before opening a new one. Open pull requests against `main` and reference the issue in the description, for example `Closes #1`. CI runs the format check, the build and the link validator on every pull request, and the preview workflow posts a link to a Firebase preview of the site. Merging to `main` deploys the live site.

## Deployment

The site is hosted on Firebase Hosting under the project named in [`.firebaserc`](./.firebaserc). The [live workflow](./.github/workflows/firebase-live.yml) deploys every push to `main`, and the [preview workflow](./.github/workflows/firebase-preview.yml) deploys an expiring preview channel for every pull request.
