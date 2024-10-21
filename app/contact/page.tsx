"use server";

import React from "react";
import { Container } from "@/components/container";
import { config } from "@/lib/config";

export default async function ContactPage() {
	return (
		<Container className="py-8">
			<h1 className="text-3xl font-bold mb-6">Contact</h1>
			<p className="mb-6">
				Get in touch with me through any of the following platforms:
			</p>
			<ul className="space-y-4">
				{/* {Object.entries(config.social).map(([platform, { name, href }]) => (
					<li key={platform}>
						<a
							href={href}
							target="_blank"
							rel="noopener noreferrer"
							className="text-blue-500 hover:underline"
						>
							{name}
						</a>
					</li>
				))} */}
			</ul>
		</Container>
	);
}
