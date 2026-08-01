import assert from "node:assert/strict"
import test from "node:test"
import {
  initialInspectorState,
  inspectorSnapshot,
  inspectorStatus,
  transitionInspector,
} from "../src/components/home-inspector-state.mjs"

test("provider projections never change the owned workplace", () => {
  const codex = inspectorSnapshot(initialInspectorState)
  const claudeState = transitionInspector(initialInspectorState, {
    type: "SELECT_PROVIDER",
    provider: "claude",
  })
  const claude = inspectorSnapshot(claudeState)

  assert.equal(codex.home, claude.home)
  assert.equal(codex.room, claude.room)
  assert.deepEqual(codex.material, claude.material)
  assert.deepEqual(codex.sites, claude.sites)
  assert.deepEqual(codex.projection, ["AGENTS.md", ".agents/skills/"])
  assert.deepEqual(claude.projection, ["CLAUDE.md", ".claude/commands/"])
  assert.match(inspectorStatus(claudeState), /L1 projection of the same owned Home/)
})

test("subject selection recovers its Room, Material and destinations", () => {
  const state = transitionInspector(initialInspectorState, {
    type: "SELECT_SCENARIO",
    scenario: "open-workplace",
  })
  const snapshot = inspectorSnapshot(state)

  assert.equal(snapshot.room, "open-workplace")
  assert.deepEqual(snapshot.material, ["workplace-first.md", "proposal.md"])
  assert.deepEqual(snapshot.sites, ["open-workplace", "thevzion.com"])
})

test("unknown interactions preserve the current inspector", () => {
  const state = { ...initialInspectorState, panel: "sources" }
  assert.equal(transitionInspector(state, { type: "SELECT_PANEL", panel: "graph" }), state)
  assert.equal(transitionInspector(state, { type: "RUN_PROVIDER" }), state)
})
