import {
	TypographyH2,
	TypographyP,
	HighlightText,
	TypographyH3,
	TypographySmall,
} from "@/components/typography";
import { config } from "@/lib/config";
import { Badge } from "@/components/ui/badge";
import { AwardIcon, MapIcon } from "lucide-react";
import { CalendarIcon, ClockIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ArrowRightIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/container";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function BlogSection() {
	return (
		<section className="bg-background py-16 md:py-20 lg:py-24 max-w-[100vw] overflow-x-hidden">
			<Container className="max-w-screen-md">
				<TypographyH2 className="text-center mb-12">
					<HighlightText>Thoughts</HighlightText> on design, business, and indie-hacking
				</TypographyH2>
			</Container>

			<Container>
				<div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
					{config.posts.map((post) => (
						<Card key={post.title} className="border-none flex flex-col gap-y-4">
							<CardHeader>
								<Image
									src={post.imageUrl}
									alt={post.title}
									width={600}
									height={400}
									className="w-full max-h-[240px] h-full object-cover aspect-video rounded-2xl overflow-hidden"
								/>
							</CardHeader>
							<CardContent>
								<Badge variant="outline" className="inline-flex items-center gap-x-0.5 mb-1.5">
									{post.category === "Review" && <AwardIcon className="w-4 h-4" />}
									{post.category === "Guide" && <MapIcon className="w-4 h-4" />}
									{post.category}
								</Badge>
								<TypographyH3>{post.title}</TypographyH3>
								<TypographyP className="text-muted-foreground">{post.description}</TypographyP>
								<div className="mt-4 flex justify-start text-sm text-muted-foreground gap-x-4">
									<TypographySmall className="flex items-center gap-x-2 flex-nowrap">
										<CalendarIcon className="w-4 h-4" />
										{new Date(post.date).toLocaleDateString("en-US", {
											year: "numeric",
											month: "short",
											day: "numeric",
										})}
									</TypographySmall>
									<TypographySmall className="flex items-center space-x-2 gap-2 flex-nowrap">
										<ClockIcon className="w-4 h-4" />
										{post.readTime}
									</TypographySmall>
								</div>
							</CardContent>
						</Card>
					))}
				</div>
				<div className="flex justify-center mt-16">
					<Button type="button" variant="secondary" size="lg" asChild>
						<Link href="/posts">
							View all posts
							<ArrowRightIcon className="w-4 h-4 ml-2" />
						</Link>
					</Button>
				</div>
			</Container>
		</section>
	);
}
