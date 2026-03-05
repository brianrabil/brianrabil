"use client";

import { TextScramble } from "@/components/ui/text-scramble";
import { CanvasText } from "@/components/ui/canvas-text";

export function HeroHeading() {
	return (
		<h1 className="font-heading text-5xl tracking-tight text-foreground sm:text-7xl">
			<CanvasText
				text="Building the"
				backgroundClassName="bg-background dark:bg-background"
				colors={[
					"rgba(99, 102, 241, 1)",
					"rgba(99, 102, 241, 0.8)",
					"rgba(99, 102, 241, 0.6)",
					"rgba(99, 102, 241, 0.4)",
					"rgba(99, 102, 241, 0.2)",
					"rgba(99, 102, 241, 0.1)",
				]}
				lineGap={4}
				animationDuration={20}
			/>
			<br />
			<TextScramble
				as="span"
				className="text-muted-foreground"
				duration={1.2}
				speed={0.04}
			>
				post-labor stack.
			</TextScramble>
		</h1>
	);
}
