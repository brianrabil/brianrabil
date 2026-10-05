"use client";

import { Container } from "@/components/container";
import { SiteSearch } from "@/components/site-search";
import { GitHubIcon, XIcon } from "@/components/social-icons";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
	HoverCard,
	HoverCardContent,
	HoverCardTrigger,
} from "@/components/ui/hover-card";
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "@/components/ui/tooltip";
import { appConfig } from "@/lib/app-config";
import type { SearchItem } from "@/lib/search-shared";
import { cn } from "@/lib/utils";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const NAV = [
	// An anchor on the home page, so it is never the current page.
	{ href: "/#fleet", label: "Products", shortcut: "p", match: () => false },
	{
		href: "/stack",
		label: "Stack",
		shortcut: "s",
		match: (path: string) => path.startsWith("/stack"),
	},
	{
		href: "/skills",
		label: "Skills",
		shortcut: "k",
		match: (path: string) => path.startsWith("/skills"),
	},
];

const iconButton =
	"grid size-11 place-items-center rounded-full text-fg-2 transition-[color,background-color,scale] duration-150 hover:bg-hover hover:text-fg active:scale-[0.94] active:duration-75 md:size-8";

function ThemeToggle() {
	const { resolvedTheme, setTheme } = useTheme();
	const [mounted, setMounted] = useState(false);

	useEffect(() => setMounted(true), []);

	// Dark is the default; render its toggle until the stored theme is known.
	const isDark = !mounted || resolvedTheme === "dark";
	const next = isDark ? "light" : "dark";

	return (
		<Tooltip>
			<TooltipTrigger asChild>
				<button
					type="button"
					onClick={() => setTheme(next)}
					className={iconButton}
					aria-label={`Switch to ${next} theme`}
				>
					{isDark ? <Sun className="size-4" /> : <Moon className="size-4" />}
				</button>
			</TooltipTrigger>
			<TooltipContent>{isDark ? "Light theme" : "Dark theme"}</TooltipContent>
		</Tooltip>
	);
}

function IconLink({
	href,
	label,
	children,
}: {
	href: string;
	label: string;
	children: React.ReactNode;
}) {
	return (
		<Tooltip>
			<TooltipTrigger asChild>
				<a
					href={href}
					target="_blank"
					rel="noopener noreferrer"
					aria-label={label}
					className={iconButton}
				>
					{children}
				</a>
			</TooltipTrigger>
			<TooltipContent>{label}</TooltipContent>
		</Tooltip>
	);
}

export function Header({ searchItems }: { searchItems: SearchItem[] }) {
	const pathname = usePathname();

	return (
		<header className="sticky top-0 z-40 border-b border-line bg-frame/90 backdrop-blur-sm">
			<TooltipProvider>
				<Container className="flex h-14 items-center gap-2 sm:gap-6">
					<HoverCard openDelay={400} closeDelay={120}>
						<HoverCardTrigger asChild>
							<Link
								href="/"
								aria-label={`${appConfig.fullName}, home`}
								className="-my-1 flex shrink-0 items-center gap-2 py-1"
							>
								<Avatar className="size-6">
									<AvatarImage src="/avatar.png" alt="" />
									<AvatarFallback className="text-[10px]">BR</AvatarFallback>
								</Avatar>
								<span className="hidden text-lg font-extrabold lowercase tracking-tighter text-fg sm:inline">
									brianrabil
								</span>
							</Link>
						</HoverCardTrigger>
						<HoverCardContent className="w-72" align="start" sideOffset={12}>
							<div className="flex gap-3">
								<Avatar className="size-10 shrink-0">
									<AvatarImage src="/avatar.png" alt="" />
									<AvatarFallback>BR</AvatarFallback>
								</Avatar>
								<div className="min-w-0">
									<p className="text-sm font-medium text-fg">
										{appConfig.fullName}
									</p>
									<p className="text-xs text-fg-3">@brianrabil</p>
								</div>
							</div>
						</HoverCardContent>
					</HoverCard>

					<nav aria-label="Primary">
						<ul className="flex items-center md:gap-1">
							{NAV.map((item) => {
								const active = item.match(pathname);
								return (
									<li key={item.href}>
										<Link
											href={item.href}
											aria-current={active ? "page" : undefined}
											className={cn(
												"inline-flex h-11 items-center rounded-md px-2 text-[13px] font-medium transition-colors duration-150 md:h-8 md:px-2.5",
												active ? "text-fg" : "text-fg-2 hover:text-fg",
											)}
										>
											{item.label}
											<span
												aria-hidden="true"
												className="ml-1.5 hidden text-[11px] font-normal text-fg-4 lg:inline"
											>
												{item.shortcut}
											</span>
										</Link>
									</li>
								);
							})}
						</ul>
					</nav>

					<ul className="-mr-2.5 ml-auto flex items-center md:mr-0 md:gap-1">
						<li>
							<SiteSearch items={searchItems} />
						</li>
						<li className="hidden sm:block">
							<IconLink href={appConfig.social.x.href} label="X">
								<XIcon className="size-4 fill-current" />
							</IconLink>
						</li>
						<li className="hidden sm:block">
							<IconLink href={appConfig.social.github.href} label="GitHub">
								<GitHubIcon className="size-4 fill-current" />
							</IconLink>
						</li>
						<li>
							<ThemeToggle />
						</li>
					</ul>
				</Container>
			</TooltipProvider>
		</header>
	);
}
