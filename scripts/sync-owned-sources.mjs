import { createHash } from 'node:crypto';
import { execFile } from 'node:child_process';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { promisify } from 'node:util';
import { fileURLToPath } from 'node:url';

const siteRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const selection = process.argv[2] ?? 'all';
const allowed = new Set(['all', 'documents', 'schemas', 'llms']);

if (!allowed.has(selection)) {
	throw new Error(`Unknown projection ${selection}. Use all, documents, schemas or llms.`);
}

const needsEndroit = ['all', 'documents', 'schemas'].includes(selection);
if (needsEndroit && !process.env.ENDROIT_SOURCE_ROOT) {
	throw new Error('ENDROIT_SOURCE_ROOT is required. Refusing to guess the Endroit release source.');
}

const endroitRoot = process.env.ENDROIT_SOURCE_ROOT ? resolve(process.env.ENDROIT_SOURCE_ROOT) : null;
const exec = promisify(execFile);
let endroitCommit = null;
if (needsEndroit) {
	const [{ stdout: commit }, { stdout: status }] = await Promise.all([
		exec('git', ['rev-parse', 'HEAD'], { cwd: endroitRoot }),
		exec('git', ['status', '--short'], { cwd: endroitRoot }),
	]);
	if (status.trim()) throw new Error(`Endroit source is dirty: ${endroitRoot}`);
	endroitCommit = commit.trim();
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

if (selection === 'all' || selection === 'documents') {
	for (const document of [
		{ id: 'install', source: 'INSTALL.md', content: 'src/content/install.md', public: 'public/install.md', normalizeRawLinks: true },
		{ id: 'adopt', source: 'ADOPT.md', public: 'public/adopt.md' },
		{ id: 'profile', source: 'PROFILE.md', public: 'public/profile.md' },
		{ id: 'reference', source: 'docs/reference.md', public: 'public/docs/reference.md' },
		{ id: 'migration010', source: 'docs/migration-0.10.md', public: 'public/docs/migration-0.10.md' },
		{ id: 'migrationRouteV9', source: 'docs/migration-route-v9.md', public: 'public/docs/migration-route-v9.md' },
	]) {
		const source = resolve(endroitRoot, document.source);
		const sourceDigest = document.content
			? await copyExact(source, resolve(siteRoot, document.content))
			: await copyExact(source, resolve(siteRoot, document.public));
		let digest = sourceDigest;
		if (document.content) {
			if (document.normalizeRawLinks) {
				const content = (await readFile(source, 'utf8')).replace('(ADOPT.md)', '(/adopt.md)');
				await writeFile(resolve(siteRoot, document.public), content);
				digest = sha256(content);
			} else {
				digest = await copyExact(source, resolve(siteRoot, document.public));
				if (digest !== sourceDigest) throw new Error(`${document.id} projections differ`);
			}
		}
		projectionManifest.projections[document.id] = {
			source: `site:endroit@${endroitCommit}:${document.source}`,
			sourceCommit: endroitCommit,
			sourceSha256: sourceDigest,
			sha256: digest,
			...(document.normalizeRawLinks ? { transform: 'normalize raw ADOPT.md link to /adopt.md' } : {}),
		};
	}
}

if (selection === 'all' || selection === 'llms') {
	const content = `# Endroit

> The Workplace-first application framework. Agents produce. Your workplace compounds.

## Public surfaces

- [Product instrument](https://endroit.org/): typed context, explicit lifecycle and agentic capital
- [Workplaces in practice](https://endroit.org/homes/): the Endroit Profile vocabulary and its responsibilities
- [Install for humans](https://endroit.org/install/): agent-led, CLI-backed, human-approved installation
- [Install contract](https://endroit.org/install.md): the same installation procedure as Markdown
- [Adoption contract](https://endroit.org/adopt.md): bounded recognition before mutation
- [Endroit Profile](https://endroit.org/profile.md): the candidate implementation mapping for open-workplace/0.2-draft
- [0.10 reference](https://endroit.org/docs/reference.md): source formats, commands and exact limits
- [Upgrade from 0.9](https://endroit.org/docs/migration-0.10.md): compatibility boundary and safe sequence
- [Roadmap](https://endroit.org/roadmap/): available, in-progress, exploratory and later work
- [Schema contracts](https://endroit.org/schema/): immutable public JSON Schema addresses
- [Schema manifest](https://endroit.org/schema/manifest.json): source and SHA-256 for served contracts

## Source

- [Endroit on GitHub](https://github.com/thevzion/endroit)

The Site describes the qualified 0.10 candidate without implying npm publication, schema delivery or deployment.
`;
	const destination = resolve(siteRoot, 'public/llms.txt');
	await writeFile(destination, content);
	projectionManifest.projections.llms = {
		source: 'site:endroit.org/scripts/sync-owned-sources.mjs#llms',
		sha256: sha256(content),
	};
}

if (selection === 'all' || selection === 'documents' || selection === 'llms') {
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
		...['artifact', 'desk', 'document', 'equipment', 'member', 'profile', 'room', 'route', 'site', 'workplace'].map((name) => ({
			publicPath: `/schema/v9/${name}.json`,
			sourcePath: `schemas/v9/${name}.schema.json`,
			provenance: `thevzion/endroit@${endroitCommit}:schemas/v9/${name}.schema.json`,
		})),
		...['v1alpha1', 'v1alpha2'].map((name) => ({
			publicPath: `/schema/work/${name}.json`,
			sourcePath: `schemas/work/${name}.json`,
			provenance: `thevzion/endroit@${endroitCommit}:schemas/work/${name}.json`,
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
		`${JSON.stringify({ release: '0.10.0-alpha.0', availability: 'candidate', sourceCommit: endroitCommit, contracts }, null, 2)}\n`,
	);
}

console.log(`Synchronized ${selection} owned source${selection === 'all' ? 's' : ''}.`);
