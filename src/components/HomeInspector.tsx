import { useReducer } from "react"
import {
  initialInspectorState,
  inspectorSnapshot,
  inspectorStatus,
  scenarios,
  transitionInspector,
} from "./home-inspector-state.mjs"

type Provider = "codex" | "claude"
type Panel = "recover" | "sources" | "lifecycle"
type Scenario = keyof typeof scenarios
type InspectorState = { provider: Provider; panel: Panel; scenario: Scenario }
type InspectorEvent =
  | { type: "SELECT_PROVIDER"; provider: Provider }
  | { type: "SELECT_PANEL"; panel: Panel }
  | { type: "SELECT_SCENARIO"; scenario: Scenario }

const reduceInspector = transitionInspector as (
  state: InspectorState,
  event: InspectorEvent,
) => InspectorState

const panels: Array<{ id: Panel; label: string }> = [
  { id: "recover", label: "Recover" },
  { id: "sources", label: "Inspect" },
  { id: "lifecycle", label: "Decide & deliver" },
]

const sourceRows = [
  ["HOME.md", "Home", "shared house rules"],
  ["members/alexis/MEMBER.md", "Member", "shared collaborator context"],
  [".desk/DESK.md", "Desk", "local preferences and continuity"],
  ["rooms/endroit/ROOM.md", "Room", "durable product domain"],
  ["equipment/endroit/hygiene/", "Equipment", "reusable way of working"],
  ["sites/endroit/SITE.md", "Site", "sovereign product identity"],
  [".desk/routes/endroit/main.json", "Route", "local declared access"],
]

const lifecycle = [
  ["retain", "Keep a candidate", "Durable Material, not authoritative."],
  ["accept", "Make it current", "The owner authorizes Room truth."],
  ["deliver", "Change a Site", "An explicit effect, then an observed result."],
  ["archive", "Remove from active work", "History remains; nothing is deleted."],
]

export default function HomeInspector() {
  const [state, dispatch] = useReducer(
    reduceInspector,
    initialInspectorState as InspectorState,
  )
  const snapshot = inspectorSnapshot(state)

  return (
    <section className="home-inspector" aria-labelledby="inspector-title">
      <div className="inspector-chrome">
        <div className="inspector-window" aria-hidden="true">
          <i /><i /><i />
        </div>
        <p>Local snapshot · no hosted session invoked</p>
        <span>Home ready</span>
      </div>

      <div className="inspector-heading">
        <div>
          <p className="inspector-kicker">Session recovery demo</p>
          <h2 id="inspector-title">Name the subject. Recover the workplace.</h2>
        </div>
        <div className="provider-switch" role="group" aria-label="Choose the projected provider interface">
          {(["codex", "claude"] as Provider[]).map((provider) => (
            <button
              type="button"
              key={provider}
              aria-pressed={state.provider === provider}
              data-active={state.provider === provider}
              onClick={() => dispatch({ type: "SELECT_PROVIDER", provider })}
            >
              {provider === "codex" ? "Codex" : "Claude"}
            </button>
          ))}
        </div>
      </div>

      <div className="inspector-tabs" role="tablist" aria-label="Inspect the Endroit experience">
        {panels.map(({ id, label }) => (
          <button
            type="button"
            key={id}
            role="tab"
            id={`inspector-tab-${id}`}
            aria-controls={`inspector-panel-${id}`}
            aria-selected={state.panel === id}
            tabIndex={0}
            onClick={() => dispatch({ type: "SELECT_PANEL", panel: id })}
          >
            <span>{String(panels.findIndex((panel) => panel.id === id) + 1).padStart(2, "0")}</span>
            {label}
          </button>
        ))}
      </div>

      <div
        className="inspector-panel"
        id={`inspector-panel-${state.panel}`}
        role="tabpanel"
        aria-labelledby={`inspector-tab-${state.panel}`}
      >
        {state.panel === "recover" && (
          <div className="recovery-panel">
            <aside className="subject-picker">
              <p>What are we working on?</p>
              {Object.entries(scenarios).map(([id, scenario]) => (
                <button
                  type="button"
                  key={id}
                  data-active={state.scenario === id}
                  aria-pressed={state.scenario === id}
                  onClick={() => dispatch({ type: "SELECT_SCENARIO", scenario: id as Scenario })}
                >
                  <span aria-hidden="true">{state.scenario === id ? "●" : "○"}</span>
                  {scenario.label}
                </button>
              ))}
            </aside>

            <div className="recovery-sequence" aria-label={`Recovered context for ${snapshot.label}`}>
              <div className="recovery-prompt">
                <span>new meeting</span>
                <p>“Let’s continue the {snapshot.label.toLowerCase()}.”</p>
              </div>
              <ol>
                <li><span>01</span><div><strong>Home entered</strong><small>{snapshot.home}</small></div></li>
                <li><span>02</span><div><strong>Room resolved</strong><small>rooms/{snapshot.room}/</small></div></li>
                <li><span>03</span><div><strong>Material recovered</strong><small>{snapshot.material.join(" · ")}</small></div></li>
                <li><span>04</span><div><strong>Routes available</strong><small>{snapshot.sites.join(" · ")}</small></div></li>
              </ol>
              <div className="recovery-ready"><span aria-hidden="true">✓</span><strong>Ready to work</strong><small>No transcript required.</small></div>
            </div>
          </div>
        )}

        {state.panel === "sources" && (
          <div className="sources-panel">
            <div className="source-tree-panel" aria-label="Authoritative Home files">
              <p className="panel-label">Authoritative sources</p>
              <div className="source-tree-head"><span>Path</span><span>Owner</span><span>Responsibility</span></div>
              {sourceRows.map(([path, owner, responsibility]) => (
                <div className="source-row" key={path}>
                  <code>{path}</code><strong>{owner}</strong><span>{responsibility}</span>
                </div>
              ))}
            </div>
            <aside className="projection-panel">
              <p className="panel-label">{state.provider === "codex" ? "Codex" : "Claude"} projection · L1</p>
              {snapshot.projection.map((path: string) => <code key={path}>{path}</code>)}
              <span aria-hidden="true">↑</span>
              <strong>Built from the same Home</strong>
              <p>The interface changes. Ownership does not.</p>
            </aside>
          </div>
        )}

        {state.panel === "lifecycle" && (
          <div className="lifecycle-panel">
            <p className="panel-label">Human-controlled lifecycle</p>
            <div className="lifecycle-track">
              {lifecycle.map(([verb, title, description], index) => (
                <article key={verb}>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <code>{verb}</code>
                  <strong>{title}</strong>
                  <p>{description}</p>
                </article>
              ))}
            </div>
            <div className="delivery-resolution">
              <span>destination explicit</span><i aria-hidden="true">→</i><span>Room default</span><i aria-hidden="true">→</i><span>unique compatible Site</span><i aria-hidden="true">→</i><strong>pending if ambiguous</strong>
            </div>
          </div>
        )}
      </div>

      <div className="inspector-status" role="status" aria-live="polite">
        <span aria-hidden="true">●</span>
        <p>{inspectorStatus(state)}</p>
      </div>
    </section>
  )
}
