// Demonstration records for the landing exploration. Every record here is
// illustrative: the file names, Room names and note numbers are authored for
// the page. The behaviour they demonstrate is supported product behaviour, and
// the claim register below binds each claim to a mechanism, a proof and its
// maturity. This module is local to this Surface: not a public schema, not a
// shipped capability, not a data contract.

export const note = {
	number: '0142',
	sheetsInSet: 3,
	fields: [
		{
			label: 'Objective',
			value: 'Fix the checkout timeout before the Friday release',
			note: 'one Meeting, one objective, written down',
		},
		{
			label: 'Carrier',
			value: 'claude-code',
			note: 'supplies the model, tools and sandbox, not the authority',
		},
		{
			label: 'Place',
			value: 'Room · payments',
			note: 'the domain that owns this objective and its Decisions',
		},
		{
			label: 'Book',
			value: 'Workplace · acme-home · endroit/0.10',
			note: 'durable; this note is not',
		},
	],
};

// Context resolution, written as a manifest. Exclusion is printed, not hidden.
export const manifest = {
	aboard: [
		{ address: 'HOME/', item: 'Home guidance', why: 'the Workplace constitution; always aboard' },
		{ address: 'DESK/', item: 'Your Desk', why: 'your continuity and working preferences' },
		{ address: 'ROOM/payments', item: 'Room · payments', why: 'owns this objective, its Material and its Decisions' },
		{ address: 'EQUIP/debug', item: 'Equipment · debugging method', why: 'activated because this objective calls for it' },
		{ address: 'MEET/0142', item: 'This Meeting', why: 'bounded, and ephemeral until you sign' },
	],
	notAboard: [
		{ code: 'R-02', item: 'Room · brand voice', reason: 'another domain, another owner' },
		{ code: 'R-05', item: 'Site · infra repository', reason: 'no Route declared for this objective' },
		{ code: 'R-09', item: 'Meeting 0139 · transcript', reason: 'closed; only what you retained remains' },
		{ code: 'R-11', item: 'Room · 2024 archive', reason: 'archived; history intact, out of active context' },
	],
};

// The problem sheet: closed notes with nothing signed for.
export const closedNotes = [
	{ number: '0139', objective: 'Trace the retry storm', retained: 'none' },
	{ number: '0140', objective: 'Trace the retry storm, again', retained: 'none' },
	{ number: '0141', objective: 'Explain the retry storm to a new session', retained: 'none' },
];

// The carbon set: one owned original, compiled provider copies.
export const carbonSet = [
	{
		id: 'original',
		tab: 'Original',
		file: 'rooms/payments/ROOM.md',
		role: 'Owned Markdown. You edit this one.',
		lines: [
			'---',
			'kind: "endroit/room"',
			'id: "payments"',
			'owner: "desk:you"',
			'---',
			'',
			'# Payments',
			'',
			'Retry queues amplify upstream timeouts.',
			'Decision 0006 fixed the idempotency key.',
		],
	},
	{
		id: 'agents',
		tab: 'AGENTS.md',
		file: 'AGENTS.md',
		role: 'Compiled projection. Read by harnesses that follow the convention.',
		lines: [
			'# Workplace',
			'',
			'Identity: acme-home',
			'Profile: endroit/0.10',
			'',
			'## Payments',
			'',
			'Retry queues amplify upstream timeouts.',
			'Decision 0006 fixed the idempotency key.',
		],
	},
	{
		id: 'claude',
		tab: 'CLAUDE.md',
		file: 'CLAUDE.md',
		role: 'Compiled projection for a projection-qualified provider.',
		lines: [
			'# Workplace',
			'',
			'Identity: acme-home',
			'Profile: endroit/0.10',
			'Revision: sha256:b3ab862c…',
			'',
			'## Payments',
			'',
			'Retry queues amplify upstream timeouts.',
		],
	},
	{
		id: 'skill',
		tab: 'Skill',
		file: '.claude/skills/debug-payments/SKILL.md',
		role: 'Compiled projection of one Equipment method.',
		lines: [
			'---',
			'name: debug-payments',
			'description: Use when a payment path times out.',
			'---',
			'',
			'1. Reproduce against the retry queue.',
			'2. Check the idempotency key first.',
			'3. Retain the finding before ending the Meeting.',
		],
	},
];

// Real, served projections of owned sources on this Site. These are the
// inspectable proofs for the carbon-set claim.
export const projectionProofs = [
	{ href: '/profile.md', label: '/profile.md', proves: 'the candidate Workplace Profile, projected from one exact Endroit commit' },
	{ href: '/install.md', label: '/install.md', proves: 'the installation contract, machine-readable, hashed against its source' },
	{ href: '/llms.txt', label: '/llms.txt', proves: 'a generated discovery projection, not a hand-written page' },
	{ href: '/schema/', label: '/schema/', proves: 'immutable public contracts, each recorded with its source commit and SHA-256' },
];

// The signature block. Each step is a separate human act.
export const signatureSteps = [
	{
		id: 'open',
		control: 'Note opened',
		stamp: 'IN PROGRESS',
		title: 'Meeting 0142 · working',
		note: 'The agent has found something that looks durable: the retry queue amplifies the upstream timeout. Everything on this sheet is still ephemeral.',
		ledger: null,
	},
	{
		id: 'retain',
		control: 'Retain this finding.',
		stamp: 'RETAINED',
		title: 'One line signed for',
		note: 'You chose one result. It becomes owned Material in Room · payments: a file, linked, inspectable, still open to challenge. Nothing else was stored, and nothing was stored automatically.',
		ledger: { path: 'rooms/payments/material/retry-amplifies-timeout.md', state: 'retained', by: 'your signature' },
	},
	{
		id: 'close',
		control: 'Close note 0142.',
		stamp: 'CLOSED',
		title: 'Meeting 0142 · closed',
		note: 'The Meeting ends. The transcript goes with it: there is no hidden copy, no background summary and no memory to transfer. The signed line stays where you put it.',
		ledger: { path: 'rooms/payments/material/retry-amplifies-timeout.md', state: 'still retained', by: 'note 0142 closed; the file is untouched' },
	},
	{
		id: 'next',
		control: 'Open note 0143.',
		stamp: 'CARRIED FORWARD',
		title: 'Meeting 0143 · a different carrier',
		note: 'A different harness opens a new note in the same book. Its manifest resolves the signed line, its Room and its owner. It inherits durable context, never a conversation.',
		ledger: { path: 'rooms/payments/material/retry-amplifies-timeout.md', state: 'aboard 0143', by: 'resolved, not remembered' },
	},
];

// The Room ledger, in the order the stamps write it.
export const ledger = signatureSteps.flatMap((step) => (step.ledger ? [{ id: step.id, ...step.ledger }] : []));

export const retainedTerm = {
	name: 'agentic capital',
	meaning:
		'What accumulates this way is durable, owned, legible and actionable capacity that outlasts any agent. Context becomes capital when it has a place, an owner, a state and a path back into action.',
	isNot: [
		'automatic memory,',
		'a saved transcript,',
		'a pile of generated files,',
		'a promise that everything compounds without your judgment.',
	],
	honest: 'It compounds through the work, not after it.',
};

// The delivery receipt: three separated acts.
export const deliveryStamps = [
	{
		id: 'route',
		stamp: 'ROUTE DECLARED',
		tone: 'route',
		title: 'The Workplace can reach the Site.',
		note: 'A Route names one Site, one revision and one bounded checkout, and revalidates the destination before any mutation. Declared once; not re-decided on every trip.',
	},
	{
		id: 'consent',
		stamp: 'CONSENT GIVEN',
		tone: 'consent',
		title: 'You said deliver.',
		note: 'Reach is not permission. Delivery is a separate human act on a named destination, and approval of one delivery is not approval of the next.',
	},
	{
		id: 'received',
		stamp: 'RECEIVED IN GOOD ORDER',
		tone: 'received',
		title: 'The effect was observed in the Site.',
		note: 'The Site keeps its own source, history, permissions and delivery lifecycle. A delivered result exists when the Site shows it, not when an agent reports success.',
	},
];

// Parties and limits: who owns what in the running system.
export const parties = [
	{
		party: 'Your hands',
		owns: 'Direction, judgment, acceptance and delivery consent.',
		self: false,
	},
	{
		party: 'Endroit',
		owns: 'The file-based representation of the work: places, manifests, projections, Routes and receipts.',
		self: true,
	},
	{
		party: 'The harness',
		owns: 'The model, tools, sandbox and the running agent. Claude Code and Codex are the projection-qualified providers.',
		self: false,
	},
	{
		party: 'The repositories',
		owns: 'Their own source, history, permissions and delivery lifecycle.',
		self: false,
	},
];

export const notThis = [
	'an agent',
	'an orchestration runtime',
	'a scheduler',
	'a memory product',
	'a monorepo manager',
	'a permission system for your repositories',
];

// The exact maturity register. These four distinctions are preserved verbatim.
export const condition = [
	{
		state: 'available',
		register: 'Published alpha',
		subject: 'Endroit 0.8.0-alpha.1',
		detail: 'The observed public package. File-based Workplaces, Rooms, Equipment, Sites and Routes with deterministic provider projections.',
	},
	{
		state: 'candidate',
		register: 'Qualified local candidate',
		subject: 'Endroit 0.10.0-alpha.0',
		detail: 'Declares the endroit/0.10 Profile, native v9 Workplace Documents, deterministic resolution and pathless Routes with derived Checkouts. Qualified locally: npm publication, schema delivery and deployment cannot be inferred.',
	},
	{
		state: 'draft',
		register: 'Experimental protocol',
		subject: 'Open Workplace 0.2-draft',
		detail: 'An open proposal under active revision. Not an established standard, and not a conformance claim.',
	},
	{
		state: 'qualified',
		register: 'Projection-qualified',
		subject: 'Codex and Claude',
		detail: 'The two providers whose projections are qualified. Other harnesses may consume the AGENTS.md convention; that is not support for every runtime.',
	},
];

// Schedule A. One printed register instead of a per-section inspector: every
// material claim on this page, its mechanism, the proof a visitor can check,
// and its maturity.
export const schedule = [
	{
		ref: 'A1',
		claim: 'A harness runs the agent. Endroit runs the work around it.',
		mechanism: 'Endroit owns the file-based representation of the work; the provider owns the model, tools and sandbox.',
		proof: 'The parties register on sheet 06, and the candidate Profile at /profile.md.',
		maturity: 'current',
		source: 'Accepted product direction',
	},
	{
		ref: 'A2',
		claim: 'Context reaches an agent as a manifest, with exclusions named.',
		mechanism: 'Resolution composes the smallest relevant set of owned sources and records what was left out, with a reason.',
		proof: 'The manifest in the first viewport: five lines aboard, four not aboard with reason codes.',
		maturity: 'current',
		source: 'Supported resolution behaviour; no accuracy claim',
	},
	{
		ref: 'A3',
		claim: 'One owned original compiles into a copy for every provider.',
		mechanism: 'Owned Markdown produces AGENTS.md, CLAUDE.md, Skills and other projections deterministically.',
		proof: 'This Site does it too: /profile.md, /install.md and /llms.txt are compiled projections, each hashed against its source commit in /schema/.',
		maturity: 'current',
		source: 'Observed projection manifest on this Site',
	},
	{
		ref: 'A4',
		claim: 'Nothing survives a Meeting unless you sign for it.',
		mechanism: 'Retention, acceptance, delivery and archive are explicit human transitions; a Meeting is ephemeral by default.',
		proof: 'The signature block on sheet 04, where each stamp is a separate act and the transcript never survives.',
		maturity: 'current',
		source: 'Supported lifecycle behaviour',
	},
	{
		ref: 'A5',
		claim: 'A later Meeting inherits durable context, not a transcript.',
		mechanism: 'The next Meeting resolves owned sources again. There is no memory transfer between providers.',
		proof: 'Note 0143 on sheet 04 resolves the signed line and nothing else.',
		maturity: 'current',
		source: 'Supported lifecycle behaviour',
	},
	{
		ref: 'A6',
		claim: 'Reach is not consent, and delivery is an observed effect.',
		mechanism: 'A Route declares and revalidates bounded reach to one Site; delivery is a separate consented act recorded when the effect is observed.',
		proof: 'The three separated stamps on sheet 05.',
		maturity: 'current',
		source: 'Supported Route and delivery behaviour',
	},
	{
		ref: 'A7',
		claim: 'Startup hooks are an improvement, not a requirement.',
		mechanism: 'The Workplace is ordinary Markdown; hooks only pre-load orientation.',
		proof: 'The adoption contract at /install.md and the candidate Profile at /profile.md.',
		maturity: 'current',
		source: 'Installation contract',
	},
	{
		ref: 'A8',
		claim: 'The published alpha and the local candidate are different things.',
		mechanism: 'The Site separates the observed public package from the locally qualified candidate.',
		proof: 'The condition register on sheet 07, and the release metadata in /schema/manifest.json.',
		maturity: 'current',
		source: 'Release boundary',
	},
	{
		ref: 'A9',
		claim: 'The Endroit Discord is new and bootstrapping.',
		mechanism: 'An accepted release destination for candidate feedback, declared with its honest maturity.',
		proof: 'The Site-owned Surface declares the destination and the claim.',
		maturity: 'bootstrapping',
		source: 'Accepted release destination',
	},
];

export const externalLinks = [
	'https://endroit.org/install/',
	'https://endroit.org/roadmap/',
	'https://github.com/thevzion/endroit',
	'https://open-workplace.org/',
	'https://open-workplace.org/proposal/',
	'https://open-workplace.org/protocol/',
	'https://github.com/open-workplace/open-workplace',
	'https://discord.gg/HW4Hs9sEp',
];
