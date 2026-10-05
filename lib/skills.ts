/**
 * Agent skills published by Brian Rabil, read from github.com/brianrabil/skills
 * (SKILL.md files and the README tables) on 2026-10-05, plus the skills kept
 * in this site's own repo.
 */
export type Skill = {
	name: string;
	description: string;
	/** Repo path, for the GitHub link. */
	path: string;
};

export type SkillGroup = {
	id: string;
	label: string;
	/** The source passed to `npx skills add`. */
	repo: string;
	skills: Skill[];
};

export const SKILL_GROUPS: SkillGroup[] = [
	{
		id: "brand",
		label: "Brand",
		repo: "brianrabil/brianrabil",
		skills: [
			{
				name: "plain-voice",
				description:
					"Write product and interface copy in a plain, literal voice",
				path: ".claude/skills/plain-voice",
			},
		],
	},
	{
		id: "plan-mode",
		label: "Plan mode",
		repo: "brianrabil/skills",
		skills: [
			{
				name: "plan-mode-archaeology",
				description: "Find what changed, when, and why",
				path: "skills/plan-mode/archaeology",
			},
			{
				name: "plan-mode-audit",
				description: "Judge an artifact against a named standard",
				path: "skills/plan-mode/audit",
			},
			{
				name: "plan-mode-bounds",
				description: "Surface hard resource limits before planning",
				path: "skills/plan-mode/bounds",
			},
			{
				name: "plan-mode-brainstorm",
				description: "Generate distinct possibilities before selection",
				path: "skills/plan-mode/brainstorm",
			},
			{
				name: "plan-mode-brief",
				description: "Compress research into a decision-ready page",
				path: "skills/plan-mode/brief",
			},
			{
				name: "plan-mode-calibrate",
				description: "State how much you actually know before acting",
				path: "skills/plan-mode/calibrate",
			},
			{
				name: "plan-mode-clarify",
				description: "Resolve consequential ambiguity",
				path: "skills/plan-mode/clarify",
			},
			{
				name: "plan-mode-counsel",
				description:
					"Help weigh a consequential choice without deciding silently",
				path: "skills/plan-mode/counsel",
			},
			{
				name: "plan-mode-debate",
				description: "Test competing positions against shared criteria",
				path: "skills/plan-mode/debate",
			},
			{
				name: "plan-mode-decide",
				description: "Close open options and record the commitment",
				path: "skills/plan-mode/decide",
			},
			{
				name: "plan-mode-deep-research",
				description: "Investigate a complex question across competing evidence",
				path: "skills/plan-mode/deep-research",
			},
			{
				name: "plan-mode-docs",
				description: "Document plan-mode work as markdown in docs/plans/",
				path: "skills/plan-mode/docs",
			},
			{
				name: "plan-mode-estimate",
				description: "Size the work and name the unknowns",
				path: "skills/plan-mode/estimate",
			},
			{
				name: "plan-mode-explore",
				description: "Map viable approaches and tradeoffs",
				path: "skills/plan-mode/explore",
			},
			{
				name: "plan-mode-handoff",
				description: "Compress session state into a resumable artifact",
				path: "skills/plan-mode/handoff",
			},
			{
				name: "plan-mode-park",
				description: "Capture rejected and deferred work so it is not lost",
				path: "skills/plan-mode/park",
			},
			{
				name: "plan-mode-plan",
				description: "Set out an actionable sequence and acceptance checks",
				path: "skills/plan-mode/plan",
			},
			{
				name: "plan-mode-premortem",
				description: "Assume failure and work backward to causes",
				path: "skills/plan-mode/premortem",
			},
			{
				name: "plan-mode-prioritize",
				description: "Order work under real capacity",
				path: "skills/plan-mode/prioritize",
			},
			{
				name: "plan-mode-read-docs",
				description: "Extract the relevant contract from current documentation",
				path: "skills/plan-mode/read-docs",
			},
			{
				name: "plan-mode-reframe",
				description: "Challenge a stuck problem framing",
				path: "skills/plan-mode/reframe",
			},
			{
				name: "plan-mode-reroute",
				description: "Revise the route when assumptions or evidence change",
				path: "skills/plan-mode/reroute",
			},
			{
				name: "plan-mode-research",
				description: "Answer a bounded question with sources",
				path: "skills/plan-mode/research",
			},
			{
				name: "plan-mode-run",
				description: "Execute an accepted plan and record progress",
				path: "skills/plan-mode/run",
			},
			{
				name: "plan-mode-spec-lint",
				description: "Find what a spec leaves unstated",
				path: "skills/plan-mode/spec-lint",
			},
			{
				name: "plan-mode-sunset",
				description: "Kill a goal that is not worth pursuing",
				path: "skills/plan-mode/sunset",
			},
			{
				name: "plan-mode-teach",
				description: "Build understanding through explanation and checks",
				path: "skills/plan-mode/teach",
			},
			{
				name: "plan-mode-to-checklist",
				description: "Turn an accepted plan into an executable checklist",
				path: "skills/plan-mode/to-checklist",
			},
			{
				name: "plan-mode-to-epic",
				description: "Frame a coordinated outcome and its dependencies",
				path: "skills/plan-mode/to-epic",
			},
			{
				name: "plan-mode-to-prd",
				description: "Turn a product idea into a product requirements document",
				path: "skills/plan-mode/to-prd",
			},
			{
				name: "plan-mode-to-spec",
				description: "Define a testable implementation contract",
				path: "skills/plan-mode/to-spec",
			},
			{
				name: "plan-mode-to-tickets",
				description: "Split accepted work into executable tickets",
				path: "skills/plan-mode/to-tickets",
			},
			{
				name: "plan-mode-trace",
				description: "Follow one value through the system end to end",
				path: "skills/plan-mode/trace",
			},
			{
				name: "plan-mode-verify",
				description: "Check the result against acceptance with evidence",
				path: "skills/plan-mode/verify",
			},
			{
				name: "plan-mode-visualize",
				description: "Choose a useful visual form for a problem or decision",
				path: "skills/plan-mode/visualize",
			},
		],
	},
	{
		id: "writing",
		label: "Writing",
		repo: "brianrabil/skills",
		skills: [
			{
				name: "writing-bible",
				description: "Maintain fiction canon and continuity",
				path: "skills/writing/writing-bible",
			},
			{
				name: "writing-capture",
				description: "Capture raw material without imposing structure",
				path: "skills/writing/writing-capture",
			},
			{
				name: "writing-critique",
				description: "Diagnose problems without rewriting",
				path: "skills/writing/writing-critique",
			},
			{
				name: "writing-draft",
				description: "Grow prose block by block or scene by scene",
				path: "skills/writing/writing-draft",
			},
			{
				name: "writing-edit",
				description: "Tighten sentences while holding meaning fixed",
				path: "skills/writing/writing-edit",
			},
			{
				name: "writing-outline",
				description: "Settle the spine, story engine, and order before prose",
				path: "skills/writing/writing-outline",
			},
			{
				name: "writing-revise",
				description: "Change structure or substance deliberately",
				path: "skills/writing/writing-revise",
			},
			{
				name: "writing-verify",
				description: "Audit factual claims without silently deleting them",
				path: "skills/writing/writing-verify",
			},
			{
				name: "writing",
				description: "Route the request to the right writing stage",
				path: "skills/writing/writing",
			},
		],
	},
	{
		id: "marketkit",
		label: "Marketkit",
		repo: "brianrabil/skills",
		skills: [
			{
				name: "marketkit-to-ads",
				description: "Write placement-aware ad variants",
				path: "skills/marketkit/to-ads",
			},
			{
				name: "marketkit-to-campaign",
				description: "Turn a marketing idea into an approved campaign",
				path: "skills/marketkit/to-campaign",
			},
			{
				name: "marketkit-to-checklist",
				description: "Build the final publishing checklist",
				path: "skills/marketkit/to-checklist",
			},
			{
				name: "marketkit-to-email",
				description: "Write campaign email copy",
				path: "skills/marketkit/to-email",
			},
			{
				name: "marketkit-to-images",
				description: "Produce or specify channel-sized visual assets",
				path: "skills/marketkit/to-images",
			},
			{
				name: "marketkit-to-posts",
				description: "Write channel-native social posts",
				path: "skills/marketkit/to-posts",
			},
			{
				name: "marketkit-to-schedule",
				description: "Assign approved assets to dates and channels",
				path: "skills/marketkit/to-schedule",
			},
		],
	},
	{
		id: "agent-setup",
		label: "Agent setup",
		repo: "brianrabil/skills",
		skills: [
			{
				name: "create-rule",
				description:
					"Create portable AGENTS.md instructions or reusable skills instead of editor-specific rule files",
				path: "skills/create-rule",
			},
			{
				name: "docs-to-skill",
				description:
					"Turn documentation sites into lean skills backed by local references from llms.txt or sitemap.xml",
				path: "skills/docs-to-skill",
			},
		],
	},
];
