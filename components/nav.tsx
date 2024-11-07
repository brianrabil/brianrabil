"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type React from "react";

type LinkProps = React.ComponentProps<typeof Link>;

export function NavLink({ href, children, className, ...restProps }: LinkProps) {
	const to = href.toString();
	const pathname = usePathname();
	const isActive = to === "/" ? pathname === to : pathname.startsWith(to);

	return (
		<Link
			href={href}
			className={cn(
				"relative font-medium",
				isActive ? "text-foreground font-semibold" : "text-muted-foreground",
				className,
			)}
			{...restProps}
		>
			{children}
			{!!isActive && (
				<div className="h-[3px] w-[16px] bg-foreground top-8 -translate-x-1/2 left-1/2 mx-auto absolute rounded-full" />
			)}
		</Link>
	);
}

export interface NavProps {
	className?: string;
	children?: React.ReactNode;
}

export function Nav({ children, className }: NavProps) {
	return <nav className={cn("flex items-center space-x-6", className)}>{children}</nav>;
}
