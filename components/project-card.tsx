"use client";

import { AppWindowIcon, PaintbrushIcon } from "lucide-react";
import Image from "next/image";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/card";
import { TypographyH4, TypographySmall, TypographyH3, TypographyP } from "@/components/typography";
import {
	Carousel,
	CarouselItem,
	CarouselContent,
	CarouselNext,
	CarouselPrevious,
} from "@/components/ui/carousel";
import type { config } from "@/lib/config";
import Autoplay from "embla-carousel-autoplay";
import { cn } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";

export enum ProjectCategory {
	APP = "Application",
	BRANDING = "Branding",
}

type Project = (typeof config.projects)[0];

export interface ProjectCardProps {
	readonly title: Project["title"];
	readonly company: Project["company"];
	readonly category: Project["category"];
	readonly description: Project["description"];
	readonly images: Project["images"];
	readonly status: Project["status"];
}

function getCategoryIcon(category: ProjectCategory) {
	switch (category) {
		case ProjectCategory.APP:
			return <AppWindowIcon className="w-5 h-5" />;
		case ProjectCategory.BRANDING:
			return <PaintbrushIcon className="w-5 h-5" />;
		default:
			throw new Error(`Unknown project category: ${category}`);
	}
}

export function ProjectCard({
	title,
	category,
	company,
	description,
	images,
	status,
}: ProjectCardProps) {
	return (
		<Card className="shadow-none rounded-2xl">
			<CardHeader>
				<Carousel
					opts={{
						active: images.length > 1,
						loop: images.length > 1,
					}}
					plugins={[
						Autoplay({
							active: images.length > 1,
							delay: 5000,
						}),
					]}
				>
					<CarouselContent>
						{images.map((image) => (
							<CarouselItem key={image.src}>
								<Image
									src={image.src}
									alt={title}
									width={600}
									height={400}
									className={cn(
										"w-full h-full rounded-2xl object-cover overflow-hidden aspect-video",
									)}
								/>
							</CarouselItem>
						))}
					</CarouselContent>
					{/* <CarouselPrevious />
					<CarouselNext /> */}
				</Carousel>
			</CardHeader>
			<CardContent className="flex flex-row justify-between">
				{/* <CardDescription className="flex items-center gap-1 mb-2 text-base"></CardDescription> */}
				{/* <Separator className="mx-2" orientation="vertical" /> */}
				<div className="flex flex-col">
					<div className="flex items-center gap-1 mb-2 text-base">
						<Image
							src={company.logo}
							alt={company.name}
							width={20}
							height={20}
							className="w-5 h-5 rounded-full"
						/>
						<span className="text-lg text-foreground">{company.name}</span>
					</div>
					<TypographyH4>{title}</TypographyH4>
				</div>
				<div>
					{status === "featured" && <span className="text-sm text-foreground">Featured</span>}
					{status === "archived" && <span className="text-sm text-foreground">Archived</span>}
				</div>
				{/* <TypographyP className="whitespace-nowrap truncate">{description}</TypographyP> */}
			</CardContent>
		</Card>
	);
}
