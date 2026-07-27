# hairness.dev

The public Home for [Hairness](https://github.com/thevzion/hairness) and the
Home-first paradigm.

## Development

Requires Node.js 22.12 or newer.

```bash
npm install
npm run dev
```

`npm run build` type-checks the Astro project and emits the static site to
`dist/`.

## Content ownership

- This repository owns the public landing page and Home-first learning pages.
- The Hairness repository owns installation, architecture, lifecycle,
  reference, security and release truth.
- Conceptual Homes are always marked as concepts until an installable
  implementation exists.

The Hairness illustrations copied into `src/assets/` originate from
`thevzion/hairness` and are distributed under the same MIT license.

## Deployment

Pushes to `main` deploy through GitHub Pages. `hairness.dev` is the canonical
domain; the Pages repository settings and DNS configuration complete the
custom-domain setup.
