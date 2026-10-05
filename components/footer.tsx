import { AdminLoginSheet } from "@/components/admin-login-sheet";
import { Container } from "@/components/container";
import { GitHubIcon, XIcon } from "@/components/social-icons";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { appConfig } from "@/lib/app-config";
import Link from "next/link";

const SITE_LINKS = [
	{ href: "/#fleet", label: "Products" },
	{ href: "/stack", label: "Stack" },
	{ href: "/skills", label: "Skills" },
	{ href: "/brand", label: "Brand" },
	{ href: "/finds", label: "Finds" },
	{ href: "/articles", label: "Essays" },
	{ href: "/archive", label: "Archive" },
];

/** Machine-readable versions of the site. */
const FEED_LINKS = [
	{ href: "/feed.xml", label: "RSS" },
	{ href: "/llms.txt", label: "llms.txt" },
	{ href: "/mcp.json", label: "MCP" },
];

const SOCIAL_LINKS = [
	{ href: appConfig.social.x.href, label: "X", Icon: XIcon },
	{ href: appConfig.social.github.href, label: "GitHub", Icon: GitHubIcon },
];

const linkClass =
	"inline-flex min-h-11 items-center text-sm text-fg-2 transition-colors duration-150 hover:text-fg md:min-h-0";

export function Footer() {
	return (
		<footer className="flex-none bg-frame">
			<Container className="flex flex-wrap items-center justify-between gap-6 pt-12 pb-10">
				<Link
					href="/"
					aria-label={`${appConfig.fullName}, home`}
					className="flex items-center gap-2"
				>
					<Avatar className="size-6">
						<AvatarImage src="/avatar.png" alt="" />
						<AvatarFallback className="text-[10px]">BR</AvatarFallback>
					</Avatar>
					<span className="text-lg font-extrabold lowercase tracking-tighter text-fg">
						brianrabil
					</span>
				</Link>
				<ul className="-mr-2.5 flex items-center gap-1">
					{SOCIAL_LINKS.map(({ href, label, Icon }) => (
						<li key={label}>
							<a
								href={href}
								target="_blank"
								rel="noopener noreferrer"
								aria-label={label}
								className="grid size-11 place-items-center rounded-full text-fg-2 transition-[color,background-color] duration-150 hover:bg-hover hover:text-fg md:size-9"
							>
								<Icon className="size-4 fill-current" />
							</a>
						</li>
					))}
					{/* TODO: remove `hidden` once auth is re-enabled. */}
					<li className="hidden">
						<AdminLoginSheet>
							<button type="button" className={linkClass}>
								Admin
							</button>
						</AdminLoginSheet>
					</li>
				</ul>
			</Container>

			<Container>
				<nav aria-label="Site" className="border-t border-line py-6">
					<ul className="flex flex-wrap gap-x-7 gap-y-1">
						{SITE_LINKS.map((link) => (
							<li key={link.href}>
								<Link href={link.href} className={linkClass}>
									{link.label}
								</Link>
							</li>
						))}
					</ul>
				</nav>
			</Container>

			<Container>
				<div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-2 border-t border-line py-5">
					<p className="text-xs tabular text-fg-3">
						© {new Date().getFullYear()} {appConfig.fullName}
					</p>
					<ul aria-label="Feeds" className="flex gap-5">
						{FEED_LINKS.map((link) => (
							<li key={link.href}>
								<a
									href={link.href}
									className="inline-flex min-h-11 items-center text-xs text-fg-3 transition-colors duration-150 hover:text-fg-2 md:min-h-0"
								>
									{link.label}
								</a>
							</li>
						))}
					</ul>
				</div>
			</Container>
		</footer>
	);
}
