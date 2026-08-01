export const scenarios = Object.freeze({
  "endroit-launch": Object.freeze({
    label: "Endroit 0.8 launch",
    room: "endroit",
    material: ["release-candidate.md", "launch-frictions.md"],
    sites: ["endroit", "endroit.org", "thevzion.com"],
  }),
  "open-workplace": Object.freeze({
    label: "Open Workplace proposal",
    room: "open-workplace",
    material: ["workplace-first.md", "proposal.md"],
    sites: ["open-workplace", "thevzion.com"],
  }),
  "research-workflow": Object.freeze({
    label: "Research workflow",
    room: "human-agent-collaboration",
    material: ["study.md", "accepted-findings.md"],
    sites: ["self", "control-decks"],
  }),
})

const providers = new Set(["codex", "claude"])
export const panelIds = Object.freeze(["recover", "sources", "lifecycle"])
const panels = new Set(panelIds)

export const initialInspectorState = Object.freeze({
  provider: "codex",
  panel: "recover",
  scenario: "endroit-launch",
})

export function transitionInspector(state, event) {
  if (event.type === "SELECT_PROVIDER" && providers.has(event.provider)) {
    return { ...state, provider: event.provider }
  }

  if (event.type === "SELECT_PANEL" && panels.has(event.panel)) {
    return { ...state, panel: event.panel }
  }

  if (event.type === "SELECT_SCENARIO" && scenarios[event.scenario]) {
    return { ...state, scenario: event.scenario }
  }

  return state
}

export function inspectorSnapshot(state) {
  const scenario = scenarios[state.scenario] ?? scenarios["endroit-launch"]
  const projection = state.provider === "claude"
    ? ["CLAUDE.md", ".claude/commands/"]
    : ["AGENTS.md", ".agents/skills/"]

  return {
    home: "the-vzion-studio",
    ...scenario,
    projection,
  }
}

export function inspectorStatus(state) {
  const snapshot = inspectorSnapshot(state)
  const provider = state.provider === "claude" ? "Claude" : "Codex"
  return `${provider} receives an L1 projection of the same owned Home. Room ${snapshot.room} and its destinations do not move with the occupant.`
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
