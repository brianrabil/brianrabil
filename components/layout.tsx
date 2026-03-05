import { Footer } from "@/components/footer";
import { Header } from "@/components/header";

export function Layout({ children }: { children: React.ReactNode }) {
	return (
		<div className="relative flex min-h-dvh w-full flex-col bg-background">
			<Header />
			<main className="flex-auto">{children}</main>
			<Footer />
		</div>
	);
}
