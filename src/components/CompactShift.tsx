import { MotionConfig, motion, useReducedMotion } from "motion/react"
import { useState } from "react"

const entities = [
  { id: "skill", label: "Review Skill", kind: "Asset" },
  { id: "method", label: "GSD method", kind: "Asset" },
  { id: "memory", label: "Project memory", kind: "Desk" },
  { id: "artifact", label: "Research result", kind: "Artifact" },
  { id: "app", label: "Application", kind: "Target" },
  { id: "docs", label: "Documentation", kind: "Target" },
] as const

export default function CompactShift() {
  const [homeFirst, setHomeFirst] = useState(false)
  const reducedMotion = useReducedMotion()

  return (
    <MotionConfig reducedMotion="user">
      <section className="shift" aria-labelledby="shift-title">
        <div className="shift-head">
          <div>
            <p className="eyebrow">Same work. A declared owner.</p>
            <h2 id="shift-title">
              {homeFirst ? "The environment has a Home." : "The Target became the environment."}
            </h2>
          </div>
          <button
            className="shift-action"
            type="button"
            aria-pressed={homeFirst}
            onClick={() => setHomeFirst((value) => !value)}
          >
            {homeFirst ? "Show Target-first" : "Reorganize with Hairness"}
          </button>
        </div>

        <div className={`shift-field ${homeFirst ? "is-home" : "is-target"}`}>
          <p className="shift-runtime">Agent Runtime</p>

          <motion.div
            className="shift-home"
            aria-hidden={!homeFirst}
            animate={{ opacity: homeFirst ? 1 : 0, scale: homeFirst ? 1 : 0.98 }}
            transition={{ duration: reducedMotion ? 0 : 0.32 }}
          >
            <span className="shift-door">Front Door</span>
            <strong>Hairness Home</strong>
            <span className="shift-room shift-room-assets">Assets</span>
            <span className="shift-room shift-room-desk">Desk</span>
            <span className="shift-room shift-room-artifacts">Artifacts</span>
          </motion.div>

          {entities.map((entity) => (
            <motion.div
              className="shift-node"
              data-node={entity.id}
              key={entity.id}
              layout
              transition={{ duration: reducedMotion ? 0 : 0.55, type: "spring", bounce: 0.16 }}
            >
              <small>{entity.kind}</small>
              <span>{entity.label}</span>
            </motion.div>
          ))}

          <motion.div
            className="shift-binding shift-binding-app"
            animate={{ opacity: homeFirst ? 1 : 0 }}
            transition={{ duration: reducedMotion ? 0 : 0.2, delay: reducedMotion ? 0 : 0.28 }}
          >
            Binding
          </motion.div>
          <motion.div
            className="shift-binding shift-binding-docs"
            animate={{ opacity: homeFirst ? 1 : 0 }}
            transition={{ duration: reducedMotion ? 0 : 0.2, delay: reducedMotion ? 0 : 0.36 }}
          >
            Binding
          </motion.div>
        </div>

        <p className="shift-status" aria-live="polite">
          {homeFirst
            ? "Hairness owns the reusable environment. Bindings reach independent product Targets."
            : "Reusable methods, memory and results have accumulated around product Targets without a shared owner."}
        </p>
      </section>
    </MotionConfig>
  )
}
