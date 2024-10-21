"use server";

import React from "react";
import Link from "next/link";
import { Section } from "@/components/section";
import { Container } from "@/components/container";
import {
	TypographyH1,
	TypographyH2,
	TypographyH3,
} from "@/components/typography";
import { CardGrid } from "@/components/card-grid";
import { BlogPostCard } from "@/components/blog-post-card";
import { config } from "@/lib/config";

export default async function BlogPage() {
	return (
		<>
			<Container>
				<TypographyH1>Blog</TypographyH1>
			</Container>
			<Section>
				<Container>
					<TypographyH2>Featured Post</TypographyH2>
					{config.posts[0] && <BlogPostCard {...config.posts[0]} />}
				</Container>
			</Section>
			<Section>
				<Container>
					<TypographyH2>All Posts</TypographyH2>
					<CardGrid>
						{config.posts.map((post) => (
							<BlogPostCard key={post.href} {...post} />
						))}
					</CardGrid>
				</Container>
			</Section>
		</>
	);
}
