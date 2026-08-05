# From intent to verified effect.

> Everyone is building better agents. We gave the work a place.

Endroit is the place layer for Workplace-first software engineering. It turns
selected intent into structured, inspectable work while agents keep executing
and sovereign Sites keep their source, history and delivery authority.

**Resolved for agents. Readable by humans. Versioned with Git.**

[Preview the documentation](https://docs.endroit.org/) ·
[Inspect the Work schema](/schema/work/v1alpha1.json) ·
[Install published alpha.1](/install/)

**Alpha · published 0.8.0-alpha.1 · locally qualified alpha.2 candidate**

## Two ways in

### Bring what you have

Start from the repositories, instructions and methods you already use. The
agent inspects only the roots you approve, proposes several plausible
Workplaces and recommends one before anything changes.

### Start fresh

Create the smallest useful standalone Home for new work. Add Rooms, Equipment,
Sites and Routes only when the work actually needs them.

Both paths use the same boundary: the agent guides, the CLI applies and the
human approves.

**Release boundary:** Start fresh through `create` or `init` is available in
published `0.8.0-alpha.1`. Bring what you have and the Endroit Workplace
Profile are local release-candidate previews; neither document is included in
that published package.

## Before: the pieces are already there

Imagine an existing product split across two repositories, with instructions
and a review method already in use:

```text
work/
├── product/
│   ├── AGENTS.md
│   ├── plans/
│   └── package.json
├── docs/
│   ├── CLAUDE.md
│   └── astro.config.mjs
└── methods/
    └── review.md
```

Nothing here is disposable. `product` and `docs` have their own history and
permissions. The instructions still help their providers. The missing piece
is an explicit place that can explain how these parts relate, who owns what
and what a new session should enter.

## Recognize: choose the right boundary

You name the exact local roots the agent may inspect. Recognition is shallow,
local and read-only. Repository metadata, top-level manifests and public
instructions are useful evidence; secrets, dependencies, caches, build output
and Git internals are excluded.

The same existing setup can support several candidates:

1. **Home inside `product`.** Compact, but it makes one repository the implied
   center of work that also belongs to `docs`.
2. **One Home per repository.** Clean local boundaries, but it fragments the
   shared product Room and reusable methods.
3. **A standalone product Home.** Recommended here: `product` and `docs` remain
   sovereign Sites, while one Home owns their shared context and relationships.

The recommendation names its evidence, uncertainties, exclusions and
trade-offs. Choosing a candidate authorizes deeper analysis of that candidate
only. It does not authorize a change.

## Nothing moved. Responsibilities became explicit.

After analysis, the agent proposes one map with source provenance and the
expected file and command diff:

```text
product-home/                 new, owned Workplace
├── endroit.json
├── HOME.md
├── rooms/product/ROOM.md     shared product context
├── equipment/                reusable methods
└── .desk/routes/             declared local access

work/product/                 unchanged sovereign Site
work/docs/                    unchanged sovereign Site
work/methods/review.md        transposed with provenance
```

Only a separate **Apply this map** approval authorizes the existing Endroit
operations to create the accepted structure. Product source, repository
history and permissions stay with their Sites.

```text
existing pieces → recognize → compare candidates → choose for analysis
                                                       ↓
owned map ← explicit apply approval ← review the proposed diff
```

## Prove it in a fresh session

After Endroit builds and checks the Home, open a new Codex or Claude session.
Without relying on the adoption conversation, it enters through the generated
Front Door and identifies:

- the Home and its ownership boundary;
- the relevant Room and current Material;
- the declared Sites and the Routes that reach them;
- the Equipment available for the work.

That fresh-session confirmation is the proof: execution changed, while the
workplace stayed legible.

## Static core. Optional runtime.

The foundation is ordinary Markdown and JSON with explicit responsibilities.
Core loads, validates, resolves and builds deterministic provider projections.
There is no required resident agent, service or background process.

As decisions, Equipment, Site relationships and verified handoffs remain local
and versioned, they can accumulate as **agentic capital**: work the next human
or agent can inspect and reuse. The term does not assign financial value or
promise a productivity gain.

Optional Equipment and provider features can add live orientation, methods,
subagents or stricter controls. They extend the static Workplace; they do not
become its owner.

```text
owned files → deterministic build → Codex / Claude Front Door
     ↑                                      ↓
human decisions ← inspectable results ← temporary execution
```

## Work this way every day

Normal conversation stays the interface. Describe the work, ask for a plan if
it helps, and say “implement this plan” when it is actionable. Endroit resolves
the Room, Sites, Routes and owners involved; the provider may delegate truly
independent boundaries with its native subagents.

```text
conversation → optional provider capabilities → bounded execution
      ↓                                            ↓
owned places ← verify and integrate ← Site responsibilities
```

`advance-this` is an optional explicit accessor for the same passage from an
actionable result to bounded execution. It does not make retention, acceptance,
delivery, commit, push or publication implicit.

### Resolve the work, not the agent

The experimental alpha.2 candidate turns selected Room-owned work into an
inspectable contract. `WORK.json` keeps objective, sources, claims,
obligations, contradictions, bounded Assignments, verification, observed
result and human review distinct.

```text
event → object → contract → placement → execution-ready → closure-ready
```

Read the [Work Resolution documentation](https://docs.endroit.org/work-resolution/)
or inspect the raw [`endroit/work` schema](/schema/work/v1alpha1.json).
`execution-ready` never means authorized, and neither link implies that the
alpha.2 npm candidate has been published.

<details>
<summary>Inspect the five workplace gesture families</summary>

- **Enter** — recover or recenter the place with `enter-the-home` or a Room
  entrypoint.
- **Equip** — call an Occupant, adopt a temporary Role or activate a reusable
  method as distinct choices.
- **Keep** — use `retain-this`, `accept-this` or `archive-this` when durability
  or authority changes.
- **Reach** — use `work-on-<site>` to revalidate access and name a Site before
  changing it.
- **Maintain** — use `maintain-the-home` for read-only whole-Home inspection;
  a repair remains separately approved.

Commands are optional. A natural request with the same explicit meaning works
too. General acknowledgement never causes a durable transition.

</details>

## What owns what

The provider runs the session. The Home holds the work. A sovereign Site keeps
the external truth.

```text
Provider / Harness
model · tools · sandbox · execution · hot state
                       ↓ temporary Occupant
Human ↔ Endroit Home ↔ Meeting
                       ↓ candidate
Human transition → Room / Desk Material
                       ↓ approved Route
                 sovereign Site
```

Core composes the Workplace. Equipment adds reusable methods without owning
their results. Repositories remain Sites with their own source, history,
permissions and delivery lifecycle.

<details>
<summary>Inspect the default Home floor plan</summary>

```text
my-home/
├── endroit.json
├── HOME.md
├── members/
│   └── owner/
│       └── MEMBER.md
├── rooms/
│   └── home/
│       └── ROOM.md
├── equipment/
├── .desk/
├── endroit.mjs
├── AGENTS.md          generated
├── CLAUDE.md          generated
└── .endroit/          rebuildable
```

When the work reaches external repositories or products, the Home adds Sites,
Desk-owned Routes and local checkouts without taking over their truth.
Meetings remain ephemeral until the human explicitly keeps something.

</details>

<details>
<summary>Inspect the complete workplace grammar</summary>

- **Home** owns the shared constitution, composition and trust boundary.
- **Member** owns durable human belonging; **Desk** carries one Member's local
  continuity and access.
- **Room** owns one durable domain and its Material; **Meeting** contains one
  bounded work event.
- **Occupant** participates temporarily and may adopt a **Role**.
- **Equipment** owns reusable methods and projections, never their results.
- **Site** owns external truth; **Route** declares how one Desk reaches it.
- **Material** is an addressable source or result that may remain.

Each execution produces a candidate. The human may retain it for inspection,
accept it as current truth, archive it out of the active set or approve delivery
through a revalidated Route.

</details>

## Install the foundation

Requires Git and Node.js 22 or newer.

For the currently published release, give Codex or Claude the verified
installation contract:

```text
Read https://endroit.org/install.md and set up Endroit here.
Explain the plan and ask before changing anything.
```

The [ADOPT.md adoption guide](/adopt.md), [Endroit Workplace
Profile](/WORKPLACE.md), [documentation](https://docs.endroit.org/) and
[Work schema](/schema/work/v1alpha1.json) describe the locally qualified
alpha.2 candidate. They are inspectable previews, not `0.8.0-alpha.1` package
contents or current installation promises.

For new work, create a standalone Home directly:

```bash
npx --yes --package @endroit/cli@0.8.0-alpha.1 endroit create my-home
```

`init` remains available when one existing repository should also contain the
Home. Adoption is a guided product journey built from the current CLI
operations, not a separate mutation command.

## Alpha boundaries

- Codex and Claude are L1 Projection-qualified. Hosted invocation and live
  Presence are not qualified by this release.
- The 0.8 workplace grammar is a breaking alpha change from 0.7.
- Public grammar and schemas may change through explicit releases and migration
  notes.
- Submodules are recognized, but Endroit does not manage their lifecycle.
- `maintain-the-home` is read-only. A bounded repair requires an exact finding
  and matching human approval.
- Workplace verbs are provider projections, not a hidden transactional engine.
- The adoption guide, Endroit Workplace Profile and Work Resolution are part
  of the local alpha.2 candidate, not the published `0.8.0-alpha.1` package.
- [Open Workplace](https://open-workplace.org/proposal/) is an open proposal,
  not a standard or required service.
- [HACP](https://github.com/control-decks/human-agent-control-protocol) is an
  independent optional draft protocol.
- Endroit makes no claim about model intelligence, hallucinations, cost,
  performance, scheduling or provider interchangeability.

## Engineer the path from intent to verified effect.

[Preview the documentation](https://docs.endroit.org/) ·
[Inspect the Work schema](/schema/work/v1alpha1.json) ·
[Install published alpha.1](/install/) ·
[Inspect Endroit on GitHub](https://github.com/thevzion/endroit)
