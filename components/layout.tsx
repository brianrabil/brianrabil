import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { getSearchIndex } from "@/lib/search-index";

export async function Layout({ children }: { children: React.ReactNode }) {
	const searchItems = await getSearchIndex();

	return (
		<div className="relative flex min-h-dvh w-full flex-col bg-page">
			<a
				href="#main"
				className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[60] focus:rounded-md focus:bg-fg focus:px-3 focus:py-2 focus:text-sm focus:text-frame"
			>
				Skip to content
			</a>
			<Header searchItems={searchItems} />
			<main id="main" className="flex-auto">
				{children}
			</main>
			<Footer />
		</div>
	);
}
