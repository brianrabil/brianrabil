import { Container } from "@/components/container";
import { FindList } from "@/components/find-list";
import { SimpleLayout } from "@/components/simple-layout";
import { getAllFinds } from "@/lib/finds";
import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "Finds",
	description:
		"New open-source AI libraries and projects, with a short note on what each one does and how to try it.",
};

export default async function FindsPage() {
	const finds = await getAllFinds();

	return (
		<>
			<SimpleLayout title="Finds">
				{finds.length > 0 ? (
					<div className="max-w-4xl">
						<FindList finds={finds} />
					</div>
				) : (
					<div className="max-w-4xl rounded-xl border border-dashed border-line-2 px-6 py-12 text-center">
						<p className="text-sm text-fg">No finds yet</p>
					</div>
				)}
			</SimpleLayout>
			<section aria-label="RSS" className="border-b border-line">
				<Container className="py-8">
					<p className="text-sm text-fg-2">
						Follow new finds with the{" "}
						<a
							href="/feed.xml"
							className="text-fg underline decoration-fg-3 underline-offset-4 transition-colors duration-150 hover:decoration-fg"
						>
							RSS feed
						</a>
						.
					</p>
				</Container>
			</section>
		</>
	);
}
