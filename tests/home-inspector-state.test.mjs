import assert from "node:assert/strict"
import test from "node:test"
import {
  initialInspectorState,
  inspectorSnapshot,
  inspectorStatus,
  panelForKey,
  transitionInspector,
} from "../src/components/home-inspector-state.mjs"

test("provider projections never change the owned workplace", () => {
  const codex = inspectorSnapshot(initialInspectorState)
  const claudeState = transitionInspector(initialInspectorState, {
    type: "SELECT_PROVIDER",
    provider: "claude",
  })
  const claude = inspectorSnapshot(claudeState)

  assert.equal(codex.home, "agentic-tools-home")
  assert.equal(codex.home, claude.home)
  assert.equal(codex.room, ".desk/rooms/endroit/ROOM.md")
  assert.equal(codex.room, claude.room)
  assert.deepEqual(codex.material, claude.material)
  assert.deepEqual(codex.sites, claude.sites)
  assert.deepEqual(codex.projection, ["AGENTS.md", ".agents/skills/"])
  assert.deepEqual(claude.projection, ["CLAUDE.md", ".claude/commands/"])
  assert.match(inspectorStatus(claudeState), /L1 projection of the same owned Home/)
})

test("the sanitized dogfood snapshot references only existing public-safe material", () => {
  const snapshot = inspectorSnapshot(initialInspectorState)

  assert.deepEqual(snapshot.material, [
    ".desk/rooms/endroit/planning/initiative/endroit-home-first-hard-reset/HANDOFF.md",
    ".desk/rooms/endroit/exploring/scratch/endroit-current-shape/planning/validation.md",
  ])
  assert.deepEqual(snapshot.sites, ["endroit", "endroit.org", "thevzion.com"])
  assert.ok(snapshot.material.every((path) => !/release-candidate|launch-frictions|accepted-findings/.test(path)))
})

test("unknown interactions preserve the current inspector", () => {
  const state = { ...initialInspectorState, panel: "sources" }
  assert.equal(transitionInspector(state, { type: "SELECT_PANEL", panel: "graph" }), state)
  assert.equal(transitionInspector(state, { type: "RUN_PROVIDER" }), state)
})

test("tab keyboard navigation wraps and supports Home and End", () => {
  assert.equal(panelForKey("recover", "ArrowRight"), "sources")
  assert.equal(panelForKey("recover", "ArrowLeft"), "lifecycle")
  assert.equal(panelForKey("lifecycle", "ArrowRight"), "recover")
  assert.equal(panelForKey("sources", "Home"), "recover")
  assert.equal(panelForKey("sources", "End"), "lifecycle")
  assert.equal(panelForKey("sources", "Enter"), null)
})
