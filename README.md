# endroit.org

The product site for [Endroit](https://github.com/thevzion/endroit).

**The place layer for agentic work.** Give agentic work a place to compound.

Endroit is a local-first compiler for human-owned Workplace context and an
implementation of the experimental
[Open Workplace 0.2 draft](https://open-workplace.org/protocol/).

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

- `0.8.0-alpha.1` remains the observed public package.
- `0.10.0-alpha.0` is a qualified local candidate, not yet published or
  deployed. It declares Profile `endroit/0.10` targeting
  `open-workplace/0.2-draft`.
- v9 and Work schemas are projected from one exact Endroit source commit; the
  manifest records that commit and every digest.
- The Endroit repository owns installation, architecture, lifecycle,
  reference, security and release truth.

The Endroit Site owns the landing, product contracts and documentation
transposition. Interface Lab supplies a frozen design reference, never product
truth. Run `npm run sync:sources` with an explicit `ENDROIT_SOURCE_ROOT` to
refresh product projections without guessing their owner.

## Deployment

The static build will be served by the `endroit` Fly.io app behind Cloudflare.
Pushes to `main` deploy through GitHub Actions using an app-scoped Fly deploy
token. Run `flyctl deploy` for a manual deployment.
