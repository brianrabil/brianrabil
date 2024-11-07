import { Toaster } from "@/components/ui/sonner";
import { config } from "@/lib/config";
import type { Metadata } from "next";
import type React from "react";
import "@/app/globals.css";
import { Container } from "@/components/container";
import { Logo } from "@/components/logo";
import { Nav, NavLink } from "@/components/nav";
import { Button } from "@/components/ui/button";
import { RainbowButton } from "@/components/ui/rainbow-button";
import { ArrowUpRightIcon } from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
	title: "Brian Rabil",
	description: "Personal Website",
};

export default async function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en">
			<body className="bg-background ">
				{/* Header Nav */}
				<header className="flex items-center h-[96px] border-b">
					<Container className="flex justify-between items-center">
						{/* Left section: Logo */}
						<div className="text-2xl font-bold text-foreground">
							<Logo />
						</div>

						{/* Center section: Navigation */}
						<Nav>
							{config.nav.map((item) => (
								<NavLink key={item.href.toString()} href={item.href}>
									{item.name}
								</NavLink>
							))}
						</Nav>

						{/* Right section: Call to Action */}
						<Button type="button" variant="outline" asChild>
							<Link href="/contact">Book a call</Link>
						</Button>
					</Container>
				</header>

				<main>{children}</main>

				<Toaster />

				<footer className="flex flex-col mt-24">
					<div className="container relative">
						<div className="bg-blue-600 flex flex-row p-16 gap-x-24 rounded-xl absolute -top-[120px] left-0 right-0 z-10">
							<div className="flex flex-col w-1/2">
								<h3 className="text-4xl font-bold text-primary-foreground">
									Subscribe to my newsletter
								</h3>
								<p className="mt-4 text-primary-foreground text-lg">
									Join 10,000+ designers and get creative site breakdowns,
									design musings and tips every Monday.
								</p>
							</div>
							<div className="w-1/2">
								<form className="mt-6 flex justify-center gap-x-4 relative">
									<input
										type="email"
										placeholder="Enter your email"
										className="w-full pl-6 pr-40 text-ellipsis overflow-hidden text-nowrap py-4 bg-input/15 border border-input/20 placeholder:text-primary-foreground/50 transition-colors duration-300 hover:border-input/40 focus:border-input/80 text-primary-foreground focus:outline-none rounded-full"
									/>
									<Button
										type="button"
										size="lg"
										className="rounded-full absolute right-2 top-1/2 -translate-y-1/2"
									>
										Subscribe
									</Button>
								</form>
							</div>
						</div>
					</div>
					<div className="py-24 bg-foreground">
						<div className="container mx-auto relative mt-[120px]">
							{/* Newsletter Section */}

							{/* Main Footer */}
							<div className="flex flex-col gap-x-12 lg:flex-row justify-between items-center text-center lg:text-left">
								<div className="mb-8 lg:mb-0 max-w-lg flex flex-col gap-y-8 h-full justify-between items-start">
									<h4 className="text-4xl font-bold text-background">
										Getting ready for a new venture?
									</h4>
									<Button type="button" variant="secondary" size="lg" asChild>
										<Link href="/contact">
											Book a Call
											<ArrowUpRightIcon className="w-4 h-4 ml-2" />
										</Link>
									</Button>
								</div>

								{/* Contact and Social Links */}
								<div className="mt-8 lg:mt-0 max-w-md flex flex-col gap-y-8 h-full">
									<p className="text-background text-lg">
										Iced pumpkin ristretto irish trifecta robusta trade froth
										affogato barista con barista cappuccino filter roast.
									</p>
									<div className="grid grid-cols-3 gap-3">
										<Button
											type="button"
											variant="outline"
											asChild
											className="border-input/20 text-background bg-foreground hover:bg-background/10 hover:text-background transition-colors duration-300"
										>
											<a href="mailto:brian@brianrabil.com">Email me</a>
										</Button>
										<Button
											type="button"
											variant="outline"
											asChild
											className="border-input/20 text-background bg-foreground hover:bg-background/10 hover:text-background transition-colors duration-300"
										>
											<a href={config.social.x.href}>X</a>
										</Button>
										<Button
											type="button"
											variant="outline"
											asChild
											className="border-input/20 text-background bg-foreground hover:bg-background/10 hover:text-background transition-colors duration-300"
										>
											<a href={config.social.linkedin.href}>LinkedIn</a>
										</Button>
										<Button
											type="button"
											variant="outline"
											asChild
											className="border-input/20 text-background bg-foreground hover:bg-background/10 hover:text-background transition-colors duration-300"
										>
											<a href={config.social.github.href}>GitHub</a>
										</Button>
									</div>
								</div>
							</div>

							{/* Bottom Footer */}
							<div className="mt-24 border-t border-border/20 pt-12 flex flex-row justify-between items-center">
								<nav className="flex flex-row gap-x-8">
									{config.nav.map((item) => (
										<Link
											key={item.name}
											href={item.href}
											className="text-background"
										>
											{item.name}
										</Link>
									))}
								</nav>
								<p className="text-background/80">
									© 2024 Brian Rabil. All rights reserved.
								</p>
							</div>
						</div>
					</div>
				</footer>
			</body>
		</html>
	);
}
