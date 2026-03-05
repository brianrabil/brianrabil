"use client";

import { Container } from "@/components/container";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { appConfig } from "@/lib/app-config";
import { cn } from "@/lib/utils";
import { Calendar, MapPin, Sun, Moon, Rss } from "lucide-react";
import Link from "next/link"
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

function GitHubIcon(props: React.ComponentPropsWithoutRef<"svg">) {
	return (
		<svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
			<path
				fillRule="evenodd"
				clipRule="evenodd"
				d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2Z"
			/>
		</svg>
	);
}

function XIcon(props: React.ComponentPropsWithoutRef<"svg">) {
	return (
		<svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
			<path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
		</svg>
	);
}

function ThemeToggle() {
	const { resolvedTheme, setTheme } = useTheme();
	const [mounted, setMounted] = useState(false);

	useEffect(() => setMounted(true), []);

	return (
		<button
			onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
			className="inline-flex h-8 w-8 items-center justify-center text-foreground/60 dark:text-foreground/70 transition-colors hover:text-foreground cursor-pointer"
			aria-label="Toggle theme"
		>
			{mounted ? (
				resolvedTheme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />
			) : (
				<Sun className="h-4 w-4" />
			)}
		</button>
	);
}

export function Header() {
	const [scrolled, setScrolled] = useState(false);

	useEffect(() => {
		function onScroll() {
			setScrolled(window.scrollY > 10);
		}
		onScroll();
		window.addEventListener("scroll", onScroll, { passive: true });
		return () => window.removeEventListener("scroll", onScroll);
	}, []);

	return (
		<header
			className={cn(
				"fixed top-0 left-0 right-0 z-50 transition-[background-color,border-color] duration-300",
				scrolled
					? "border-b border-border/50 bg-background"
					: "border-b border-transparent bg-transparent",
			)}
		>
			<Container>
				<div className="flex h-12 items-center justify-between gap-4">
					<HoverCard openDelay={100} closeDelay={100}>
						<HoverCardTrigger asChild>
							<Link href="/" className="inline-flex items-center gap-2 text-sm font-medium text-foreground hover:text-foreground/80 transition-colors">
								<Avatar className="size-5">
									<AvatarImage src="/avatar.png" alt="Brian Rabil" />
									<AvatarFallback className="text-[8px]">BR</AvatarFallback>
								</Avatar>
								@brianrabil
							</Link>
						</HoverCardTrigger>
						<HoverCardContent className="w-72" align="start">
							<div className="flex gap-3">
								<Avatar className="size-10 shrink-0">
									<AvatarImage src="/avatar.png" alt="Brian Rabil" />
									<AvatarFallback>BR</AvatarFallback>
								</Avatar>
								<div className="space-y-1">
									<div>
										<p className="text-sm font-medium">{appConfig.fullName}</p>
										<p className="text-muted-foreground text-xs">@brianrabil</p>
									</div>
									<p className="text-sm text-foreground">{appConfig.jobTitle}</p>
									<div className="flex flex-wrap items-center gap-x-3 gap-y-1 pt-1">
										<div className="flex items-center gap-1">
											<MapPin className="size-3 text-muted-foreground/60" />
											<span className="text-muted-foreground text-xs">{appConfig.location}</span>
										</div>
										<div className="flex items-center gap-1">
											<Calendar className="size-3 text-muted-foreground/60" />
											<span className="text-muted-foreground text-xs">Building since 2014</span>
										</div>
									</div>
								</div>
							</div>
						</HoverCardContent>
					</HoverCard>
					<nav aria-label="Primary">
						<ul className="flex items-center gap-1">
							<li>
								<Link
									href={appConfig.social.x.href}
									className="inline-flex h-8 w-8 items-center justify-center text-foreground/60 dark:text-foreground/70 transition-colors hover:text-foreground"
									target="_blank"
									rel="noopener noreferrer"
									aria-label="X (Twitter)"
								>
									<XIcon className="h-4 w-4 fill-current" />
								</Link>
							</li>
							<li>
								<Link
									href={appConfig.social.github.href}
									className="inline-flex h-8 w-8 items-center justify-center text-foreground/60 dark:text-foreground/70 transition-colors hover:text-foreground"
									target="_blank"
									rel="noopener noreferrer"
									aria-label="GitHub"
								>
									<GitHubIcon className="h-4 w-4 fill-current" />
								</Link>
							</li>
							<li>
								<Link
									href={appConfig.social.rss.href}
									className="inline-flex h-8 w-8 items-center justify-center text-foreground/60 dark:text-foreground/70 transition-colors hover:text-foreground"
									aria-label="RSS Feed"
								>
									<Rss className="h-4 w-4" />
								</Link>
							</li>
							<li>
								<ThemeToggle />
							</li>
						</ul>
					</nav>
				</div>
			</Container>
		</header>
	);
}
