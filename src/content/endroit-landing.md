# Endroit

> The place layer for agentic work.

## New session. Same workplace.

Name the subject. Endroit brings Codex or Claude into the same owned Home—with
its Room, retained Material and Sites still inspectable.

Endroit is a lightweight, local-first framework for building and operating
file-based [Open Workplaces](https://open-workplace.org/proposal/).

**Alpha · Codex and Claude L1 Projection-qualified**

[Create a Home](#create-a-home) ·
[Inspect the source](https://github.com/thevzion/endroit)

## Recover the work, not the transcript

**Sanitized dogfood snapshot — The VZion Studio Home**

```text
Continue the Endroit 0.8 launch
→ enter the existing Home
→ recover the Endroit Room and retained Material
→ inspect Endroit, endroit.org and The VZion Sites
→ continue through Codex or Claude
→ deliver through an approved Route
```

### Recover

The Home exposes its Floor Plan. `.desk/rooms/endroit/ROOM.md` identifies the
durable subject; retained Material carries the useful continuity; Site and
Route declarations show where external truth lives. No transcript is required.

### Inspect

`HOME.md`, `MEMBER.md`, `DESK.md`, `ROOM.md`, Equipment and `SITE.md` remain
human-readable sources. Endroit resolves them deterministically into generated
`AGENTS.md`, `CLAUDE.md`, Skills and Commands for Codex and Claude.

### Decide & deliver

Each execution produces a candidate. The human can retain it for later,
accept it as current workplace truth, deliver it through a revalidated Route,
or archive it without deleting history. No output becomes durable
automatically.

## The framework behind the Home

Endroit is also a local-first, headless, file-based implementation of the Open
Workplace model. `framework` describes the product form; `implementation`
describes its relationship to the model.

Core loads, validates, resolves and projects owned sources. First-party
Equipment adds bounded ways of working without becoming the owner of their
results. Natural conversation remains the default interface.

Endroit does not make the agent smarter. It makes the situation clearer.

## What `create` gives you

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

When the work needs external products or repositories, the Home can add:

```text
sites/
checkouts/
.desk/routes/
```

Meetings remain ephemeral by default. No required `material/` directory or
persisted Meeting appears until the human explicitly retains work.

## Core and Equipment

Core provides deterministic loading, validation, resolution and provider
projection. A new Home installs seven foundation Equipment packages for the
first complete experience:

- `endroit/onboarding` — consent-first setup and explanation;
- `endroit/hud` — live orientation over the static Floor Plan;
- `endroit/workplace` — entry and workplace gestures;
- `endroit/artifacts` — retained, accepted and published Material;
- `endroit/rooms` — Room inspection and diagnostics;
- `endroit/sites` — Site and Route operations with destructive guards;
- `endroit/hygiene` — read-only Home maintenance and approved repairs.

Additional Equipment can add research, planning or publishing methods. A Skill
or Command is an activation surface; the Equipment remains the reusable method,
and the Room, Desk or Site owns the resulting work.

## Providers execute. The Home remembers.

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

**Responsibilities, not a required stack.**

A harness runs the agent. A Workplace holds the work. Provider history, cache
and projections may help a session; they do not become the only canonical
source of the work.

Endroit does not recruit, schedule or maintain resident agents. Codex and
Claude are L1 Projection-qualified surfaces, not universally interchangeable
runtimes.

## Repositories keep their sovereignty

A product repository, documentation site or external service remains a Site
with its own source, history, permissions and delivery lifecycle. A Route
records how one Desk reaches it. Physical containment does not erase ownership.

Endroit 0.8 supports embedded repositories, managed clones, managed worktrees,
existing checkouts and user-managed submodules. A remote-only Site has no local
checkout, and non-Git access remains future work.

`endroit/sites` owns these protected operations. `deliver` requires a
revalidated Route, human consent and observation of the resulting Site state.

## You already have the pieces

Your setup may include `AGENTS.md` or `CLAUDE.md`, preferences, memory, plans,
repository maps, Skills and output folders. Ambiguity appears when a new
session cannot tell which source owns a rule, whether you accepted an output or
which repository remains authoritative.

Endroit keeps those technical surfaces useful while separating the owners
behind them. The pieces were already there. They just needed a place.

## Create a Home

Requires Git and Node.js 22 or newer.

### Install with your agent

Give this instruction to Codex or Claude:

```text
Read https://endroit.org/install.md and set up Endroit here.
Explain the plan and ask before changing anything.
```

The agent guides. The CLI applies. You approve. The bootstrap does not move
existing instructions, Skills, memory or project files.

### Use the terminal

Create a standalone Home:

```bash
npx --yes --package @endroit/cli@0.8.0-alpha.0 endroit create my-home
```

Add a Home to an existing repository:

```bash
npx --yes --package @endroit/cli@0.8.0-alpha.0 endroit init .
```

By default, `create` adds a tracked Desk and `init` creates a separate local
Desk. Use `--desk tracked|separate|later` to choose another Git boundary.

### Continue onboarding

Open the resulting Home with Codex or Claude and continue in normal
conversation. Inspect the Home first; use explicit workplace gestures only
when you need more control.

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
- Open Workplace is an open proposal, not a standard or required service.
- [HACP](https://github.com/control-decks/human-agent-control-protocol) is an
  independent optional draft protocol.
- Endroit makes no claim about model intelligence, hallucinations, cost,
  performance, scheduling or universal provider compatibility.

[Read the lived account](https://thevzion.com/writing/home-i-actually-use/) or
[inspect Endroit on GitHub](https://github.com/thevzion/endroit).
