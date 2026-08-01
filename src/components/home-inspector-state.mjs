export const stageIds = Object.freeze(["retain", "reuse", "maintain"])
const stages = new Set(stageIds)

const sharedWorkplace = Object.freeze({
  home: "agentic-tools-home",
  homeLabel: "The VZion Studio Home",
  room: ".desk/rooms/endroit/ROOM.md",
  retainedMaterial: ".desk/rooms/endroit/planning/initiative/endroit-home-first-hard-reset/HANDOFF.md",
  route: ".desk/routes/endroit.org/home-first-reset.json",
  site: "endroit.org",
})

const stageSnapshots = Object.freeze({
  retain: Object.freeze({
    label: "Retain",
    actor: "Claude · first Meeting",
    flow: Object.freeze(["Claude enters", "Room context", "candidate", "human retains", "Room Material"]),
    title: "Keep the useful result, not the whole session.",
    description: "The candidate becomes durable and inspectable without becoming current truth.",
    evidence: Object.freeze([sharedWorkplace.room, sharedWorkplace.retainedMaterial]),
    outcome: "Retained · non-authoritative",
  }),
  reuse: Object.freeze({
    label: "Reuse",
    actor: "Codex · later Meeting",
    flow: Object.freeze(["Codex enters", "same Room + Material", "use Research", "decision candidate"]),
    title: "A new agent builds on the owned Workplace.",
    description: "Codex receives fresh orientation and reads retained Material. No private Claude memory is transferred.",
    evidence: Object.freeze([sharedWorkplace.room, sharedWorkplace.retainedMaterial]),
    outcome: "Reused · new candidate",
  }),
  maintain: Object.freeze({
    label: "Maintain & deliver",
    actor: "Human · Hygiene · Route",
    flow: Object.freeze(["human transition", "Hygiene advisory", "approved Route", "observed Site result"]),
    title: "Clarify the destination before changing the Site.",
    description: "Hygiene inspects read-only. Delivery proceeds only through an approved, revalidated Route and an observed result.",
    evidence: Object.freeze([sharedWorkplace.route, `site:${sharedWorkplace.site}`]),
    outcome: "Delivered · observed",
  }),
})

export const initialInspectorState = Object.freeze({ panel: "retain" })

export function transitionInspector(state, event) {
  if (event.type === "SELECT_PANEL" && stages.has(event.panel)) {
    return { ...state, panel: event.panel }
  }
  return state
}

export function inspectorSnapshot(state) {
  return {
    ...sharedWorkplace,
    ...(stageSnapshots[state.panel] ?? stageSnapshots.retain),
  }
}

export function inspectorStatus(state) {
  const snapshot = inspectorSnapshot(state)
  return `${snapshot.label}: ${snapshot.outcome}. The Home keeps only the human-selected continuity needed for the next Meeting.`
}

export function panelForKey(current, key) {
  const index = stageIds.indexOf(current)
  if (index < 0) return null
  if (key === "Home") return stageIds[0]
  if (key === "End") return stageIds.at(-1)
  if (key === "ArrowRight") return stageIds[(index + 1) % stageIds.length]
  if (key === "ArrowLeft") return stageIds[(index - 1 + stageIds.length) % stageIds.length]
  return null
}
