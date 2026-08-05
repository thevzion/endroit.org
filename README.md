# endroit.org

The product site for [Endroit](https://github.com/thevzion/endroit).

**The place layer for Workplace-first software engineering.** From intent to
verified effect.

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
- The published release remains `0.8.0-alpha.1`; the locally qualified
  `0.8.0-alpha.2` candidate adds Work Resolution and
  `/schema/work/v1alpha1.json`.
- The 0.8 baseline adds Members, explicit workplace verbs and read-only Home
  Hygiene without claiming Presence or autonomous maintenance.
- Other runtimes and specialized Homes are marked as product direction.
- The Endroit repository owns installation, architecture, lifecycle,
  reference, security and release truth.
- [docs.endroit.org](https://docs.endroit.org/) owns the documentation renderer,
  navigation and immutable projection lock; Endroit remains the source owner.

The Home Publications own the exact landing wording. This Site owns its layout,
rendering and delivery. Run `npm run sync:sources` from the connected Home to
refresh the landing, installation contract and public schema projections.

## Deployment

The static build will be served by the `endroit` Fly.io app behind Cloudflare.
Pushes to `main` deploy through GitHub Actions using an app-scoped Fly deploy
token. Run `flyctl deploy` for a manual deployment.
