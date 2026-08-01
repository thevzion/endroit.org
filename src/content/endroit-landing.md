# Endroit

## Give agentic work a place to compound.

Keep context, decisions, methods and repository access in an owned local Home.
Start a fresh Codex or Claude session, enter the relevant Room and continue
without rebuilding the setup. Your repositories keep their own Git truth.

Endroit is a local-first, headless, file-based implementation of the
[Open Workplace](https://open-workplace.org/proposal/) model. It adds ownership,
orientation, continuity and destination around the agents and repositories you
already use.

**Owned sources. Human-readable files. Projection-qualified for Codex and
Claude.**

[Create a Home](#create-a-home) ·
[Inspect the source](https://github.com/thevzion/endroit)

## You already have the pieces

Your setup may include `AGENTS.md` or `CLAUDE.md`, preferences, memory, plans,
repository maps, Skills and output folders. Ambiguity appears when a new
session cannot tell which source owns a rule, whether you accepted an output or
which repository remains authoritative.

Endroit separates those responsibilities instead of putting more context into
one provider file. A Home owns the durable workplace. Rooms own subjects and
their Material. Equipment owns reusable methods. Sites keep external truth,
and Routes declare how a Desk reaches them.

## Owned files, projected interfaces

Endroit keeps owned Markdown and JSON as the canonical source, resolves the
Home deterministically and builds Codex and Claude front doors, Skills and
Commands from it. Conversation remains the interface; the files remain
inspectable.

```text
owned sources
      ↓
deterministic resolution
      ↓
Codex and Claude projections
      ↓
human and agent meet in a Room
      ↓
retained, accepted or delivered Material
      ↓
observed Site result
```

Human decisions make results durable. `retain` preserves a candidate without
declaring it true. `accept` makes it current for its owner. `deliver` records
an authorized effect only after Endroit observes the Site again.

The static Home remains useful without a persistent agent, daemon or SaaS.
Endroit does not make the agent smarter. It makes the situation clearer.

## Repositories keep their sovereignty

A product repository, documentation site or external service remains a Site
with its own source, history, permissions and delivery lifecycle. A Route
records how one Desk reaches it. Physical containment does not erase ownership.

Endroit 0.8 supports embedded repositories, managed clones, managed worktrees,
existing checkouts and user-managed submodules. A remote-only Site has no
Route, and non-Git access remains future work.

The Home can coordinate work across repositories without absorbing their Git
history or pretending to own their permissions.

## Tested in a real Home

Endroit 0.8 is an alpha, maintained and used in the Home where it was
developed. That Home carries real work across Codex, Claude and independent
repositories.

[Read the lived account](https://thevzion.com/writing/home-i-actually-use/) or
[inspect the source and tests](https://github.com/thevzion/endroit).

Core resolves ownership, validates the workplace, builds deterministic
projections and manages Git Routes with explicit guards for destructive
operations. First-party Equipment provides onboarding, orientation, Artifacts,
Rooms, Sites and Home Hygiene. Optional Equipment adds bounded methods without
becoming the owner of their results.

A new Home starts with one human Member, one Desk and one Room. Additional
Rooms, Sites and Equipment appear when the work needs them.

## Alpha boundaries

- Codex and Claude are projection-qualified at L1. Hosted invocation and live
  Presence are not qualified by this release.
- The 0.8 workplace grammar is a breaking alpha change from 0.7.
- Public grammar and schemas may change through explicit releases and migration
  notes.
- Submodules are recognized, but Endroit does not manage their lifecycle.
- `maintain-the-home` is read-only. One bounded repair can run only for an exact
  finding after matching explicit approval; other repairs remain manual.
- Open Workplace is a proposal, not a standard or required service.
- [HACP](https://github.com/control-decks/human-agent-control-protocol) is an
  independent, optional draft protocol. Neither project requires the other.
- Endroit is designed to reduce ambiguity. It makes no claim about model
  quality, hallucinations, cost or performance.

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

```bash
npx --yes @endroit/cli@0.8.0-alpha.0 create my-home
```

Open the Home with your installed Codex or Claude CLI.

To add a Home to an existing repository:

```bash
cd my-existing-repository
npx --yes @endroit/cli@0.8.0-alpha.0 init
```

`create` adds a tracked Desk by default. `init` creates a separate local Desk
by default. Use `--desk tracked|separate|later` to choose another Git boundary.

### Continue onboarding

Open the resulting Home with Codex or Claude and continue in normal
conversation. Inspect the Home first; use explicit workplace gestures only
when you need more control.

[Create a Home with Endroit](https://github.com/thevzion/endroit#start-a-home)
or [inspect the source on GitHub](https://github.com/thevzion/endroit).
