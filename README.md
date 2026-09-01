# endroit.org

The product site for [Endroit](https://github.com/thevzion/endroit).

**Give agentic work a world you own.**

This repository owns the public Site for Endroit. Its candidate landing
introduces Endroit as the local-first implementation of
[Open Workplace](https://open-workplace.org/): one shared operational world
for humans and configured agents, expressed through owned files and explicit
authority boundaries.

The [Workplace-first Proposal](https://open-workplace.org/proposal/) is an open
proposal, not a standard or a prerequisite for using Endroit. This Site owns
Endroit product positioning and its public presentation.

## Development

Requires Node.js 22.12 or newer.

```bash
npm install
npm run dev
```

`npm run build` type-checks the Astro project and emits the static site to
`dist/`.

## Candidate boundary

- The landing is a local candidate. It is not accepted, published or deployed.
- Endroit `v0.1.0-rc.1` is source-only and the package is private.
- The copy was checked against Endroit `develop@7388d63`: typecheck and 114
  tests passed on 2026-09-02.
- Fresh-agent convergence remains qualification work.
- The Endroit repository owns installation, architecture, lifecycle,
  reference, security and release truth.

The Endroit Site owns the landing, product contracts and documentation
transposition. `surfaces/home/SURFACE.md` owns the landing composition and
copy; Astro owns its renderer and visual system. `src/content/landing-reference.json`
locks the candidate sources, public assets and build output. Run
`npm run sync:sources` with an explicit
`ENDROIT_SOURCE_ROOT` to refresh product projections without guessing their
owner.

## Deployment

The static build is served by the `endroit` Fly.io app behind Cloudflare.
`.github/workflows/ci.yml` qualifies pull requests, release candidates and
`main` without deploying. Delivery is an explicit `workflow_dispatch` in
`.github/workflows/deliver.yml`, bound to an expected commit and a Release lock
digest. Its production environment owns the Fly credential and approval.
