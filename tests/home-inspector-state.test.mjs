import assert from "node:assert/strict"
import test from "node:test"
import {
  initialInspectorState,
  inspectorSnapshot,
  inspectorStatus,
  panelForKey,
  stageIds,
  transitionInspector,
} from "../src/components/home-inspector-state.mjs"

test("three Meetings reuse one owned workplace without shared provider memory", () => {
  const snapshots = stageIds.map((panel) => inspectorSnapshot({ panel }))

  assert.deepEqual(stageIds, ["retain", "reuse", "maintain"])
  assert.ok(snapshots.every(({ home }) => home === "agentic-tools-home"))
  assert.ok(snapshots.every(({ room }) => room === ".desk/rooms/endroit/ROOM.md"))
  assert.match(snapshots[0].actor, /Claude/)
  assert.match(snapshots[1].actor, /Codex/)
  assert.match(snapshots[1].description, /No private Claude memory is transferred/)
  assert.match(snapshots[2].description, /Hygiene inspects read-only/)
  assert.match(snapshots[2].description, /approved, revalidated Route/)
})

test("the sanitized dogfood snapshot exposes only public-safe evidence", () => {
  const retain = inspectorSnapshot(initialInspectorState)
  const maintain = inspectorSnapshot({ panel: "maintain" })

  assert.deepEqual(retain.evidence, [
    ".desk/rooms/endroit/ROOM.md",
    ".desk/rooms/endroit/planning/initiative/endroit-home-first-hard-reset/HANDOFF.md",
  ])
  assert.deepEqual(maintain.evidence, [
    ".desk/routes/endroit.org/home-first-reset.json",
    "site:endroit.org",
  ])
  assert.ok([...retain.evidence, ...maintain.evidence].every((path) => !/release-candidate|launch-frictions|accepted-findings/.test(path)))
})

test("unknown interactions preserve the current inspector", () => {
  const state = { ...initialInspectorState, panel: "reuse" }
  assert.equal(transitionInspector(state, { type: "SELECT_PANEL", panel: "graph" }), state)
  assert.equal(transitionInspector(state, { type: "RUN_PROVIDER" }), state)
  assert.match(inspectorStatus(state), /Reuse: Reused · new candidate/)
})

test("tab keyboard navigation wraps and supports Home and End", () => {
  assert.equal(panelForKey("retain", "ArrowRight"), "reuse")
  assert.equal(panelForKey("retain", "ArrowLeft"), "maintain")
  assert.equal(panelForKey("maintain", "ArrowRight"), "retain")
  assert.equal(panelForKey("reuse", "Home"), "retain")
  assert.equal(panelForKey("reuse", "End"), "maintain")
  assert.equal(panelForKey("reuse", "Enter"), null)
})
