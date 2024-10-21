import Image from "next/image";
import Link from "next/link";
import { Button } from "./ui/button";

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
		<div className="bg-gray-50 p-8 rounded-lg shadow-lg flex flex-col lg:flex-row lg:items-center lg:justify-between">
			{/* Text Section */}
			<div className="lg:w-1/2 space-y-4">
				<div className="text-blue-600 font-semibold flex items-center space-x-2">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
						className="w-5 h-5"
					>
						<title>{category}</title>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth="2"
							d="M5 13l4 4L19 7"
						/>
					</svg>
					<span>{category}</span>
				</div>
				<h3 className="text-2xl font-bold text-gray-900">{title}</h3>
				<p className="text-gray-600">{description}</p>
				<Link href="/works/warrior-academy">
					<Button type="button">
						View Case Study
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
							className="w-5 h-5 ml-2"
						>
							<title>View Case Study</title>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth="2"
								d="M9 5l7 7-7 7"
							/>
						</svg>
					</Button>
				</Link>
			</div>

			{/* Image Section */}
			<div className="lg:w-1/2 mt-8 lg:mt-0 lg:ml-8">
				<Image
					src={image}
					alt={`${title} project image`}
					width={600}
					height={400}
					className="rounded-lg"
				/>
			</div>
		</div>
	);
}
