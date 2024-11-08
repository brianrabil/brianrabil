"use client";

import { config } from "@/lib/config";
import type React from "react";
import { Container } from "@/components/container";
import { Logo } from "@/components/logo";
import { Button } from "@/components/ui/button";
import { ArrowUpRightIcon } from "lucide-react";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import { MailIcon } from "lucide-react";
import { SocialIcon } from "react-social-icons";

export function Footer() {
	return (
		<footer className="flex flex-col">
			<div className="relative -mb-[1px]">
				<Container>
					<Card className="bg-blue-600 border-none p-6 md:p-14 flex shadow-xl flex-col md:flex-row md:gap-x-5 lg:gap-x-24 rounded-xl">
						<div className="flex flex-col w-full md:w-1/2">
							<h3 className="text-4xl text-center md:text-left leading-tight font-bold text-primary-foreground">
								Subscribe to my newsletter
							</h3>
							<p className="mt-4 text-center md:text-left text-primary-foreground text-lg">
								Join 10,000+ designers and get creative site breakdowns, design musings and tips
								every Monday.
							</p>
						</div>
						<div className="w-full md:w-1/2 flex items-center">
							<form className="mt-6 flex justify-center gap-x-4 relative w-full">
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
					</Card>
				</Container>
				<div className="w-full absolute bottom-0 h-1/2 bg-foreground -z-10" />
			</div>
			<div className="py-12 md:py-20 lg:py-24 bg-foreground">
				<Container>
					<div className="grid grid-cols-1 md:grid-cols-2 gap-12">
						{/* Call to Action */}
						<div className="md:max-w-lg ms-center flex flex-col gap-y-8 h-full items-center md:items-start">
							<h4 className="text-4xl font-bold text-background text-center md:text-left">
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
						<div className="max-w-md flex flex-col gap-y-8 h-full md:ml-auto">
							<p className="text-background text-lg">
								Iced pumpkin ristretto irish trifecta robusta trade froth affogato barista con
								barista cappuccino filter roast.
							</p>
							<div className="grid grid-cols-2 md:grid-cols-3 gap-3">
								<Button
									type="button"
									variant="outline"
									asChild
									className="border-input/20 text-background bg-foreground hover:bg-background/10 hover:text-background transition-colors duration-300"
								>
									<a href={config.social.email.href}>
										<MailIcon className="w-4 h-4 mr-2" />
										Email me
									</a>
								</Button>
								<Button
									type="button"
									variant="outline"
									asChild
									className="border-input/20 text-background bg-foreground hover:bg-background/10 hover:text-background transition-colors duration-300"
								>
									<a href={config.social.x.href}>
										<SocialIcon
											network="x"
											bgColor="transparent"
											className="max-h-7 max-w-7 mr-0.5 -ml-4"
											as="span"
										/>
										@{config.social.x.username}
									</a>
								</Button>
								<Button
									type="button"
									variant="outline"
									asChild
									className="border-input/20 text-background bg-foreground hover:bg-background/10 hover:text-background transition-colors duration-300"
								>
									<a href={config.social.linkedin.href}>
										<SocialIcon
											network="linkedin"
											bgColor="transparent"
											className="max-h-7 max-w-7 mr-0.5 -ml-4"
											as="span"
										/>
										{config.social.linkedin.network}
									</a>
								</Button>
								<Button
									type="button"
									variant="outline"
									asChild
									className="border-input/20 text-background bg-foreground hover:bg-background/10 hover:text-background transition-colors duration-300"
								>
									<a href={config.social.github.href}>
										<SocialIcon
											network="github"
											bgColor="transparent"
											className="max-h-7 max-w-7 mr-0.5 -ml-4"
											as="span"
										/>
										{config.social.github.network}
									</a>
								</Button>
								<Button
									type="button"
									variant="outline"
									asChild
									className="border-input/20 text-background bg-foreground hover:bg-background/10 hover:text-background transition-colors duration-300"
								>
									<a href={config.social.github.href}>
										<SocialIcon
											network="tiktok"
											bgColor="transparent"
											className="max-h-7 max-w-7 mr-0.5 -ml-4"
											as="span"
										/>
										{config.social.tiktok.network}
									</a>
								</Button>
								<Button
									type="button"
									variant="outline"
									asChild
									className="border-input/20 text-background bg-foreground hover:bg-background/10 hover:text-background transition-colors duration-300"
								>
									<a href={config.social.github.href}>
										<SocialIcon
											network="rss"
											bgColor="transparent"
											className="max-h-7 max-w-7 mr-0.5 -ml-4"
											as="span"
										/>
										{config.social.rss.network}
									</a>
								</Button>
							</div>
						</div>
					</div>

					{/* Bottom Footer */}
					<div className="mt-12 md:mt-24 border-t border-border/10 pt-6 md:pt-8 lg:pt-10 flex flex-col md:flex-row justify-between items-center">
						<nav className="flex flex-row gap-x-6">
							{config.nav.map((item) => (
								<Link key={item.name} href={item.href} className="text-background">
									{item.name}
								</Link>
							))}
						</nav>
						<p className="text-muted-foreground">
							© {new Date().getFullYear()} {config.title}. All rights reserved.
						</p>
					</div>
				</Container>
			</div>
		</footer>
	);
}
