import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { existsSync } from 'node:fs';
import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import test from 'node:test';

const siteRoot = fileURLToPath(new URL('..', import.meta.url));
const homeRoot = resolve(siteRoot, '../../../..');
const endroitRoot = resolve(siteRoot, '../../endroit/home-first-reset');
const read = (path, encoding = 'utf8') => readFile(resolve(siteRoot, path), encoding);
const hash = (content) => createHash('sha256').update(content).digest('hex');

test('the landing is an exact owned Markdown projection', async () => {
	const [landing, manifest, page] = await Promise.all([
		read('src/content/endroit-landing.md'),
		read('src/content/projections.json').then(JSON.parse),
		read('src/pages/index.astro'),
	]);

	assert.equal(hash(landing), manifest.projections.landing.sha256);
	assert.equal(manifest.projections.landing.source, 'artifact:desk/endroit/publishing/publication/endroit-landing#content');
	assert.match(page, /import \{ Content \} from '\.\.\/content\/endroit-landing\.md'/);
	assert.match(page, /<Content \/>/);

	const ownedSource = resolve(homeRoot, '.desk/rooms/endroit/publishing/publication/endroit-landing/content.md');
	if (existsSync(ownedSource)) assert.deepEqual(await readFile(ownedSource), Buffer.from(landing));
});

test('the landing states the exact alpha positioning and three adoption paths', async () => {
	const landing = await read('src/content/endroit-landing.md');

	assert.match(landing, /Codex and Claude L1 Projection-qualified/);
	assert.match(landing, /lightweight, local-first framework for building and operating/);
	assert.match(landing, /local-first, headless, file-based implementation/);
	for (const phrase of [
		'Install with your agent',
		'Use the terminal',
		'Continue onboarding',
		'The agent guides. The CLI applies. You approve.',
		'@endroit/cli@0.8.0-alpha.0',
	]) assert.match(landing, new RegExp(phrase.replaceAll('.', '\\.')));

	assert.doesNotMatch(landing, /provider-native|qualified providers|@latest|Target-first/i);
});

test('the landing demonstrates recovery without simulating a hosted provider', async () => {
	const [page, inspector, state] = await Promise.all([
		read('src/pages/index.astro'),
		read('src/components/HomeInspector.tsx'),
		read('src/components/home-inspector-state.mjs'),
	]);

	assert.match(page, /<HomeInspector client:load \/>/);
	assert.match(page, /You already have the pieces/);
	assert.match(page, /Providers execute\. The Home remembers\./);
	assert.match(page, /What create gives you/);
	for (const phrase of [
		'Name the subject. Recover the workplace.',
		'Sanitized dogfood snapshot · no hosted session invoked',
		'.desk/rooms/endroit/ROOM.md',
		'Material recovered',
		'Sites available',
		'Ready to work',
		'Human-controlled lifecycle',
	]) assert.match(inspector, new RegExp(phrase.replaceAll('.', '\\.')));
	for (const path of [
		'.desk/rooms/endroit/planning/initiative/endroit-home-first-hard-reset/HANDOFF.md',
		'.desk/rooms/endroit/exploring/scratch/endroit-current-shape/planning/validation.md',
	]) assert.match(state, new RegExp(path.replaceAll('.', '\\.')));
	assert.doesNotMatch(`${inspector}\n${state}`, /release-candidate\.md|launch-frictions\.md|accepted-findings\.md/);
	for (const id of ['recover', 'sources', 'lifecycle']) {
		assert.match(inspector, new RegExp(`id="inspector-panel-${id}"`));
		assert.match(inspector, new RegExp(`aria-labelledby="inspector-tab-${id}"`));
	}
	assert.match(inspector, /tabIndex=\{state\.panel === id \? 0 : -1\}/);
	assert.match(state, /ArrowRight/);
	assert.match(state, /ArrowLeft/);
	assert.match(page, /<noscript>[\s\S]*Recover the workplace[\s\S]*Inspect authoritative sources[\s\S]*Decide and deliver[\s\S]*<\/noscript>/);

	assert.match(state, /L1 projection of the same owned Home/);
	assert.doesNotMatch(`${inspector}\n${state}`, /provider-native|hosted invocation (?:is|was) (?:run|executed)/i);
});

test('the product visuals separate execution, ownership and the exact bootstrap floor plan', async () => {
	const page = await read('src/pages/index.astro');
	for (const phrase of [
		'Provider / Harness',
		'temporary Occupant',
		'Human transition',
		'approved Route',
		'Sovereign Site',
		'Responsibilities, not a required stack.',
		'rooms/home/',
		'inbox.md',
		'.agents/',
		'.claude/',
	]) assert.match(page, new RegExp(phrase.replaceAll('.', '\\.')));
	assert.match(page, /title="Endroit — The place layer for agentic work"/);
	assert.match(page, /description="A lightweight, local-first framework for building and operating file-based Open Workplaces\."/);
});

test('the human install page and machine-readable endpoint share one exact source', async () => {
	const [source, machine, manifest, page] = await Promise.all([
		read('src/content/install.md'),
		read('public/install.md'),
		read('src/content/projections.json').then(JSON.parse),
		read('src/pages/install.astro'),
	]);

	assert.equal(source, machine);
	assert.equal(hash(source), manifest.projections.install.sha256);
	assert.match(page, /import \{ Content \} from '\.\.\/content\/install\.md'/);
	assert.match(source, /@endroit\/cli@0\.8\.0-alpha\.0/);
	assert.match(source, /ask|approval|approve/i);
	assert.doesNotMatch(source, /curl\s.*\|\s*(?:ba)?sh|@latest/);

	const ownedSource = resolve(endroitRoot, 'INSTALL.md');
	if (existsSync(ownedSource)) assert.deepEqual(await readFile(ownedSource), Buffer.from(source));
});

test('public schema bytes match their manifest and Endroit sources', async () => {
	const manifest = await read('public/schema/manifest.json').then(JSON.parse);
	assert.equal(manifest.release, '0.8.0-alpha.0');
	assert.equal(manifest.contracts.length, 13);
	assert.equal(new Set(manifest.contracts.map(({ path }) => path)).size, 13);
	assert.ok(manifest.contracts.every(({ path }) => !path.includes('latest')));

	for (const contract of manifest.contracts) {
		const publicContent = await read(`public${contract.path}`, null);
		assert.equal(hash(publicContent), contract.sha256, contract.path);
		if (existsSync(resolve(siteRoot, `dist${contract.path}`))) {
			assert.deepEqual(await read(`dist${contract.path}`, null), publicContent, `dist${contract.path}`);
		}

		const match = contract.path.match(/^\/schema\/(v7\/)?([^/]+)\.json$/);
		assert.ok(match, contract.path);
		const source = resolve(endroitRoot, `schemas/${match[1] ? 'v7' : 'v6'}/${match[2]}.schema.json`);
		if (existsSync(source)) assert.deepEqual(await readFile(source), publicContent, contract.path);
	}
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

test('v7 schemas use stable versioned identifiers and Runtime v2alpha1', async () => {
	for (const name of ['home', 'desk', 'member', 'equipment', 'site', 'route', 'runtime', 'artifact']) {
		const schema = await read(`public/schema/v7/${name}.json`).then(JSON.parse);
		assert.equal(schema.$id, `https://endroit.org/schema/v7/${name}.json`, name);
	}

	const runtime = await read('public/schema/v7/runtime.json');
	assert.match(runtime, /endroit\.org\/runtime\/v2alpha1/);
});

test('Nginx serves schema contracts with the required headers', async () => {
	const nginx = await read('nginx.conf');
	assert.match(nginx, /location = \/install\.md[\s\S]*default_type text\/markdown/);
	assert.match(nginx, /location ~ \^\/schema\/\.\*\\\.json\$/);
	assert.match(nginx, /default_type application\/schema\+json/);
	assert.match(nginx, /Access-Control-Allow-Origin "\*" always/);
	assert.doesNotMatch(nginx, /schema\/latest|return 30[1278] \/schema/);
});

test('the static build emits every public entrypoint', async () => {
	for (const path of [
		'dist/index.html',
		'dist/install/index.html',
		'dist/install.md',
		'dist/schema/index.html',
		'dist/schema/manifest.json',
		'dist/schema/v7/home.json',
		'dist/schema/home.json',
	]) assert.ok(existsSync(resolve(siteRoot, path)), path);
	assert.deepEqual(await read('dist/install.md', null), await read('public/install.md', null));
	const landing = await read('dist/index.html');
	for (const phrase of ['Sites available', 'Authoritative sources', 'Human-controlled lifecycle']) {
		assert.match(landing, new RegExp(phrase));
	}
});

test('historical Home-first routes delegate to Open Workplace', async () => {
	const [sitemap, nginx] = await Promise.all([read('public/sitemap.xml'), read('nginx.conf')]);
	assert.doesNotMatch(sitemap, /endroit\.org\/home-first/);
	assert.match(nginx, /return 301 https:\/\/open-workplace\.org\/proposal\//);
	for (const route of ['/install/', '/install.md', '/schema/', '/roadmap/']) {
		assert.match(sitemap, new RegExp(`endroit\\.org${route.replace('.', '\\.')}`));
	}
});

test('the roadmap separates shipped, active, exploratory and later work', async () => {
	const roadmap = await read('src/pages/roadmap.astro');
	for (const status of ['Available', 'In progress', 'Exploring', 'Later']) {
		assert.match(roadmap, new RegExp(status));
	}
	assert.match(roadmap, /projection-qualified at L1/);
	assert.doesNotMatch(roadmap, /provider-native|qualified baseline/);
});

test('social metadata points to the current 1200 by 630 PNG', async () => {
	const [layout, card] = await Promise.all([
		read('src/layouts/BaseLayout.astro'),
		read('public/social-card.png', null),
	]);

	assert.match(layout, /The place layer for agentic work/);
	assert.match(layout, /og:image:type" content="image\/png"/);
	assert.match(layout, /twitter:image:alt/);
	assert.equal(card.toString('ascii', 1, 4), 'PNG');
	assert.equal(card.readUInt32BE(16), 1200);
	assert.equal(card.readUInt32BE(20), 630);
});
