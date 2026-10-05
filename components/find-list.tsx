import { HoverList, HoverRow } from "@/components/hover-list";
import type { Find } from "@/lib/finds";
import { FIND_CATEGORY_LABEL } from "@/lib/finds-schema";
import { formatDateShort } from "@/lib/formatDate";

/** Dated index of finds: date, name and summary, category. */
export function FindList({ finds }: { finds: Find[] }) {
	return (
		<HoverList className="-mx-3">
			<ul className="grid">
				{finds.map((find) => (
					<li key={find.slug} className="border-t border-line first:border-t-0">
						<HoverRow
							value={find.slug}
							href={`/finds/${find.slug}`}
							className="grid gap-x-6 gap-y-2 px-3 py-5 sm:grid-cols-[7rem_minmax(0,1fr)_auto]"
						>
							<time
								dateTime={find.date}
								className="pt-0.5 text-xs tabular text-fg-2"
							>
								{formatDateShort(find.date)}
							</time>
							<div className="min-w-0">
								<h3 className="text-base font-medium tracking-[-0.01em] text-fg">
									{find.title}
								</h3>
								<p className="mt-1.5 text-sm leading-6 text-fg-2">
									{find.summary}
								</p>
							</div>
							<span className="hidden pt-0.5 text-xs text-fg-2 sm:block">
								{FIND_CATEGORY_LABEL[find.category]}
							</span>
						</HoverRow>
					</li>
				))}
			</ul>
		</HoverList>
	);
}
