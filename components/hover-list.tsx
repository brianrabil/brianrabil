"use client";

import { cn } from "@/lib/utils";
import {
	AnimatePresence,
	LayoutGroup,
	MotionConfig,
	motion,
} from "motion/react";
import Link from "next/link";
import { createContext, useContext, useId, useState } from "react";

const HoverContext = createContext<{
	hovered: string | null;
	setHovered: (value: string | null) => void;
	layoutId: string;
} | null>(null);

/**
 * A list whose rows share one highlight that glides to the row under the
 * pointer. Reads as one object instead of rows lighting up independently.
 */
export function HoverList({
	className,
	children,
}: {
	className?: string;
	children: React.ReactNode;
}) {
	const [hovered, setHovered] = useState<string | null>(null);
	const layoutId = useId();

	return (
		<HoverContext.Provider value={{ hovered, setHovered, layoutId }}>
			<MotionConfig reducedMotion="user">
				<LayoutGroup id={layoutId}>
					<div className={className} onPointerLeave={() => setHovered(null)}>
						{children}
					</div>
				</LayoutGroup>
			</MotionConfig>
		</HoverContext.Provider>
	);
}

export function HoverRow({
	value,
	href,
	external,
	className,
	children,
	...props
}: {
	value: string;
	href: string;
	external?: boolean;
	className?: string;
	children: React.ReactNode;
} & Omit<React.ComponentPropsWithoutRef<"a">, "href">) {
	const context = useContext(HoverContext);
	const active = context?.hovered === value;

	return (
		<Link
			href={href}
			target={external ? "_blank" : undefined}
			rel={external ? "noopener noreferrer" : undefined}
			onPointerEnter={(event) => {
				if (event.pointerType === "mouse") context?.setHovered(value);
			}}
			className="group/row relative block rounded-lg outline-offset-0 transition-colors duration-100 active:bg-hover"
			{...props}
		>
			<AnimatePresence>
				{active ? (
					<motion.span
						aria-hidden="true"
						layoutId={context?.layoutId}
						className="absolute inset-0 rounded-lg bg-hover transition-colors duration-100 group-active/row:bg-line"
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0, transition: { duration: 0.15 } }}
						transition={{
							type: "spring",
							stiffness: 650,
							damping: 45,
							mass: 0.5,
						}}
					/>
				) : null}
			</AnimatePresence>
			<div className={cn("relative", className)}>{children}</div>
		</Link>
	);
}

/** A row with nothing to open. Clears the highlight so it never implies a link. */
export function HoverStaticRow({
	className,
	children,
}: {
	className?: string;
	children: React.ReactNode;
}) {
	const context = useContext(HoverContext);

	return (
		<div className={className} onPointerEnter={() => context?.setHovered(null)}>
			{children}
		</div>
	);
}
