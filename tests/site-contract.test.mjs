import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
import { createHash } from 'node:crypto';
import { existsSync } from 'node:fs';
import { readFile, stat } from 'node:fs/promises';
import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { gzipSync } from 'node:zlib';
import test from 'node:test';

const siteRoot = fileURLToPath(new URL('..', import.meta.url));
const homeRoot = resolve(siteRoot, '../../../..');
const endroitRoot = resolve(siteRoot, '../../../../checkouts/endroit/integrated-main');
const read = (path, encoding = 'utf8') => readFile(resolve(siteRoot, path), encoding);
const hash = (content) => createHash('sha256').update(content).digest('hex');
const endroitRevision = execFileSync('git', ['rev-parse', 'HEAD'], {
	cwd: endroitRoot,
	encoding: 'utf8',
}).trim();
const endroitProvenance = (path) => {
	const state = execFileSync('git', ['status', '--porcelain=v1', '--', path], {
		cwd: endroitRoot,
		encoding: 'utf8',
	}).trim();
	return `thevzion/endroit@${endroitRevision}${state ? '+working-tree' : ''}:${path}`;
};

test('owned Markdown projects byte-identically to every public endpoint', async () => {
	const manifest = await read('src/content/projections.json').then(JSON.parse);
	const projections = [
		{
			name: 'landing',
			source: resolve(homeRoot, '.desk/rooms/endroit/publishing/publication/endroit-landing/content.md'),
			destinations: ['src/content/endroit-landing.md'],
			provenance: 'artifact:desk/endroit/publishing/publication/endroit-landing#content',
		},
		{
			name: 'install',
			source: resolve(endroitRoot, 'INSTALL.md'),
			destinations: ['src/content/install.md', 'public/install.md'],
			provenance: endroitProvenance('INSTALL.md'),
		},
		{
			name: 'workplace',
			source: resolve(endroitRoot, 'WORKPLACE.md'),
			destinations: ['public/workplace.md'],
			provenance: endroitProvenance('WORKPLACE.md'),
		},
		{
			name: 'adopt',
			source: resolve(endroitRoot, 'ADOPT.md'),
			destinations: ['public/adopt.md'],
			provenance: endroitProvenance('ADOPT.md'),
		},
	];

	for (const projection of projections) {
		const source = await readFile(projection.source);
		assert.equal(manifest.projections[projection.name].source, projection.provenance);
		assert.equal(manifest.projections[projection.name].sha256, hash(source));
		for (const destination of projection.destinations) {
			assert.deepEqual(await read(destination, null), source, destination);
		}
	}
	for (const name of ['workplace', 'adopt']) {
		assert.match(manifest.projections[name].source, /^thevzion\/endroit@[0-9a-f]{40}(?:\+working-tree)?:/);
		assert.doesNotMatch(manifest.projections[name].source, /0\.8\.0-alpha\.1/);
	}
});

test('the landing is a scoped Astro atlas with one native enhancement', async () => {
	const [page, pkg, config] = await Promise.all([
		read('src/pages/index.astro'),
		read('package.json').then(JSON.parse),
		read('astro.config.mjs'),
	]);

	assert.match(page, /import \{ compiledContent \} from '\.\.\/content\/endroit-landing\.md'/);
	for (const component of ['WorkplaceHero', 'AdoptionMap', 'FreshSessionProof', 'StaticFoundation']) {
		assert.match(page, new RegExp(`import ${component} from`));
		const source = await read(`src/components/${component}.astro`);
		assert.match(source, /<style>/, component);
	}
	for (const removed of ['EntryPaths.astro', 'AdoptionJourney.astro', 'HomeInspector.tsx', 'home-inspector-state.mjs']) {
		assert.ok(!existsSync(resolve(siteRoot, `src/components/${removed}`)), removed);
	}
	assert.ok(!existsSync(resolve(siteRoot, 'src/styles/landing.css')));
	assert.ok(!existsSync(resolve(siteRoot, 'tests/home-inspector-state.test.mjs')));
	assert.doesNotMatch(`${page}\n${config}`, /react|client:/i);
	for (const dependency of ['react', 'react-dom', '@astrojs/react', '@types/react', '@types/react-dom']) {
		assert.equal(pkg.dependencies?.[dependency] ?? pkg.devDependencies?.[dependency], undefined, dependency);
	}
	assert.match(await read('src/components/AdoptionMap.astro'), /IntersectionObserver/);
	assert.doesNotMatch(await read('src/styles/global.css'), /\.endroit-landing|home-inspector|inspector-/);
});

test('the projected story leads with verified-effect positioning and keeps maturity explicit', async () => {
	const landing = await read('src/content/endroit-landing.md');
	for (const phrase of [
		'From intent to verified effect.',
		'Everyone is building better agents. We gave the work a place.',
		'Endroit is the place layer for Workplace-first software engineering',
		'Resolved for agents. Readable by humans. Versioned with Git.',
		'agentic capital',
		'[Preview the documentation](https://docs.endroit.org/)',
		'[Inspect the Work schema](/schema/work/v1alpha1.json)',
		'[Install published alpha.1](/install/)',
		'Resolve the work, not the agent',
		'locally qualified alpha.2 candidate',
		'Before: the pieces are already there',
		'Recognize: choose the right boundary',
		'A standalone product Home',
		'Nothing moved. Responsibilities became explicit.',
		'Apply this map',
		'Prove it in a fresh session',
		'Static core. Optional runtime.',
		'@endroit/cli@0.8.0-alpha.1',
	]) assert.ok(landing.includes(phrase), phrase);
	assert.doesNotMatch(landing, /no inconvenience|no loss|automatic|fully understands your computer|any agent/i);
});

test('the build keeps all proof visible without JavaScript and preserves persuasion order', async () => {
	const landing = await read('dist/index.html');
	const orderedMarkers = [
		'id="from-intent-to-verified-effect"',
		'id="two-ways-in"',
		'id="before-the-pieces-are-already-there"',
		'id="recognize-choose-the-right-boundary"',
		'id="nothing-moved-responsibilities-became-explicit"',
		'id="prove-it-in-a-fresh-session"',
		'id="static-core-optional-runtime"',
		'id="work-this-way-every-day"',
		'id="install-the-foundation"',
		'id="engineer-the-path-from-intent-to-verified-effect"',
	];
	for (let index = 1; index < orderedMarkers.length; index += 1) {
		assert.ok(landing.indexOf(orderedMarkers[index - 1]) < landing.indexOf(orderedMarkers[index]), orderedMarkers[index]);
	}

	assert.match(landing, /href="https:\/\/docs\.endroit\.org\/"[^>]*>Preview the documentation/);
	assert.match(landing, /href="\/schema\/work\/v1alpha1\.json"[^>]*>Inspect the Work schema/);
	assert.match(landing, /href="\/install\/"[^>]*>Install published alpha\.1/);
	assert.match(landing, /New owned layer[\s\S]*product-home[\s\S]*Existing truth/);
	assert.match(landing, /Fresh-agent confirmation uses the owned files/);
	assert.doesNotMatch(landing, /data-adoption-stage="[^"]+"[^>]*hidden/i);
	const finalCall = landing.slice(landing.indexOf('id="engineer-the-path-from-intent-to-verified-effect"'));
	assert.doesNotMatch(finalCall, /<\/a>\s*·\s*<a/, 'final actions must not render Markdown separators');

	const scripts = [...landing.matchAll(/<script\b[^>]*>([\s\S]*?)<\/script>/gi)].map((match) => match[1]);
	assert.equal(scripts.length, 1, 'only the adoption-map enhancement may ship client JavaScript');
	assert.match(scripts[0], /IntersectionObserver/);
	assert.ok(gzipSync(scripts[0]).byteLength < 8 * 1024, 'the progressive enhancement must stay below 8 KiB gzip');

	const ids = [...landing.matchAll(/\sid="([^"]+)"/g)].map((match) => match[1]);
	assert.equal(new Set(ids).size, ids.length, 'the landing must not render duplicate ids');
	assert.match(landing, /seed key pinned-endroit-atlas-2026-08/);
});

test('portable Markdown and adjacent routes are emitted with shared navigation', async () => {
	for (const path of [
		'dist/index.html',
		'dist/install/index.html',
		'dist/install.md',
		'dist/workplace.md',
		'dist/adopt.md',
		'dist/homes/index.html',
		'dist/roadmap/index.html',
		'dist/schema/index.html',
	]) assert.ok(existsSync(resolve(siteRoot, path)), path);
	for (const name of ['install', 'workplace', 'adopt']) {
		assert.deepEqual(await read(`dist/${name}.md`, null), await read(`public/${name}.md`, null));
	}

	const installPage = await read('dist/install/index.html');
	assert.match(installPage, /href="https:\/\/endroit\.org\/adopt\.md"/);
	assert.match(installPage, /href="https:\/\/endroit\.org\/WORKPLACE\.md"/);
	const workplace = await read('dist/workplace.md');
	assert.equal((workplace.match(/https:\/\/endroit\.org\/adopt\.md/g) ?? []).length, 2);

	for (const path of ['dist/index.html', 'dist/install/index.html', 'dist/homes/index.html', 'dist/roadmap/index.html']) {
		const page = await read(path);
		assert.match(page, /aria-label="Primary navigation"/);
		assert.match(page, /Give agentic work a place to compound/);
		assert.match(page, /href="https:\/\/docs\.endroit\.org\/"/);
	}
});

test('fonts, hero imagery and client code stay inside their budgets', async () => {
	const budgets = [
		['public/fonts/libre-caslon-display-latin-400-normal.woff2', 100 * 1024],
		['public/assets/endroit-home-1200.webp', 220 * 1024],
		['public/assets/endroit-home-720.webp', 120 * 1024],
	];
	for (const [path, budget] of budgets) {
		assert.ok((await stat(resolve(siteRoot, path))).size <= budget, path);
	}
	assert.ok(existsSync(resolve(siteRoot, 'public/fonts/LibreCaslonDisplay-OFL.txt')));
	const landing = await read('dist/index.html');
	const css = (await Promise.all(
		[...landing.matchAll(/<link rel="stylesheet" href="([^"]+)"/g)]
			.map((match) => read(`dist${match[1]}`)),
	)).join('\n');
	assert.doesNotMatch(`${landing}\n${css}`, /fonts\.googleapis|fonts\.gstatic|unpkg|jsdelivr/i);
	assert.match(landing, /\/assets\/endroit-home-1200\.webp/);
	assert.match(css, /\/fonts\/libre-caslon-display-latin-400-normal\.woff2/);
});

test('public schema bytes match the alpha.1 manifest and Endroit sources', async () => {
	const manifest = await read('public/schema/manifest.json').then(JSON.parse);
	assert.equal(manifest.release, '0.8.0-alpha.1');
	assert.equal(manifest.candidate, '0.8.0-alpha.2');
	assert.equal(manifest.contracts.length, 14);
	assert.equal(new Set(manifest.contracts.map(({ path }) => path)).size, 14);

	for (const contract of manifest.contracts.filter(({ status }) => status !== 'candidate')) {
		const publicContent = await read(`public${contract.path}`, null);
		assert.equal(hash(publicContent), contract.sha256, contract.path);
		const match = contract.path.match(/^\/schema\/(v7\/)?([^/]+)\.json$/);
		assert.ok(match, contract.path);
		const source = resolve(endroitRoot, `schemas/${match[1] ? 'v7' : 'v6'}/${match[2]}.schema.json`);
		assert.deepEqual(await readFile(source), publicContent, contract.path);
		if (match[1]) {
			assert.equal(contract.status, 'published');
			assert.match(contract.source, /0\.8\.0-alpha\.1/);
		} else assert.equal(contract.status, 'historical');
	}

	const work = manifest.contracts.find(({ path }) => path === '/schema/work/v1alpha1.json');
	assert.equal(work.status, 'candidate');
	assert.equal(work.source, endroitProvenance('schemas/work/v1alpha1.json'));
	const workContent = await read('public/schema/work/v1alpha1.json', null);
	assert.equal(hash(workContent), work.sha256);
	assert.deepEqual(workContent, await readFile(resolve(endroitRoot, 'schemas/work/v1alpha1.json')));
});

test('historical 0.7 schema bytes remain immutable', async () => {
	const expected = {
		'home.json': '57bfae48f1288a684b60a56a73a82b79d6907c5ead7f968da316850e8bfa109b',
		'desk.json': 'f7a4b92ba01c82c5e186feeb77aa2a5dc38c1aa23622d9a7481f9f5308acc87e',
		'asset.json': '9951c9992ee21066161d24ac4342d058f7b68a1754da42d30a26bc574783f2aa',
		'runtime.json': 'c5dc6f9f772650cc645434d85f659b9874a47eb2bb51584326d1c757d3b6b251',
		'artifact.json': '331fd94dd5ed5bc159c6c8b2bf286eff580b30f957bf7a9e3beb0c5732121995',
	};
	for (const [name, expectedHash] of Object.entries(expected)) {
		assert.equal(hash(await read(`public/schema/${name}`, null)), expectedHash, name);
	}
});

test('Nginx and sitemap expose every portable Markdown contract', async () => {
	const [nginx, sitemap] = await Promise.all([read('nginx.conf'), read('public/sitemap.xml')]);
	for (const endpoint of ['install', 'adopt']) {
		assert.match(nginx, new RegExp(`location = \\/${endpoint}\\.md[\\s\\S]*?default_type text\\/markdown`));
		assert.match(sitemap, new RegExp(`https://endroit\\.org/${endpoint}\\.md`));
	}
	assert.match(nginx, /location = \/WORKPLACE\.md[\s\S]*?default_type text\/markdown/);
	assert.match(nginx, /location = \/WORKPLACE\.md[\s\S]*?alias \/usr\/share\/nginx\/html\/workplace\.md;/);
	assert.match(nginx, /location = \/workplace\.md\s*\{\s*return 308 \/WORKPLACE\.md;/);
	assert.match(sitemap, /https:\/\/endroit\.org\/WORKPLACE\.md/);
	assert.doesNotMatch(sitemap, /https:\/\/endroit\.org\/workplace\.md/);
	assert.match(nginx, /location ~ \^\/schema\/\.\*\\\.json\$/);
	assert.match(nginx, /default_type application\/schema\+json/);
	assert.match(nginx, /Access-Control-Allow-Origin "\*" always/);
	assert.doesNotMatch(nginx, /schema\/latest|return 30[1278] \/schema/);
});

test('historical Home-first routes delegate to Open Workplace', async () => {
	const [sitemap, nginx] = await Promise.all([read('public/sitemap.xml'), read('nginx.conf')]);
	assert.doesNotMatch(sitemap, /endroit\.org\/home-first/);
	assert.match(nginx, /return 301 https:\/\/open-workplace\.org\/proposal\//);
});

test('social metadata points to the current 1200 by 630 PNG', async () => {
	const [layout, card] = await Promise.all([
		read('src/layouts/BaseLayout.astro'),
		read('public/social-card.png', null),
	]);
	assert.match(layout, /From intent to verified effect\. An architectural Home connected to sovereign Sites/);
	assert.match(layout, /og:image:type" content="image\/png"/);
	assert.match(layout, /twitter:image:alt/);
	assert.equal(card.toString('ascii', 1, 4), 'PNG');
	assert.equal(card.readUInt32BE(16), 1200);
	assert.equal(card.readUInt32BE(20), 630);
});
