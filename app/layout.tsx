import type { Metadata } from "next";
import type React from "react";
import "@/app/globals.css";

export const metadata: Metadata = {
	title: "Brian Rabil",
	description: "Personal Website",
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en">
			<body className="bg-white dark:bg-black">{children}</body>
		</html>
	);
}
