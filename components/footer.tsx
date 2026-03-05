import { AdminLoginSheet } from "@/components/admin-login-sheet";
import { ContainerInner, ContainerOuter } from "@/components/container";
import { appConfig } from "@/lib/app-config";
import Link from "next/link";

function VercelLogo({ className }: { className?: string }) {
	return (
		<svg
			className={className}
			viewBox="0 0 76 65"
			fill="currentColor"
			role="img"
			aria-label="Vercel"
		>
			<title>Vercel</title>
			<path d="M37.5274 0L75.0548 65H0L37.5274 0Z" />
		</svg>
	);
}

export function Footer() {
	return (
		<footer className="mt-32 flex-none">
			<div className="border-t border-border">
				<ContainerOuter>
						<ContainerInner>
							<div className="py-8 sm:py-10">
								<div className="space-y-4">
									<div>
										<p className="text-sm font-medium text-foreground">Brian Rabil</p>
										<p className="text-xs text-muted-foreground">Software products and AI systems</p>
									</div>
									<div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-muted-foreground">
										<Link href="/" className="hover:text-foreground transition-colors">
											Home
										</Link>
										<Link href="/#products" className="hover:text-foreground transition-colors">
											Products
										</Link>
										<Link href="/articles" className="hover:text-foreground transition-colors">
											Writing
										</Link>
										<Link
											href={appConfig.social.github.href}
											target="_blank"
											rel="noopener noreferrer"
											className="hover:text-foreground transition-colors"
										>
											GitHub
										</Link>
										<Link
											href={appConfig.social.x.href}
											target="_blank"
											rel="noopener noreferrer"
											className="hover:text-foreground transition-colors"
										>
											X
										</Link>
										<Link
											href={appConfig.social.linkedin.href}
											target="_blank"
											rel="noopener noreferrer"
											className="hover:text-foreground transition-colors"
										>
											LinkedIn
										</Link>
										<AdminLoginSheet>
											<button
												type="button"
												className="hover:text-foreground transition-colors cursor-pointer hidden"
											>
												Admin
											</button>
										</AdminLoginSheet>
									</div>
								</div>
							</div>

						<div className="flex items-center justify-between border-t border-border py-5">
							<p className="text-[10px] font-mono text-muted-foreground/40 tabular-nums">
								&copy; {new Date().getFullYear()} {appConfig.fullName}
							</p>
							<a
								href="https://vercel.com?utm_source=brianrabil&utm_campaign=oss"
								target="_blank"
								rel="noopener noreferrer"
								className="group inline-flex items-center gap-1.5 border border-border px-2 py-0.5 text-[10px] font-mono text-muted-foreground/50 transition-colors hover:text-muted-foreground hover:border-muted-foreground/30"
							>
								<span className="relative flex h-1 w-1">
									<span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-75" />
									<span className="relative inline-flex h-1 w-1 rounded-full bg-emerald-500" />
								</span>
								<span className="hidden sm:inline">Operational</span>
								<span className="h-2 w-px bg-border" />
								<VercelLogo className="h-2 w-auto" />
							</a>
						</div>
					</ContainerInner>
				</ContainerOuter>
			</div>
		</footer>
	);
}
