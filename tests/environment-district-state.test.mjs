import assert from "node:assert/strict"
import test from "node:test"
import {
  districtStatus,
  initialDistrictState,
  transitionDistrict,
} from "../src/components/environment-district-state.mjs"

test("guided actions are available only after giving the agent a Home", () => {
  const blocked = transitionDistrict(initialDistrictState, {
    type: "SELECT_SCENARIO",
    scenario: "orient",
  })
  assert.equal(blocked, initialDistrictState)

  const home = transitionDistrict(initialDistrictState, {
    type: "TOGGLE_PARADIGM",
  })
  const oriented = transitionDistrict(home, {
    type: "SELECT_SCENARIO",
    scenario: "orient",
  })

  assert.equal(home.paradigm, "home-first")
  assert.equal(oriented.scenario, "orient")
  assert.match(districtStatus(oriented), /Progressive Orientation/)
})

test("human curation is required between a Document and an Artifact", () => {
  let state = transitionDistrict(initialDistrictState, {
    type: "TOGGLE_PARADIGM",
  })
  state = transitionDistrict(state, {
    type: "SELECT_SCENARIO",
    scenario: "keep",
  })

  assert.equal(
    transitionDistrict(state, { type: "PROMOTE_ARTIFACT" }).keepStage,
    "idle",
  )
  state = transitionDistrict(state, { type: "KEEP_DOCUMENT" })
  assert.equal(state.keepStage, "document")
  state = transitionDistrict(state, { type: "PROMOTE_ARTIFACT" })
  assert.equal(state.keepStage, "artifact")
  assert.match(districtStatus(state), /Human curation/)
})

test("a Binding can select an independent Target and reset cleanly", () => {
  let state = transitionDistrict(initialDistrictState, {
    type: "TOGGLE_PARADIGM",
  })
  state = transitionDistrict(state, {
    type: "SELECT_SCENARIO",
    scenario: "reach",
  })
  state = transitionDistrict(state, {
    type: "SELECT_TARGET",
    target: "documentation",
  })

  assert.equal(state.activeTarget, "documentation")
  assert.match(districtStatus(state), /Documentation Target/)
  assert.deepEqual(
    transitionDistrict(state, { type: "TOGGLE_PARADIGM" }),
    initialDistrictState,
  )
})
