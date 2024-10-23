import Image from "next/image";
import { AppWindowIcon, PaintbrushIcon } from "lucide-react";

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

export function ProjectCard({
	title,
	category,
	description,
	image,
}: ProjectCardProps) {
	return (
		<div className="bg-card border rounded-xl p-8 gap-8 flex overflow-hidden flex-col lg:flex-row lg:items-center lg:justify-between">
			{/* Text Section */}
			<div className="lg:w-1/2 space-y-4">
				<div className="text-muted-foreground font-medium flex items-center space-x-2">
					{getCategoryIcon(category)}
					<span>{category}</span>
				</div>
				<h3 className="text-2xl font-bold text-foreground">{title}</h3>
				<p className="text-foreground text-base">{description}</p>
			</div>

			{/* Image Section */}
			<div className="lg:w-1/2 mt-8 lg:mt-0 lg:ml-8 w-full h-full rounded-xl overflow-hidden">
				<Image
					src={image}
					alt={`${title} project image`}
					width={600}
					height={400}
				/>
			</div>
		</div>
	);
}
