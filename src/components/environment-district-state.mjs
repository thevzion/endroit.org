export const initialDistrictState = Object.freeze({
  paradigm: "target-first",
  scenario: null,
  activeTarget: "application",
  keepStage: "idle",
})

const targets = new Set(["application", "api", "documentation"])
const scenarios = new Set(["orient", "keep", "reach"])

export function transitionDistrict(state, event) {
  switch (event.type) {
    case "TOGGLE_PARADIGM":
      return state.paradigm === "target-first"
        ? { ...state, paradigm: "home-first", scenario: null, keepStage: "idle" }
        : { ...initialDistrictState }

    case "SELECT_SCENARIO":
      if (state.paradigm !== "home-first" || !scenarios.has(event.scenario)) return state
      return {
        ...state,
        scenario: event.scenario,
        keepStage: event.scenario === "keep" ? "idle" : state.keepStage,
      }

    case "SELECT_TARGET":
      if (
        state.paradigm !== "home-first" ||
        state.scenario !== "reach" ||
        !targets.has(event.target)
      ) {
        return state
      }
      return { ...state, activeTarget: event.target }

    case "KEEP_DOCUMENT":
      if (
        state.paradigm !== "home-first" ||
        state.scenario !== "keep" ||
        state.keepStage !== "idle"
      ) {
        return state
      }
      return { ...state, keepStage: "document" }

    case "PROMOTE_ARTIFACT":
      if (
        state.paradigm !== "home-first" ||
        state.scenario !== "keep" ||
        state.keepStage !== "document"
      ) {
        return state
      }
      return { ...state, keepStage: "artifact" }

    default:
      return state
  }
}

export function districtStatus(state) {
  if (state.paradigm === "target-first") {
    return "Your agent starts inside a Target. Useful methods, continuity and results collect around product source without one declared owner."
  }

  if (state.scenario === "orient") {
    return "The Floor Plan provides a stable map, then Progressive Orientation narrows the working set to the relevant Workspace."
  }

  if (state.scenario === "keep") {
    if (state.keepStage === "artifact") {
      return "Human curation promoted the chosen result to an Artifact. Its owner, state and lineage remain inspectable."
    }
    if (state.keepStage === "document") {
      return "The Document now preserves ordinary continuity inside its Workspace. It has not become an Artifact automatically."
    }
    return "Keep ordinary continuity as a Document, then deliberately promote only a chosen result."
  }

  if (state.scenario === "reach") {
    const label = {
      application: "Application",
      api: "API",
      documentation: "Documentation",
    }[state.activeTarget]
    return `A local Binding reaches the ${label} Target. The Target keeps its own source, history and delivery.`
  }

  return "The Home owns the durable environment. Independent Targets remain connected through explicit local Bindings."
}
