# endroit.org

The product site for [Endroit](https://github.com/thevzion/endroit).

The wider [Home-first proposal](https://thevzion.com/home-first/) is published
by The VZion. This Target owns product positioning, Endroit Today and the
conceptual direction of specialized Homes.

## Development

Requires Node.js 22.12 or newer.

```bash
npm install
npm run dev
```

`npm run build` type-checks the Astro project and emits the static site to
`dist/`.

## Product truth

- Endroit 0.7 alpha qualifies Codex and Claude.
- Other runtimes and specialized Homes are marked as product direction.
- The Endroit repository owns installation, architecture, lifecycle,
  reference, security and release truth.

## Deployment

The static build will be served by the `endroit` Fly.io app behind Cloudflare.
Pushes to `main` deploy through GitHub Actions using an app-scoped Fly deploy
token. Run `flyctl deploy` for a manual deployment.
