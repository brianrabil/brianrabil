"use client";

import { PAGE_SHORTCUTS, type SearchItem } from "@/lib/search-shared";
import { cn } from "@/lib/utils";
import * as Dialog from "@radix-ui/react-dialog";
import { ArrowUpRight, Search } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";

const RESULT_LIMIT = 40;

function score(item: SearchItem, query: string) {
	const title = item.title.toLowerCase();
	if (title === query) return 0;
	if (title.startsWith(query)) return 1;
	if (title.includes(query)) return 2;
	if (item.description.toLowerCase().includes(query)) return 3;
	if (item.kind.toLowerCase().startsWith(query)) return 4;
	return -1;
}

function isTyping(target: EventTarget | null) {
	if (!(target instanceof HTMLElement)) return false;
	return (
		target.isContentEditable ||
		["INPUT", "TEXTAREA", "SELECT"].includes(target.tagName)
	);
}

/**
 * ⌘K or / opens search; single keys open pages (see PAGE_SHORTCUTS). Both are
 * keyboard actions, so nothing animates.
 */
export function SiteSearch({ items }: { items: SearchItem[] }) {
	const router = useRouter();
	const [open, setOpen] = useState(false);
	const [query, setQuery] = useState("");
	const [active, setActive] = useState(0);
	const listRef = useRef<HTMLUListElement>(null);

	useEffect(() => {
		function onKeyDown(event: KeyboardEvent) {
			if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
				event.preventDefault();
				setOpen((value) => !value);
				return;
			}
			if (open || event.metaKey || event.ctrlKey || event.altKey) return;
			if (isTyping(event.target)) return;
			if (event.key === "/") {
				event.preventDefault();
				setOpen(true);
				return;
			}
			const page = PAGE_SHORTCUTS.find((item) => item.key === event.key);
			if (page) router.push(page.href);
		}
		window.addEventListener("keydown", onKeyDown);
		return () => window.removeEventListener("keydown", onKeyDown);
	}, [open, router]);

	const results = useMemo(() => {
		const q = query.trim().toLowerCase();
		if (!q) return items.filter((item) => item.kind === "Page");
		return items
			.map((item) => ({ item, rank: score(item, q) }))
			.filter((entry) => entry.rank >= 0)
			.sort((a, b) => a.rank - b.rank)
			.slice(0, RESULT_LIMIT)
			.map((entry) => entry.item);
	}, [items, query]);

	useEffect(() => {
		listRef.current
			?.querySelector<HTMLElement>(`[data-index="${active}"]`)
			?.scrollIntoView({ block: "nearest" });
	}, [active]);

	function go(item: SearchItem) {
		setOpen(false);
		setQuery("");
		if (item.external) window.open(item.href, "_blank", "noopener,noreferrer");
		else router.push(item.href);
	}

	return (
		<Dialog.Root
			open={open}
			onOpenChange={(value) => {
				setOpen(value);
				if (!value) setQuery("");
			}}
		>
			<Dialog.Trigger asChild>
				<button
					type="button"
					className="flex h-11 items-center gap-2 rounded-md px-2 text-fg-2 transition-colors duration-150 hover:bg-hover hover:text-fg active:bg-line md:h-8 md:border md:border-line md:bg-raised md:pr-1.5 md:pl-2.5"
				>
					<Search aria-hidden="true" className="size-4 md:size-3.5" />
					<span className="sr-only md:not-sr-only md:text-[13px]">Search</span>
					<kbd className="hidden rounded border border-line px-1 text-[11px] text-fg-3 md:inline">
						⌘K
					</kbd>
				</button>
			</Dialog.Trigger>
			<Dialog.Portal>
				<Dialog.Overlay className="fixed inset-0 z-50 bg-black/50" />
				<Dialog.Content
					aria-describedby={undefined}
					className="fixed top-[12vh] left-1/2 z-50 flex max-h-[70vh] w-[calc(100%-2rem)] max-w-xl -translate-x-1/2 flex-col overflow-hidden rounded-xl border border-line-2 bg-frame shadow-2xl"
					onKeyDown={(event) => {
						if (event.key === "ArrowDown") {
							event.preventDefault();
							setActive((i) => Math.min(i + 1, results.length - 1));
						} else if (event.key === "ArrowUp") {
							event.preventDefault();
							setActive((i) => Math.max(i - 1, 0));
						} else if (event.key === "Enter" && results[active]) {
							event.preventDefault();
							go(results[active]);
						}
					}}
				>
					<Dialog.Title className="sr-only">Search the site</Dialog.Title>
					<div className="flex items-center gap-3 border-b border-line px-4">
						<Search aria-hidden="true" className="size-4 shrink-0 text-fg-3" />
						<input
							value={query}
							onChange={(event) => {
								setQuery(event.target.value);
								setActive(0);
							}}
							placeholder="Search products, tools, skills, finds"
							aria-label="Search"
							aria-controls="site-search-results"
							className="h-12 min-w-0 flex-1 bg-transparent text-[15px] text-fg outline-none placeholder:text-fg-4"
						/>
						<kbd className="rounded border border-line px-1.5 text-[11px] text-fg-3">
							Esc
						</kbd>
					</div>
					{results.length === 0 ? (
						<p className="px-4 py-10 text-center text-sm text-fg-3">
							Nothing matches “{query.trim()}”.
						</p>
					) : (
						<ul
							ref={listRef}
							id="site-search-results"
							aria-label="Results"
							className="overflow-y-auto p-1.5"
						>
							{results.map((item, index) => (
								<li key={`${item.kind}-${item.title}-${item.href}`}>
									<button
										type="button"
										tabIndex={-1}
										data-index={index}
										aria-current={index === active ? "true" : undefined}
										onMouseMove={() => setActive(index)}
										onClick={() => go(item)}
										className={cn(
											"flex w-full items-start gap-3 rounded-md px-2.5 py-2 text-left",
											index === active && "bg-hover",
										)}
									>
										<span className="w-14 shrink-0 pt-0.5 text-[11px] text-fg-4">
											{item.kind}
										</span>
										<span className="min-w-0 flex-1 text-sm leading-6">
											<span className="font-medium text-fg">{item.title}</span>
											<span className="ml-2 text-fg-3">{item.description}</span>
										</span>
										{item.external ? (
											<ArrowUpRight
												aria-hidden="true"
												className="mt-1.5 size-3.5 shrink-0 text-fg-4"
											/>
										) : null}
									</button>
								</li>
							))}
						</ul>
					)}
					<p aria-live="polite" className="sr-only">
						{query.trim() ? `${results.length} results` : ""}
					</p>
				</Dialog.Content>
			</Dialog.Portal>
		</Dialog.Root>
	);
}
