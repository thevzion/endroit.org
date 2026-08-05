---
$schema: "https://endroit.org/schema/release/public-surface/v1alpha1.json"
kind: "endroit/release:public-surface"
id: "home"
owner: "site:endroit.org"
artifact_contract: "endroit/release/public-surface/v1alpha1"
material_state: "retained"
currentness: "exploration"
derived_from: ["site:endroit.org/surfaces/home/DIRECTION.md"]
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
plate: "CONSIGNMENT NOTE"
```

### A harness runs the agent. Endroit runs the work around it.

> Agents execute. You still direct, accept and deliver.

Endroit is a framework for structuring work around coding agents. Every
Meeting gets one written objective, a manifest of exactly which owned sources
are aboard, declared destinations, and a signature block that never leaves
your hands.

- [Install Endroit](/install/)
- [View the source](https://github.com/thevzion/endroit)

## Problem

```endroit
kind: "content"
id: "problem"
sheet: "02"
stock: "original"
plate: "WHY A MANIFEST"
```

### A bigger context window is a bigger truck. It is not a manifest.

Every session re-opens the same four questions: what are we working on, which
decisions still hold, where does the result belong, and what is this agent
allowed to change. A longer window carries more tokens for one trip. It gives
none of them an owner, a place, or a life after the trip ends.

> Capacity is not continuity.

Endroit reduces ambiguity about the situation an agent works in. That is not a
measured claim about model intelligence or accuracy, and it does not remove
the need for your correction.

## Carbon

```endroit
kind: "content"
id: "carbon"
sheet: "03"
stock: "carrier"
plate: "CARRIER'S COPY"
```

### One original. A compiled copy for every provider.

Your context lives once, as Markdown you own and can open in any editor.
Endroit compiles the provider copies from it: `AGENTS.md`, `CLAUDE.md`, Skills
and other projections. You edit the original; the copies are rebuilt output,
never the source and never hand-maintained.

> Edit the original. The copies are output.

- Optional startup hooks make this smoother. The plain-file model requires none.
- Other harnesses can read the `AGENTS.md` convention. Codex and Claude are the projection-qualified providers, which is not an any-agent claim.

## Signature

```endroit
kind: "content"
id: "signature"
sheet: "04"
stock: "original"
plate: "SIGNATURE BLOCK"
```

### Nothing survives a Meeting unless you sign for it.

A Meeting is bounded on purpose. It holds one objective, the resolved context
and the ephemeral work. When it closes, the conversation goes. What you signed
for stays, as a file with an owner, a place and a state, and the next Meeting
resolves it without inheriting a transcript.

> Close the Meeting. Keep the consignment.

## Consignee

```endroit
kind: "content"
id: "consignee"
sheet: "05"
stock: "consignee"
plate: "CONSIGNEE'S COPY"
```

### The destination signs for itself.

A repository you can reach is not a repository you may change. A Route
declares reach to one Site and revalidates it before any mutation. Consent is
a separate act. Delivery exists when the effect is observed in the Site, not
when an agent reports success.

> Reach is not consent.

- Accepted is not delivered.
- A valid Route is not consent.
- A generated file is not a delivered page.

## Stack

```endroit
kind: "content"
id: "stack"
sheet: "06"
stock: "original"
plate: "PARTIES AND LIMITS"
```

### The harness is not the framework. Neither is the repository.

Endroit sits between your judgment and the runtimes that execute. It owns the
file-based representation of the work: places, manifests, projections, Routes
and receipts. It owns nothing else.

> Remove every agent and the Workplace is still Markdown you can read.

Open Workplace is an open proposal, not an established standard. Its current
experimental Protocol is `open-workplace/0.2-draft`. The qualified local
Endroit `0.10.0-alpha.0` candidate declares the versioned `endroit/0.10`
Profile targeting that draft. Publication, deployment and broader conformance
cannot be inferred.

- [Read the proposal](https://open-workplace.org/proposal/)
- [Read the protocol](https://open-workplace.org/protocol/)
- [Inspect the candidate Profile](/profile.md)

## Availability

```endroit
kind: "content"
id: "availability"
sheet: "07"
stock: "board"
plate: "CONDITION OF THIS RELEASE"
```

### Available now. Candidate next. Draft beyond.

Ambition is only useful when its maturity is legible. This register separates
the published alpha, the qualified local candidate, the experimental protocol
and the two projection-qualified providers. A candidate is never presented as
an observed release.

## Community

```endroit
kind: "content"
id: "community"
sheet: "08"
stock: "original"
plate: "CORRESPONDENCE"
```

### Join the new Discord

The Endroit Discord is new and bootstrapping. Join to follow the candidate,
share Workplace experiments and help qualify the release.

- [Join the new Discord](https://discord.gg/HW4Hs9sEp)

## Close

```endroit
kind: "content"
id: "close"
sheet: "09"
stock: "board"
plate: "DISPATCH"
```

### Direct the work. Let the agents execute.

Start with a Workplace. Bring whichever qualified agent you like. Keep the part
that was worth keeping, and let the next Meeting begin from it.

- [Install Endroit](/install/)
- [View the source](https://github.com/thevzion/endroit)
- [Read the roadmap](/roadmap/)

## Provenance

```endroit
kind: "content"
id: "provenance"
sheet: "10"
stock: "board"
plate: "PROVENANCE"
```

This landing exploration derives its visual world from the Site's own
materials rather than from an Interface Lab reference: multi-part consignment
forms, manifests, reason codes, stamps, Routes and receipts. The direction
contract is `surfaces/home/DIRECTION.md`. The exploration has not been
accepted, published or deployed.
