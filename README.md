# endroit.org

The product site for [Endroit](https://github.com/thevzion/endroit).

**The place layer for agentic work.** Give agentic work a place to compound.

Endroit is a lightweight, local-first framework for durable human-agent
workplaces across sessions, tools, and repositories.

The companion [Home-first proposal](https://thevzion.com/home-first/) is owned
by The VZion and prepared alongside this release. This Site owns product
positioning, Endroit Today and the conceptual direction of specialized Homes.

## Development

Requires Node.js 22.12 or newer.

```bash
npm install
npm run dev
```

`npm run build` type-checks the Astro project and emits the static site to
`dist/`.

## Product truth

- Endroit 0.8 alpha qualifies Codex and Claude.
- The 0.8 baseline adds Members, explicit workplace verbs and read-only Home
  Hygiene without claiming Presence or autonomous maintenance.
- Other runtimes and specialized Homes are marked as product direction.
- The Endroit repository owns installation, architecture, lifecycle,
  reference, security and release truth.

## Deployment

The static build will be served by the `endroit` Fly.io app behind Cloudflare.
Pushes to `main` deploy through GitHub Actions using an app-scoped Fly deploy
token. Run `flyctl deploy` for a manual deployment.
