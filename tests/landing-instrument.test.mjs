import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { readFile } from 'node:fs/promises';
import test from 'node:test';
import {
	availability,
	capitalDefinition,
	externalLinks,
	intents,
	latchPhases,
	modules,
	signalTypes,
	spine,
} from '../src/lib/instrument.mjs';

const site = new URL('..', import.meta.url);
const [page, styles, reference] = await Promise.all([
	readFile(new URL('src/pages/index.astro', site), 'utf8'),
	readFile(new URL('src/styles/global.css', site), 'utf8'),
	readFile(new URL('src/content/landing-reference.json', site), 'utf8').then(JSON.parse),
]);
const corpus = page + JSON.stringify({ availability, capitalDefinition, intents, latchPhases, modules, signalTypes, spine });
const hash = (content) => createHash('sha256').update(content).digest('hex');

test('the pinned Endroit 024 spine and accepted category stay intact', () => {
	for (const statement of [
		'SOFTWARE CRAFTSMANSHIP, FOR THE AGENTIC GENERATION',
		'Agents produce. Your workplace compounds.',
		'The next agent starts ahead, not over.',
		'A longer context window is not continuity.',
		'Context that knows its place.',
		'The agent left. The leverage stayed.',
		'What remains is your agentic capital.',
		'Software craftsmanship, one level up.',
		'Craft the system that crafts the software.',
		'Start with a Workplace. Bring an agent.',
	]) assert.ok(corpus.includes(statement), statement);
	assert.equal(spine.accepted, 'THE WORKPLACE-FIRST APPLICATION FRAMEWORK');
	assert.match(page, /candidate\s+copy under evaluation/);
});

test('every module carries mechanism, proof, maturity, source and action', () => {
	assert.equal(new Set(modules.map(({ id }) => id)).size, modules.length);
	for (const module of modules) {
		assert.deepEqual(Object.keys(module), ['id', 'role', 'claim', 'mechanism', 'proof', 'maturity', 'source', 'action']);
		for (const key of ['claim', 'mechanism', 'proof', 'source', 'action']) assert.ok(module[key].length > 0, `${module.id}.${key}`);
		assert.ok(['current', 'experimental', 'research'].includes(module.maturity));
	}
});

test('the resolver preserves types and makes exclusions visible', () => {
	assert.equal(intents.length, 3);
	for (const intent of intents) {
		assert.deepEqual(intent.armed.map(({ kind }) => kind), ['home', 'desk', 'room', 'equipment', 'meeting']);
		assert.ok(intent.excluded.length >= 3);
		assert.ok(intent.excluded.every(({ reason }) => reason.length > 0));
	}
	assert.equal(signalTypes.length, 5);
	assert.match(page, /not a measured claim about model intelligence/);
});

test('agentic capital is experienced before it is named and honestly bounded', () => {
	assert.ok(page.indexOf('data-latch data-phase="0"') < page.indexOf('data-capital-reveal'));
	assert.equal(capitalDefinition.reveal, 'What remains is your agentic capital.');
	assert.deepEqual(latchPhases.map(({ id }) => id), ['live', 'retain', 'end', 'next']);
	assert.match(corpus, /Nothing was stored automatically/);
	assert.match(corpus, /It compounds through the work, not after it\./);
	assert.doesNotMatch(corpus, /automatically (remembers|captures|retains|stores)|zero[- ]effort/i);
});

test('claim boundaries and verified public destinations hold', () => {
	assert.doesNotMatch(corpus, /The Workplace is the source of truth|works? with any agent|docs\.endroit\.org/i);
	assert.doesNotMatch(page, /open-workplace\.org\/protocol/);
	assert.match(corpus, /not an “any agent” claim/);
	assert.match(corpus, /publication cannot be inferred/);
	const hrefs = [...page.matchAll(/<a[^>]+href="(https?:\/\/[^\"]+)"/g)].map(([, href]) => href);
	for (const href of hrefs) assert.ok(externalLinks.includes(href), href);
});

test('the bench is progressively enhanced and complete without JavaScript', () => {
	assert.doesNotMatch(page, /noindex|nofollow|client:/);
	assert.match(page, /<html lang="en">/);
	assert.match(page, /class="skip-link"/);
	assert.match(page, /data-resolver-rail hidden/);
	assert.match(page, /aria-live="polite"/);
	assert.match(page, /role="tablist"/);
	assert.match(page, /ArrowRight/);
	assert.doesNotMatch(page, /data-capital-reveal[^>]*hidden/);
	assert.equal([...page.matchAll(/\shidden(?:[\s>])/g)].length, 3, 'only enhancement controls begin hidden');
	assert.match(styles, /prefers-reduced-motion: reduce/);
	assert.match(styles, /:focus-visible/);
	assert.match(styles, /min-width: 320px/);
	assert.match(styles, /\[data-gated\]:not\(\[data-revealed\]\)/);
	assert.doesNotMatch(styles, /\.capital-reveal\[data-gated\]:not\(\[data-revealed\]\)\s*\{[^}]*opacity/s);
	assert.match(styles, /\.channel-excluded\s*\{\s*opacity:\s*1;/);
});

test('the production surface records the frozen reference and exact permitted deltas', async () => {
	assert.equal(reference.referenceArtifact.freezeCommit, 'b0c4bf23f7d9ee882619a2d3c39049760feb2104');
	assert.equal(reference.referenceArtifact.manifestBaseCommit, 'f4d7e154407ad26d8a88461aa9f5d38c7a24599e');
	assert.equal(reference.referenceArtifact.sourceHashes['Page.astro'], '5b04f296ceb7d3299273a54c24cb40842df7f100696c880ba242414202de7e2b');
	assert.equal(reference.productionDeltas.length, 6);
	for (const path of reference.unchangedReferenceModules) {
		const content = await readFile(new URL(path, site));
		const expectedKey = path.endsWith('instrument.mjs') ? 'instrument.mjs' : 'CalTag.astro';
		assert.equal(hash(content), reference.referenceArtifact.sourceHashes[expectedKey], path);
	}
	assert.match(page, /THESIS:[\s\S]*OWN-WORLD:[\s\S]*STORY:[\s\S]*FIRST VIEWPORT:[\s\S]*FORM:[\s\S]*FINISH:/);
});
