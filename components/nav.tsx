"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";
import type React from "react";
import { usePathname } from "next/navigation";

type LinkProps = React.ComponentProps<typeof Link>;

export function NavLink({
	href,
	children,
	className,
	...restProps
}: LinkProps) {
	const to = href.toString();
	const pathname = usePathname();
	const isActive = to === "/" ? pathname === to : pathname.startsWith(to);

	return (
		<Link
			href={href}
			className={cn(
				"relative font-medium",
				isActive ? "text-foreground" : "text-muted-foreground",
				className,
			)}
			{...restProps}
		>
			{children}
			{!!isActive && (
				<div className="h-[2px] w-[16px] bg-foreground top-8 -translate-x-1/2 left-1/2 mx-auto absolute rounded-full" />
			)}
		</Link>
	);
}

export interface NavProps {
	className?: string;
	children?: React.ReactNode;
}

export function Nav({ children, className }: NavProps) {
	return (
		<nav className={cn("flex items-center space-x-6", className)}>
			{children}
		</nav>
	);
}
