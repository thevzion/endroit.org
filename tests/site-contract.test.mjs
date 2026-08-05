import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { existsSync } from 'node:fs';
import { readdir, readFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { spawnSync } from 'node:child_process';
import { gzipSync } from 'node:zlib';
import { fileURLToPath } from 'node:url';
import test from 'node:test';

const siteRoot = fileURLToPath(new URL('..', import.meta.url));
const read = (path, encoding = 'utf8') => readFile(resolve(siteRoot, path), encoding);
const hash = (content) => createHash('sha256').update(content).digest('hex');
const endroitSourceCommit = '2fd1770fb25bc93b9d72c6f24c956e92c10546ae';

test('source synchronization refuses to guess the Endroit release checkout', async () => {
	const script = await read('scripts/sync-owned-sources.mjs');
	assert.match(script, /ENDROIT_SOURCE_ROOT is required/);
	assert.doesNotMatch(script, /integrated-main/);
	const withoutOwner = spawnSync(process.execPath, ['scripts/sync-owned-sources.mjs', 'documents'], {
		cwd: siteRoot,
		env: Object.fromEntries(Object.entries(process.env).filter(([key]) => key !== 'ENDROIT_SOURCE_ROOT')),
		encoding: 'utf8',
	});
	assert.notEqual(withoutOwner.status, 0);
	assert.match(withoutOwner.stderr, /ENDROIT_SOURCE_ROOT is required/);
});

test('human and machine documents project one exact Endroit candidate', async () => {
	const [source, machine, adopt, profile, reference, migration, manifest, page] = await Promise.all([
		read('src/content/install.md'), read('public/install.md'), read('public/adopt.md'), read('public/profile.md'), read('public/docs/reference.md'), read('public/docs/migration-0.10.md'), read('src/content/projections.json').then(JSON.parse), read('src/pages/install.astro'),
	]);
	assert.equal(hash(source), manifest.projections.install.sourceSha256);
	assert.equal(hash(machine), manifest.projections.install.sha256);
	assert.equal(manifest.projections.install.transform, 'normalize raw ADOPT.md link to /adopt.md');
	assert.match(machine, /\[ADOPT\.md\]\(\/adopt\.md\)/);
	assert.match(manifest.projections.install.source, /^site:endroit@[0-9a-f]{40}:INSTALL\.md$/);
	assert.match(manifest.projections.adopt.source, /^site:endroit@[0-9a-f]{40}:ADOPT\.md$/);
	assert.match(manifest.projections.profile.source, /^site:endroit@[0-9a-f]{40}:PROFILE\.md$/);
	assert.equal(hash(adopt), manifest.projections.adopt.sha256);
	assert.equal(hash(profile), manifest.projections.profile.sha256);
	assert.equal(hash(reference), manifest.projections.reference.sha256);
	assert.equal(hash(migration), manifest.projections.migration010.sha256);
	for (const projection of ['adopt', 'profile', 'reference', 'migration010', 'migrationRouteV9']) {
		assert.equal(manifest.projections.install.sourceCommit, manifest.projections[projection].sourceCommit);
	}
	assert.match(page, /import \* as installContract from '\.\.\/content\/install\.md'/);
	assert.match(page, /<h1 id="install-title">/);
	assert.match(page, /compiledContent\(\)/);
	assert.match(page, /replaceAll\('href="docs\//);
	assert.match(page, /replace\('href="ADOPT\.md"', 'href="\/adopt\.md"'\)/);
	assert.match(page, /<Fragment set:html=\{renderedContract\} \/>/);
	assert.match(source, /@endroit\/cli@0\.10\.0-alpha\.0/);
	assert.match(profile, /protocol: "open-workplace\/0\.2-draft"/);
	assert.doesNotMatch(source, /curl\s.*\|\s*(?:ba)?sh|@latest/);
});

test('llms discovery is generated, manifested and labels the candidate honestly', async () => {
	const [llms, manifest, script, sitemap, robots] = await Promise.all([
		read('public/llms.txt'), read('src/content/projections.json').then(JSON.parse), read('scripts/sync-owned-sources.mjs'), read('public/sitemap.xml'), read('public/robots.txt'),
	]);
	assert.equal(hash(llms), manifest.projections.llms.sha256);
	assert.equal(manifest.projections.llms.source, 'site:endroit.org/scripts/sync-owned-sources.mjs#llms');
	assert.match(script, /## Public surfaces/);
	for (const route of ['/', '/homes/', '/install/', '/install.md', '/adopt.md', '/profile.md', '/roadmap/', '/schema/', '/llms.txt']) assert.match(sitemap, new RegExp(`endroit\\.org${route.replace('.', '\\.').replace('/', '\\/')}`));
	assert.match(robots, /User-agent: OAI-SearchBot\s+Allow: \//);
	assert.match(llms, /0\.10 candidate without implying npm publication/);
	assert.doesNotMatch(`${llms}\n${sitemap}`, /discord\.gg|active community|feed|rss|atom/i);
});

test('public schema bytes remain immutable and match their manifest', async () => {
	const manifest = await read('public/schema/manifest.json').then(JSON.parse);
	assert.equal(manifest.release, '0.10.0-alpha.0');
	assert.equal(manifest.availability, 'candidate');
	assert.equal(manifest.sourceCommit, endroitSourceCommit);
	assert.equal(manifest.contracts.length, 26);
	assert.equal(new Set(manifest.contracts.map(({ path }) => path)).size, 26);
	for (const contract of manifest.contracts) {
		const publicContent = await read(`public${contract.path}`, null);
		assert.equal(hash(publicContent), contract.sha256, contract.path);
		assert.doesNotMatch(contract.path, /latest/);
		if (/^\/schema\/(?:v9|work)\//.test(contract.path)) {
			assert.equal(JSON.parse(publicContent).$id, `https://endroit.org${contract.path}`, contract.path);
			assert.match(contract.source, new RegExp(`^thevzion/endroit@${manifest.sourceCommit}:`));
		}
	}
	const historical = {
		'home.json': '57bfae48f1288a684b60a56a73a82b79d6907c5ead7f968da316850e8bfa109b',
		'desk.json': 'f7a4b92ba01c82c5e186feeb77aa2a5dc38c1aa23622d9a7481f9f5308acc87e',
		'asset.json': '9951c9992ee21066161d24ac4342d058f7b68a1754da42d30a26bc574783f2aa',
		'runtime.json': 'c5dc6f9f772650cc645434d85f659b9874a47eb2bb51584326d1c757d3b6b251',
		'artifact.json': '331fd94dd5ed5bc159c6c8b2bf286eff580b30f957bf7a9e3beb0c5732121995',
	};
	for (const [name, digest] of Object.entries(historical)) assert.equal(hash(await read(`public/schema/${name}`, null)), digest, name);
	assert.equal(hash(await read('public/schema/v7/runtime.json', null)), '7f95cf78217d0a94219cb0d9dd6f0b952fb854ac95c8e91ec1dd8367830e8799', 'v7/runtime.json');
	assert.equal(JSON.parse(await read('public/schema/v8/route.json')).$id, 'https://endroit.org/schema/v8/route.json');
	assert.equal(JSON.parse(await read('public/schema/v9/workplace.json')).$id, 'https://endroit.org/schema/v9/workplace.json');
	assert.equal(JSON.parse(await read('public/schema/work/v1alpha2.json')).$id, 'https://endroit.org/schema/work/v1alpha2.json');
});

test('all public pages use one production bench system and keep the accepted community CTA scoped to the landing', async () => {
	const files = ['src/pages/index.astro', 'src/pages/homes.astro', 'src/pages/install.astro', 'src/pages/roadmap.astro', 'src/pages/schema/index.astro', 'src/pages/404.astro'];
	const sources = await Promise.all(files.map((file) => read(file)));
	for (const [index, source] of sources.entries()) {
		assert.match(source, index === 0 ? /bench-bar/ : /BaseLayout/, files[index]);
		if (index > 0) assert.doesNotMatch(source, /discord\.gg/i, files[index]);
	}
	for (const page of sources.slice(1)) assert.match(page, /module|page-instrument/);
	const layout = await read('src/layouts/BaseLayout.astro');
	assert.match(layout, /<body>\s*<!--[\s\S]*THESIS:[\s\S]*FINISH:/);
});

test('the shipped visual system is documented from the frozen world', async () => {
	const [design, sidecar] = await Promise.all([read('DESIGN.md'), read('.impeccable/design.json').then(JSON.parse)]);
	assert.match(design, /Creative North Star: "The Bench Logic-Analyzer"/);
	assert.match(design, /b0c4bf23f7d9ee882619a2d3c39049760feb2104/);
	assert.equal(sidecar.schemaVersion, 2);
	assert.equal(sidecar.narrative.northStar, 'The Bench Logic-Analyzer');
});

test('SEO, headers and historical redirects remain explicit', async () => {
	const [landing, layout, nginx, sitemap, card] = await Promise.all([
		read('src/pages/index.astro'), read('src/layouts/BaseLayout.astro'), read('nginx.conf'), read('public/sitemap.xml'), read('public/social-card.png', null),
	]);
	for (const source of [landing, layout]) {
		assert.match(source, /application\/ld\+json/);
		assert.match(source, /'@type': 'WebSite'/);
		assert.match(source, /og:image:type" content="image\/png"/);
		assert.match(source, /twitter:image:alt/);
	}
	assert.equal(card.toString('ascii', 1, 4), 'PNG');
	assert.equal(card.readUInt32BE(16), 1200);
	assert.equal(card.readUInt32BE(20), 630);
	assert.match(nginx, /location ~\* \\\.md\$[\s\S]*default_type text\/markdown/);
	assert.match(nginx, /location = \/llms\.txt[\s\S]*default_type text\/plain/);
	assert.match(nginx, /location ~ \^\/schema\/\.\*\\\.json\$/);
	assert.match(nginx, /application\/schema\+json/);
	assert.match(nginx, /Access-Control-Allow-Origin "\*" always/);
	assert.match(nginx, /Cache-Control "no-transform" always/);
	assert.match(nginx, /return 301 https:\/\/open-workplace\.org\/proposal\//);
	assert.doesNotMatch(sitemap, /home-first/);
});

test('the static build emits every supported route and machine contract', async () => {
	for (const path of ['dist/index.html', 'dist/homes/index.html', 'dist/install/index.html', 'dist/roadmap/index.html', 'dist/schema/index.html', 'dist/404.html', 'dist/install.md', 'dist/adopt.md', 'dist/profile.md', 'dist/docs/reference.md', 'dist/docs/migration-0.10.md', 'dist/docs/migration-route-v9.md', 'dist/llms.txt', 'dist/robots.txt', 'dist/sitemap.xml', 'dist/schema/manifest.json', 'dist/schema/v7/home.json', 'dist/schema/v8/route.json', 'dist/schema/v9/workplace.json', 'dist/schema/work/v1alpha2.json', 'dist/schema/home.json']) {
		assert.ok(existsSync(resolve(siteRoot, path)), path);
	}
	assert.deepEqual(await read('dist/install.md', null), await read('public/install.md', null));
	assert.deepEqual(await read('dist/llms.txt', null), await read('public/llms.txt', null));
	const landing = await read('dist/index.html');
	const install = await read('dist/install/index.html');
	for (const phrase of ['Move the system. Keep the decisions human.', 'Agents execute. The Workplace carries continuity.', 'Endroit gives each Meeting the context, methods and Sites it needs—so work compounds without handing direction to the agent.', 'Context that knows its place.', 'What remains is your agentic capital.']) assert.match(landing, new RegExp(phrase.replaceAll('.', '\\.')));
	assert.equal([...install.matchAll(/<h1(?:\s|>)/g)].length, 1);
	assert.doesNotMatch(install, /<h1[^>]*>Install Endroit<\/h1>/);
});

test('the accepted Discord destination renders with an honest bootstrapping claim', async () => {
	const destination = await read('src/content/release-destinations.json').then(JSON.parse);
	assert.equal(destination.release, 'ecosystem-2026-08-02');
	assert.deepEqual(destination.destinations, [{
		id: 'endroit-discord',
		url: 'https://discord.gg/HW4Hs9sEp',
		cta: 'Join the new Discord',
		status: 'accepted',
		render: true,
		claim: 'bootstrapping',
	}]);
	const built = await read('dist/index.html');
	assert.match(built, /https:\/\/discord\.gg\/HW4Hs9sEp/);
	assert.match(built, /Join the new Discord/);
	assert.match(built, /new and bootstrapping/);
});

test('the built Site makes no third-party runtime requests and keeps shipped JavaScript under 25 KiB gzip', async () => {
	const walk = async (directory) => {
		const entries = await readdir(directory, { withFileTypes: true });
		return (await Promise.all(entries.map((entry) => entry.isDirectory() ? walk(resolve(directory, entry.name)) : [resolve(directory, entry.name)]))).flat();
	};
	const files = await walk(resolve(siteRoot, 'dist'));
	const htmlFiles = files.filter((path) => path.endsWith('.html'));
	const html = (await Promise.all(htmlFiles.map((path) => readFile(path, 'utf8')))).join('\n');
	assert.doesNotMatch(html, /<(?:script|img)[^>]+src=["']https?:\/\//i);
	assert.doesNotMatch(html, /<link[^>]+rel=["']stylesheet["'][^>]+href=["']https?:\/\//i);
	assert.doesNotMatch(html, /google-analytics|gtag\(|segment\.com|plausible\.io|posthog/i);
	const js = await Promise.all(files.filter((path) => path.endsWith('.js')).map((path) => readFile(path)));
	const inlineJs = [...html.matchAll(/<script(?![^>]*type=["']application\/ld\+json["'])[^>]*>([\s\S]*?)<\/script>/gi)].map(([, source]) => Buffer.from(source));
	const gzipBytes = gzipSync(Buffer.concat([...js, ...inlineJs])).byteLength;
	assert.ok(gzipBytes <= 25 * 1024, `JavaScript is ${gzipBytes} bytes gzip`);
});
