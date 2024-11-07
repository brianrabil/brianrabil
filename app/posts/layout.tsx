import { Container } from "@/components/container";
import { Section } from "@/components/section";
import {
	Breadcrumb,
	BreadcrumbEllipsis,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbPage,
	BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Slash } from "lucide-react";
import Link from "next/link";
import type React from "react";

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
