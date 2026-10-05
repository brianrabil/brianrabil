import { Container } from "@/components/container";

/** Matches SimpleLayout's header so nothing jumps when the page arrives. */
export default function Loading() {
	return (
		// biome-ignore lint/a11y/useSemanticElements: <output> only allows phrasing content; this status wraps block skeletons.
		<div
			role="status"
			aria-busy="true"
			aria-label="Loading"
			className="border-b border-line"
		>
			<Container className="pt-24 pb-16 sm:pt-32 lg:pb-20">
				<div className="h-3 w-20 rounded-sm bg-hover" />
				<div className="mt-6 h-12 w-3/4 max-w-2xl rounded-md bg-hover sm:h-16" />
				<div className="mt-6 h-5 w-full max-w-xl rounded-sm bg-hover" />
				<div className="mt-3 h-5 w-2/3 max-w-md rounded-sm bg-hover" />
			</Container>
		</div>
	);
}
