import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import test from 'node:test';
import { publicSurface } from '../src/lib/surface.mjs';

const root = fileURLToPath(new URL('..', import.meta.url));
const read = (path) => readFile(resolve(root, path), 'utf8');

test('the Site-owned Surface is the native landing source', async () => {
	assert.equal(publicSurface.metadata.owner, 'site:endroit.org');
	assert.equal(publicSurface.contract.entrypoint, '/');
	assert.equal(publicSurface.export.name, './surfaces/home');
	assert.equal(publicSurface.export.renderer, 'src/lib/surface.mjs');
	assert.equal(publicSurface.fragments.filter(({ kind }) => kind === 'surface_contract').length, 1);
	assert.equal(publicSurface.fragments.filter(({ kind }) => kind === 'site_export').length, 1);
	assert.ok(publicSurface.fragments.filter(({ kind }) => kind === 'content').length >= 1);
	assert.equal(new Set(publicSurface.fragments.map(({ id }) => id)).size, publicSurface.fragments.length);
	assert.equal(publicSurface.hero.title, 'Give agentic work a world you own.');
	assert.equal(publicSurface.hero.punch, 'Humans and configured agents share one language for where work belongs, who may decide, what can change and what should remain.');
	assert.equal(
		publicSurface.hero.intro,
		'Your work spans people, decisions, methods, repositories and time. Endroit turns those relationships into an owned, inspectable Workplace that survives the session.',
	);
	assert.deepEqual(publicSurface.community.actions, [
		{ label: 'Read the current commands', href: 'https://github.com/thevzion/endroit/blob/develop/INSTALL.md' },
		{ label: 'Follow the roadmap', href: 'https://github.com/thevzion/endroit/blob/develop/ROADMAP.md' },
	]);
	assert.match(await read('src/pages/index.astro'), /publicSurface/);
});

test('CI is inert and delivery is an exact-SHA manual effect', async () => {
	const [ci, deliver] = await Promise.all([
		read('.github/workflows/ci.yml'),
		read('.github/workflows/deliver.yml'),
	]);
	assert.match(ci, /pull_request:/);
	assert.doesNotMatch(ci, /flyctl|deploy/);
	assert.match(deliver, /workflow_dispatch:/);
	for (const input of ['release_id', 'expected_sha', 'lock_digest', 'mode']) assert.match(deliver, new RegExp(`\\b${input}:`));
	assert.match(deliver, /git rev-parse HEAD/);
	assert.match(deliver, /environment: production/);
	assert.doesNotMatch(deliver, /push:/);
});
