"use client";

import { actionClass } from "@/components/brand-kit/action-class";
import { cn } from "@/lib/utils";
import { useEffect, useRef, useState } from "react";

type CopyState = "idle" | "busy" | "copied" | "failed";

/** How long the confirmation stays before the label returns. */
const RESET_MS = 1500;

async function writeClipboard(
	text: string | undefined,
	src: string | undefined,
) {
	if (text !== undefined) {
		await navigator.clipboard.writeText(text);
		return;
	}
	if (!src) throw new Error("Nothing to copy");

	const load = fetch(src).then((response) => {
		if (!response.ok) throw new Error(`${src} returned ${response.status}`);
		return response.text();
	});

	// Safari needs the clipboard write to start inside the click, so hand it
	// the pending text rather than awaiting the fetch first.
	if (typeof ClipboardItem !== "undefined") {
		try {
			await navigator.clipboard.write([
				new ClipboardItem({
					"text/plain": load.then(
						(svg) => new Blob([svg], { type: "text/plain" }),
					),
				}),
			]);
			return;
		} catch {
			// Fall through to writeText for browsers without promise items.
		}
	}
	await navigator.clipboard.writeText(await load);
}

/**
 * Copies `text`, or the text of the file at `src`, to the clipboard. The label
 * swaps to "Copied" for 1.5 s without moving anything, and the result is
 * announced through a polite live region.
 */
export function CopyButton({
	label,
	subject,
	text,
	src,
	className,
}: {
	/** Visible verb, e.g. "Copy SVG". */
	label: string;
	/** What is being copied, read to screen readers, e.g. "Hyperpost mark, dark". */
	subject: string;
	text?: string;
	src?: string;
	className?: string;
}) {
	const [state, setState] = useState<CopyState>("idle");
	const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

	useEffect(
		() => () => {
			if (timer.current) clearTimeout(timer.current);
		},
		[],
	);

	async function copy() {
		if (state === "busy") return;
		if (timer.current) clearTimeout(timer.current);
		setState("busy");
		let next: CopyState = "copied";
		try {
			await writeClipboard(text, src);
		} catch {
			next = "failed";
		}
		setState(next);
		// A failure stays up a little longer so it can be read.
		timer.current = setTimeout(
			() => setState("idle"),
			next === "failed" ? RESET_MS * 2 : RESET_MS,
		);
	}

	const shown =
		state === "copied" ? "Copied" : state === "failed" ? "Copy failed" : label;

	return (
		<>
			<button
				type="button"
				onClick={copy}
				// aria-disabled rather than disabled, so focus stays on the button.
				aria-disabled={state === "busy" || undefined}
				data-state={state}
				className={cn(actionClass, "inline-grid", className)}
			>
				{/* Every label sits in one cell so the button keeps its widest width. */}
				{[label, "Copied", "Copy failed"].map((option) => (
					<span
						key={option}
						aria-hidden="true"
						className={cn(
							"col-start-1 row-start-1 text-center",
							option === shown ? "visible" : "invisible",
						)}
					>
						{option}
					</span>
				))}
				<span className="sr-only">
					{label} for {subject}
				</span>
			</button>
			<output aria-live="polite" className="sr-only">
				{state === "copied"
					? `Copied ${subject}`
					: state === "failed"
						? `Couldn’t copy ${subject}. Try again.`
						: ""}
			</output>
		</>
	);
}
