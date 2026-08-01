import { useReducer } from "react"
import {
  districtStatus,
  initialDistrictState,
  transitionDistrict,
} from "./environment-district-state.mjs"

type Perspective = "agent-centric" | "workplace-first"

type DistrictState = { perspective: Perspective }
type DistrictEvent = { type: "SELECT_PERSPECTIVE"; perspective: Perspective }

const reduceDistrict = transitionDistrict as (
  state: DistrictState,
  event: DistrictEvent,
) => DistrictState

const overloaded = [
  ["AGENTS.md", "constitution · preferences · orientation · rules · decisions · state"],
  ["Skills/", "procedures · knowledge · methods · agents · outputs"],
]

const workplace = [
  ["Home", "shared workplace"],
  ["Desk", "personal continuity"],
  ["Room", "durable domain"],
  ["Equipment", "reusable method"],
  ["Site", "sovereign truth"],
  ["Route", "declared access"],
]

export default function EnvironmentDistrict() {
  const [state, dispatch] = useReducer(
    reduceDistrict,
    initialDistrictState as DistrictState,
  )
  const workplaceFirst = state.perspective === "workplace-first"
  const status = districtStatus(state)

  return (
    <div className="overflow-hidden rounded-[1.75rem] border border-white/12 bg-[#080c0d] shadow-[0_40px_140px_rgba(0,0,0,.42)] md:rounded-[2.5rem]">
      <div className="grid border-b border-white/10 sm:grid-cols-2" role="group" aria-label="Choose a design center">
        {(["agent-centric", "workplace-first"] as Perspective[]).map((perspective) => (
          <button
            key={perspective}
            type="button"
            className="perspective-choice"
            data-active={state.perspective === perspective}
            aria-pressed={state.perspective === perspective}
            onClick={() => dispatch({ type: "SELECT_PERSPECTIVE", perspective })}
          >
            <span>{perspective === "agent-centric" ? "01" : "02"}</span>
            <strong>{perspective === "agent-centric" ? "Equip the agent" : "Equip the place"}</strong>
          </button>
        ))}
      </div>

      <div className="grid min-h-[34rem] place-items-center bg-[radial-gradient(circle_at_50%_35%,rgba(216,121,78,.12),transparent_35%),radial-gradient(circle_at_85%_18%,rgba(118,220,224,.06),transparent_24%)] p-5 sm:p-8 lg:p-12">
        {workplaceFirst ? (
          <div className="w-full max-w-5xl">
            <div className="mx-auto max-w-xl text-center">
              <p className="district-panel-kicker">Workplace-first · durable workplace</p>
              <h3 className="district-panel-title">The place carries the continuity.</h3>
              <p className="district-panel-copy">Each responsibility has an owner before Codex, Claude or another interface receives its projection.</p>
            </div>
            <div className="workplace-plan" aria-label="Workplace-first model">
              {workplace.map(([name, role], index) => (
                <article key={name} className={index === 0 ? "workplace-home" : ""}>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <strong>{name}</strong>
                  <p>{role}</p>
                </article>
              ))}
            </div>
            <p className="mt-6 text-center font-mono text-[0.62rem] font-bold uppercase tracking-[0.13em] text-copper-light">
              One owned place · many temporary occupants · sovereign destinations
            </p>
          </div>
        ) : (
          <div className="w-full max-w-4xl">
            <div className="mx-auto max-w-xl text-center">
              <p className="district-panel-kicker">Agent-centric · capable occupant</p>
              <h3 className="district-panel-title">The agent has tools. The workplace stays implicit.</h3>
              <p className="district-panel-copy">Useful primitives absorb more responsibilities because the environment has no first-class owner.</p>
            </div>
            <div className="overloaded-surfaces">
              {overloaded.map(([surface, content]) => (
                <article key={surface}>
                  <strong>{surface}</strong>
                  <p>{content}</p>
                </article>
              ))}
            </div>
            <div className="agent-orbit" aria-label="Agent-centric setup">
              <span>Memory</span><span>Tools</span><strong>Agent</strong><span>Skills</span><span>Instructions</span>
            </div>
          </div>
        )}
      </div>

      <div className="border-t border-white/10 bg-white/[0.025] px-5 py-4 sm:px-7 lg:px-9">
        <p className="m-0 font-mono text-xs leading-relaxed text-valid" role="status" aria-live="polite">
          <span className="mr-2 text-copper-light" aria-hidden="true">●</span>
          {status}
        </p>
      </div>
    </div>
  )
}
