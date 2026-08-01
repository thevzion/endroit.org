# Endroit

> A more intuitive way to work with agents.

## New session. Same workplace.

Your way of working stays. Each agent adapts at the door.

**Places make intent legible. Gestures make it explicit.**

Name the subject. Endroit brings Codex or Claude into the same owned Home, with
its Room, retained Material and Sites still inspectable.

**Alpha · Codex and Claude L1 Projection-qualified**

[Create a Home](#create-a-home) ·
[Inspect the source](https://github.com/thevzion/endroit)

## One Home. Several sessions. More to build on.

Providers arrive and leave. The Home remains the shared, inspectable place.
There is no simulated memory between agents: each one receives orientation,
projections and available capabilities composed from the same owned sources.

### Retain

Claude enters the Endroit Room, reads the current Material and produces a
candidate for the `0.8` launch. The human chooses `retain-this`. The candidate
becomes durable and inspectable without becoming current truth.

```text
Claude enters → Room context → candidate → human retains → Room Material
```

### Reuse

Codex enters in a later Meeting. It does not read Claude's private memory. It
finds the same Room and retained Material in the Home, activates the Research
method and prepares a decision for review.

```text
Codex enters → same Room + Material → use Research → decision candidate
```

### Maintain & deliver

The human accepts the decision or archives the candidate. Home Hygiene reports
an ambiguous destination without changing anything. Once the destination is
clear, an approved Route carries the result to its Site and Endroit observes
the resulting state.

```text
human transition → Hygiene advisory → approved Route → observed Site result
```

Each useful session can leave the Home better prepared for the next. Endroit
compounds retained Material, accepted decisions, stabilized Equipment,
verified Routes and observed Site results. It does not keep every transcript or
output.

## Start with conversation. Add precision when it matters.

```text
Talk naturally
      ↓
Inspect the shared workplace
      ↓
Use explicit gestures when authority matters
      ↓
Use the CLI for deterministic operations
```

Commands are optional. They help you steer, retain, accept and deliver without
surrendering control of the session. A natural sentence with the same explicit
meaning works too. An acknowledgement such as “looks good” never causes a
durable transition by itself.

### Enter

`enter-the-home` and `enter-the-<room>-room` recover or recenter the place.

### Equip

`call-the-researcher` adds a temporary Occupant. `work-as-an-engineer` adopts a
temporary Role. `use-research` activates a method. These are distinct choices.

### Keep

`retain-this` preserves a non-authoritative candidate. `accept-this` records
current truth for its owner. `archive-this` removes Material from the active
set without deleting it.

### Reach

`work-on-<site>` revalidates access through a Route.
`deliver-this-to-<site>` names the destination and external effect explicitly.

### Maintain

`maintain-the-home` inspects the whole Home read-only. A repair requires one
exact finding and matching human approval.

## The place layer for agentic work

Endroit is a lightweight, local-first framework for building and operating
file-based [Open Workplaces](https://open-workplace.org/proposal/). It is also
a local-first, headless implementation of that model.

Core loads, validates, resolves and projects owned sources. First-party
Equipment adds bounded ways of working without becoming the owner of their
results. Natural conversation remains the default interface.

Endroit makes placement inferable, explainable and correctable. It does not
make the model smarter or infer the human's intent.

## The Home stays inspectable

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

## Core and Equipment

Core provides deterministic loading, validation, resolution and provider
projection. A new Home installs seven foundation Equipment packages:

- `endroit/onboarding`: consent-first setup and explanation;
- `endroit/hud`: live orientation over the static Floor Plan;
- `endroit/workplace`: entry and workplace gestures;
- `endroit/artifacts`: retained, accepted and published Material;
- `endroit/rooms`: Room inspection and diagnostics;
- `endroit/sites`: Site and Route operations with destructive guards;
- `endroit/hygiene`: read-only Home maintenance and approved repairs.

Additional Equipment can add research, planning or publishing methods. A Skill
or Command is an activation surface; Equipment owns the reusable method, while
the Room, Desk or Site owns the resulting work.

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
- “Each agent adapts at the door” means Endroit composes provider projections,
  orientation and capabilities from the Home. It does not imply automatic
  learning or model personalization.
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
