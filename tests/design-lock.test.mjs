import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { readdir, readFile } from 'node:fs/promises';
import { basename, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import test from 'node:test';

const siteRoot = fileURLToPath(new URL('..', import.meta.url));
const read = (path) => readFile(resolve(siteRoot, path));
const sha256 = (content) => createHash('sha256').update(content).digest('hex');
const receipt = JSON.parse(await read('src/content/landing-reference.json'));

test('the root route carries a Site-owned exploration receipt, not a promotion', () => {
	assert.equal(receipt.schemaVersion, 3);
	assert.equal(receipt.explorationReceipt.site, 'endroit.org');
	assert.equal(receipt.explorationReceipt.route, '/');
	assert.equal(receipt.explorationReceipt.entrypoint, 'src/pages/index.astro');
	assert.equal(receipt.explorationReceipt.northStar, 'The Consignment Set');
	assert.equal(receipt.explorationReceipt.directionContract, 'surfaces/home/DIRECTION.md');
	assert.equal(receipt.explorationReceipt.seed, '7568bf67');
	assert.equal(receipt.explorationReceipt.baseRevision, '23863b77b1e11a0b39019091d47294c42f3a4dab');
	// An exploration must never present itself as accepted or delivered.
	assert.equal(receipt.explorationReceipt.accepted, false);
	assert.equal(receipt.explorationReceipt.delivered, false);
	assert.equal(receipt.explorationReceipt.reviewPending, 'human Content, Design and CTA review');
});

test('the superseded Interface Lab promotion stays on the record', () => {
	assert.equal(receipt.supersedes.site, 'interface-lab');
	assert.equal(receipt.supersedes.candidate, 'endroit-024');
	assert.equal(receipt.supersedes.freezeCommit, 'b0c4bf23f7d9ee882619a2d3c39049760feb2104');
	assert.equal(receipt.supersedes.lockCommit, 'fd30ccb7826c040410f95c91ac4bd32cfe338910');
	assert.equal(receipt.supersedes.manifestBaseCommit, 'f4d7e154407ad26d8a88461aa9f5d38c7a24599e');
	assert.equal(receipt.supersedes.northStar, 'The Bench Logic-Analyzer');
	assert.equal(receipt.supersedes.renderSha256, 'def1fada92cce9b0a0827e61749ebfda2c7277c9b6c30667addf3026696675a8');
	assert.deepEqual(receipt.supersedes.retiredModules, ['src/lib/instrument.mjs', 'src/components/CalTag.astro']);
});

test('every exploration source and public asset matches the receipt', async () => {
	for (const group of ['sourceFiles', 'publicAssets']) {
		for (const artifact of receipt.explorationReceipt[group]) {
			assert.equal(sha256(await read(artifact.path)), artifact.sha256, artifact.path);
		}
	}
	// The landing must not depend on the retired bench modules.
	for (const retired of receipt.supersedes.retiredModules) {
		assert.ok(!receipt.explorationReceipt.sourceFiles.some(({ path }) => path === retired), retired);
	}
});

test('the landing facts are pinned to the release sources and local manifests', async () => {
	assert.equal(receipt.contentReceipt.release, 'ecosystem-2026-08-02');
	assert.equal(receipt.contentReceipt.availability, 'candidate');
	assert.deepEqual(receipt.contentReceipt.facts, {
		package: '0.10.0-alpha.0',
		profile: 'endroit/0.10',
		protocol: 'open-workplace/0.2-draft',
		publishedPackage: '0.8.0-alpha.1',
	});
	assert.deepEqual(receipt.contentReceipt.sources.map(({ site, commit }) => ({ site, commit })), [
		{ site: 'endroit', commit: '32dda906242e2dc0e8746a3b35eeff9152ef2d2b' },
		{ site: 'open-workplace', commit: '2f484206b8c3a7cd0f55ada455222e122daf8924' },
	]);
	for (const artifact of receipt.contentReceipt.manifests) {
		assert.equal(sha256(await read(artifact.path)), artifact.sha256, artifact.path);
	}
});

test('the root route cannot silently select a second landing entrypoint', async () => {
	const entries = await readdir(resolve(siteRoot, 'src/pages'), { withFileTypes: true });
	const rootEntrypoints = entries
		.filter((entry) => entry.isFile() && /^index\./.test(entry.name))
		.map((entry) => `src/pages/${entry.name}`);
	assert.deepEqual(rootEntrypoints, [receipt.explorationReceipt.entrypoint]);
	assert.equal(basename(receipt.explorationReceipt.entrypoint), 'index.astro');
});

test('the built landing and every emitted landing asset match the receipt', async () => {
	const { render } = receipt.explorationReceipt;
	const html = await read(render.path);
	assert.equal(sha256(html), render.sha256, render.path);

	const emittedHrefs = [...html.toString().matchAll(/(?:href|src)="(\/_astro\/[^"]+)"/g)]
		.map(([, href]) => href)
		.sort();
	const lockedHrefs = render.assets.map(({ href }) => href).sort();
	assert.deepEqual(emittedHrefs, lockedHrefs);
	for (const asset of render.assets) {
		assert.equal(sha256(await read(asset.path)), asset.sha256, asset.path);
	}
});
