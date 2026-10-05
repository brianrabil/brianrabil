"use client";

import { cn } from "@/lib/utils";
import { Check, Copy } from "lucide-react";
import { useEffect, useState } from "react";

/** Copies `value` and confirms for 1.5 s. The label stays a verb. */
export function CopyButton({
	value,
	label,
	className,
}: {
	value: string;
	label: string;
	className?: string;
}) {
	const [copied, setCopied] = useState(false);

	useEffect(() => {
		if (!copied) return;
		const timer = setTimeout(() => setCopied(false), 1500);
		return () => clearTimeout(timer);
	}, [copied]);

	return (
		<button
			type="button"
			aria-label={label}
			onClick={async () => {
				try {
					await navigator.clipboard.writeText(value);
					setCopied(true);
				} catch {
					setCopied(false);
				}
			}}
			className={cn(
				"inline-flex size-7 shrink-0 items-center justify-center rounded-md text-fg-3 transition-colors duration-150 hover:bg-hover hover:text-fg active:bg-line",
				className,
			)}
		>
			{copied ? (
				<Check aria-hidden="true" className="size-3.5 text-success" />
			) : (
				<Copy aria-hidden="true" className="size-3.5" />
			)}
			<span aria-live="polite" className="sr-only">
				{copied ? "Copied" : ""}
			</span>
		</button>
	);
}
