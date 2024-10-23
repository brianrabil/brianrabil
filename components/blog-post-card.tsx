import { Badge } from "@/components/ui/badge";
import type { Route } from "next";
import Link from "next/link";

export interface BlogPostCardProps {
	id: string;
	imageUrl: string;
	date: string;
	category: string;
	description: string;
	readTime: string;
	title: string;
	href: Route;
}

export function BlogPostCard({
	id,
	imageUrl,
	date,
	category,
	description,
	readTime,
	title,
	href,
}: BlogPostCardProps) {
	return (
		<article
			key={id}
			className="hover:shadow-xl transition-shadow duration-200 ease-linear relative isolate flex flex-col justify-end overflow-hidden w-full rounded-2xl bg-gray-900 px-8 pb-8 pt-80 sm:pt-48 lg:pt-80"
		>
			<img
				src={imageUrl}
				alt=""
				className="absolute inset-0 -z-10 h-full w-full object-cover"
			/>
			<div className="absolute inset-0 -z-10 bg-gradient-to-t from-gray-900 via-gray-900/40" />
			<div className="absolute inset-0 -z-10 rounded-2xl ring-1 ring-inset ring-gray-900/10" />

			<div className="flex flex-wrap items-center gap-y-1 overflow-hidden text-sm leading-6 text-gray-300 gap-x-4">
				<time dateTime={date}>{date}</time>
				<Badge variant="secondary">{category}</Badge>
			</div>
			<h3 className="mt-3 text-lg font-semibold leading-6 text-white">
				<Link href={href}>
					<span className="absolute inset-0" />
					{title}
				</Link>
			</h3>
		</article>
	);
}
