import { IndexPage, IndexRow, IndexSection } from "@/components/index-list";
import { StackIcon } from "@/components/stack-icons";
import { STACK } from "@/lib/stack";
import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "Stack",
	description: "Tools and libraries used across Brian Rabil’s products.",
};

export default function StackPage() {
	return (
		<IndexPage title="Stack">
			{STACK.map((layer, index) => (
				<IndexSection
					key={layer.id}
					id={layer.id}
					index={index}
					label={layer.label}
					count={layer.entries.length}
				>
					<ul className="grid">
						{layer.entries.map((entry) => (
							<IndexRow
								key={entry.name}
								href={entry.href}
								icon={<StackIcon name={entry.icon} bare className="size-3.5" />}
								name={entry.name}
								description={entry.role}
							/>
						))}
					</ul>
				</IndexSection>
			))}
		</IndexPage>
	);
}
