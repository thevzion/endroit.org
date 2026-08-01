import { createHash } from 'node:crypto';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const siteRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const homeRoot = resolve(process.env.ENDROIT_HOME_ROOT ?? resolve(siteRoot, '../../../..'));
const endroitRoot = resolve(process.env.ENDROIT_SOURCE_ROOT ?? resolve(siteRoot, '../../endroit/home-first-reset'));
const selection = process.argv[2] ?? 'all';
const allowed = new Set(['all', 'landing', 'install', 'schemas']);

if (!allowed.has(selection)) {
	throw new Error(`Unknown projection ${selection}. Use all, landing, install or schemas.`);
}

const sha256 = (content) => createHash('sha256').update(content).digest('hex');

const copyExact = async (source, destination) => {
	const content = await readFile(source);
	await mkdir(dirname(destination), { recursive: true });
	await writeFile(destination, content);
	return sha256(content);
};

const readJson = async (path, fallback) => {
	try {
		return JSON.parse(await readFile(path, 'utf8'));
	} catch (error) {
		if (error?.code === 'ENOENT') return fallback;
		throw error;
	}
};

const projectionManifestPath = resolve(siteRoot, 'src/content/projections.json');
const projectionManifest = await readJson(projectionManifestPath, { projections: {} });

if (selection === 'all' || selection === 'landing') {
	const source = resolve(homeRoot, '.desk/rooms/endroit/publishing/publication/endroit-landing/content.md');
	const destination = resolve(siteRoot, 'src/content/endroit-landing.md');
	projectionManifest.projections.landing = {
		source: 'artifact:desk/endroit/publishing/publication/endroit-landing#content',
		sha256: await copyExact(source, destination),
	};
}

if (selection === 'all' || selection === 'install') {
	const source = resolve(endroitRoot, 'INSTALL.md');
	const destinations = [
		resolve(siteRoot, 'src/content/install.md'),
		resolve(siteRoot, 'public/install.md'),
	];
	const hashes = [];
	for (const destination of destinations) hashes.push(await copyExact(source, destination));
	if (new Set(hashes).size !== 1) throw new Error('INSTALL.md projections differ.');
	projectionManifest.projections.install = {
		source: 'thevzion/endroit@0.8.0-alpha.0:INSTALL.md',
		sha256: hashes[0],
	};
}

if (selection === 'all' || selection === 'landing' || selection === 'install') {
	await mkdir(dirname(projectionManifestPath), { recursive: true });
	await writeFile(projectionManifestPath, `${JSON.stringify(projectionManifest, null, 2)}\n`);
}

if (selection === 'all' || selection === 'schemas') {
	const schemas = [
		...['home', 'desk', 'asset', 'runtime', 'artifact'].map((name) => ({
			publicPath: `/schema/${name}.json`,
			sourcePath: `schemas/v6/${name}.schema.json`,
			provenance: `@endroit/cli@0.7.0-alpha.0:schemas/v6/${name}.schema.json`,
		})),
		...['home', 'desk', 'member', 'equipment', 'site', 'route', 'runtime', 'artifact'].map((name) => ({
			publicPath: `/schema/v7/${name}.json`,
			sourcePath: `schemas/v7/${name}.schema.json`,
			provenance: `thevzion/endroit@0.8.0-alpha.0:schemas/v7/${name}.schema.json`,
		})),
	];
	const contracts = [];

	for (const schema of schemas) {
		const source = resolve(endroitRoot, schema.sourcePath);
		const destination = resolve(siteRoot, `public${schema.publicPath}`);
		contracts.push({
			path: schema.publicPath,
			source: schema.provenance,
			sha256: await copyExact(source, destination),
		});
	}

	await writeFile(
		resolve(siteRoot, 'public/schema/manifest.json'),
		`${JSON.stringify({ release: '0.8.0-alpha.0', contracts }, null, 2)}\n`,
	);
}

console.log(`Synchronized ${selection} owned source${selection === 'all' ? 's' : ''}.`);
