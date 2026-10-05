import { CopyButton } from "@/components/copy-button";
import { IndexPage, IndexRow, IndexSection } from "@/components/index-list";
import { SKILL_GROUPS } from "@/lib/skills";
import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "Skills",
	description: "Agent skills published by Brian Rabil, with install commands.",
};

/** Skills nested below skills/<group>/ need --full-depth for the CLI to find them. */
function installCommand(repo: string, name: string, path: string) {
	const depth =
		path.startsWith("skills/") && path.split("/").length > 2
			? " --full-depth"
			: "";
	return `npx skills add ${repo}${depth} --skill ${name}`;
}

export default function SkillsPage() {
	return (
		<IndexPage title="Skills">
			{SKILL_GROUPS.map((group, index) => (
				<IndexSection
					key={group.id}
					id={group.id}
					index={index}
					label={group.label}
					count={group.skills.length}
				>
					<ul className="grid">
						{group.skills.map((skill) => (
							<IndexRow
								key={skill.name}
								href={`https://github.com/${group.repo}/tree/main/${skill.path}`}
								name={skill.name}
								description={skill.description}
								action={
									<CopyButton
										value={installCommand(group.repo, skill.name, skill.path)}
										label={`Copy install command for ${skill.name}`}
									/>
								}
							/>
						))}
					</ul>
				</IndexSection>
			))}
		</IndexPage>
	);
}
