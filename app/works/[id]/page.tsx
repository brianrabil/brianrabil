"use server";

import { notFound } from "next/navigation";
import React from "react";

interface Project {
	id: number;
	title: string;
	description: string;
	// Add more fields as needed
}

async function getProject(id: string): Promise<Project | null> {
	// This is a placeholder function. In a real application, you would fetch the project data from your database or API.
	const projects: Project[] = [
		{ id: 1, title: "Project 1", description: "Description for Project 1" },
		{ id: 2, title: "Project 2", description: "Description for Project 2" },
		{ id: 3, title: "Project 3", description: "Description for Project 3" },
	];

	const project = projects.find((p) => p.id === Number.parseInt(id));
	return project || null;
}

export default async function ProjectPage(props: {
	params: Promise<{ id: string }>;
}) {
	const params = await props.params;
	const project = await getProject(params.id);

	if (!project) {
		notFound();
	}

	return (
		<div className="container mx-auto px-4 py-8">
			<h1 className="text-3xl font-bold mb-6">{project.title}</h1>
			<div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6">
				<p className="text-gray-600 dark:text-gray-300 mb-4">
					{project.description}
				</p>
				{/* Add more project details here */}
			</div>
		</div>
	);
}
