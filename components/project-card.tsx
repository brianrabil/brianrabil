import { AppWindowIcon, PaintbrushIcon } from "lucide-react";
import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/card";

export enum ProjectCategory {
	APP = "Application",
	BRANDING = "Branding",
}

export interface ProjectCardProps {
	readonly title: string;
	readonly category: ProjectCategory;
	readonly description: string;
	readonly image: string;
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

export function ProjectCard({ title, category, description, image }: ProjectCardProps) {
	return (
		<Card innerClassName="flex flex-col lg:flex-row">
			<CardHeader className="lg:order-2 lg:w-1/2">
				{/* Image Section */}
				<div className="flex flex-col w-full h-full rounded-xl object-cover overflow-hidden">
					<Image src={image} alt={title} width={600} height={400} className="w-full h-full" />
				</div>
			</CardHeader>
			<CardContent className="lg:p-12 lg:w-1/2 lg:flex lg:flex-col lg:justify-center lg:gap-y-4">
				<div className="text-muted-foreground text-sm font-medium inline-flex items-center gap-x-1.5">
					{getCategoryIcon(category)} {category}
				</div>
				<CardTitle className="text-2xl mb-2 lg:mb-0 font-bold">{title}</CardTitle>
				<CardDescription className="text-foreground text-base items-center flex">
					{description}
				</CardDescription>
			</CardContent>
			{/* Text Section */}
		</Card>
	);
}
