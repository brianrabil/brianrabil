"use server";

import { Container } from "@/components/container";
import MDXPage from "@/components/mdx-page";
import { Section } from "@/components/section";
import { config } from "@/lib/config";
import MDXContent from "@/markdown/my-tech-stack.mdx";
import { notFound } from "next/navigation";
import React from "react";

export default async function BlogPostPage(props: {
	params: Promise<{ id: string }>;
}) {
	const params = await props.params;
	const postId = params.id;
	const post = config.posts.find((p) => p.id === postId);

	if (!post) {
		notFound();
	}

	return (
		<Section>
			<Container>
				<MDXPage>
					<MDXContent />
				</MDXPage>
			</Container>
		</Section>
	);
}
