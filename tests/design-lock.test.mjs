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

test('the production landing consumes the selected Endroit 024 lock receipt', () => {
	assert.equal(receipt.schemaVersion, 2);
	assert.deepEqual(
		{
			candidate: receipt.referenceArtifact.candidate,
			entrypoint: receipt.referenceArtifact.entrypoint,
			lockCommit: receipt.referenceArtifact.lockCommit,
			manifestSchemaVersion: receipt.referenceArtifact.manifestSchemaVersion,
			manifestSha256: receipt.referenceArtifact.manifestSha256,
			route: receipt.referenceArtifact.route,
		},
		{
			candidate: 'endroit-024',
			entrypoint: 'src/experiments/endroit.org/iterations/024-context-that-knows-its-place/Page.astro',
			lockCommit: 'fd30ccb7826c040410f95c91ac4bd32cfe338910',
			manifestSchemaVersion: 2,
			manifestSha256: '7ce0089c2e6b462fc14fd7f9c47bc31b69d2058cd33880cd967f24c334a391c1',
			route: '/experiments/endroit.org/024-context-that-knows-its-place/',
		},
	);
	assert.equal(receipt.promotionReceipt.site, 'endroit.org');
	assert.equal(receipt.promotionReceipt.route, '/');
	assert.equal(receipt.promotionReceipt.entrypoint, 'src/pages/index.astro');
});

test('every promoted design source and public asset matches the receipt', async () => {
	for (const group of ['sourceFiles', 'publicAssets']) {
		for (const artifact of receipt.promotionReceipt[group]) {
			assert.equal(sha256(await read(artifact.path)), artifact.sha256, artifact.path);
		}
	}
});

test('the root route cannot silently select a legacy landing entrypoint', async () => {
	const entries = await readdir(resolve(siteRoot, 'src/pages'), { withFileTypes: true });
	const rootEntrypoints = entries
		.filter((entry) => entry.isFile() && /^index\./.test(entry.name))
		.map((entry) => `src/pages/${entry.name}`);
	assert.deepEqual(rootEntrypoints, [receipt.promotionReceipt.entrypoint]);
	assert.equal(basename(receipt.promotionReceipt.entrypoint), 'index.astro');
});

test('the built landing and every emitted landing asset match the receipt', async () => {
	const { render } = receipt.promotionReceipt;
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
