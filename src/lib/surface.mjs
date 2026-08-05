import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';

const source = await readFile(resolve('surfaces/home/SURFACE.md'), 'utf8');

function pairs(block) {
	return Object.fromEntries(block.trim().split('\n').map((line) => {
		const separator = line.indexOf(':');
		if (separator < 1) throw new Error(`Invalid Surface metadata: ${line}`);
		const key = line.slice(0, separator).trim();
		const raw = line.slice(separator + 1).trim();
		try { return [key, JSON.parse(raw)]; } catch { return [key, raw]; }
	}));
}

const frontmatter = source.match(/^---\n([\s\S]*?)\n---\n/)?.[1];
if (!frontmatter) throw new Error('SURFACE.md must start with frontmatter.');

const metadata = pairs(frontmatter);
const fragments = [...source.matchAll(/^## (.+)\n\n```endroit\n([\s\S]*?)\n```\n\n([\s\S]*?)(?=^## |(?![\s\S]))/gm)].map((match) => ({
	heading: match[1],
	...pairs(match[2]),
	body: match[3].trim(),
}));
const byId = Object.fromEntries(fragments.map((fragment) => [fragment.id, fragment]));

if (metadata.kind !== 'endroit/release:public-surface' || metadata.owner !== 'site:endroit.org') {
	throw new Error('SURFACE.md must remain owned by site:endroit.org.');
}
if (fragments.length !== new Set(fragments.map(({ id }) => id)).size) throw new Error('Surface Fragment IDs must be unique.');
if (fragments.filter(({ kind }) => kind === 'surface_contract').length !== 1) throw new Error('Surface requires one surface_contract Fragment.');
if (fragments.filter(({ kind }) => kind === 'site_export').length !== 1) throw new Error('Surface requires one site_export Fragment.');
if (!fragments.some(({ kind }) => kind === 'content')) throw new Error('Surface requires content Fragments.');

// Pre-printed matter is what the form itself says; the Surface owns all of it.
// Inline code spans become <code> so the copy can name a file or a version
// without the renderer inventing product facts of its own.
const escape = (text) => text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const inline = (text) => escape(text).replace(/`([^`]+)`/g, '<code>$1</code>');

const heading = (body) => body.match(/^#{1,6}\s+(.+)$/m)?.[1] ?? '';
const plain = (body) => body.split(/\n\n+/).filter((block) => !/^(?:#|>|-|```)/.test(block)).map((block) => block.replace(/\n/g, ' '));
const quotes = (body) => [...body.matchAll(/^>\s+(.+(?:\n>\s+.+)*)$/gm)].map(([, text]) => text.replace(/\n>\s+/g, ' '));
const bullets = (body) => [...body.matchAll(/^- (?!\[)(.+)$/gm)].map(([, text]) => text);
const links = (body) => [...body.matchAll(/^- \[([^\]]+)\]\(([^)]+)\)$/gm)].map(([, label, href]) => ({ label, href }));

const content = (id) => {
	const fragment = byId[id];
	if (!fragment || fragment.kind !== 'content') throw new Error(`Surface content Fragment is missing: ${id}`);
	const paragraphs = plain(fragment.body);
	const quoted = quotes(fragment.body);
	return {
		id,
		sheet: fragment.sheet ?? '',
		stock: fragment.stock ?? 'original',
		plate: fragment.plate ?? '',
		title: heading(fragment.body),
		intro: paragraphs[0] ?? '',
		paragraphs,
		prose: paragraphs.map(inline),
		punch: quoted[0] ?? '',
		quotes: quoted,
		fine: bullets(fragment.body),
		fineProse: bullets(fragment.body).map(inline),
		actions: links(fragment.body),
	};
};

const sheetIds = ['hero', 'problem', 'carbon', 'signature', 'consignee', 'stack', 'availability', 'community', 'close', 'provenance'];

export const publicSurface = Object.freeze({
	metadata,
	fragments,
	contract: fragments.find(({ kind }) => kind === 'surface_contract'),
	export: fragments.find(({ kind }) => kind === 'site_export'),
	sheetIds,
	sheets: sheetIds.map((id) => content(id)),
	hero: content('hero'),
	problem: content('problem'),
	carbon: content('carbon'),
	signature: content('signature'),
	consignee: content('consignee'),
	stack: content('stack'),
	availability: content('availability'),
	community: content('community'),
	close: content('close'),
	provenance: content('provenance'),
});
