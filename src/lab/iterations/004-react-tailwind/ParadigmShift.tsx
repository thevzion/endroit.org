import { LayoutGroup, MotionConfig, motion } from 'motion/react';
import { useState } from 'react';

type Mode = 'target' | 'home';
type AgenticItem = {
	id: string;
	label: string;
	source: string;
	kind: 'asset' | 'artifact';
	target: 'storefront' | 'platform';
};

const repositories = [
	{
		id: 'storefront' as const,
		label: 'storefront/',
		files: ['src/', 'tests/', 'docs/'],
	},
	{
		id: 'platform' as const,
		label: 'platform-api/',
		files: ['app/', 'tests/', 'openapi/'],
	},
];

const agenticItems: AgenticItem[] = [
	{
		id: 'review-method',
		label: 'Review method',
		source: '.agents/review/',
		kind: 'asset',
		target: 'storefront',
	},
	{
		id: 'ship-workflow',
		label: 'Ship workflow',
		source: 'commands/ship.md',
		kind: 'asset',
		target: 'storefront',
	},
	{
		id: 'launch-plan',
		label: 'Launch plan',
		source: 'plans/launch.md',
		kind: 'artifact',
		target: 'storefront',
	},
	{
		id: 'research-agent',
		label: 'Research agent',
		source: '.claude/researcher.md',
		kind: 'asset',
		target: 'platform',
	},
	{
		id: 'product-method',
		label: 'Product method',
		source: '.specify/memory/',
		kind: 'asset',
		target: 'platform',
	},
	{
		id: 'research-notes',
		label: 'Research notes',
		source: 'research/notes.md',
		kind: 'artifact',
		target: 'platform',
	},
];

const copy = {
	target: {
		kicker: 'Current default',
		title: 'Targets own the agentic plumbing.',
		description:
			'Every repository becomes an accidental Home for methods, definitions, prompts, and working outputs.',
		caption: 'Trying a new method becomes a product change.',
		ledger: [
			['Product source', 'Mixed with agentic infrastructure'],
			['Business Assets', 'Copied between repositories'],
			['Working outputs', 'Scattered through Targets'],
			['Providers', 'Their formats become implicit sources'],
		],
	},
	home: {
		kicker: 'Home-first',
		title: 'The Home owns the agentic environment.',
		description:
			'The same providers and repositories remain. Ownership, continuity, and the path between them become explicit.',
		caption: 'Trying a new method becomes reversible.',
		ledger: [
			['Product source', 'Stays clean and product-owned'],
			['Business Assets', 'Canonical, reusable, inspectable'],
			['Working outputs', 'Return to the Desk as Artifacts'],
			['Providers', 'Become replaceable projections'],
		],
	},
} satisfies Record<Mode, {
	kicker: string;
	title: string;
	description: string;
	caption: string;
	ledger: string[][];
}>;

const itemStyle = {
	asset: 'border-copper/35 bg-copper/10 text-copper-dark',
	artifact: 'border-sky/40 bg-sky-soft text-sky',
};

function Item({ item, mode }: { item: AgenticItem; mode: Mode }) {
	return (
		<motion.span
			layoutId={`agentic-${item.id}`}
			transition={{ type: 'spring', stiffness: 310, damping: 32 }}
			className={`block border px-2.5 py-2 font-mono text-[0.62rem] leading-tight ${itemStyle[item.kind]}`}
		>
			<b className="block font-semibold">
				{mode === 'home' ? item.label : item.source}
			</b>
			{mode === 'home' && (
				<small className="mt-1 block opacity-65">
					{item.kind === 'asset' ? 'Agentic Asset' : 'Working Artifact'}
				</small>
			)}
		</motion.span>
	);
}

function Repository({
	repository,
	mode,
}: {
	repository: (typeof repositories)[number];
	mode: Mode;
}) {
	const items = agenticItems.filter((item) => item.target === repository.id);

	return (
		<motion.article
			layout
			layoutId={`repository-${repository.id}`}
			className="border border-line-strong bg-paper-soft"
		>
			<header className="flex items-center gap-2 border-b border-line px-3 py-2.5">
				<span className="grid size-5 place-items-center border border-line-strong font-mono text-[0.55rem] text-muted">
					T
				</span>
				<div>
					<small className="block text-[0.52rem] font-bold uppercase tracking-[0.12em] text-muted">
						Independent Target
					</small>
					<strong className="font-mono text-[0.72rem]">{repository.label}</strong>
				</div>
			</header>
			<div className="grid gap-1.5 p-3">
				{repository.files.map((file) => (
					<span
						className="border-l-2 border-line-strong pl-2 font-mono text-[0.62rem] text-muted"
						key={file}
					>
						{file}
					</span>
				))}
				{mode === 'target' && (
					<div className="mt-2 grid gap-1.5 border-t border-dashed border-line pt-2">
						{items.map((item) => (
							<Item item={item} mode={mode} key={item.id} />
						))}
					</div>
				)}
			</div>
			<footer className="border-t border-line px-3 py-2 text-[0.54rem] font-semibold uppercase tracking-[0.08em] text-muted">
				code · history · delivery
			</footer>
		</motion.article>
	);
}

export default function ParadigmShift() {
	const [mode, setMode] = useState<Mode>('target');
	const current = copy[mode];

	return (
		<MotionConfig reducedMotion="user">
			<LayoutGroup id="hairness-paradigm">
				<figure className="@container m-0 overflow-hidden border-y border-line-strong bg-paper-soft">
					<header className="grid gap-5 border-b border-line p-5 @min-3xl:grid-cols-[1fr_auto] @min-3xl:items-end @min-3xl:p-7">
						<div>
							<p className="mb-1 font-mono text-[0.58rem] font-bold uppercase tracking-[0.13em] text-copper">
								Flagship interactive explainer
							</p>
							<h3 className="m-0 text-2xl font-bold tracking-[-0.045em] @min-3xl:text-3xl">
								Same system. A different topology.
							</h3>
						</div>
						<div
							className="grid grid-cols-2 border border-line-strong bg-paper"
							role="group"
							aria-label="Agentic organization paradigm"
						>
							{(['target', 'home'] as const).map((value) => (
								<button
									type="button"
									aria-pressed={mode === value}
									onClick={() => setMode(value)}
									className={`min-h-12 px-4 text-left text-xs font-bold transition-colors ${
										mode === value
											? 'bg-ink text-white'
											: 'text-muted hover:bg-paper-deep hover:text-ink'
									}`}
									key={value}
								>
									<small className="block text-[0.5rem] uppercase tracking-[0.1em] opacity-65">
										{value === 'target' ? 'Current default' : 'New paradigm'}
									</small>
									{value === 'target' ? 'Target-first' : 'Home-first'}
								</button>
							))}
						</div>
					</header>

					<div className="grid gap-2 border-b border-line bg-ink px-5 py-4 text-white @min-3xl:grid-cols-[11rem_1fr] @min-3xl:px-7">
						<p className="m-0 font-mono text-[0.58rem] font-bold uppercase tracking-[0.1em] text-paper-deep">
							{current.kicker}
						</p>
						<div aria-live="polite">
							<strong className="block text-sm">{current.title}</strong>
							<p className="mt-1 max-w-2xl text-xs leading-relaxed text-white/60">
								{current.description}
							</p>
						</div>
					</div>

					<div className="v4-grid-paper p-4 @min-3xl:p-7">
						<section
							className="mb-5 grid gap-3 border border-line-strong bg-paper px-4 py-3 @min-3xl:grid-cols-[1fr_auto] @min-3xl:items-center"
							aria-label="Providers and generic utilities"
						>
							<div className="flex flex-wrap items-center gap-2">
								<small className="mr-1 text-[0.52rem] font-bold uppercase tracking-[0.1em] text-muted">
									Providers
								</small>
								{['Codex', 'Claude'].map((provider) => (
									<strong
										className="border border-line-strong bg-paper-soft px-2.5 py-1 font-mono text-[0.62rem]"
										key={provider}
									>
										{provider}
									</strong>
								))}
							</div>
							<p className="m-0 flex flex-wrap gap-1.5 text-[0.54rem] text-muted">
								<span>GitHub</span><span>·</span><span>Slack</span><span>·</span>
								<span>Ponytail</span>
								<small className="basis-full @min-3xl:basis-auto">
									generic utilities can remain Provider-managed
								</small>
							</p>
						</section>

						{mode === 'target' ? (
							<motion.div
								layout
								className="grid gap-3 @min-3xl:grid-cols-2"
								key="target-workspace"
							>
								{repositories.map((repository) => (
									<Repository repository={repository} mode={mode} key={repository.id} />
								))}
							</motion.div>
						) : (
							<motion.div
								layout
								className="grid gap-3 @min-5xl:grid-cols-[1.15fr_4rem_0.85fr]"
								key="home-workspace"
							>
								<motion.section
									layout
									initial={{ opacity: 0 }}
									animate={{ opacity: 1 }}
									className="border border-ink bg-paper-soft"
									aria-label="Hairness Home"
								>
									<header className="flex items-start justify-between gap-3 border-b border-line bg-ink px-4 py-3 text-white">
										<div>
											<small className="block text-[0.52rem] font-bold uppercase tracking-[0.12em] text-paper-deep">
												Source-owned environment
											</small>
											<strong className="text-base">Hairness Home</strong>
										</div>
										<span className="border border-white/30 px-2 py-1 font-mono text-[0.52rem]">
											Front Door
										</span>
									</header>
									<div className="grid gap-3 p-3 @min-3xl:grid-cols-2">
										<section className="border border-copper/35 bg-copper/5 p-3">
											<p className="mb-2 text-[0.54rem] font-bold uppercase tracking-[0.1em] text-copper-dark">
												Shared source · Assets
											</p>
											<div className="grid gap-1.5">
												{agenticItems
													.filter((item) => item.kind === 'asset')
													.map((item) => <Item item={item} mode={mode} key={item.id} />)}
											</div>
										</section>
										<section className="border border-sky/40 bg-sky-soft/45 p-3">
											<p className="mb-2 text-[0.54rem] font-bold uppercase tracking-[0.1em] text-sky">
												Private continuity · Desk
											</p>
											<div className="grid gap-1.5">
												{agenticItems
													.filter((item) => item.kind === 'artifact')
													.map((item) => <Item item={item} mode={mode} key={item.id} />)}
											</div>
										</section>
									</div>
									<footer className="flex flex-wrap gap-x-4 gap-y-1 border-t border-line px-4 py-2 text-[0.52rem] font-bold uppercase tracking-[0.08em] text-muted">
										<span>Owned</span><span>Inspectable</span><span>Versioned</span><span>Portable</span>
									</footer>
								</motion.section>

								<div className="grid place-items-center py-1 @max-5xl:grid-cols-[1fr_auto_1fr] @min-5xl:grid-rows-[1fr_auto_1fr]">
									<i className="h-px w-full bg-line-strong @min-5xl:h-full @min-5xl:w-px" />
									<span className="border border-line-strong bg-paper px-2 py-1 font-mono text-[0.5rem] font-bold uppercase tracking-[0.08em] text-muted">
										Bindings
									</span>
									<i className="h-px w-full bg-line-strong @min-5xl:h-full @min-5xl:w-px" />
								</div>

								<section className="grid content-start gap-3" aria-label="Independent product Targets">
									{repositories.map((repository) => (
										<Repository repository={repository} mode={mode} key={repository.id} />
									))}
								</section>
							</motion.div>
						)}
					</div>

					<div className="grid border-t border-line @min-3xl:grid-cols-4">
						{current.ledger.map(([label, value]) => (
							<p className="m-0 border-b border-line p-3 last:border-b-0 @min-3xl:border-r @min-3xl:border-b-0 @min-3xl:last:border-r-0" key={label}>
								<small className="block text-[0.5rem] font-bold uppercase tracking-[0.09em] text-muted">
									{label}
								</small>
								<strong className="mt-1 block text-[0.68rem] leading-snug">{value}</strong>
							</p>
						))}
					</div>

					<figcaption className="flex flex-wrap items-center justify-between gap-3 border-t border-line-strong px-5 py-4 @min-3xl:px-7">
						<strong className="text-sm">{current.caption}</strong>
						<span className="font-mono text-[0.54rem] uppercase tracking-[0.08em] text-muted">
							Same tools · same products · explicit ownership
						</span>
					</figcaption>
				</figure>
			</LayoutGroup>
		</MotionConfig>
	);
}
