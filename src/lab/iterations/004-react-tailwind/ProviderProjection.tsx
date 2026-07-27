import { AnimatePresence, MotionConfig, motion } from 'motion/react';
import { useState } from 'react';

type Provider = 'codex' | 'claude';

const projections = {
	codex: [
		['Review method', 'Codex Skill'],
		['Home conventions', 'AGENTS instructions'],
		['Ship workflow', 'Codex command surface'],
	],
	claude: [
		['Review method', 'Claude Skill'],
		['Home conventions', 'CLAUDE instructions'],
		['Ship workflow', 'Claude command surface'],
	],
} satisfies Record<Provider, string[][]>;

export default function ProviderProjection() {
	const [provider, setProvider] = useState<Provider>('codex');

	return (
		<MotionConfig reducedMotion="user">
			<figure className="@container m-0 border-y border-line-strong bg-paper-soft">
				<header className="grid gap-5 border-b border-line p-5 @min-3xl:grid-cols-[1fr_auto] @min-3xl:items-end @min-3xl:p-7">
					<div>
						<p className="mb-1 font-mono text-[0.58rem] font-bold uppercase tracking-[0.13em] text-sky">
							Replace the runtime, not your source
						</p>
						<h3 className="m-0 text-2xl font-bold tracking-[-0.045em] @min-3xl:text-3xl">
							Provider-native. Never provider-owned.
						</h3>
					</div>
					<div className="grid grid-cols-2 border border-line-strong" role="group" aria-label="Choose provider projection">
						{(['codex', 'claude'] as const).map((value) => (
							<button
								type="button"
								aria-pressed={provider === value}
								onClick={() => setProvider(value)}
								className={`min-h-11 px-5 text-xs font-bold capitalize transition-colors ${
									provider === value
										? 'bg-ink text-white'
										: 'bg-paper text-muted hover:bg-paper-deep hover:text-ink'
								}`}
								key={value}
							>
								{value}
							</button>
						))}
					</div>
				</header>

				<div className="v4-grid-paper grid gap-3 p-4 @min-4xl:grid-cols-[1fr_3.5rem_1fr] @min-4xl:items-stretch @min-4xl:p-7">
					<section className="border border-copper/40 bg-paper-soft p-4">
						<small className="font-mono text-[0.53rem] font-bold uppercase tracking-[0.1em] text-copper">
							Canonical Home source
						</small>
						<strong className="mt-1 block text-base">Agentic Assets</strong>
						<div className="mt-4 grid gap-2">
							{projections.codex.map(([asset]) => (
								<span className="border-l-2 border-copper bg-copper/8 px-3 py-2 text-xs font-semibold" key={asset}>
									{asset}
								</span>
							))}
						</div>
						<p className="mb-0 mt-4 font-mono text-[0.54rem] uppercase tracking-[0.08em] text-muted">
							source unchanged
						</p>
					</section>

					<div className="grid grid-cols-[1fr_auto_1fr] place-items-center @min-4xl:grid-cols-1 @min-4xl:grid-rows-[1fr_auto_1fr]">
						<i className="h-px w-full bg-line-strong @min-4xl:h-full @min-4xl:w-px" />
						<span className="border border-line-strong bg-paper px-2 py-1 font-mono text-[0.5rem] font-bold uppercase text-muted">
							build
						</span>
						<i className="h-px w-full bg-line-strong @min-4xl:h-full @min-4xl:w-px" />
					</div>

					<section className="border border-sky/45 bg-paper-soft p-4">
						<div className="flex items-start justify-between gap-3">
							<div>
								<small className="font-mono text-[0.53rem] font-bold uppercase tracking-[0.1em] text-sky">
									Generated projection
								</small>
								<strong className="mt-1 block text-base capitalize">{provider}</strong>
							</div>
							<span className="border border-sky/40 bg-sky-soft px-2 py-1 font-mono text-[0.5rem] font-bold uppercase text-sky">
								replaceable
							</span>
						</div>
						<AnimatePresence mode="wait" initial={false}>
							<motion.div
								key={provider}
								initial={{ opacity: 0, y: 8 }}
								animate={{ opacity: 1, y: 0 }}
								exit={{ opacity: 0, y: -8 }}
								transition={{ duration: 0.2 }}
								className="mt-4 grid gap-2"
								aria-live="polite"
							>
								{projections[provider].map(([asset, projection]) => (
									<div className="grid grid-cols-[1fr_auto] gap-2 border-l-2 border-sky bg-sky-soft/60 px-3 py-2 text-xs" key={asset}>
										<span className="text-muted">{asset}</span>
										<strong>{projection}</strong>
									</div>
								))}
							</motion.div>
						</AnimatePresence>
						<p className="mb-0 mt-4 font-mono text-[0.54rem] uppercase tracking-[0.08em] text-muted">
							provider-native output
						</p>
					</section>
				</div>
			</figure>
		</MotionConfig>
	);
}
