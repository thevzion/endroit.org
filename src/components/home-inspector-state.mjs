const dogfoodSnapshot = Object.freeze({
  home: "agentic-tools-home",
  homeLabel: "The VZion Studio Home",
  room: ".desk/rooms/endroit/ROOM.md",
  material: Object.freeze([
    ".desk/rooms/endroit/planning/initiative/endroit-home-first-hard-reset/HANDOFF.md",
    ".desk/rooms/endroit/exploring/scratch/endroit-current-shape/planning/validation.md",
  ]),
  sites: Object.freeze(["endroit", "endroit.org", "thevzion.com"]),
})

const providers = new Set(["codex", "claude"])
export const panelIds = Object.freeze(["recover", "sources", "lifecycle"])
const panels = new Set(panelIds)

export const initialInspectorState = Object.freeze({
  provider: "codex",
  panel: "recover",
})

export function transitionInspector(state, event) {
  if (event.type === "SELECT_PROVIDER" && providers.has(event.provider)) {
    return { ...state, provider: event.provider }
  }

  if (event.type === "SELECT_PANEL" && panels.has(event.panel)) {
    return { ...state, panel: event.panel }
  }

  return state
}

export function inspectorSnapshot(state) {
  const projection = state.provider === "claude"
    ? ["CLAUDE.md", ".claude/commands/"]
    : ["AGENTS.md", ".agents/skills/"]

  return {
    ...dogfoodSnapshot,
    projection,
  }
}

export function inspectorStatus(state) {
  const provider = state.provider === "claude" ? "Claude" : "Codex"
  return `${provider} receives an L1 projection of the same owned Home. The Endroit Room, retained Material and Site destinations remain workplace-owned.`
}

export function panelForKey(current, key) {
  const index = panelIds.indexOf(current)
  if (index < 0) return null
  if (key === "Home") return panelIds[0]
  if (key === "End") return panelIds.at(-1)
  if (key === "ArrowRight") return panelIds[(index + 1) % panelIds.length]
  if (key === "ArrowLeft") return panelIds[(index - 1 + panelIds.length) % panelIds.length]
  return null
}
