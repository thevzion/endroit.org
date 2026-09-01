---
$schema: "https://endroit.org/schema/release/public-surface/v1alpha1.json"
kind: "endroit/release:public-surface"
id: "home"
owner: "site:endroit.org"
artifact_contract: "endroit/release/public-surface/v1alpha1"
material_state: "retained"
currentness: "exploration"
derived_from: ["meeting:desk/endroit/update-site-hard-reset-landing", "material:desk/open-workplace/workplace-as-owned-operational-world-model", "material:desk/endroit/domain-language-of-agentic-work"]
---

# Endroit

## Surface contract

```endroit
kind: "surface_contract"
id: "home-contract"
entrypoint: "/"
```

The product landing is a Site-owned Surface. Astro renders it; this document
owns its public composition and copy.

## Site export

```endroit
kind: "site_export"
id: "home-export"
name: "./surfaces/home"
renderer: "src/lib/surface.mjs"
qualification: {"check":["npm","run","test"],"build":["npm","run","build"]}
outputs: ["dist"]
```

The export remains native Astro. Endroit resolves and qualifies it without
owning the layout, components or design tokens.

## Hero

```endroit
kind: "content"
id: "hero"
sheet: "01"
stock: "original"
plate: "WORKPLACE RECORD"
```

### Give agentic work a world you own.

Your work spans people, decisions, methods, repositories and time. Endroit
turns those relationships into an owned, inspectable Workplace that survives
the session.

> Humans and configured agents share one language for where work belongs, who may decide, what can change and what should remain.

- [See the shared language](#carbon)
- [Inspect the source](https://github.com/thevzion/endroit)

## Problem

```endroit
kind: "content"
id: "problem"
sheet: "02"
stock: "original"
plate: "PARTIAL VIEW"
```

### A session starts with a partial view of your work.

The prompt carries an objective. The repository carries code and history.
Provider instructions shape one execution environment. You still reconnect
the objective to the current decisions, methods, owners, authority and
destination.

> A new session should enter the work instead of reconstructing its world.

Endroit gives those relationships durable addresses outside the provider
session. The provider can change while the work keeps its place.

## Carbon

```endroit
kind: "content"
id: "carbon"
sheet: "03"
stock: "carrier"
plate: "SHARED LANGUAGE"
```

### One owned world, projected for each participant.

Open Workplace names durable responsibilities such as Room, Meeting,
Equipment, Material, Site and Route. Endroit compiles their owned meaning into
human Views and provider Front Doors.

> The view changes. Ownership, authority, lifecycle and destination keep the same meaning.

- Humans read ordinary Markdown.
- Configured agents receive revision-bound `FRONTDOOR.md`, `AGENTS.md` or `CLAUDE.md` Views.
- A Skill, command or API can address the same semantic operation in its native form.

## Signature

```endroit
kind: "content"
id: "signature"
sheet: "04"
stock: "original"
plate: "WHAT REMAINS"
```

### Conversation ends. Selected work remains.

A Meeting holds one bounded collaboration event. Its conversation remains
ephemeral until you choose a result that should continue as owned Material.

> You choose what the Workplace carries forward.

## Consignee

```endroit
kind: "content"
id: "consignee"
sheet: "05"
stock: "consignee"
plate: "SOVEREIGN SITE"
```

### Repositories keep their own truth.

A Site owns its source, history, permissions and delivery. A Route records how
a Desk reaches it. Endroit keeps workplace context and Site truth in separate
ownership boundaries.

> Access creates reach. The human still controls authority and delivery.

- Retained Material is not accepted judgment.
- A Route does not grant delivery consent.
- An agent report does not prove an external effect.

## Stack

```endroit
kind: "content"
id: "stack"
sheet: "06"
stock: "original"
plate: "MODEL AND IMPLEMENTATION"
```

### Open Workplace defines the model. Endroit implements it.

Workplace-first puts the durable place around agentic work at the center of
design. Open Workplace publishes the shared implementation-neutral model.
Endroit provides a local-first file-based compiler, source formats, commands
and checks.

> Endroit compiles the place around agent reasoning. It does not replace the reasoning.

The current source targets configured provider surfaces. It makes no universal
provider, autonomous delivery, automatic memory or model-intelligence claim.

- [Read the Workplace-first Proposal](https://open-workplace.org/proposal/)
- [Inspect Open Workplace](https://open-workplace.org/)
- [Inspect Endroit](https://github.com/thevzion/endroit)

## Availability

```endroit
kind: "content"
id: "availability"
sheet: "07"
stock: "board"
plate: "CURRENT CONDITION"
```

### Source-only, current and bounded.

`v0.1.0-rc.1` is a source-only pre-release. The package is private. The static
compiler, examples and checks run from the repository. Fresh-agent convergence
remains qualification work.

## Community

```endroit
kind: "content"
id: "community"
sheet: "08"
stock: "original"
plate: "RUN FROM SOURCE"
```

### Create a small Workplace and inspect every proposed file.

Use Bun `1.3.14`. The wizard previews its files, provider surfaces, Git guards
and commits before it asks for consent.

```sh
bun install --frozen-lockfile
bun run typecheck
bun run test
bun src/cli.ts new ./endroit-fresh
```

- [Read the current commands](https://github.com/thevzion/endroit/blob/develop/INSTALL.md)
- [Follow the roadmap](https://github.com/thevzion/endroit/blob/develop/ROADMAP.md)

## Close

```endroit
kind: "content"
id: "close"
sheet: "09"
stock: "board"
plate: "NEXT ENTRY"
```

### Give the next session a place to enter.

Start with the source. The current wizard creates a small Workplace and no
Room, Work, Site, remote, hosting or delivery by default.

- [Inspect the source](https://github.com/thevzion/endroit)
- [Run from source](https://github.com/thevzion/endroit/blob/develop/README.md#quick-start)
- [Read the roadmap](https://github.com/thevzion/endroit/blob/develop/ROADMAP.md)

## Provenance

```endroit
kind: "content"
id: "provenance"
sheet: "10"
stock: "board"
plate: "PROVENANCE"
```

This candidate derives from the Endroit public-proof Initiative, the retained
Workplace-as-world-model Material and the shared language of agentic work. Its
current claims were checked against Endroit source revision `7388d63` on
2026-09-02: typecheck and 114 tests passed. The copy and implementation remain
candidates. They have not been accepted, published or deployed.
