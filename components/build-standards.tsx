/**
 * The bar a change has to clear, taken from the standards files in the
 * product repos (vswarm lat.md/craft.md) and the shared tooling policy.
 * Every line is something a reviewer can check.
 */
const STANDARDS = [
	{
		title: "Every state is built",
		body: "Loading, empty, and error ship with the happy path, not after it.",
	},
	{
		title: "Checked in a real browser",
		body: "Clicked, typed, and submitted the way a person would, at desktop and phone width, in light and dark. A screenshot does not count.",
	},
	{
		title: "Tokens only",
		body: "Colour, spacing, radius, type, and easing come from the design tokens. No raw values.",
	},
	{
		title: "Keyboard actions are instant",
		body: "Anything done many times a day does not animate.",
	},
	{
		title: "Motion has one purpose",
		body: "An animation that does not show where something came from or went is cut. Reduced motion is respected everywhere.",
	},
	{
		title: "Works without a mouse",
		body: "Every control is reachable with Tab and shows a visible focus ring.",
	},
	{
		title: "TypeScript on Bun, Zig, or Rust",
		body: "TypeScript on Bun for apps and servers, Zig or Rust for native code. No JavaScript files and no helper scripts.",
	},
	{
		title: "Conventions checked in CI",
		body: "Konsistent checks file types and layout on every push, so the rules do not depend on anyone remembering them.",
	},
];

export function BuildStandards() {
	return (
		<ol className="grid">
			{STANDARDS.map((standard, index) => (
				<li
					key={standard.title}
					className="grid grid-cols-[2.5rem_minmax(0,1fr)] border-t border-line py-5 first:border-t-0 first:pt-0"
				>
					<span className="text-xs leading-6 tabular text-fg-3">
						{String(index + 1).padStart(2, "0")}
					</span>
					<div>
						<h3 className="font-medium tracking-[-0.01em] text-fg">
							{standard.title}
						</h3>
						<p className="mt-1 text-sm leading-6 text-fg-2">{standard.body}</p>
					</div>
				</li>
			))}
		</ol>
	);
}
