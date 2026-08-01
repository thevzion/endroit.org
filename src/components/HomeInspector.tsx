import { useReducer, type KeyboardEvent } from "react"
import {
  initialInspectorState,
  inspectorSnapshot,
  inspectorStatus,
  panelForKey,
  stageIds,
  transitionInspector,
} from "./home-inspector-state.mjs"

type Panel = "retain" | "reuse" | "maintain"
type InspectorState = { panel: Panel }
type InspectorEvent = { type: "SELECT_PANEL"; panel: Panel }

const reduceInspector = transitionInspector as (
  state: InspectorState,
  event: InspectorEvent,
) => InspectorState

const panels: Array<{ id: Panel; label: string }> = [
  { id: "retain", label: "Retain" },
  { id: "reuse", label: "Reuse" },
  { id: "maintain", label: "Maintain & deliver" },
]

export default function HomeInspector() {
  const [state, dispatch] = useReducer(
    reduceInspector,
    initialInspectorState as InspectorState,
  )
  const snapshot = inspectorSnapshot(state)

  const selectPanelFromKeyboard = (
    event: KeyboardEvent<HTMLButtonElement>,
  ) => {
    const panel = panelForKey(state.panel, event.key) as Panel | null
    if (!panel) return
    event.preventDefault()
    dispatch({ type: "SELECT_PANEL", panel })
    requestAnimationFrame(() => document.getElementById(`inspector-tab-${panel}`)?.focus())
  }

  return (
    <section className="home-inspector compounding-inspector" aria-labelledby="inspector-title">
      <div className="inspector-chrome">
        <div className="inspector-window" aria-hidden="true"><i /><i /><i /></div>
        <p>Sanitized dogfood snapshot · no hosted session invoked</p>
        <span>Home ready</span>
      </div>

      <div className="inspector-heading">
        <div>
          <p className="inspector-kicker">One owned Workplace · several Meetings</p>
          <h2 id="inspector-title">One Home. Several sessions. More to build on.</h2>
        </div>
        <div className="compounding-home" aria-label="Inspected Home">
          <span>{snapshot.homeLabel}</span>
          <code>{snapshot.home}</code>
        </div>
      </div>

      <div className="inspector-tabs" role="tablist" aria-label="Inspect how work compounds">
        {panels.map(({ id, label }, index) => (
          <button
            type="button"
            key={id}
            role="tab"
            id={`inspector-tab-${id}`}
            aria-controls={`inspector-panel-${id}`}
            aria-selected={state.panel === id}
            tabIndex={state.panel === id ? 0 : -1}
            onClick={() => dispatch({ type: "SELECT_PANEL", panel: id })}
            onKeyDown={selectPanelFromKeyboard}
          >
            <span>{String(index + 1).padStart(2, "0")}</span>
            {label}
          </button>
        ))}
      </div>

      <div className="inspector-panels">
        {stageIds.map((panel) => {
          const panelSnapshot = inspectorSnapshot({ panel })
          return (
            <div
              className="inspector-panel compounding-panel"
              id={`inspector-panel-${panel}`}
              role="tabpanel"
              aria-labelledby={`inspector-tab-${panel}`}
              hidden={state.panel !== panel}
              key={panel}
            >
              <div className="compounding-stage-head">
                <div><span>{panelSnapshot.label}</span><strong>{panelSnapshot.actor}</strong></div>
                <p>{panelSnapshot.outcome}</p>
              </div>

              <div className="compounding-flow" aria-label={`${panelSnapshot.label} sequence`}>
                {panelSnapshot.flow.map((step: string, index: number) => (
                  <div className="compounding-flow-step" key={step}>
                    <article><span>{String(index + 1).padStart(2, "0")}</span><strong>{step}</strong></article>
                    {index < panelSnapshot.flow.length - 1 && <i aria-hidden="true">→</i>}
                  </div>
                ))}
              </div>

              <div className="compounding-detail">
                <article>
                  <p className="panel-label">What changes</p>
                  <h3>{panelSnapshot.title}</h3>
                  <p>{panelSnapshot.description}</p>
                </article>
                <aside>
                  <p className="panel-label">Owned evidence</p>
                  {panelSnapshot.evidence.map((path: string) => <code key={path}>{path}</code>)}
                </aside>
              </div>
            </div>
          )
        })}
      </div>

      <div className="inspector-status" role="status" aria-live="polite">
        <span aria-hidden="true">●</span>
        <p>{inspectorStatus(state)}</p>
      </div>
    </section>
  )
}
