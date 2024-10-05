"use client";

import { usePathname } from "next/navigation";
import { HomeIcon, ChevronRightIcon } from "lucide-react";
import {
	Breadcrumb as BaseBreadcrumb,
	BreadcrumbItem as BaseBreadcrumbItem,
	BreadcrumbLink as BaseBreadcrumbLink,
	BreadcrumbList as BaseBreadcrumbList,
	BreadcrumbSeparator as BaseBreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

const BreadcrumbSeparator = () => {
	return (
		<BaseBreadcrumbSeparator>
			<ChevronRightIcon className="h-4 w-4" />
		</BaseBreadcrumbSeparator>
	);
};

export function Breadcrumb() {
	const pathname = usePathname();

	console.log("pathname", pathname);

	const breadcrumbItems = pathname
		.split("/")
		.map((p) => {
			const href = p === "" ? "/" : `/${p}`;
			const label = p === "" ? "Home" : p.charAt(0).toUpperCase() + p.slice(1);
			return { key: p, href, label };
		})
		.filter((item) => item.label !== "Home");

	return (
		<BaseBreadcrumb>
			<BaseBreadcrumbList>
				<BaseBreadcrumbItem>
					<BaseBreadcrumbLink href="/">
						<HomeIcon className="h-4 w-4" />
						<span className="sr-only">Home</span>
					</BaseBreadcrumbLink>
				</BaseBreadcrumbItem>
				<BaseBreadcrumbSeparator />
				{breadcrumbItems.map((item, index) => (
					<>
						{index !== 0 && <BreadcrumbSeparator />}
						<BaseBreadcrumbItem key={item.key}>
							<BaseBreadcrumbLink href={item.href}>
								{item.label}
							</BaseBreadcrumbLink>
						</BaseBreadcrumbItem>
					</>
				))}
			</BaseBreadcrumbList>
		</BaseBreadcrumb>
	);
}
