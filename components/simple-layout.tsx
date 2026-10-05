import { Container } from "@/components/container";
import { StealthField } from "@/components/stealth-field";

export function SimpleLayout({
	title,
	intro,
	children,
}: {
	title: string;
	intro?: string;
	children?: React.ReactNode;
}) {
	return (
		<>
			<header className="relative overflow-hidden border-b border-line">
				<StealthField variant="band" seed={title} />
				<Container className="relative pt-24 pb-16 sm:pt-32 lg:pb-20">
					<h1 className="max-w-3xl text-4xl leading-[1.05] font-medium tracking-[-0.05em] text-fg sm:text-6xl">
						{title}
					</h1>
					{intro ? (
						<p className="mt-6 max-w-xl text-base leading-7 text-fg-2 sm:text-lg sm:leading-8">
							{intro}
						</p>
					) : null}
				</Container>
			</header>
			{children ? (
				<div className="border-b border-line">
					<Container className="py-16 lg:py-20">{children}</Container>
				</div>
			) : null}
		</>
	);
}
