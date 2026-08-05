---
name: Endroit
description: A bound book of multi-part consignment forms for Workplace-first software craft.
colors:
  board: "#1b2027"
  board-2: "#232b34"
  board-rule: "#37424e"
  board-ink: "#e9ece6"
  board-soft: "#9aa7b2"
  stock-original: "#eef0e9"
  stock-carrier: "#ecd66b"
  stock-consignee: "#a2bfd6"
  ink: "#14181c"
  ink-soft: "#575f66"
  ink-soft-carrier: "#5d5222"
  ink-soft-consignee: "#2c4857"
  rule: "#b6bcb8"
  rule-carrier: "#b09f3c"
  rule-consignee: "#6c8aa2"
  stamp: "#a4301c"
  seal: "#1a573a"
  paper: "#fbfaf7"
  focus: "#14507a"
typography:
  declared:
    fontFamily: "Helvetica Neue, Helvetica, Arial, sans-serif"
    fontSize: "clamp(2.05rem, 5vw, 4rem)"
    fontWeight: 800
    lineHeight: 0.99
    letterSpacing: "-0.032em"
  declared-sheet:
    fontFamily: "Helvetica Neue, Helvetica, Arial, sans-serif"
    fontSize: "clamp(1.6rem, 3.1vw, 2.5rem)"
    fontWeight: 800
    lineHeight: 0.99
    letterSpacing: "-0.032em"
  punch:
    fontFamily: "Helvetica Neue, Helvetica, Arial, sans-serif"
    fontSize: "clamp(1.05rem, 1.5vw, 1.3rem)"
    fontWeight: 800
    lineHeight: 1.25
    letterSpacing: "-0.022em"
  lede:
    fontFamily: "Helvetica Neue, Helvetica, Arial, sans-serif"
    fontSize: "clamp(1rem, 1.15vw, 1.1rem)"
    fontWeight: 400
    lineHeight: 1.6
  brand:
    fontFamily: "Helvetica Neue, Helvetica, Arial, sans-serif"
    fontSize: "1.0625rem"
    fontWeight: 800
    lineHeight: 1
    letterSpacing: "-0.03em"
  body:
    fontFamily: "Helvetica Neue, Helvetica, Arial, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.6
  note:
    fontFamily: "Helvetica Neue, Helvetica, Arial, sans-serif"
    fontSize: "0.875rem"
    fontWeight: 400
    lineHeight: 1.5
  meta:
    fontFamily: "Helvetica Neue, Helvetica, Arial, sans-serif"
    fontSize: "0.8125rem"
    fontWeight: 400
    lineHeight: 1.45
  key:
    fontFamily: "ui-monospace, SF Mono, Menlo, Consolas, Liberation Mono, monospace"
    fontSize: "0.75rem"
    fontWeight: 400
    lineHeight: 1.6
    letterSpacing: "0.02em"
  caps:
    fontFamily: "Helvetica Neue, Helvetica, Arial, sans-serif"
    fontSize: "0.6875rem"
    fontWeight: 700
    lineHeight: 1
    letterSpacing: "0.14em"
  preprinted:
    fontFamily: "Helvetica Neue, Helvetica, Arial, sans-serif"
    fontSize: "0.625rem"
    fontWeight: 700
    lineHeight: 1.35
    letterSpacing: "0.16em"
  filled:
    fontFamily: "ui-monospace, SF Mono, Menlo, Consolas, Liberation Mono, monospace"
    fontSize: "0.875rem"
    fontWeight: 600
    lineHeight: 1.5
rounded:
  none: "0"
spacing:
  xs: "0.35rem"
  sm: "0.55rem"
  md: "0.85rem"
  lg: "1.4rem"
  xl: "2.2rem"
components:
  action:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    rounded: "{rounded.none}"
    padding: "0.72rem 1.15rem"
  action-primary:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.stock-carrier}"
    rounded: "{rounded.none}"
    padding: "0.72rem 1.15rem"
  sheet:
    backgroundColor: "{colors.stock-original}"
    textColor: "{colors.ink}"
    rounded: "{rounded.none}"
    padding: "clamp(1.4rem, 3.2vw, 2.9rem)"
  stamp:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    rounded: "{rounded.none}"
    padding: "0.28rem 0.55rem 0.24rem"
---

# Design System: Endroit

## Overview

**Creative North Star: "The Consignment Set"**

Endroit presents itself as a bound book of numbered multi-part forms. A
pressboard binding holds sheets of form stock; each sheet is one bounded
responsibility, printed, filled in and stamped. The system exists because a
multi-part form is the only everyday artefact that already separates the four
things this product keeps separate: the shipper who directs and signs, the
carrier who executes, the consignee who owns the destination, and the manifest
that records exactly what travelled and what did not.

This world is local to the landing (`src/pages/index.astro` and
`src/styles/consignment.css`). The secondary public routes still run the
previous bench system from `src/styles/global.css`; reconciling them is an open
human decision, not a silent propagation.

**Key characteristics:**

- Stock colour is semantic: it names the party whose authority a section is about.
- Type is semantic: pre-printed, filled-in and stamped are three distinct registers.
- Every mechanism appears as a record (a manifest line, a ledger state, a stamp), not as an illustration of one.
- No webfont, no client framework and no third-party request; the whole argument reads with JavaScript off.

## Colors

The palette has one binding, three stocks and two inks that carry state.

### The binding

- **Board (`#1b2027`)**: the pressboard that holds the set. It is the page
  ground, the sticky bar, the footer and the two audit sheets. It is not a dark
  mode; it is the cover.
- **Board rule, board ink, board soft**: hairlines and type on the binding.

### The stocks

- **Original (`#eef0e9`)**: bond. The shipper’s copy, meaning you. Direction, manifest,
  signature, parties.
- **Carrier (`#ecd66b`)**: canary. The copy belonging to the runtime that runs
  the agent. Used for the projection sheet and for the single row of the parties
  register that marks Endroit's own layer.
- **Consignee (`#a2bfd6`)**: blue. The destination Site's copy. Routes, consent
  and delivery.

**The Stock Names the Party Rule.** Never choose a stock for rhythm. If a
section is not about the carrier or the consignee, it prints on bond.

### The state inks

- **Stamp oxide (`#a4301c`)**: exclusion, refusal and human consent. Nothing else.
- **Seal green (`#1a573a`)**: an effect that was observed: received, available.
- **Ink hard (`#14181c`)**: a token that is never re-declared, so a stamp stays
  dark on a board sheet where `--ink` flips to the light value.

Paper (`#fbfaf7`) is the inner field of every stamp and inset record panel, so a
stamp reads as an impression struck onto the sheet.

### Per-stock inks

Each stock re-declares `--ink-soft` and `--rule` so secondary type and hairlines
stay at AA on that ground: `#5d5222` and `#b09f3c` on canary, `#2c4857` and
`#6c8aa2` on blue, and the board values on the binding. `--ink` itself only flips
on a board sheet.

## Typography

One system grotesque and one system monospace, split by meaning rather than by
level. This split is the identity: on a real form the pre-printed matter, the
typed entries and the rubber stamp are three different objects.

- **Declared**: heavy grotesque, sentence case, tight negative tracking, sitting
  on or above a hard rule. One declaration owns each sheet.
- **Pre-printed**: 0.625rem grotesque caps at `0.16em` in soft ink. Everything
  the form itself says: field labels, sheet heads, column heads, plate names.
- **Filled in**: monospace, mixed case, full ink. Everything about the visitor's
  actual work: objectives, addresses, paths, versions, code excerpts.
- **Stamped**: pre-printed caps inside a two-pixel box on a paper field, rotated
  `-1.1deg`, in a state ink.

**The Verbatim Identifier Rule.** A version, path or protocol id inside
pre-printed matter resets `text-transform` and `letter-spacing`. Casing must
never rewrite `0.10.0-alpha.0` or `open-workplace/0.2-draft`.

Body copy is the plain sans at 1.6 line height, with ledes near 46ch and record
prose near 62ch.

**The ramp.** Static sizes move in 1/16rem steps and there are only seven:
`0.625` (pre-printed), `0.6875` (action and link caps), `0.75` (mono keys, codes
and clause refs), `0.8125` (record meta), `0.875` (record prose and mono fills),
`1` (body and record headings), `1.0625` (wordmark). Everything above body scale
is a `clamp()` role: lede, punch, sheet declaration, page declaration.

**The Left Marker Rule.** A three- or four-pixel inset left edge is a state
marker only: done versus pending in the signature block, and the one row of the
parties register that is Endroit itself. It is never a decorative card stripe,
and a record never carries one just to look sorted.

## Layout

The shell is `min(1200px, calc(100% - 2.5rem))`. The page is a stack of sheets
separated by a narrow band of binding. Above 720px each sheet carries a hard
nine-pixel offset in the *next* stock colour with a one-pixel ink outline, so
the copy beneath shows at the edge; below 720px the offset is dropped.

Every sheet opens with the same pre-printed head: sheet number, plate name,
which copy it is, and the form code flush right, over a two-pixel rule.

The first viewport is a two-column split above 1000px: declaration, lede,
punch, actions and maturity plate at left; the filled consignment note and its
manifest at right. Content sheets use a `1.15fr / 1fr` split above 900px and a
single column below. Dense registers reflow to label-over-value blocks instead
of scrolling horizontally. The floor is 320px with no horizontal overflow, and
document order is the no-JavaScript order.

**The Bounded Board Rule.** The binding may be the page ground, the bar, the
footer and the audit sheets. Long-form reading always happens on stock.

## Elevation & Depth

Flat. Depth comes from three sources only: the tonal step between binding and
stock, hard one- and two-pixel ink borders, and the offset stock sliver standing
for the copy underneath. No blurred shadows, no glows.

## Shapes

Rectangular throughout; the only radius in the system is zero. Records are boxed
with two-pixel ink borders and separated internally by hairlines. Dashed borders
mean *not yet, or not this*: a disabled act, an unrun gate, a refused category. A
label struck through in oxide means deliberately excluded.

## Components

### Actions

Uppercase, rectangular, two-pixel border. Primary is an ink block with canary
type; secondary is transparent with an ink outline. Hover inverts to ink, and
primary hover goes to oxide. On a board sheet both invert to board ink and the
primary uses canary with hard ink.

### The bindery bar

A sticky board bar: wordmark with a canary square, a sheet index in pre-printed
caps, the form code, and the install action. Below 800px the wordmark and the
install action hold the first row, the index wraps beneath, and the form code
drops rather than turning a sticky bar into three rows.

### Records

`note`, `carbon`, `steps`, `ledger`, `receipt-part`, `parties`, `condition` and
`clause` are one object at different scales: a two-pixel ink frame, an optional
inverted identity bar, hairline-separated rows, a pre-printed label column and a
filled-in value column.

### The manifest

Two stacked blocks inside the note: `ABOARD` with a per-line reason, and `NOT
ABOARD` on a tint field with a reason code, an oxide strike-through and an oxide
count stamp. `.line-out` holds `opacity: 1` explicitly: an exclusion is a
record, never a de-emphasised one.

### The carbon set

Tabs styled as the tabbed edge of a form set, on the inverted ink bar. Without
JavaScript every copy prints in document order with its own head; with
JavaScript the tabs become a real `tablist` with arrow, Home and End keys.

### The signature block

Four rows, each with a control column and a text column. Only the next act is
enabled; the rest are dashed and disabled. Each act strikes a stamp and adds a
state line to the ledger beside it. Enhanced rows carry a three-pixel inset left
marker: ink for done, rule for pending. Without JavaScript all four states print
in sequence with a note saying so.

### The gate

`[data-gated]:not([data-revealed])` dashes a frame and shows a short
instruction. It never changes opacity and never hides content: a product claim
must be readable before, during and after any interaction.

## Motion

The form has exactly two native motions, and the page has no others.

- **Strike**: 150ms; a stamp lands from `rotate(-4deg) scale(1.16)` to rest.
- **Impression**: 240ms; the matching ledger line rises three pixels into place.
- **Slide**: 150ms, eight pixels, when a carbon copy comes to the top of the set. Transform only, never opacity, so text is never rendered faint.

`prefers-reduced-motion: reduce` removes all three and disables smooth scrolling.

## Do's and Don'ts

### Do:

- **Do** print exclusion as legibly as inclusion, with its reason.
- **Do** keep a claim, its mechanism, its proof and its maturity in one record, since Schedule A is the page auditing itself.
- **Do** preserve keyboard completion, visible focus, AA contrast, reduced motion and the full no-JavaScript reading.
- **Do** treat 320px as a first-class printing of the same form set.

### Don't:

- **Don't** use a stock, an oxide mark or a green seal without the meaning it names.
- **Don't** add a fake terminal, an IDE frame, a node graph, a decorative dashboard, a purple gradient or an all-dark developer template.
- **Don't** let pre-printed casing rewrite a version string, path or protocol id.
- **Don't** hide a product claim behind an interaction, or imply automatic memory, silent retention, an any-agent guarantee or a measured productivity gain.
- **Don't** propagate this world to the secondary routes until a human decides to.
