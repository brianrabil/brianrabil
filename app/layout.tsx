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
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Footer } from "@/components/footer";
import { TypographyP } from "@/components/typography";

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
				<header className="flex items-center h-[96px] max-w-[100vw] overflow-x-hidden">
					<Container className="flex justify-between items-center">
						{/* Left section: Logo */}
						<div className="text-2xl font-bold text-foreground">
							<Logo />
						</div>

						{/* Center section: Navigation */}
						<Nav>
							{config.nav.map((item) => (
								<NavLink key={item.href.toString()} href={item.href}>
									<TypographyP>{item.name}</TypographyP>
								</NavLink>
							))}
						</Nav>

						{/* Right section: Call to Action */}
						<Button type="button" variant="secondary" size="lg" asChild>
							<Link href="/contact">Book a call</Link>
						</Button>
					</Container>
				</header>

				<main className="max-w-[100vw] overflow-x-hidden">{children}</main>
				<Toaster />
				<Footer />
				<Analytics />
				<SpeedInsights />
			</body>
		</html>
	);
}
