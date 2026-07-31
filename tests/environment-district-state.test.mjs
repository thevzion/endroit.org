import assert from "node:assert/strict"
import test from "node:test"
import {
  districtStatus,
  initialDistrictState,
  transitionDistrict,
} from "../src/components/environment-district-state.mjs"

test("the comparison moves explicitly from Agent-centric to Home-first", () => {
  assert.equal(initialDistrictState.perspective, "agent-centric")

  const home = transitionDistrict(initialDistrictState, {
    type: "SELECT_PERSPECTIVE",
    perspective: "home-first",
  })

  assert.equal(home.perspective, "home-first")
  assert.match(districtStatus(home), /Home owns the durable workplace/)
  assert.match(districtStatus(home), /Routes declare access/)
})

test("unknown interactions preserve the current comparison", () => {
  const state = { perspective: "home-first" }
  assert.equal(transitionDistrict(state, { type: "TOGGLE_PARADIGM" }), state)
  assert.equal(
    transitionDistrict(state, { type: "SELECT_PERSPECTIVE", perspective: "unknown" }),
    state,
  )
})
