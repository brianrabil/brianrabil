import { Container } from "@/components/container";
import { HighlightText } from "@/components/typography";
import {
	LeadText,
	TypographyH1,
	TypographyH2,
	TypographyH4,
	TypographyLarge,
	TypographyP,
	TypographySmall,
} from "@/components/typography";
import Image from "next/image";

export function FeaturesSection() {
	return (
		<section className="py-16 md:py-20 lg:py-24 bg-secondary max-w-[100vw] overflow-x-hidden">
			<Container>
				{/* Left Section - Features List */}
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 md:gap-8 lg:gap-12">
					<div className="relative md:col-span-1">
						<TypographyH2>
							I'm your <HighlightText>all-in-one</HighlightText> project
							solution
						</TypographyH2>
					</div>

					<div className="md:col-span-1 lg:col-span-2 justify-self-end">
						<TypographyLarge>
							Experience the advantage of an all-inclusive project solution,
							where excellence, speed, and responsiveness converge to ensure the
							highest quality outcome.
						</TypographyLarge>
					</div>

					<div className="md:col-span-1 my-8 md:my-0">
						{/* Feature Items */}
						<div className="mt-8 flex flex-col space-y-16">
							<div className="flex items-start space-x-8">
								<div className="w-20 h-20 shadow-sm bg-background aspect-square text-foreground rounded-full flex justify-center items-center">
									{/* Icon Placeholder - Replace with an actual icon */}
									<span className="text-3xl">🏆</span>
								</div>
								<div>
									<TypographyH4>Excellence</TypographyH4>
									<TypographyP>
										I take pride in doing things well. All client work is done
										with the best quality possible.
									</TypographyP>
								</div>
							</div>

							<div className="flex items-start space-x-8">
								<div className="w-20 h-20 shadow-sm bg-background aspect-square text-foreground rounded-full flex justify-center items-center">
									<span className="text-2xl">⏱</span>
								</div>
								<div>
									<TypographyH4>Speed</TypographyH4>
									<TypographyP>
										I like to work hard and fast. I know how important deadlines
										are to my clients.
									</TypographyP>
								</div>
							</div>

							<div className="flex items-start space-x-8">
								<div className="w-20 h-20 shadow-sm bg-background aspect-square text-foreground rounded-full flex justify-center items-center">
									<span className="text-2xl">📞</span>
								</div>
								<div>
									<TypographyH4>Responsiveness</TypographyH4>
									<TypographyP>
										You can rely on me to be responsive and clear whenever we
										work together.
									</TypographyP>
								</div>
							</div>
						</div>
					</div>

					{/* Right Section - Image with Stats and Download Button */}
					<div className="relative mt-8 lg:my-0 lg:col-span-2 justify-self-end">
						<div className="relative flex flex-col items-center h-auto w-auto">
							<Image
								src="https://placehold.co/705x470"
								alt="Placeholder profile image"
								width={705}
								height={470}
								className="rounded-xl object-cover"
							/>
							{/* Experience and Projects Stats */}
							<div className="flex flex-nowrap text-center lg:text-left -mt-10 text-nowrap items-center gap-x-4 lg:gap-x-8 bg-primary text-primary-foreground py-4 px-8 rounded-xl shadow-xl">
								<div className="w-1/2">
									<TypographyLarge className="text-background">
										8
									</TypographyLarge>
									<TypographySmall className="text-background/75">
										Years of experience
									</TypographySmall>
								</div>
								<div className="h-full w-px bg-primary-foreground opacity-50" />
								<div className="w-1/2">
									<TypographyLarge className="text-background">
										150+
									</TypographyLarge>
									<TypographySmall className="text-background/75">
										Projects completed
									</TypographySmall>
								</div>
							</div>
						</div>
					</div>
				</div>
			</Container>
		</section>
	);
}
