# Build the place where humans and agents work.

> THE WORKPLACE-FIRST APPLICATION FRAMEWORK

Endroit composes context, decisions, capabilities, and destinations into a
Workplace that remains owned, inspectable, and versioned.

**Resolved for agents. Readable by humans. Versioned with Git.**

[See it in practice](#one-workplace-two-readings) ·
[Read the docs](https://docs.endroit.org/)

**0.8.0-alpha.2 candidate · local qualification only**

## Start from the workplace, not the agent.

Everyone is building better agents. Endroit starts from the durable layer that
survives them.

```text
Workplace-first   the paradigm
Open Workplace    the model and experimental protocol
Endroit           the application framework
Workplace         the durable result
Agents/providers  temporary execution
Sites             sovereign source and observed effects
```

The human keeps direction and authority. Agents enter as temporary Occupants.
Repositories, decisions, methods and results keep their owners and histories.

## A Workplace is built from owned parts.

An Endroit Home does not pull every useful thing into one repository. It makes
responsibilities and relationships explicit while each Site remains sovereign.

| Framework asset | What it owns |
| --- | --- |
| Home | Shared constitution, composition and trust boundary |
| Room | One durable domain and its current Material |
| Meeting | One bounded work event, ephemeral by default |
| Decision | Accepted Room truth with explicit history |
| Equipment | One reusable method and its provider projections |
| Site | External source, history, permissions and delivery truth |
| Route | One Desk's declared, revalidated access to a Site |
| Work Item | An experimental proof-carrying contract for selected work |

Physical proximity never transfers ownership. A checkout inside a Home remains
Site-owned. A generated provider file remains a projection.

## Plan the place. Observe the passage.

The same Working Object has a spatial position and a temporal trace.

```text
PLAN                                   SECTION

Home                                   intent
└── Room                               → resolution
    └── Meeting                        → bounded execution
        └── Working Object             → evidence
            ├── sources                → human judgment
            ├── obligations
            ├── assignments
            └── review
```

The plan answers where the work belongs. The section answers what happened to
it. An agent can load the smallest relevant place without reconstructing the
entire organization from chat history.

## One Workplace. Two readings.

Humans need a coherent story. Agents need explicit owners, maturity, sources
and next destinations. Endroit does not make those competing representations.

**Story** presents the work in the order a person can understand and judge it.

**Inspect** exposes the same fragment's responsibility, owner, maturity,
sources, claims, obligations and destination.

The source stays owned once. Provider front doors, documentation, landing
sections and review views remain projections with provenance.

## Know what is true. See what is missing. Prove what moves.

The experimental `endroit/work` Equipment gives selected Room-owned work a
machine-readable `WORK.json` contract:

```text
event → object → contract → placement → execution-ready → closure-ready
```

It records objective, sources, claims, obligations, contradictions, bounded
Assignments, verification, observed result and human review. The diagnostic is
deterministic and reports exact missing contracts. It does not produce a trust
score or decide that an external effect is authorized.

[Read Work Resolution](https://docs.endroit.org/work-resolution/) ·
[Inspect the candidate schema](/schema/work/v1alpha1.json)

## The boundaries are part of the product.

```text
Human
  owns direction · authority · judgment
        │
        ▼
Endroit Workplace
  owns continuity · placement · relationships · projections
        │
        ├── Provider
        │     owns model · tools · sandbox · temporary execution
        │
        └── Route
              revalidates access without granting delivery consent
                    │
                    ▼
                 Site
                   owns source · history · permissions · observed effect
```

Endroit is not an agent runtime, permission system, scheduler, universal
memory, persistent graph or background daemon. Open Workplace `0.1` does not
require Work Resolution. HACP remains an independent, optional protocol for
explicitly invoked controls.

## Your agents are temporary. Your work shouldn’t be.

Decisions, reusable methods, verified relationships, documentation and
observed results can remain available after a provider or session disappears.
That accumulated, reusable work is **agentic capital**. The term describes a
product consequence; it does not assign financial value or promise a universal
productivity gain.

## Available now

The published `0.8.0-alpha.1` line can create and operate file-based Homes,
Rooms, Equipment, Sites, Routes and deterministic provider projections.

The local `0.8.0-alpha.2` candidate adds the Endroit Workplace Profile,
Work Resolution, provider review and projected documentation. It remains a
candidate until its repository, tag, package and public documentation are
separately authorized, published and observed.

## Research frontier

Recognition of existing environments, adaptive presence, broader provider
qualification, fragment reuse across multiple public surfaces and Work Trust
Graph projections remain research. They are not presented as available alpha
behavior.

No generic page compiler, public fragment schema, agent registry, scheduler or
graph database is part of alpha.2.

## Choose the smallest useful start.

### Adopt an existing environment

Use the candidate adoption guide to inspect only approved roots, compare
plausible Workplace boundaries and propose a map before applying anything.
Recognition and application require distinct human consent.

[Read ADOPT.md](https://endroit.org/adopt.md)

### Start a new Home

Follow the currently verified installation path, create the smallest useful
Home and add Rooms, Equipment, Sites and Routes only when the work needs them.

[Read the docs](https://docs.endroit.org/) ·
[Install the published release](/install/) ·
[Inspect WORKPLACE.md](/WORKPLACE.md)

