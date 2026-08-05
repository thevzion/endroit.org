import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';
import {
	carbonSet,
	closedNotes,
	condition,
	deliveryStamps,
	externalLinks,
	ledger,
	manifest,
	note,
	notThis,
	parties,
	projectionProofs,
	retainedTerm,
	schedule,
	signatureSteps,
} from '../src/lib/consignment.mjs';
import { publicSurface } from '../src/lib/surface.mjs';

const site = new URL('..', import.meta.url);
const [page, styles, product, direction] = await Promise.all([
	readFile(new URL('src/pages/index.astro', site), 'utf8'),
	readFile(new URL('src/styles/consignment.css', site), 'utf8'),
	readFile(new URL('PRODUCT.md', site), 'utf8'),
	readFile(new URL('surfaces/home/DIRECTION.md', site), 'utf8'),
]);
const surfaceCopy = publicSurface.sheets.map(({ title, paragraphs, quotes, fine }) => [title, ...paragraphs, ...quotes, ...fine].join(' ')).join('\n');
const corpus = `${page}\n${surfaceCopy}\n${JSON.stringify({ condition, deliveryStamps, manifest, note, parties, retainedTerm, schedule, signatureSteps })}`;

test('the landing states one thesis and answers the eight visitor questions', () => {
	assert.equal(publicSurface.hero.title, 'A harness runs the agent. Endroit runs the work around it.');
	assert.equal(publicSurface.hero.punch, 'Agents execute. You still direct, accept and deliver.');
	for (const statement of [
		'A bigger context window is a bigger truck. It is not a manifest.',
		'One original. A compiled copy for every provider.',
		'Nothing survives a Meeting unless you sign for it.',
		'The destination signs for itself.',
		'The harness is not the framework. Neither is the repository.',
		'Available now. Candidate next. Draft beyond.',
		'Direct the work. Let the agents execute.',
	]) assert.ok(surfaceCopy.includes(statement), statement);
	// The paradigm shift, not a prompt-quality or memory claim.
	assert.match(corpus, /structuring work around coding agents/);
	assert.doesNotMatch(corpus, /better prompts|prompt engineering|agent memory|multi-agent orchestration/i);
});

test('the exact maturity register is preserved and never softened', () => {
	assert.deepEqual(condition.map(({ register, subject }) => `${register}: ${subject}`), [
		'Published alpha: Endroit 0.8.0-alpha.1',
		'Qualified local candidate: Endroit 0.10.0-alpha.0',
		'Experimental protocol: Open Workplace 0.2-draft',
		'Projection-qualified: Codex and Claude',
	]);
	assert.match(corpus, /npm publication, schema delivery and deployment cannot/);
	assert.match(corpus, /not an any-agent claim/);
	assert.match(corpus, /Not an established standard/);
	assert.match(corpus, /Optional startup hooks make this smoother\. The plain-file model requires none\./);
	assert.match(corpus, /Other harnesses can read the `?AGENTS\.md`? convention/);
	// A candidate must never be dressed as an observed release.
	assert.doesNotMatch(corpus, /0\.10\.0-alpha\.0 is (?:published|released|deployed|available now)/i);
	// HUD stays out until its full implementation chain is verified.
	assert.doesNotMatch(corpus, /\bHUD\b/);
});

test('context resolution is shown as a manifest with named exclusions', () => {
	assert.equal(manifest.aboard.length, 5);
	assert.deepEqual(manifest.aboard.map(({ address }) => address.split('/')[0]), ['HOME', 'DESK', 'ROOM', 'EQUIP', 'MEET']);
	assert.ok(manifest.notAboard.length >= 3);
	for (const line of manifest.notAboard) {
		assert.match(line.code, /^R-\d\d$/);
		assert.ok(line.reason.length > 0, line.code);
	}
	assert.equal(note.fields.length, 4);
	assert.deepEqual(note.fields.map(({ label }) => label), ['Objective', 'Carrier', 'Place', 'Book']);
	// The carrier field is where the harness boundary is stated.
	assert.match(note.fields[1].note, /not the authority/);
	assert.equal(closedNotes.length, 3);
	assert.ok(closedNotes.every(({ retained }) => retained === 'none'));
	// Exclusion is a record, never a de-emphasised row.
	assert.match(styles, /\.line-out\s*\{\s*opacity:\s*1;/);
	assert.match(corpus, /not a\s+measured claim about model intelligence or accuracy/);
});

test('owned sources compile into provider projections, with real proofs to check', () => {
	assert.deepEqual(carbonSet.map(({ id }) => id), ['original', 'agents', 'claude', 'skill']);
	assert.equal(carbonSet[0].role, 'Owned Markdown. You edit this one.');
	for (const copy of carbonSet.slice(1)) assert.match(copy.role, /projection/i);
	for (const copy of carbonSet) assert.ok(copy.lines.length > 3, copy.id);
	// Every proof link is a route this Site actually serves.
	assert.deepEqual(projectionProofs.map(({ href }) => href), ['/profile.md', '/install.md', '/llms.txt', '/schema/']);
	for (const proof of projectionProofs) assert.ok(proof.proves.length > 0, proof.href);
});

test('every lifecycle transition is a separate human act, and the term follows the demonstration', () => {
	assert.deepEqual(signatureSteps.map(({ id }) => id), ['open', 'retain', 'close', 'next']);
	assert.equal(signatureSteps[0].ledger, null, 'nothing is in the ledger before a signature');
	assert.equal(ledger.length, 3);
	assert.ok(new Set(ledger.map(({ path }) => path)).size === 1, 'one owned file, three states');
	assert.ok(page.indexOf('data-steps') < page.indexOf('data-term'), 'the demonstration precedes the name');
	assert.equal(retainedTerm.name, 'agentic capital');
	assert.match(corpus, /nothing was stored automatically/i);
	assert.match(corpus, /It compounds through the work, not after it\./);
	assert.doesNotMatch(corpus, /automatically (remembers|captures|retains|stores)|zero[- ]effort/i);
	assert.match(corpus, /no hidden copy, no background summary and no memory to transfer/);
});

test('Site authority, Route reach and delivery consent stay three separate things', () => {
	assert.deepEqual(deliveryStamps.map(({ id }) => id), ['route', 'consent', 'received']);
	assert.deepEqual(deliveryStamps.map(({ stamp }) => stamp), ['ROUTE DECLARED', 'CONSENT GIVEN', 'RECEIVED IN GOOD ORDER']);
	for (const refusal of ['Accepted is not delivered.', 'A valid Route is not consent.', 'A generated file is not a delivered page.']) {
		assert.ok(publicSurface.consignee.fine.includes(refusal), refusal);
	}
	assert.match(corpus, /Reach is not consent/);
	assert.match(corpus, /Declared once; not re-decided on every trip/);
	assert.equal(parties.filter(({ self }) => self).length, 1, 'exactly one row is Endroit itself');
	assert.equal(parties.find(({ self }) => self).party, 'Endroit');
	assert.deepEqual(parties.map(({ party }) => party), ['Your hands', 'Endroit', 'The harness', 'The repositories']);
	assert.ok(notThis.includes('a memory product') && notThis.includes('an orchestration runtime'));
});

test('Schedule A binds every material claim to a mechanism, a proof and a maturity', () => {
	assert.ok(schedule.length >= 8);
	assert.equal(new Set(schedule.map(({ ref }) => ref)).size, schedule.length);
	for (const clause of schedule) {
		assert.deepEqual(Object.keys(clause), ['ref', 'claim', 'mechanism', 'proof', 'maturity', 'source']);
		for (const key of ['claim', 'mechanism', 'proof', 'source']) assert.ok(clause[key].length > 0, `${clause.ref}.${key}`);
		assert.ok(['current', 'experimental', 'research', 'bootstrapping'].includes(clause.maturity), clause.ref);
	}
});

test('the Open Workplace and Endroit candidate boundary stays explicit in the owned Surface', () => {
	const stack = publicSurface.fragments.find(({ id }) => id === 'stack').body;
	assert.match(stack, /current\s+experimental Protocol is `open-workplace\/0\.2-draft`/);
	assert.match(stack, /Endroit `0\.10\.0-alpha\.0` candidate/);
	assert.match(stack, /`endroit\/0\.10`\s+Profile/);
	assert.match(stack, /Publication, deployment and broader conformance\s+cannot be inferred/);
	assert.match(product, /current Open Workplace experimental Protocol is\s+`open-workplace\/0\.2-draft`/);
});

test('only verified public destinations are linked', async () => {
	// Hrefs arrive from the owned Surface through interpolation, so the built
	// output is the only place every destination is actually visible.
	const built = await readFile(new URL('dist/index.html', site), 'utf8');
	const anchors = [...built.matchAll(/<a[^>]*\shref="([^"]+)"/g)].map(([, href]) => href);
	assert.ok(anchors.length >= 18, `only ${anchors.length} anchors`);
	const external = anchors.filter((href) => /^https?:\/\//.test(href));
	assert.ok(external.length >= 4);
	for (const href of external) assert.ok(externalLinks.includes(href), href);
	for (const href of anchors.filter((h) => h.startsWith('/'))) {
		assert.ok(
			['/', '/install/', '/roadmap/', '/homes/', '/schema/', '/profile.md', '/install.md', '/llms.txt'].includes(href),
			href,
		);
	}
	for (const href of anchors.filter((h) => h.startsWith('#'))) {
		assert.ok(built.includes(`id="${href.slice(1)}"`), `dangling anchor ${href}`);
	}
	assert.doesNotMatch(corpus, /The Workplace is the source of truth|works? with any agent|docs\.endroit\.org/i);
});

test('the consignment set is complete and honest without JavaScript', () => {
	assert.doesNotMatch(page, /noindex|nofollow|client:/);
	assert.match(page, /<html lang="en">/);
	assert.match(page, /class="skip-link"/);
	assert.match(page, /role="tablist"/);
	assert.match(page, /ArrowRight/);
	assert.match(page, /Printed here in sequence/, 'the static reading explains itself');
	// Only the three enhancement controls may start hidden.
	assert.equal([...page.matchAll(/\shidden(?:[\s>])/g)].length, 3);
	assert.doesNotMatch(page, /data-term[^>]*hidden/);
	assert.doesNotMatch(page, /data-ledger-file[^>]*hidden/);
	// The user-agent [hidden] rule must beat the explicit displays in this sheet.
	assert.match(styles, /\[hidden\]\s*\{\s*display:\s*none\s*!important;/);
	assert.match(styles, /prefers-reduced-motion: reduce/);
	assert.match(styles, /:focus-visible/);
	assert.match(styles, /min-width: 320px/);
	// Gating dims a frame; it never dims or hides a claim.
	assert.match(styles, /\[data-gated\]:not\(\[data-revealed\]\)/);
	assert.doesNotMatch(styles, /\[data-gated\]:not\(\[data-revealed\]\)\s*\{[^}]*(?:opacity|display)/s);
	// A verbatim identifier is never re-cased by pre-printed styling.
	assert.match(styles, /\.pre code[\s\S]{0,120}text-transform: none/);
});

test('the direction contract survives in the markup and in the Surface', () => {
	assert.match(page, /THESIS:[\s\S]*OWN-WORLD:[\s\S]*STORY:[\s\S]*FIRST VIEWPORT:[\s\S]*FORM:[\s\S]*FINISH:/);
	assert.match(page, /seed 7568bf67/);
	assert.match(direction, /## Editorial thesis[\s\S]*## First proof[\s\S]*## Visual idea[\s\S]*## Interaction grammar[\s\S]*## Deliberately removed/);
	assert.equal(publicSurface.metadata.currentness, 'exploration', 'an unaccepted exploration never claims to be current');
	assert.match(publicSurface.provenance.paragraphs.join(' '), /has not been accepted, published or deployed/);
});
