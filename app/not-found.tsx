import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
	return (
		<div className="grid min-h-full place-items-center bg-background px-6 py-24 sm:py-32 lg:px-8">
			<div className="text-center">
				<p className="text-base font-semibold text-primary">404</p>
				<h1 className="mt-4 text-balance text-5xl font-semibold tracking-tight text-foreground sm:text-7xl">
					Page not found
				</h1>
				<p className="mt-6 text-pretty text-lg font-medium text-muted-foreground sm:text-xl/8">
					Sorry, we couldn’t find the page you’re looking for.
				</p>
				<div className="mt-10 flex items-center justify-center gap-x-6">
					<Link href="/" passHref>
						<Button>Go back home</Button>
					</Link>
					<Link href="/contact" passHref className="text-sm font-semibold text-foreground">
						Contact support <span aria-hidden="true">&rarr;</span>
					</Link>
				</div>
			</div>
		</div>
	);
}
