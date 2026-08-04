---
$schema: "https://endroit.org/schema/release/public-surface/v1alpha1.json"
kind: "endroit/release:public-surface"
id: "home"
owner: "site:endroit.org"
artifact_contract: "endroit/release/public-surface/v1alpha1"
material_state: "retained"
currentness: "current"
derived_from: ["interface-lab:endroit-024"]
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
```

### Move the system. Keep the decisions human.

> Agents execute. The Workplace carries continuity.

Endroit gives each Meeting the context, methods and Sites it needs—so work
compounds without handing direction to the agent.

- [Run the proof](#capital)
- [Install Endroit](/install/)
- [View the source](https://github.com/thevzion/endroit)

## Problem

```endroit
kind: "content"
id: "problem"
```

### A longer context window is not continuity.

Each session starts warm-up again: what we work on, which decisions are
current, where results belong, what the agent may change. A bigger window
holds more tokens for one session. It gives none of it a place, an owner, or a
life beyond the session.

> Context windows hold tokens. Workplaces hold meaning.

## Resolver

```endroit
kind: "content"
id: "resolver"
```

### Context that knows its place.

Your agent does not need all your context. It needs the right context, with
its meaning intact. Endroit keeps working context semantically typed, so
composition preserves boundaries instead of flattening them.

> Don’t dump context. Resolve it.

## Capital

```endroit
kind: "content"
id: "capital"
```

### End the Meeting. Watch what remains.

One capture, four phases. The names are illustrative; the transitions are the
product. Nothing durable happens without your verb.

## Relations

```endroit
kind: "content"
id: "relations"
```

### Capital needs more than storage.

Retention, acceptance, delivery and archive stay explicit. Nothing is
captured silently, and no background agent learns your organization.

## Craft

```endroit
kind: "content"
id: "craft"
```

### Software craftsmanship, one level up.

You already care about source, boundaries, ownership and lifecycle in code.
Endroit brings the same craft to the system around the code: the context an
agent enters, the places results land, the authority every change crosses.
The exoskeleton isn’t the agent. It’s the workplace around it.

> Craft the system that crafts the software.

## Stack

```endroit
kind: "content"
id: "stack"
```

### Open Workplace supplies the grammar. Endroit gives it a place.

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
```

### Available now. Candidate next. Research beyond.

The public page separates the published alpha, the qualified local candidate
and the research frontier. A candidate is never presented as an observed
release.

## Community

```endroit
kind: "content"
id: "community"
```

### Join the new Discord

The Endroit Discord is new and bootstrapping. Join to follow the candidate,
share Workplace experiments and help qualify the release.

- [Join the new Discord](https://discord.gg/HW4Hs9sEp)

## Provenance

```endroit
kind: "content"
id: "provenance"
```

The visual language derives historically from Interface Lab reference 024.
The Site-owned source, renderer and design receipt now carry the production
contract; Interface Lab is not read by build or release qualification.
