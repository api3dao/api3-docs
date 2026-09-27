# API3 documentation

> Source of the API3 documentation published at https://docs.api3.org

The site is built with [VitePress](https://vitepress.dev/). Content lives under [`docs/`](./docs), one directory per top-level section. Each section owns its `sidebar.js` and is registered in [`docs/.vitepress/config.js`](./docs/.vitepress/config.js) and in [`scripts/generate-llms-files.js`](./scripts/generate-llms-files.js). The landing page is [`docs/index.md`](./docs/index.md).

## Development

```sh
pnpm install
pnpm docs:dev
```

`pnpm docs:build` produces the production build in `docs/.vitepress/dist` and `pnpm docs:serve` serves it locally.

Prettier is the only formatter. Run `pnpm format` to format the whole project and `pnpm format:check` to verify. The husky pre-push hook runs the check, and CI runs it again on every pull request.

## Generated files

`docs:dev` and `docs:build` first run [`scripts/generate-llms-files.js`](./scripts/generate-llms-files.js), which writes `llms.txt` and `llms-full.txt` into `docs/public` from the section sidebars. Both files are gitignored. The generator reads the `title` and `pageHeader` frontmatter of every page listed in a sidebar and requires the page body to start with `<PageHeader/>`, failing the build otherwise.

## Link validation

VitePress dead link detection is disabled in the config on purpose. CI instead builds the site, serves it and checks every internal and external link, including anchors, with [`libs/link-validator.js`](./libs/link-validator.js). Reproduce it locally with:

```sh
pnpm docs:build
pnpm docs:serve &
node ./libs/link-validator.js http://localhost:8082 ./docs/.vitepress/dist/
```

Hosts that block automated requests are listed in [`libs/link-validator-ignore.json`](./libs/link-validator-ignore.json).

## Deployment

The site is hosted on Firebase Hosting under the project named in [`.firebaserc`](./.firebaserc). The [live workflow](./.github/workflows/firebase-live.yml) deploys every push to `main`, and the [preview workflow](./.github/workflows/firebase-preview.yml) deploys an expiring preview channel for every pull request.

## Contributing

Head to [CONTRIBUTING.md](./CONTRIBUTING.md) for the issue and pull request workflow.
