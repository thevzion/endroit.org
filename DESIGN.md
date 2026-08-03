---
name: Endroit
description: A bench logic-analyzer for Workplace-first software craft.
colors:
  phosphor: "#6fe6a1"
  amber-trigger: "#e2a43e"
  amber-ink: "#7c5410"
  alarm: "#b23920"
  focus: "#14507a"
  warm-steel: "#d9dbd4"
  deep-steel: "#cbcec5"
  panel-line: "#a7aba0"
  silkscreen: "#22272a"
  soft-ink: "#4c534f"
  screen: "#0e1512"
  screen-line: "#263028"
  card: "#f4f5f0"
typography:
  display:
    fontFamily: "Helvetica Neue, Helvetica, Arial, sans-serif"
    fontSize: "clamp(2.4rem, 5.6vw, 4.8rem)"
    fontWeight: 800
    lineHeight: 0.98
    letterSpacing: "-0.035em"
  body:
    fontFamily: "Helvetica Neue, Helvetica, Arial, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.6
  label:
    fontFamily: "ui-monospace, SF Mono, Menlo, Consolas, Liberation Mono, monospace"
    fontSize: "0.68rem"
    fontWeight: 700
    lineHeight: 1.4
    letterSpacing: "0.12em"
rounded:
  none: "0"
  screen: "6px"
  lamp: "50%"
spacing:
  xs: "0.5rem"
  sm: "0.75rem"
  md: "1rem"
  lg: "1.5rem"
  xl: "2.5rem"
components:
  button-primary:
    backgroundColor: "{colors.silkscreen}"
    textColor: "{colors.phosphor}"
    rounded: "{rounded.none}"
    padding: "0.7rem 1.3rem"
  button-secondary:
    backgroundColor: "transparent"
    textColor: "{colors.silkscreen}"
    rounded: "{rounded.none}"
    padding: "0.7rem 1.3rem"
  screen:
    backgroundColor: "{colors.screen}"
    textColor: "{colors.phosphor}"
    rounded: "{rounded.screen}"
    padding: "1.4rem 1.5rem"
---

# Design System: Endroit

## Overview

**Creative North Star: "The Bench Logic-Analyzer"**

Endroit presents itself as a precise instrument built by people who care how software is made. Warm steel is the work surface; silkscreen typography labels each bounded responsibility; dark graticule screens make system behavior observable rather than merely asserted. Phosphor traces carry active semantic signals, amber marks an explicit human trigger, and red is reserved for exclusions or faults.

The public landing preserves the selected Interface Lab Endroit 024 world. Its reference was frozen at commit `b0c4bf23f7d9ee882619a2d3c39049760feb2104`; the evidence manifest records base commit `f4d7e154407ad26d8a88461aa9f5d38c7a24599e`. Production deltas are limited to removing Lab framing and noindex, resolving production paths and metadata, adding WebSite JSON-LD, replacing experiment-only footer language, carrying the bench grammar to secondary routes, and recording provenance.

**Key Characteristics:**

- One warm work surface with bounded dark readouts, never a generic dark developer template.
- Meaning expressed through traces, latches, signal states, addresses and explicit exclusions.
- Dense technical labels paired with plain-language consequences and strong typographic hierarchy.
- Static-first behavior: the entire argument remains legible without JavaScript.

## Colors

The palette separates the physical bench, the measurement screen and the signal states; accent colors always carry meaning.

### Primary

- **Phosphor Signal:** Active traces, primary-action type and live readouts.
- **Amber Trigger:** Human-triggered transitions and the only warm emphasis.
- **Alarm Red:** Exclusions, faults and explicit negative boundaries.

### Neutral

- **Warm Steel / Deep Steel:** Primary and recessed public surfaces.
- **Silkscreen / Soft Ink:** Headings and explanatory copy.
- **Graticule Screen / Screen Line:** Bounded demonstrations and their instrument frame.
- **Calibration Card:** Small inspectable records and compact panels.

**The Signal Has Meaning Rule.** Never use phosphor, amber or alarm red as arbitrary decoration; each one names an observed state.

## Typography

The current production build uses a compressed, heavy system sans for declarations, a quieter sans for explanation and a system monospace for instrumentation.

### Hierarchy

- **Display:** Heavy uppercase statements with tight leading and negative tracking. One declaration owns each first viewport.
- **Headline:** Compact section claims sized below the display but still decisive.
- **Body:** Plain-language explanation at comfortable line height, generally constrained to about 40–48rem.
- **Label:** Uppercase monospace with wide tracking for plates, states, channels and provenance.

**The Readout Is Not the Message Rule.** Monospace labels identify a signal or contract; they do not replace explanatory prose.

The frozen 024 surface currently relies on the Helvetica/system fallback stack. That implementation fact is recorded for fidelity, but a generic system display face is not a distinctive reusable brand asset and is not canonized as one.

## Layout

The shared shell is `min(1120px, calc(100% - 2.5rem))`. Major modules use generous block rhythm and a single top rule. First viewports pair one title plate with one bounded screen; secondary routes reuse that topology so they feel like views of one instrument rather than microsites.

At 960px the two-column proof layouts collapse to one column. At 640px the navigation wraps, action rows stack, signal tables simplify and dense racks become single-column. The floor is 320px with no horizontal overflow. The document order remains the no-JavaScript order.

**The Bounded Insert Rule.** Dark material appears only as a screen, readout or control—not as the page background.

## Elevation & Depth

The system is flat by default. Depth comes from tonal steel layers, hard panel borders and restrained inset darkness inside screens. The only glow is the soft phosphor halo on active traces; it indicates signal energy rather than ambient decoration. No floating card shadow vocabulary is used.

## Shapes

Buttons, cards and racks are rectangular and technical. Screens use the sole recurring corner radius to read as inset glass rather than generic cards. Circular geometry is reserved for small status lamps. Dashed lines mean unresolved or excluded signal, not ornament.

## Components

### Actions

Primary actions use a silkscreen block with phosphor type; secondary actions stay transparent with a dark outline. Both are uppercase, compact and rectangular. Hover inverts or deepens the bench state; focus uses the explicit blue ring.

### Navigation

The bench bar is a two-pixel top-level boundary. Uppercase links remain quiet until hover; the current secondary route receives a two-pixel amber underline. On small screens, navigation wraps beneath brand and install action without becoming a drawer.

### Screens and traces

Screens are dark, six-pixel-radius bounded inserts with a faint graticule, an inset black depth and phosphor/amber traces. Every visual trace has a caption or nearby plain-language interpretation; decorative trace geometry is hidden from accessibility APIs.

### Calibration tags

CAL records are native disclosure controls. They expose claim, mechanism, proof, maturity, source and action without replacing the primary narrative. The global CAL control and `Alt+I` are progressive enhancements only.

### Signal racks and cards

Secondary-page definitions, schemas and roadmap lanes use full restrained borders, status lamps and clear labels. They inherit the bench material without imitating application dashboards.

## Do's and Don'ts

### Do:

- **Do** make inclusion and exclusion equally inspectable.
- **Do** pair every unfamiliar term with a plain consequence, a mechanism and a maturity/source record.
- **Do** preserve keyboard completion, visible focus, AA contrast, reduced motion and full no-JavaScript reading.
- **Do** treat 320px and the secondary routes as first-class expressions of the same instrument.

### Don't:

- **Don't** turn the Site into an IDE, fake terminal, decorative dashboard or all-dark developer template.
- **Don't** add purple gradients, matrix rain, ornamental glows or meaning-free charts.
- **Don't** hide product claims behind interaction or imply automatic memory, silent retention or measured model gains.
- **Don't** use side-stripe cards, floating shadows or accent colors without a semantic state.
