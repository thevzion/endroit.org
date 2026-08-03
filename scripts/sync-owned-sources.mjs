import { createHash } from 'node:crypto';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const siteRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..');
if (!process.env.ENDROIT_HOME_ROOT) {
	throw new Error('ENDROIT_HOME_ROOT is required. Refusing to guess the owner of projected sources.');
}
const homeRoot = resolve(process.env.ENDROIT_HOME_ROOT);
const endroitRoot = resolve(process.env.ENDROIT_SOURCE_ROOT ?? resolve(homeRoot, 'checkouts/endroit/integrated-main'));
const selection = process.argv[2] ?? 'all';
const allowed = new Set(['all', 'landing', 'install', 'schemas', 'llms']);

if (!allowed.has(selection)) {
	throw new Error(`Unknown projection ${selection}. Use all, landing, install, schemas or llms.`);
}

const sha256 = (content) => createHash('sha256').update(content).digest('hex');

const copyExact = async (source, destination) => {
	let content;
	try {
		content = await readFile(source);
	} catch (error) {
		if (error?.code === 'ENOENT') throw new Error(`Owned source is absent: ${source}`);
		throw error;
	}
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
	const source = resolve(homeRoot, '.desk/rooms/endroit/publishing/work/endroit-public-entrypoint/publication/endroit-landing/content.md');
	const destination = resolve(siteRoot, 'src/content/endroit-landing.md');
	projectionManifest.projections.landing = {
		source: 'artifact:desk/endroit/publishing/work/endroit-public-entrypoint/publication/endroit-landing#content',
		sha256: await copyExact(source, destination),
		usage: 'owned public copy projection; the interactive production surface is a traced transposition of Interface Lab Endroit 024',
	};
}

if (selection === 'all' || selection === 'install') {
	const source = resolve(siteRoot, 'src/content/install.md');
	const destination = resolve(siteRoot, 'public/install.md');
	const digest = await copyExact(source, destination);
	projectionManifest.projections.install = {
		source: 'site:endroit.org/src/content/install.md',
		releaseSource: 'thevzion/endroit@0.8.0-alpha.1:INSTALL.md',
		sha256: digest,
	};
}

if (selection === 'all' || selection === 'llms') {
	const content = `# Endroit

> The Workplace-first application framework. Agents produce. Your workplace compounds.

## Public surfaces

- [Product instrument](https://endroit.org/): typed context, explicit lifecycle and agentic capital
- [Homes in practice](https://endroit.org/homes/): the semantic objects and their responsibilities
- [Install for humans](https://endroit.org/install/): agent-led, CLI-backed, human-approved installation
- [Install contract](https://endroit.org/install.md): the same installation procedure as Markdown
- [Roadmap](https://endroit.org/roadmap/): available, in-progress, exploratory and later work
- [Schema contracts](https://endroit.org/schema/): immutable public JSON Schema addresses
- [Schema manifest](https://endroit.org/schema/manifest.json): source and SHA-256 for served contracts

## Source

- [Endroit on GitHub](https://github.com/thevzion/endroit)

The public navigation intentionally excludes unpublished Workplace, adoption and Work Resolution documents.
`;
	const destination = resolve(siteRoot, 'public/llms.txt');
	await writeFile(destination, content);
	projectionManifest.projections.llms = {
		source: 'site:endroit.org/scripts/sync-owned-sources.mjs#llms',
		sha256: sha256(content),
	};
}

if (selection === 'all' || selection === 'landing' || selection === 'install' || selection === 'llms') {
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
			provenance: `thevzion/endroit@0.8.0-alpha.1:schemas/v7/${name}.schema.json`,
		})),
		{
			publicPath: '/schema/v8/route.json',
			sourcePath: 'schemas/v8/route.schema.json',
			provenance: 'thevzion/endroit@0.9.0-alpha.0:schemas/v8/route.schema.json',
		},
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
		`${JSON.stringify({ release: '0.9.0-alpha.0', contracts }, null, 2)}\n`,
	);
}

console.log(`Synchronized ${selection} owned source${selection === 'all' ? 's' : ''}.`);
