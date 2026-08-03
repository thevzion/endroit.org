// Semantic source for the 024 candidate. Every module on the bench renders
// from this data; the calibration tags expose it. Candidate design language
// local to this surface: not a public schema, not a shipped capability.

export const spine = {
	category: 'SOFTWARE CRAFTSMANSHIP, FOR THE AGENTIC GENERATION',
	punch: 'Agents produce. Your workplace compounds.',
	promise: 'The next agent starts ahead, not over.',
	accepted: 'THE WORKPLACE-FIRST APPLICATION FRAMEWORK',
	action: 'Start with a Workplace. Bring an agent.',
};

// Each module is one rung of the proof ladder. No orphan claims: punch,
// plain consequence, mechanism, demonstration, maturity, source, action.
export const modules = [
	{
		id: 'hero',
		role: 'promise',
		claim: 'Agents produce. Your workplace compounds.',
		mechanism: 'The durable center is the Workplace, not the session.',
		proof: 'The whole page: every claim below resolves to a mechanism, a demonstration and its maturity.',
		maturity: 'current',
		source: 'Accepted product direction',
		action: 'Follow the ladder down.',
	},
	{
		id: 'problem',
		role: 'problem',
		claim: 'A longer context window is not continuity.',
		mechanism: 'Session output that is never given a place resets to zero when the session ends.',
		proof: 'The restart trace: three sessions, three warm-ups, nothing carried.',
		maturity: 'current',
		source: 'Lived engineering pain · candidate editorial framing',
		action: 'See what a place changes.',
	},
	{
		id: 'resolver',
		role: 'mechanism',
		claim: 'Context that knows its place.',
		mechanism: 'Semantically typed working context, explicitly resolved: type, owner, lifetime, state, authority and relationship survive composition.',
		proof: 'Select an intent; watch the smallest relevant composition arm, and everything else stay visibly excluded, with its reason.',
		maturity: 'current',
		source: 'Product claim boundaries · no measured accuracy claim',
		action: 'Arm an intent.',
	},
	{
		id: 'capital',
		role: 'proof',
		claim: 'The agent left. The leverage stayed.',
		mechanism: 'retain latches one useful result into its owning Room; ending the Meeting clears only the ephemeral rest; the next Occupant resolves what remained.',
		proof: 'The latch sequence on this bench: run it, then read what it was called.',
		maturity: 'current',
		source: 'Supported lifecycle behavior',
		action: 'Run the sequence.',
	},
	{
		id: 'relations',
		role: 'mechanism',
		claim: 'Capital needs more than storage. It needs relationships.',
		mechanism: 'Rooms compound context without mixing it; Decisions make judgment reusable; Equipment makes a good move repeatable; Routes turn understanding into bounded reach; Archive keeps capital from becoming noise.',
		proof: 'The signal legend: each relationship is one instrument behavior, not a metaphor.',
		maturity: 'current',
		source: 'Product claim boundaries',
		action: 'Read the legend.',
	},
	{
		id: 'craft',
		role: 'definition',
		claim: 'Software craftsmanship, one level up.',
		mechanism: 'You already care about source, boundaries, ownership and lifecycle in code. Endroit brings the same craft to the system around the code.',
		proof: 'The bench itself: files, Git, explicit verbs, no daemon.',
		maturity: 'current',
		source: 'Candidate editorial framing',
		action: 'Craft the system that crafts the software.',
	},
	{
		id: 'stack',
		role: 'boundary',
		claim: 'Open Workplace supplies the grammar. Endroit gives it a place.',
		mechanism: 'Workplace-first is the paradigm; Open Workplace owns the shared model and experimental Protocol; Endroit is the framework; your Workplace is the result. The current Protocol is open-workplace/0.2-draft; Endroit 0.8.0-alpha.2 still targets superseded open-workplace/0.1.',
		proof: 'The independent proposal and current draft are public; Endroit’s older target is named without implying compatibility.',
		maturity: 'current',
		source: 'Resolved terminology · Open Workplace remains independent',
		action: 'Read the proposal.',
	},
	{
		id: 'availability',
		role: 'action',
		claim: 'Vision can lead implementation. The page still tells you which is which.',
		mechanism: 'Three separated states: published alpha, local release candidate, research frontier.',
		proof: 'The condition readout below.',
		maturity: 'current',
		source: 'Product claim boundaries',
		action: 'Start with a Workplace. Bring an agent.',
	},
];

// The type system. Each distinction preserves a boundary during resolution.
export const signalTypes = [
	{ not: 'A Meeting is not a Room.', preserves: 'lifetime', detail: 'One is a bounded event, the other a durable domain. Ephemeral work never silently becomes truth.' },
	{ not: 'A draft is not a Decision.', preserves: 'state', detail: 'Retained Material stays challengeable; accepted Decisions carry the Room’s current judgment.' },
	{ not: 'A checkout is not an owner.', preserves: 'ownership', detail: 'A repository inside the Workplace keeps its own source, history and permissions.' },
	{ not: 'A reachable repository is not permission.', preserves: 'authority', detail: 'A Route grants declared, revalidated access. Reach never implies consent.' },
	{ not: 'An Occupant is not the Workplace.', preserves: 'relationship', detail: 'Agents participate for a bounded time. The place and its relationships remain.' },
];

// The resolver demonstration: three intents, three compositions. Names are
// illustrative demonstration records; the behavior is the product.
export const intents = [
	{
		id: 'bug',
		label: 'Fix the checkout timeout',
		armed: [
			{ channel: 'HOME · guidance', kind: 'home', note: 'shared constitution, always in' },
			{ channel: 'DESK · yours', kind: 'desk', note: 'your continuity and preferences' },
			{ channel: 'ROOM · payments', kind: 'room', note: 'owning domain: its Material and Decisions' },
			{ channel: 'EQUIPMENT · debugging method', kind: 'equipment', note: 'activated because the intent needs it' },
			{ channel: 'MEETING · now', kind: 'meeting', note: 'bounded, ephemeral by default' },
		],
		excluded: [
			{ channel: 'ROOM · brand voice', reason: 'different domain, different owner' },
			{ channel: 'SITE · infra repository', reason: 'no Route declared for this intent' },
			{ channel: 'MEETING · last Tuesday', reason: 'ended; only what you retained remains' },
		],
	},
	{
		id: 'announce',
		label: 'Draft the launch announcement',
		armed: [
			{ channel: 'HOME · guidance', kind: 'home', note: 'shared constitution, always in' },
			{ channel: 'DESK · yours', kind: 'desk', note: 'your continuity and preferences' },
			{ channel: 'ROOM · launch', kind: 'room', note: 'owning domain: accepted positioning, drafts' },
			{ channel: 'EQUIPMENT · publishing method', kind: 'equipment', note: 'activated because the intent needs it' },
			{ channel: 'MEETING · now', kind: 'meeting', note: 'bounded, ephemeral by default' },
		],
		excluded: [
			{ channel: 'ROOM · payments', reason: 'different domain, different owner' },
			{ channel: 'SITE · shop backend', reason: 'a landing draft has no business in the backend' },
			{ channel: 'ROOM · 2024 archive', reason: 'archived; history intact, out of active context' },
		],
	},
	{
		id: 'decide',
		label: 'Decide the storage architecture',
		armed: [
			{ channel: 'HOME · guidance', kind: 'home', note: 'shared constitution, always in' },
			{ channel: 'DESK · yours', kind: 'desk', note: 'your continuity and preferences' },
			{ channel: 'ROOM · architecture', kind: 'room', note: 'owning domain: prior Decisions load as current truth' },
			{ channel: 'EQUIPMENT · research method', kind: 'equipment', note: 'activated because the intent needs it' },
			{ channel: 'MEETING · now', kind: 'meeting', note: 'bounded, ephemeral by default' },
		],
		excluded: [
			{ channel: 'ROOM · launch', reason: 'different domain, different owner' },
			{ channel: 'SITE · website', reason: 'no Route needed to think' },
			{ channel: 'MEETING · last sprint', reason: 'ended; its accepted Decision is what remains' },
		],
	},
];

// The latch sequence: four phases on one timing capture.
export const latchPhases = [
	{
		id: 'live',
		control: 'Power on',
		title: 'Meeting 1 · in progress',
		note: 'An agent explores the checkout timeout. One finding looks durable: “The retry queue amplifies the timeout.” Everything on screen is still ephemeral.',
	},
	{
		id: 'retain',
		control: 'Retain this.',
		title: 'Material latched',
		note: 'You chose one result. It becomes owned Material in ROOM · payments: a file, linked, inspectable. The rest of the session stays ephemeral. Nothing was stored automatically.',
	},
	{
		id: 'end',
		control: 'End the Meeting.',
		title: 'Meeting 1 · ended',
		note: 'The session channel drops to zero. The chatter is gone. The latched Material holds. The agent left. The leverage stayed.',
	},
	{
		id: 'next',
		control: 'Bring the next agent.',
		title: 'Meeting 2 · a different Occupant',
		note: 'A different provider enters the same Workplace and resolves what remained: the retained finding, its owner, its Room. No memory transfer. The next agent starts ahead, not over.',
	},
];

export const capitalDefinition = {
	reveal: 'What remains is your agentic capital.',
	meaning:
		'The durable, owned, legible and actionable capacity that remains after an agent leaves. Context becomes capital when it has a place, an owner, a state, preserved meaning, useful provenance and a path back into action.',
	isNot: [
		'a pile of generated files,',
		'automatic memory or retained transcripts,',
		'an agent’s property,',
		'a promise that everything compounds without judgment.',
	],
	honest: 'It compounds through the work, not after it.',
};

export const relations = [
	{ name: 'Rooms', behavior: 'compound context without mixing it.' },
	{ name: 'Decisions', behavior: 'make judgment reusable.' },
	{ name: 'Equipment', behavior: 'turns a good move into a repeatable one.' },
	{ name: 'Routes', behavior: 'turn understanding into bounded reach.' },
	{ name: 'Archive', behavior: 'keeps accumulated context from becoming accumulated noise.' },
	{ name: 'Projections', behavior: 'make one owned source useful at several surfaces.' },
];

export const availability = [
	{
		state: 'available',
		label: 'Published · 0.8.0-alpha.1',
		detail:
			'File-based Homes, Rooms, Equipment, Sites and Routes with deterministic provider projections. Codex and Claude are L1 Projection-qualified; this is not an “any agent” claim.',
	},
	{
		state: 'candidate',
		label: 'Local release candidate · 0.8.0-alpha.2',
		detail:
			'Adds the versioned Workplace Profile targeting superseded open-workplace/0.1, Work Resolution and a consent-first adoption journey. The current experimental Protocol is open-workplace/0.2-draft; compatibility is not implied. Local qualification only; publication cannot be inferred.',
	},
	{
		state: 'research',
		label: 'Research frontier',
		detail:
			'Public per-fragment source links, fragment reuse across surfaces, a page compiler and Work Trust Graph projections remain research, not available behavior.',
	},
];

export const externalLinks = [
	'https://endroit.org/install/',
	'https://endroit.org/roadmap/',
	'https://github.com/thevzion/endroit',
	'https://open-workplace.org/',
	'https://open-workplace.org/proposal/',
	'https://github.com/open-workplace/open-workplace',
];
