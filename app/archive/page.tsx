import { IndexPage, IndexRow, IndexSection } from "@/components/index-list";
import { ARCHIVE, type ArchiveEntry } from "@/lib/archive";
import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "Archive",
	description:
		"Projects Brian Rabil has paused, stopped, or never built past planning.",
};

function ArchiveIcon({ entry }: { entry: ArchiveEntry }) {
	if (!entry.logo)
		return (
			<span className="text-[10px] text-fg-3 uppercase">
				{entry.name.slice(0, 1)}
			</span>
		);
	return (
		<>
			<img
				src={entry.logo.light}
				alt=""
				className="size-full object-cover dark:hidden"
			/>
			<img
				src={entry.logo.dark}
				alt=""
				className="hidden size-full object-cover dark:block"
			/>
		</>
	);
}

export default function ArchivePage() {
	return (
		<IndexPage title="Archive">
			{ARCHIVE.map((group, index) => (
				<IndexSection
					key={group.id}
					id={group.id}
					index={index}
					label={group.label}
					count={group.entries.length}
				>
					<ul className="grid">
						{group.entries.map((entry) => (
							<IndexRow
								key={entry.name}
								icon={<ArchiveIcon entry={entry} />}
								name={entry.name}
								description={
									entry.note
										? `${entry.description} ${entry.note}`
										: entry.description
								}
								meta={entry.years}
							/>
						))}
					</ul>
				</IndexSection>
			))}
		</IndexPage>
	);
}
