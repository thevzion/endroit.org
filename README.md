# endroit.org

The product site for [Endroit](https://github.com/thevzion/endroit).

**The place layer for agentic work.** Give agentic work a place to compound.

Endroit is a lightweight, local-first framework for building and operating
file-based [Open Workplaces](https://open-workplace.org/proposal/). It is also
a local-first, headless, file-based implementation of the Open Workplace
model.

The [Workplace-first Proposal](https://open-workplace.org/proposal/) is an open
proposal, not a standard or a prerequisite for using Endroit. This Site owns
Endroit product positioning, current capabilities and the conceptual direction
of specialized Homes.

## Development

Requires Node.js 22.12 or newer.

```bash
npm install
npm run dev
```

`npm run build` type-checks the Astro project and emits the static site to
`dist/`.

## Product truth

- Endroit 0.8 alpha is projection-qualified at L1 for Codex and Claude.
- The 0.8 baseline adds Members, explicit workplace verbs and read-only Home
  Hygiene without claiming Presence or autonomous maintenance.
- Other runtimes and specialized Homes are marked as product direction.
- The Endroit repository owns installation, architecture, lifecycle,
  reference, security and release truth.

The Home Publications own the exact landing wording. This Site owns its layout,
rendering and delivery. Run `npm run sync:sources` from the connected Home to
refresh the landing, installation contract and public schema projections.

## Deployment

The Cloudflare Workers Static Assets configuration serves the same Astro build:

| Target | Worker | Configuration | Hostnames |
| --- | --- | --- | --- |
| Production | `endroit-site` | `wrangler.json` | `endroit.org`, `www.endroit.org` |
| Private staging | Nginx on the existing VPS | `nginx.staging.conf` | `staging.endroit.org` through NetBird |

Staging serves the same artifact through the existing private NetBird/Coolify
entrypoint. `wrangler.staging.json` is for local Cloudflare compatibility checks
only; it declares no domain and disables `workers.dev` and preview URLs, as does
production. No analytics script is included in either build; staging receives
`noindex` on every Nginx response.

GitHub Actions builds, tests and retains a static artifact for 30 days. It does
not deploy and needs no Fly or Cloudflare deployment secret. The Fly deployment
files remain available as historical rollback material, outside the CI path.

See [Cloudflare delivery and rollback](docs/cloudflare-delivery.md) for the VZT-48
migration procedure, checks and ownership boundaries.
