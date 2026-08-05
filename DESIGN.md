---
name: Endroit.org
description: The Connected Home Atlas for a static, owned agentic workplace.
colors:
  atlas-blue: "#0b2b4d"
  atlas-blue-soft: "#173f63"
  atlas-copper: "#a9512f"
  atlas-copper-bright: "#d17543"
  atlas-ivory: "#f6f0e5"
  paper: "#f4efe5"
  paper-strong: "#fffaf0"
  paper-clear: "#fbf7ef"
  foundation-sand: "#f0e6d7"
  ownership-sand: "#e6d8c5"
  continuity-blue: "#dfe8e7"
  ink: "#171916"
  night: "#080c0d"
  muted: "#66645e"
  signal: "#76dce0"
  line: "#d8cdb9"
typography:
  display:
    fontFamily: '"Libre Caslon Display", Georgia, serif'
    fontSize: "clamp(4.3rem, 7.4vw, 7.1rem)"
    fontWeight: 400
    lineHeight: 0.84
    letterSpacing: "-0.025em"
  headline:
    fontFamily: '"Libre Caslon Display", Georgia, serif'
    fontSize: "clamp(2.65rem, 5.8vw, 5.8rem)"
    fontWeight: 400
    lineHeight: 0.96
    letterSpacing: "-0.025em"
  title:
    fontFamily: '"Libre Caslon Display", Georgia, serif'
    fontSize: "clamp(1.75rem, 3vw, 2.75rem)"
    fontWeight: 400
    lineHeight: 1
    letterSpacing: "-0.025em"
  body:
    fontFamily: 'ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif'
    fontSize: "clamp(1rem, 1.2vw, 1.12rem)"
    fontWeight: 400
    lineHeight: 1.7
    letterSpacing: "normal"
  label:
    fontFamily: 'ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif'
    fontSize: "0.78rem"
    fontWeight: 760
    lineHeight: 1.4
    letterSpacing: "0.04em"
rounded:
  square: "0"
  mark: "0.16rem"
  pill: "999px"
spacing:
  control-gap: "0.65rem"
  control-inline: "1rem"
  content-gap: "1.5rem"
  shell-mobile: "20px"
  shell-desktop: "40px"
  section: "clamp(6rem, 11vw, 11rem)"
components:
  button-primary:
    backgroundColor: "{colors.atlas-blue}"
    textColor: "{colors.atlas-ivory}"
    typography: "{typography.label}"
    rounded: "{rounded.square}"
    padding: "0.72rem 1rem"
    height: "48px"
  button-primary-hover:
    backgroundColor: "{colors.atlas-copper}"
    textColor: "{colors.atlas-ivory}"
    typography: "{typography.label}"
    rounded: "{rounded.square}"
    padding: "0.72rem 1rem"
    height: "48px"
  button-secondary:
    backgroundColor: "transparent"
    textColor: "{colors.atlas-blue}"
    typography: "{typography.label}"
    rounded: "{rounded.square}"
    padding: "0.72rem 1rem"
    height: "48px"
  nav-link:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    typography: "{typography.label}"
    rounded: "{rounded.square}"
    padding: "0 0.75rem"
    height: "44px"
  disclosure-summary:
    backgroundColor: "transparent"
    textColor: "{colors.atlas-blue}"
    typography: "{typography.body}"
    rounded: "{rounded.square}"
    padding: "0"
    height: "54px"
---

# Design System: Endroit.org

## Overview

**Creative North Star: "The Connected Home Atlas"**

Endroit.org behaves like an architectural atlas for agentic work. One owned
Home anchors the composition while copper Routes connect it to sovereign
Sites. The system is deliberate, legible and materially quiet: type, rules,
tonal fields and one authored illustration carry the meaning.

This world rejects the interchangeable SaaS pattern of rounded feature cards,
floating dashboards and decorative gradients. It uses spatial relationships
to explain ownership and continuity before adding interface chrome.

**Key Characteristics:**

- Ivory drafting surfaces, architectural navy structure and copper Routes.
- Large Caslon display type paired with a restrained system sans body.
- Flat sectional fields separated by fine rules rather than stacked cards.
- One central Home illustration connected to visibly independent Sites.
- Native disclosures and a single progressive Adoption Map enhancement.

## Colors

The palette reads as an architectural document warmed by a single material
accent. Token values in the frontmatter are normative.

### Primary

- **Architectural Navy** (`atlas-blue`): ownership, primary actions, dark
  structural fields and key display text.
- **Route Copper** (`atlas-copper`): human authority, recommended choices,
  Routes and the final call to action.

### Secondary

- **Soft Architectural Navy** (`atlas-blue-soft`): supporting blue surfaces.
- **Bright Route Copper** (`atlas-copper-bright`): connection lines and small
  route markers on dark fields.

### Neutral

- **Atlas Ivory** (`atlas-ivory`): the landing's dominant drafting surface.
- **Paper / Clear Paper** (`paper`, `paper-clear`): shared and high-clarity
  reading surfaces.
- **Foundation Sand / Ownership Sand** (`foundation-sand`, `ownership-sand`):
  tonal separation for the static foundation and responsibility sections.
- **Continuity Blue** (`continuity-blue`): the fresh-session proof field.
- **Ink / Night / Muted / Line** (`ink`, `night`, `muted`, `line`): shared text,
  footer, secondary copy and dividers.

**The Copper Route Rule.** Copper explains authority or connection. Do not use
it as ambient decoration scattered across otherwise neutral sections.

## Typography

**Display Font:** Libre Caslon Display (with Georgia and serif fallbacks)  
**Body Font:** System sans (with Segoe UI and sans-serif fallbacks)  
**Label Font:** System sans

**Character:** Caslon gives the Home the presence of an enduring institution;
the system sans keeps instructions, controls and evidence operational. The
contrast is intentional: place persists, execution stays practical.

### Hierarchy

- **Display:** Regular, tightly set and compressed vertically for the hero.
- **Headline:** Regular Caslon for act headings and major claims.
- **Title:** Regular Caslon for local headings and diagram labels.
- **Body:** Regular system sans, fluid across breakpoints, with a maximum
  measure of approximately `70ch`.
- **Label:** Dense system sans for navigation, status and diagram annotations;
  uppercase is reserved for factual micro-labels.

**The Institutional Voice Rule.** Use Caslon for places and propositions, not
for controls, code, metadata or procedural detail.

## Layout

The primary shell is centered at `1360px`, with compact mobile gutters and
wider desktop gutters from the frontmatter spacing tokens. Sections use a
large fluid vertical rhythm and alternate wide quiet fields with denser proof
compositions.

The landing follows four acts: connected entry, adoption, fresh-session
continuity and static foundation. Desktop layouts pair unequal columns rather
than equal card grids. At `960px` and below, the hero becomes a single column
so the promise and actions precede the Home illustration. Other complex grids
collapse between `800px` and `860px`. At `320px`, the document remains within
the viewport and code blocks scroll inside their own bounds.

**The Home-First Layout Rule.** A spatial relationship must remain legible when
columns collapse; never place the illustration before the promise or primary
action on narrow screens.

## Elevation & Depth

The atlas is flat by default. Depth comes from tonal layering, field changes,
fine rules and the authored isometric illustration. The hero illustration uses
a soft blurred underlay and a restrained translucent caption because those
effects clarify the object; content sections do not use ambient card shadows.
Supporting routes outside the atlas may use the existing soft primary-action
shadow (`0 12px 32px rgb(127 59 37 / 20%)`).

**The Tonal Depth Rule.** Change the plane before adding a shadow. Shadows are
reserved for a real foreground relationship or responsive state.

## Shapes

The landing uses square controls and rectilinear fields. Fine one-pixel rules
define boundaries; circular nodes appear only where a Route terminates or
connects. The small house mark keeps its established subtly rounded corners,
and pills remain reserved for the shared navigation CTA outside the landing.

**The Architectural Edge Rule.** Do not soften atlas sections into rounded
containers. Geometry should describe ownership, reach or containment.

## Components

### Buttons

- **Shape:** Rectilinear, square-cornered and at least `48px` high.
- **Primary:** Architectural navy on atlas ivory, using compact label type and
  the established control padding.
- **Hover / Focus:** Hover shifts to Route Copper. Keyboard focus uses the
  shared three-pixel Signal outline with a three-pixel offset.
- **Secondary:** Transparent with a navy rule; documentary links stay visibly
  underlined instead of impersonating buttons.

### Cards / Containers

- **Corner Style:** Square; recurring atlas content is not cardified.
- **Background:** Tonal fields use the named paper, sand, continuity and navy
  tokens.
- **Shadow Strategy:** Flat by default; see Elevation & Depth.
- **Border:** One-pixel rules establish boundaries and route geometry.
- **Internal Padding:** Fluid section padding; compact evidence panels use
  approximately `1.25rem` to `1.5rem`.

### Navigation

The shared header stays compact and typographically quiet above the atlas.
Links have `44px` touch height, dark ink at rest and copper on hover. On small
screens, secondary destinations collapse before the brand or GitHub link.

### Adoption Map

Existing, Recognize, Transpose and Continue form one connected route, not four
cards. The active stage receives one copper rule. Native JavaScript may update
that marker with `IntersectionObserver`; all stages remain complete and visible
without it. Reduced motion resolves the rule immediately.

### Native Disclosures

Summaries use square, border-only rows with a textual plus/minus indicator and
native keyboard behavior. They hold detailed grammar and alpha constraints,
never primary persuasion or the next action.

## Do's and Don'ts

### Do:

- **Do** keep one owned Home visually central and Sites visibly independent.
- **Do** use copper to trace Routes, recommendations and explicit authority.
- **Do** preserve native HTML, visible focus and complete no-JavaScript content.
- **Do** place the adoption action before the illustration on narrow screens.
- **Do** use self-hosted assets and the licensed Libre Caslon display face.

### Don't:

- **Don't** reorganize the page into interchangeable feature cards.
- **Don't** introduce gradients, glass panels or decorative glow as substitutes
  for authored architectural content.
- **Don't** use Caslon for code, controls or dense procedural copy.
- **Don't** make motion, JavaScript or an open disclosure necessary to
  understand the offer.
- **Don't** imply that adoption moves or takes ownership of existing Site
  sources.
