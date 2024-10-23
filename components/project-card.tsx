import Image from "next/image";
import { AppWindowIcon } from "lucide-react";

export enum ProjectCategory {
	APP = "Application",
	BRANDING = "Branding",
}

export interface ProjectCardProps {
	readonly title: string;
	readonly category: string;
	readonly description: string;
	readonly image: string;
}

export function ProjectCard({
	title,
	category,
	description,
	image,
}: ProjectCardProps) {
	return (
		<div className="bg-secondary border rounded-xl flex overflow-hidden flex-col lg:flex-row lg:items-center lg:justify-between">
			{/* Text Section */}
			<div className="lg:w-1/2 space-y-4 p-8">
				<div className="text-muted-foreground font-medium flex items-center space-x-2">
					<AppWindowIcon className="w-5 h-5" />
					<span>{category}</span>
				</div>
				<h3 className="text-2xl font-bold text-foreground">{title}</h3>
				<p className="text-foreground">{description}</p>
			</div>

			{/* Image Section */}
			<div className="lg:w-1/2 mt-8 lg:mt-0 lg:ml-8">
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
