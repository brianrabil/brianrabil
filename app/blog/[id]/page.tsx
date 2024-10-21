"use server";

import React from "react";
import config from "@/lib/config";
import { notFound } from "next/navigation";
import MDXPage from "@/components/mdx-page";
import MDXContent from "@/markdown/my-tech-stack.mdx";
import { Section } from "@/components/section";
import { Container } from "@/components/container";

export default async function BlogPostPage({
	params,
}: { params: { id: string } }) {
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
