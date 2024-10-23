import type { Metadata } from "next";
import type React from "react";
import { Toaster } from "@/components/ui/sonner";
import { config } from "@/lib/config";
import "@/app/globals.css";
import Link from "next/link";
import { Container } from "@/components/container";
import { Button } from "@/components/ui/button";
import { Nav, NavLink } from "@/components/nav";
import { Logo } from "@/components/logo";

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
			<body className="bg-white dark:bg-black">
				{/* Header Nav */}
				<header className="flex items-center h-[96px] border-b border">
					<Container className="flex justify-between items-center">
						{/* Left section: Logo */}
						<div className="text-2xl font-bold text-gray-900">
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

				<footer className="bg-foreground text-white py-16">
					<div className="container mx-auto">
						{/* Newsletter Section */}
						<div className="bg-blue-600 p-8 rounded-lg text-center mb-12">
							<h3 className="text-3xl font-bold text-white">
								Subscribe to my newsletter
							</h3>
							<p className="mt-4 text-white text-opacity-75">
								Join 10,000+ designers and get creative site breakdowns, design
								musings and tips every Monday.
							</p>
							<form className="mt-6 flex justify-center">
								<input
									type="email"
									placeholder="Enter your email"
									className="w-full max-w-sm px-4 py-2 text-gray-900 rounded-md focus:outline-none"
								/>
								<button
									type="button"
									className="ml-4 px-6 py-2 bg-gray-800 text-white rounded-md hover:bg-gray-700 transition"
								>
									Subscribe
								</button>
							</form>
						</div>

						{/* Main Footer */}
						<div className="flex flex-col lg:flex-row justify-between items-center text-center lg:text-left">
							<div className="mb-8 lg:mb-0">
								<h4 className="text-3xl font-bold">
									Let’s make something great together
								</h4>
								<p className="mt-4 text-gray-400 max-w-md">
									Iced pumpkin ristretto irish trifecta robusta trade froth
									affogato barista con barista cappuccino filter roast.
								</p>
								<Button type="button" variant="secondary" asChild>
									<Link href="/contact">
										Book a call <span aria-hidden="true">→</span>
									</Link>
								</Button>
							</div>

							{/* Contact and Social Links */}
							<div className="mt-8 lg:mt-0">
								<div className="flex justify-center lg:justify-start space-x-6 mb-6">
									<a
										href="mailto:brian@brianrabil.com"
										className="hover:text-gray-400"
									>
										Email me
									</a>
									<a
										href={config.social.x.href}
										className="hover:text-gray-400"
									>
										X
									</a>
									<a
										href={config.social.linkedin.href}
										className="hover:text-gray-400"
									>
										LinkedIn
									</a>
									<a
										href={config.social.github.href}
										className="hover:text-gray-400"
									>
										GitHub
									</a>
								</div>
							</div>
						</div>

						{/* Bottom Footer */}
						<div className="mt-12 border-t border-gray-800 pt-8 text-center text-gray-500">
							<nav className="mb-4">
								{config.nav.map((item) => (
									<Link
										key={item.name}
										href={item.href}
										className="mr-4 hover:text-gray-400"
									>
										{item.name}
									</Link>
								))}
							</nav>
							<p>© 2024 Your Brand Name. All rights reserved.</p>
						</div>
					</div>
				</footer>
			</body>
		</html>
	);
}
