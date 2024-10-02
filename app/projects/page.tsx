"use server";

import React from "react";
import Link from "next/link";

export default async function ProjectsPage() {
	return (
		<div className="container mx-auto px-4 py-8">
			<h1 className="text-3xl font-bold mb-6">Projects</h1>
			<div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
				{/* Placeholder for project cards */}
				{[1, 2, 3, 4, 5, 6].map((project) => (
					<div
						key={project}
						className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6"
					>
						<h2 className="text-xl font-semibold mb-2">Project {project}</h2>
						<p className="text-gray-600 dark:text-gray-300 mb-4">
							This is a brief description of the project...
						</p>
						<Link
							href={`/projects/${project}`}
							className="text-blue-500 hover:underline"
						>
							View project
						</Link>
					</div>
				))}
			</div>
		</div>
	);
}
