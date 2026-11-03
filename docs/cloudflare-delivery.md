# Endroit public site: Cloudflare delivery

This repository, `thevzion/endroit.org`, owns the public site's rendering and
delivery. It is separate from the Endroit product and from any private Home.
VZT-48 prepares the migration from the Fly app `endroit` to Cloudflare Workers
Static Assets. These configuration files do not attest that cutover happened;
the infrastructure task records the deployed versions, DNS and acceptance.

Baseline: public commit `999f7601a8aea95e1cbb2f42bd568a1576274b45`, confirmed
against the `GH_SHA` label of Fly release v8 on 3 November 2026. Owned landing,
installation and schema projections remain unchanged. Do not run
`sync:sources` as part of a hosting migration.

## Targets

Cloudflare account: `c46cbafdbae4ec3e42c3f87999a3417e`.

| Target | Worker | Config | Domain attachment |
| --- | --- | --- | --- |
| Production | `endroit-site` | `wrangler.json` | `endroit.org`, `www.endroit.org` |
| Private staging | Nginx on the existing VPS | `nginx.staging.conf` | `staging.endroit.org` through NetBird |

The site has no server code, database or runtime secret. Production and staging
use the same `dist/` build. `wrangler.staging.json` names `endroit-site-staging`
only for local Cloudflare behavior checks: it has no domain and must not be
deployed. Both Wrangler configurations disable `workers.dev` and preview URLs.
Staging uses the existing private VPS/NetBird/Coolify pattern; Cloudflare Access
onboarding is not required. Canonical links and schema identifiers continue to
name production.

## Build and local qualification

```sh
npm ci
npm test
npx wrangler deploy --dry-run --config wrangler.json
npx wrangler deploy --dry-run --config wrangler.staging.json
npx wrangler dev --local --config wrangler.staging.json --ip 127.0.0.1 --port 8791
```

`npm test` type-checks, builds and runs the 18 existing tests. The dry runs package
locally without publishing. The local server verifies the Cloudflare assets
behavior, including `_headers` and `_redirects`; Astro preview alone does not.
In another terminal, run `npm run check:http -- http://127.0.0.1:8791` to verify
routes, response headers, exact schema/Markdown bytes, aliases and redirects.
The checker compares against this checkout's public contracts.

Check `/`, `/homes/`, `/install/`, `/roadmap/`, `/schema/`, `/install.md` and the
unversioned, v7 and v8 JSON schemas. Markdown must retain `text/markdown`, JSON
schemas `application/schema+json`; both require CORS `*` and `nosniff`. Check a
missing path returns the real 404 page, and a missing schema returns 404 rather
than a successful response. `/home-first` and `/home-first/` must redirect to
`https://open-workplace.org/proposal/` with 301. `/#create-home` remains a working
legacy anchor alongside `/#create-a-home`, including without JavaScript.

## Private staging, then production

The coordinator owns deployment credentials and external mutations. On the
existing VPS, mount the qualified `dist/` read-only at `/usr/share/nginx/html`
in an Nginx container pinned by digest. Mount `nginx.staging.conf` read-only at
`/etc/nginx/conf.d/default.conf`. The coordinator records the selected image,
container, mount paths and private ingress route in the infrastructure task.
Do not publish port 8080 on a public interface. Reuse the established private
NetBird/Coolify path and restrict `staging.endroit.org` accordingly.

Validate the mounted configuration with `nginx -t`, then verify off-NetBird
access is denied and operator access succeeds through NetBird. Check HTTPS,
routes, headers, redirects, client-side Home Inspector and the legacy fragment.
Every staging response, including 404 and redirects, must receive
`X-Robots-Tag: noindex, nofollow`. `noindex` is not access control. No analytics
script is added; verify no production analytics event is emitted. The
Cloudflare `_headers`/`_redirects` files are hidden by the Nginx staging config.
From a NetBird-connected operator host, run
`npm run check:http -- https://staging.endroit.org --staging` for the same
contracts plus `noindex` on each checked response. Anonymous/off-NetBird denial
and interactive Home Inspector behavior need separate checks.

After acceptance of staging, the production command is:

```sh
npx wrangler deploy --config wrangler.json
```

The production configuration declares custom domains: publishing with it can
attach or change those domains. The operator must inspect existing DNS records and
Cloudflare's proposed changes first, preserve mail/verification records and keep
the previous Fly origin recoverable until live checks pass. Existing Fly DNS
records may need an explicit coordinated replacement before custom-domain
attachment succeeds. Do not infer successful cutover from a successful upload.

Preserve the existing Hairness Cloudflare redirect: `hairness.dev` and
`www.hairness.dev` return 308 to `https://endroit.org` with path and query intact.
The application only carries its two `/home-first` redirects. Do not recreate or
replace the already verified Hairness rule.

## CI and recovery

`.github/workflows/deploy.yml` now only runs tests and uploads
`endroit-static-<commit>` with `dist/`, the Wrangler configurations and the Nginx
staging configuration. No job deploys to Fly or Cloudflare, and no deployment
credential is required. The
artifact is retained for 30 days; retain a durable approved release separately
before retiring Fly. The repository, lockfile and CI artifact identify the
rebuildable source and qualified assets.

Keep `Dockerfile`, `nginx.conf` and `fly.toml` as historical recovery material.
Fly v8 uses the immutable image:

```text
registry.fly.io/endroit@sha256:8911d14e659e970394f40c19641b9a4f1ebe9f96db0d55db21dabfef971986a6
```

Before Fly retirement, save that image outside Fly and record the prior DNS and
Cloudflare Worker version in the infrastructure task. A registry reference alone
is not an offline backup. Before retirement, origin/DNS can be restored under
the coordinator's mandate. Afterwards, use a retained Cloudflare version or
rebuild and publish a known source commit; the archived container is a separate
recovery option. Never run `flyctl deploy` as part of this site's normal CI.

Platform references:
[Wrangler configuration](https://developers.cloudflare.com/workers/wrangler/configuration/),
[asset headers](https://developers.cloudflare.com/workers/static-assets/headers/),
[asset redirects](https://developers.cloudflare.com/workers/static-assets/redirects/).
