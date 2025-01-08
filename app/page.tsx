import { Container } from "@/components/container";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { RainbowButton } from "@/components/ui/rainbow-button";
import { config } from "@/lib/config";
import {
	ArrowRightIcon,
	AwardIcon,
	CalendarIcon,
	ArrowUpRightIcon,
	ChevronLeftIcon,
	ChevronRightIcon,
	ClockIcon,
	MapIcon,
	StarIcon,
} from "lucide-react";
import type { Viewport } from "next";
import Image from "next/image";
import Link from "next/link";
import { SocialIcon } from "react-social-icons";
import { HighlightText, TypographyP } from "@/components/typography";
import { FeaturesSection } from "@/components/features-section";
import { ToolsSection } from "@/components/tools-section";
import { ProjectsSection } from "@/components/projects-section";
import { TypographyH1, TypographyH2, TypographyLarge, LeadText } from "@/components/typography";
import { BlogSection } from "@/components/blog-section";
import { ServicesSection } from "@/components/services-section";
// import { TestimonialsSection } from "@/components/testimonials-section";

export const viewport: Viewport = {
	themeColor: "black",
};

export default async function App() {
	return (
		<div className="bg-background text-foreground flex flex-col width-full max-w-[100vw] overflow-x-hidden gap-y-16 md:gap-y-20 lg:gap-y-24">
			<section className="bg-background py-16 md:py-20 lg:py-24 relative max-w-[100vw] overflow-x-hidden overflow-y-visible">
				<Image
					src="/home-hero-gradient.svg"
					alt="Placeholder profile image"
					width={1728}
					height={894}
					className="absolute w-full aspect-square lg:h-full left-0 top-0 lg:right-0 lg:bottom-0 object-left-top lg:object-cover overflow-y-visible z-0 pointer-events-none select-none"
				/>
				{/* Main Content */}
				<Container className="grid grid-cols-1 md:gap-8 lg:gap-16">
					{/* Text Section */}
					<div className="flex flex-col gap-y-12 md:gap-y-8 my-auto z-10">
						<TypographyH1>
							I'm an app developer and entrepreneur helping businesses
							<span className="text-muted-foreground">
								{" "}
								bridge the gap between vision and execution.
							</span>
						</TypographyH1>
						<TypographyP>
							I'm a passionate developer, entrepreneur, and general technology enthusiast living in
							Dallas, TX. I've worked with hundreds of startups to help them develop their ideas
							into profitable businesses.
						</TypographyP>

						<div className="flex flex-col items-center md:flex-row md:justify-start gap-x-8 gap-y-12">
							<RainbowButton>
								Book a free strategy call
								<ArrowUpRightIcon className="w-5 h-5 ml-2" />
							</RainbowButton>
							<div className="flex gap-x-4">
								{/* Social Media Icons */}
								<Button asChild type="button" variant="outline" size="icon" className="h-10 w-10">
									<SocialIcon
										fgColor="currentColor"
										bgColor="transparent"
										className="max-h-10 max-w-10"
										url={config.social.x.href}
									/>
								</Button>
								<Button type="button" variant="outline" size="icon" asChild className="h-10 w-10">
									<SocialIcon
										fgColor="currentColor"
										bgColor="transparent"
										className="max-h-10 max-w-10"
										url={config.social.github.href}
									/>
								</Button>
							</div>
						</div>
					</div>

					{/* Image Section */}
					{/* <div className="relative flex justify-end">
						<Image
							src="https://placehold.co/512x640"
							alt="Placeholder profile image"
							width={512}
							height={640}
							className="rounded-xl object-cover"
						/>
						<span className="absolute top-4 right-4 z-10 bg-background px-4 py-2 rounded-full shadow-lg text-sm text-foreground">
							4 years of experience
						</span>
					</div> */}
				</Container>
			</section>

			<ServicesSection services={config.services} />
			<ProjectsSection projects={config.projects} />
			<FeaturesSection />
			<ToolsSection tools={config.tools} />
			{/* <TestimonialsSection /> */}
			<BlogSection />
		</div>
	);
}
