import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { existsSync } from 'node:fs';
import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import test from 'node:test';

const siteRoot = fileURLToPath(new URL('..', import.meta.url));
const homeRoot = resolve(process.env.ENDROIT_HOME_ROOT ?? resolve(siteRoot, '../../../..'));
const endroitRoot = resolve(process.env.ENDROIT_SOURCE_ROOT ?? resolve(siteRoot, '../../endroit/home-first-reset'));
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
	assert.match(landing, /local-first, headless implementation/);
	for (const phrase of [
		'Install with your agent',
		'Use the terminal',
		'Continue onboarding',
		'The agent guides. The CLI applies. You approve.',
		'@endroit/cli@0.8.0-alpha.1',
	]) assert.match(landing, new RegExp(phrase.replaceAll('.', '\\.')));

	assert.doesNotMatch(landing, /provider-native|qualified providers|@latest|Target-first/i);
});

test('the landing demonstrates governed compounding without simulating provider memory', async () => {
	const [page, inspector, state] = await Promise.all([
		read('src/pages/index.astro'),
		read('src/components/HomeInspector.tsx'),
		read('src/components/home-inspector-state.mjs'),
	]);

	assert.match(page, /<HomeInspector client:load \/>/);
	assert.match(page, /replaceSourceSection\('#home-inspector-placement', 'One Home\. Several sessions\. More to build on\.'\)/);
	assert.match(page, /replaceSourceSection\('#adoption-map-placement', 'Start with conversation\. Add precision when it matters\.'\)/);
	for (const phrase of [
		'Sanitized dogfood snapshot · no hosted session invoked',
		'One Home. Several sessions. More to build on.',
	]) assert.match(inspector, new RegExp(phrase.replaceAll('.', '\\.')));
	for (const phrase of [
		'.desk/rooms/endroit/ROOM.md',
		'No private Claude memory is transferred.',
		'Hygiene inspects read-only.',
		'approved, revalidated Route',
	]) assert.match(state, new RegExp(phrase.replaceAll('.', '\\.')));
	for (const path of [
		'.desk/rooms/endroit/planning/initiative/endroit-home-first-hard-reset/HANDOFF.md',
		'.desk/routes/endroit.org/home-first-reset.json',
	]) assert.match(state, new RegExp(path.replaceAll('.', '\\.')));
	assert.doesNotMatch(`${inspector}\n${state}`, /release-candidate\.md|launch-frictions\.md|accepted-findings\.md/);
	assert.match(state, /\["retain", "reuse", "maintain"\]/);
	assert.match(inspector, /id=\{`inspector-panel-\$\{panel\}`\}/);
	assert.match(inspector, /aria-labelledby=\{`inspector-tab-\$\{panel\}`\}/);
	assert.match(inspector, /tabIndex=\{state\.panel === id \? 0 : -1\}/);
	assert.match(state, /ArrowRight/);
	assert.match(state, /ArrowLeft/);
	assert.match(page, /<noscript>[\s\S]*Retain[\s\S]*Reuse[\s\S]*Maintain &amp; deliver[\s\S]*<\/noscript>/);

	assert.match(state, /The Home keeps only the human-selected continuity/);
	assert.doesNotMatch(`${inspector}\n${state}`, /provider-native|hosted invocation (?:is|was) (?:run|executed)/i);
});

test('the landing presents progressive adoption and five gesture families', async () => {
	const [landing, page] = await Promise.all([
		read('src/content/endroit-landing.md'),
		read('src/pages/index.astro'),
	]);

	for (const phrase of [
		'A more intuitive way to work with agents.',
		'New session. Same workplace.',
		'Your way of working stays. Each agent adapts at the door.',
		'Places make intent legible. Gestures make it explicit.',
		'Talk naturally',
		'Inspect the shared workplace',
		'Use explicit gestures when authority matters',
		'Use the CLI for deterministic operations',
		'Endroit makes placement inferable, explainable and correctable.',
		'Each useful session can leave the Home better prepared for the next.',
	]) assert.match(landing, new RegExp(phrase.replaceAll('.', '\\.')));

	for (const family of ['Enter', 'Equip', 'Keep', 'Reach', 'Maintain']) {
		assert.match(page, new RegExp(`<span>${family}<\\/span>`));
	}
	assert.match(landing, /Commands are optional\.[\s\S]*without[\s\n]+surrendering control of the session\./);
	assert.match(page, /acknowledgement alone never causes a durable transition/);
	assert.doesNotMatch(`${landing}\n${page}`, /automatic(?:ally)? (?:learn|sort|organize)|intent layer|intent engine/i);
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
	assert.match(page, /description="A more intuitive way to work with agents: one inspectable Home across sessions, providers and repositories\."/);
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
	assert.equal(manifest.projections.install.source, 'thevzion/endroit@0.8.0-alpha.1:INSTALL.md');
	assert.match(page, /import \{ Content \} from '\.\.\/content\/install\.md'/);
	assert.match(source, /@endroit\/cli@0\.8\.0-alpha\.1/);
	assert.match(source, /ask|approval|approve/i);
	assert.doesNotMatch(source, /curl\s.*\|\s*(?:ba)?sh|@latest/);

	const ownedSource = resolve(endroitRoot, 'INSTALL.md');
	if (existsSync(ownedSource)) assert.deepEqual(await readFile(ownedSource), Buffer.from(source));
});

test('public schema bytes match their manifest and Endroit sources', async () => {
	const manifest = await read('public/schema/manifest.json').then(JSON.parse);
	assert.equal(manifest.release, '0.8.0-alpha.1');
	assert.equal(manifest.contracts.length, 13);
	assert.equal(new Set(manifest.contracts.map(({ path }) => path)).size, 13);
	assert.ok(manifest.contracts.every(({ path }) => !path.includes('latest')));

	for (const contract of manifest.contracts) {
		const publicContent = await read(`public${contract.path}`, null);
		assert.equal(hash(publicContent), contract.sha256, contract.path);
		if (contract.path.startsWith('/schema/v7/')) {
			assert.match(contract.source, /^thevzion\/endroit@0\.8\.0-alpha\.1:/, contract.path);
		} else {
			assert.match(contract.source, /^@endroit\/cli@0\.7\.0-alpha\.0:/, contract.path);
		}
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
	assert.match(nginx, /types \{[\s\S]*application\/schema\+json json;[\s\S]*\}/);
	assert.match(nginx, /default_type application\/schema\+json/);
	assert.match(nginx, /Access-Control-Allow-Origin "\*" always/);
	assert.doesNotMatch(nginx, /schema\/latest|return 30[1278] \/schema/);
	assert.match(nginx, /location \/ \{[\s\S]*Cache-Control "no-transform" always;/);
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
	for (const phrase of [
		'One Home. Several sessions. More to build on.',
		'No private Claude memory is transferred.',
		'Start with conversation. Add precision when it matters.',
	]) {
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
