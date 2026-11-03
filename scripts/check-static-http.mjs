import assert from 'node:assert/strict';
import { readFile, readdir } from 'node:fs/promises';
import { join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('..', import.meta.url));
const base = new URL(process.argv[2] ?? 'http://127.0.0.1:8791');
assert.ok(['http:', 'https:'].includes(base.protocol), 'Use an HTTP(S) site URL.');
assert.ok(!base.username && !base.password, 'Do not put credentials in the URL.');
const staging = process.argv.includes('--staging');
let checks = 0;

async function request(route) {
  const response = await fetch(new URL(route, base), {
    redirect: 'manual',
    signal: AbortSignal.timeout(15_000),
  });
  if (staging) {
    assert.equal(response.headers.get('x-robots-tag'), 'noindex, nofollow', route);
  }
  return response;
}

for (const route of ['/', '/homes/', '/install/', '/roadmap/', '/schema/']) {
  const response = await request(route);
  assert.equal(response.status, 200, route);
  assert.match(response.headers.get('content-type'), /text\/html/);
  assert.match(response.headers.get('cache-control'), /no-transform/);
  checks++;
}

const html = await (await request('/')).text();
assert.match(html, /<h2[^>]*id="create-a-home"[^>]*><span id="create-home" aria-hidden="true"><\/span>/);
assert.doesNotMatch(html, /umami|google-analytics|cloudflareinsights|data-website-id/i);
checks += 2;

const publicRoot = join(root, 'public');
const entries = await readdir(join(publicRoot, 'schema'), { recursive: true, withFileTypes: true });
const schemas = entries.filter((entry) => entry.isFile() && entry.name.endsWith('.json'))
  .map((entry) => join(entry.parentPath, entry.name));
for (const file of [join(publicRoot, 'install.md'), ...schemas]) {
  const route = '/' + relative(publicRoot, file).replaceAll('\\', '/');
  const response = await request(route);
  assert.equal(response.status, 200, route);
  assert.equal(response.headers.get('content-type')?.split(';')[0],
    route.endsWith('.md') ? 'text/markdown' : 'application/schema+json', route);
  assert.equal(response.headers.get('access-control-allow-origin'), '*', route);
  assert.equal(response.headers.get('x-content-type-options'), 'nosniff', route);
  assert.deepEqual(Buffer.from(await response.arrayBuffer()), await readFile(file), route);
  checks++;
}

for (const route of ['/home-first', '/home-first/']) {
  const response = await request(route);
  assert.equal(response.status, 301, route);
  assert.equal(response.headers.get('location'), 'https://open-workplace.org/proposal/', route);
  checks++;
}

for (const route of ['/missing-vzt48/', '/schema/missing-vzt48.json', '/_headers', '/_redirects']) {
  const response = await request(route);
  assert.equal(response.status, 404, route);
  checks++;
}

const canonical = await request('/homes?from=hairness');
assert.ok([301, 307, 308].includes(canonical.status));
const destination = new URL(canonical.headers.get('location'), base);
assert.equal(destination.origin, base.origin, 'Canonical redirects must retain the public HTTPS origin, without the internal Nginx port.');
assert.equal(destination.pathname, '/homes/');
assert.equal(destination.search, '?from=hairness');
checks++;

console.log(JSON.stringify({ result: 'passed', origin: base.origin, checks,
  schemaContracts: schemas.length, stagingNoindexChecked: staging }));
