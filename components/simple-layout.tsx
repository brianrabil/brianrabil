import { Container } from "@/components/container";

export function SimpleLayout({
	title,
	intro,
	children,
}: {
	title: string;
	intro: string;
	children?: React.ReactNode;
}) {
	return (
		<Container className="mt-16 sm:mt-32">
			<header className="max-w-2xl">
				<h1 className="font-heading text-balance text-4xl font-medium text-foreground sm:text-5xl">
					{title}
				</h1>
				<p className="mt-5 text-base text-muted-foreground text-pretty">
					{intro}
				</p>
			</header>
			{children && <div className="mt-16 sm:mt-20">{children}</div>}
		</Container>
	);
}
