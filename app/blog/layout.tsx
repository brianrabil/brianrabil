import type React from "react";
import Link from "next/link";
import { Container } from "@/components/container";
import { Slash } from "lucide-react";
import { Section } from "@/components/section";
import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbPage,
	BreadcrumbEllipsis,
	BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

export default function BlogLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<>
			<Container className="mb-8 mt-4">
				<Breadcrumb>
					<BreadcrumbList>
						<BreadcrumbItem>
							<BreadcrumbLink href="/">Home</BreadcrumbLink>
						</BreadcrumbItem>
						<BreadcrumbSeparator>
							<Slash />
						</BreadcrumbSeparator>
						<BreadcrumbItem>
							<BreadcrumbLink href="/blog">Blog</BreadcrumbLink>
						</BreadcrumbItem>
					</BreadcrumbList>
				</Breadcrumb>
			</Container>
			{children}
		</>
	);
}
