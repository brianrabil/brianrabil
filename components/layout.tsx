"use client";

import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { usePathname } from "next/navigation";

const bareRoutes = ["/dashboard", "/login"];

export function Layout({ children }: { children: React.ReactNode }) {
	const pathname = usePathname();
	const isBare = bareRoutes.some(
		(r) => pathname === r || pathname.startsWith(`${r}/`),
	);

	if (isBare) {
		return <>{children}</>;
	}

	return (
		<div className="relative flex min-h-dvh w-full flex-col bg-background">
			<Header />
			<main className="flex-auto">{children}</main>
			<Footer />
		</div>
	);
}
