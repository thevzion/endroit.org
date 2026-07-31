export const initialDistrictState = Object.freeze({
  perspective: "agent-centric",
})

const perspectives = new Set(["agent-centric", "home-first"])

export function transitionDistrict(state, event) {
  if (event.type !== "SELECT_PERSPECTIVE" || !perspectives.has(event.perspective)) {
    return state
  }

  return { perspective: event.perspective }
}

export function districtStatus(state) {
  if (state.perspective === "home-first") {
    return "The Home owns the durable workplace. Rooms own domains, Equipment owns methods, Sites own external truth and Routes declare access."
  }

  return "The agent is well equipped, but constitution, preferences, orientation, methods, state and destinations still compete for the same few surfaces."
}
