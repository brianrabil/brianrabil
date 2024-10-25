import { Container } from "@/components/container";
import { Button } from "@/components/ui/button";
import { config } from "@/lib/config";
import type { Viewport } from "next";
import Image from "next/image";
import { XIcon, GithubIcon } from "@/components/social-icons";
import { ProjectCard } from "@/components/project-card";
import {
	CalendarIcon,
	ClockIcon,
	MapIcon,
	AwardIcon,
	ArrowRightIcon,
	ChevronLeftIcon,
	ChevronRightIcon,
	StarIcon,
	SearchIcon,
	BellIcon,
	FileTextIcon,
	GlobeIcon,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import { Range } from "@/components/range";
import {
	Carousel,
	CarouselContent,
	CarouselItem,
	CarouselPrevious,
	CarouselNext,
} from "@/components/ui/carousel";
import Link from "next/link";
import { cn } from "@/lib/utils";
import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
	CardFooter,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { BentoCard, BentoGrid } from "@/components/ui/bento-grid";
import { RainbowButton } from "@/components/ui/rainbow-button";

const features = [
	{
		Icon: FileTextIcon,
		name: "Save your files",
		description: "We automatically save your files as you type.",
		href: "/",
		cta: "Learn more",
		background: (
			<img alt="" className="absolute -right-20 -top-20 opacity-60" />
		),
		className: "lg:row-start-1 lg:row-end-4 lg:col-start-2 lg:col-end-3",
	},
	{
		Icon: SearchIcon,
		name: "Full text search",
		description: "Search through all your files in one place.",
		href: "/",
		cta: "Learn more",
		background: (
			<img alt="" className="absolute -right-20 -top-20 opacity-60" />
		),
		className: "lg:col-start-1 lg:col-end-2 lg:row-start-1 lg:row-end-3",
	},
	{
		Icon: GlobeIcon,
		name: "Multilingual",
		description: "Supports 100+ languages and counting.",
		href: "/",
		cta: "Learn more",
		background: (
			<img alt="" className="absolute -right-20 -top-20 opacity-60" />
		),
		className: "lg:col-start-1 lg:col-end-2 lg:row-start-3 lg:row-end-4",
	},
	{
		Icon: CalendarIcon,
		name: "Calendar",
		description: "Use the calendar to filter your files by date.",
		href: "/",
		cta: "Learn more",
		background: (
			<img alt="" className="absolute -right-20 -top-20 opacity-60" />
		),
		className: "lg:col-start-3 lg:col-end-3 lg:row-start-1 lg:row-end-2",
	},
	{
		Icon: BellIcon,
		name: "Cap Map",
		description: "A map of all the SAIC CAP projects.",
		// href: "/",
		// cta: "Learn more",
		background: (
			<img
				src="/images/saic-cap-map-mockup.png"
				alt=""
				className="absolute inset-0 h-full w-full object-cover"
			/>
		),
		className:
			"lg:col-start-3 lg:col-end-3 lg:row-start-2 lg:row-end-4 text-foreground",
	},
];
export const viewport: Viewport = {
	themeColor: "black",
};

export default async function App() {
	return (
		<>
			<section className="bg-background py-24 relative">
				<Image
					src="/home-hero-gradient.svg"
					alt="Placeholder profile image"
					width={1728}
					height={894}
					className="absolute w-full h-full left-0 top-0 right-0 bottom-0 object-cover z-0 pointer-events-none select-none"
				/>
				{/* Main Content */}
				<Container className="grid grid-cols-1 lg:grid-cols-2 gap-16">
					{/* Text Section */}
					<div className="space-y-10 my-auto z-10">
						<h1 className="text-6xl leading-tight font-extrabold text-foreground relative">
							<span
								aria-hidden
								className="opacity-0 select-none pointer-events-none"
							>
								Helping businesses turn their ideas into reality
							</span>
							<span className="absolute inset-0 z-10">
								Helping businesses turn their ideas into reality
							</span>
							<svg
								aria-hidden
								xmlns="http://www.w3.org/2000/svg"
								width="249"
								height="22"
								viewBox="0 0 249 22"
								fill="currentColor"
								className="absolute left-[-15px] top-[64px] fill-orange-500 z-0 opacity-25"
							>
								<title>Underline</title>
								<path d="M247.564 18.5807C241.772 13.3568 232.473 12.7526 225.225 11.4427C217.124 9.97395 208.996 8.57031 200.846 7.46093C186.542 5.51302 172.169 4.08854 157.79 3.01562C126.033 0.645827 94.0929 0.0338481 62.3387 2.36979C42.1785 3.85416 22.008 5.90885 2.32917 10.8463C-0.0155171 11.4349 0.207047 14.6719 2.6889 14.7083C22.0261 14.9896 41.3866 12.6406 60.7109 11.8568C79.9471 11.0807 99.2274 10.6719 118.484 10.9557C142.604 11.3125 166.719 12.8333 190.722 15.5156C199.956 16.5469 209.195 17.6016 218.411 18.8255C227.864 20.0807 237.259 22 246.767 20.7422C247.709 20.6198 248.426 19.3568 247.564 18.5807Z" />
							</svg>
						</h1>

						<p className="text-xl text-foreground leading-normal">
							I'm a passionate developer, entrepreneur, and general technology
							enthusiast living in Dallas, TX. I've worked with hundreds of
							startups to help them develop their ideas into profitable
							businesses.
						</p>

						<div className="flex space-x-10">
							<RainbowButton>Book a call with me</RainbowButton>
							<div className="flex space-x-4">
								{/* Social Media Icons */}
								<Button
									type="button"
									variant="outline"
									size="icon"
									asChild
									className="h-10 w-10"
								>
									<a href={config.social.x.href}>
										<XIcon className="h-4 w-4" />
									</a>
								</Button>
								<Button
									type="button"
									variant="outline"
									size="icon"
									asChild
									className="h-10 w-10"
								>
									<a href={config.social.github.href}>
										<GithubIcon className="h-4 w-4" />
									</a>
								</Button>
							</div>
						</div>
					</div>

					{/* Image Section */}
					<div className="relative flex justify-end">
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
					</div>
				</Container>
			</section>

			<section className="py-24 bg-secondary">
				<Container>
					{/* Left Section - Features List */}
					<div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
						<div className="relative lg:col-span-1">
							<h2 className="text-5xl font-bold text-foreground leading-tight">
								<span>
									I'm your{" "}
									<span className="text-orange-500 relative">
										all-in-one
										<svg
											aria-hidden
											xmlns="http://www.w3.org/2000/svg"
											width="249"
											height="22"
											viewBox="0 0 249 22"
											fill="currentColor"
											className="absolute left-[-14px] top-[54px] fill-orange-500 z-0 opacity-25"
										>
											<title>Underline</title>
											<path d="M247.564 18.5807C241.772 13.3568 232.473 12.7526 225.225 11.4427C217.124 9.97395 208.996 8.57031 200.846 7.46093C186.542 5.51302 172.169 4.08854 157.79 3.01562C126.033 0.645827 94.0929 0.0338481 62.3387 2.36979C42.1785 3.85416 22.008 5.90885 2.32917 10.8463C-0.0155171 11.4349 0.207047 14.6719 2.6889 14.7083C22.0261 14.9896 41.3866 12.6406 60.7109 11.8568C79.9471 11.0807 99.2274 10.6719 118.484 10.9557C142.604 11.3125 166.719 12.8333 190.722 15.5156C199.956 16.5469 209.195 17.6016 218.411 18.8255C227.864 20.0807 237.259 22 246.767 20.7422C247.709 20.6198 248.426 19.3568 247.564 18.5807Z" />
										</svg>
									</span>{" "}
									project solution
								</span>
							</h2>
						</div>

						<div className="lg:col-span-2 justify-self-end lg:mt-4">
							<p className="text-foreground text-lg leading-normal max-w-2xl">
								Experience the advantage of an all-inclusive project solution,
								where excellence, speed, and responsiveness converge to ensure
								the highest quality outcome.
							</p>
						</div>

						<div className="lg:col-span-1">
							{/* Feature Items */}
							<div className="mt-8 flex flex-col space-y-16">
								<div className="flex items-start space-x-8">
									<div className="w-20 h-20 bg-background aspect-square text-foreground rounded-full flex justify-center items-center">
										{/* Icon Placeholder - Replace with an actual icon */}
										<span className="text-3xl">🏆</span>
									</div>
									<div>
										<h3 className="text-xl font-semibold text-foreground leading-normal">
											Excellence
										</h3>
										<p className="text-foreground font-normal mt-4 leading-normal">
											I take pride in doing things well. All client work is done
											with the best quality possible.
										</p>
									</div>
								</div>

								<div className="flex items-start space-x-8">
									<div className="w-20 h-20 bg-background aspect-square text-foreground rounded-full flex justify-center items-center">
										<span className="text-2xl">⏱</span>
									</div>
									<div>
										<h3 className="text-xl font-semibold text-foreground leading-normal">
											Speed
										</h3>
										<p className="text-foreground font-normal mt-4 leading-normal">
											I like to work hard and fast. I know how important
											deadlines are to my clients.
										</p>
									</div>
								</div>

								<div className="flex items-start space-x-8">
									<div className="w-20 h-20 bg-background aspect-square text-foreground rounded-full flex justify-center items-center">
										<span className="text-2xl">📞</span>
									</div>
									<div>
										<h3 className="text-xl font-semibold text-foreground leading-normal">
											Responsiveness
										</h3>
										<p className="text-foreground font-normal mt-4 leading-normal">
											You can rely on me to be responsive and clear whenever we
											work together.
										</p>
									</div>
								</div>
							</div>
						</div>

						{/* Right Section - Image with Stats and Download Button */}
						<div className="relative lg:col-span-2 justify-self-end">
							<div className="relative h-auto w-auto">
								<Image
									src="https://placehold.co/705x470"
									alt="Placeholder profile image"
									width={705}
									height={470}
									className="rounded-xl object-cover"
								/>
								{/* Experience and Projects Stats */}
								<div className="flex flex-nowrap text-nowrap items-center space-x-8 bg-primary text-primary-foreground absolute -bottom-[25px] right-2/4 translate-x-1/2 py-4 px-8 rounded-lg shadow-lg">
									<div className="w-1/2">
										<p className="text-2xl font-semibold">8</p>
										<p className="text-sm">Years of experience</p>
									</div>
									<div className="h-full w-px bg-primary-foreground opacity-50" />
									<div className="w-1/2">
										<p className="text-2xl font-semibold">150+</p>
										<p className="text-sm">Projects completed</p>
									</div>
								</div>
							</div>
						</div>
					</div>
				</Container>
			</section>

			<section className="bg-white py-12">
				<div className="container mx-auto">
					<h3 className="text-center text-xl font-semibold mb-8">
						The tools I use on my day-to-day
					</h3>

					<div className="overflow-x-auto">
						<div className="flex space-x-8 justify-center items-center flex-wrap">
							{config.tools.map((tool) => (
								<div
									key={tool.name}
									className="flex-shrink-0 w-20 h-20 p-4 rounded-full  flex justify-center items-center  transition m-2"
								>
									{tool.icon}
								</div>
							))}
						</div>
					</div>
				</div>
			</section>
			<section className="bg-background py-24">
				<div className="container mx-auto">
					<div className="text-center mb-12">
						<h2 className="text-5xl font-bold text-foreground leading-tight">
							Check out my latest work
						</h2>
						<p className="mt-5 text-lg text-foreground mx-auto max-w-md leading-normal">
							My goal is to create effective digital experiences that make
							people's lives easier and better. I hope my work is a reflection
							of this.
						</p>
					</div>
					<div className="grid grid-cols-1 gap-8">
						{config.projects.map((work) => (
							<ProjectCard
								key={work.title}
								title={work.title}
								category={work.category}
								description={work.description}
								image={work.image}
							/>
						))}
					</div>
				</div>

				<div className="flex justify-center mt-16">
					<Button type="button" variant="outline" size="lg" asChild>
						<Link href="/projects">
							View all projects
							<ArrowRightIcon className="w-4 h-4 ml-2" />
						</Link>
					</Button>
				</div>
			</section>

			<section className="bg-muted py-24">
				<div className="container mx-auto">
					<div className="grid grid-cols-[1fr_384px] grid-rows-[1fr_auto] gap-8 h-auto mb-24">
						<div className="max-w-2xl">
							<h2 className="text-5xl font-bold text-foreground leading-tight">
								Here’s what past clients are saying about me
							</h2>
						</div>
						<div className="max-w-md w-auto ml-auto">
							<p className="text-foreground text-lg leading-normal m-0">
								Iced pumpkin ristretto irish trifecta robusta trade froth
								affogato barista con barista cappuccino filter roast.
							</p>
						</div>
						<div className="w-full max-w-2xl self-end">
							<Range className="w-full" />
						</div>
						<div className="flex max-w-md align-top gap-x-2">
							<Button type="button" variant="outline" size="icon">
								<ChevronLeftIcon className="w-4 h-4" />
							</Button>
							<Button type="button" variant="outline" size="icon">
								<ChevronRightIcon className="w-4 h-4" />
							</Button>
						</div>
					</div>
					<Carousel
						opts={{
							loop: false,
						}}
					>
						<CarouselPrevious />
						<CarouselNext />
						<CarouselContent className="ml-1 divide-x">
							{config.testimonials.map((testimonial, index) => (
								<CarouselItem
									key={testimonial.name}
									className="md:basis-1/2 lg:basis-1/3 pl-0"
								>
									<Card
										key={testimonial.name}
										className={cn(
											"flex flex-col h-full border-y border-l-0 border-r-0 p-0 rounded-none",
											index === 0 && "rounded-tl-xl rounded-bl-xl border-l",
											index === config.testimonials.length - 1 &&
												"rounded-tr-xl rounded-br-xl border-r",
										)}
									>
										<CardHeader className="py-10 px-10">
											<div className="flex items-center justify-start">
												{/* Star Rating */}
												{Array.from({ length: testimonial.rating }).map(
													(_, i) => (
														<StarIcon
															// biome-ignore lint/suspicious/noArrayIndexKey: no need
															key={i}
															className="w-5 h-5 text-yellow-400 fill-current"
														/>
													),
												)}
											</div>
											<blockquote className="text-xl font-semibold text-foreground mb-4">
												“{testimonial.quote}”
											</blockquote>
										</CardHeader>
										<CardContent className="px-10 py-0">
											<p className="text-muted-foreground leading-normal">
												{testimonial.feedback}
											</p>
										</CardContent>
										<CardFooter className="flex flex-col px-10 py-10 mt-auto">
											<Separator className="mb-5 mt-auto" />
											<div className="w-full flex justify-between items-center">
												<div className="text-left flex flex-col gap-y-1">
													<p className="font-bold text-foreground">
														{testimonial.name}
													</p>
													<p className="text-sm text-muted-foreground">
														{testimonial.title}
													</p>
												</div>
												<Avatar>
													<AvatarImage src={testimonial.image} />
													<AvatarFallback>
														{testimonial.name
															.split(" ")
															.map((n) => n[0])
															.join("")}
													</AvatarFallback>
												</Avatar>
											</div>
										</CardFooter>
									</Card>
								</CarouselItem>
							))}
						</CarouselContent>
					</Carousel>
				</div>
			</section>

			<section className="bg-background py-24">
				<div className="container mx-auto">
					<div className="text-center mb-12">
						<h2 className="max-w-2xl mx-auto text-5xl font-bold text-foreground">
							<span className="text-orange-500">Thoughts</span> on design,
							business, and indie-hacking
						</h2>
					</div>
					<div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
						{config.posts.map((post) => (
							<div
								key={post.title}
								className="bg-card border rounded-xl overflow-hidden p-6 flex flex-col gap-y-4"
							>
								<div className="w-full h-[240px] object-cover rounded-xl overflow-hidden">
									<Image
										src={post.imageUrl}
										alt={post.title}
										width={600}
										height={400}
										className="w-full h-full object-cover"
									/>
								</div>
								<div>
									<Badge
										variant="outline"
										className="inline-flex items-center gap-x-0.5"
									>
										{post.category === "Review" && (
											<AwardIcon className="w-4 h-4" />
										)}
										{post.category === "Guide" && (
											<MapIcon className="w-4 h-4" />
										)}
										{post.category}
									</Badge>
									<h3 className="text-xl font-bold text-foreground mt-2">
										{post.title}
									</h3>
									<p className="mt-2 text-muted-foreground">
										{post.description}
									</p>
									<div className="mt-4 flex justify-start text-sm text-muted-foreground gap-x-4">
										<div className="flex items-center gap-x-2 flex-nowrap">
											<CalendarIcon className="w-4 h-4" />
											{new Date(post.date).toLocaleDateString("en-US", {
												year: "numeric",
												month: "short",
												day: "numeric",
											})}
										</div>
										<div className="flex items-center space-x-2 gap-2 flex-nowrap">
											<ClockIcon className="w-4 h-4" />
											{post.readTime}
										</div>
									</div>
								</div>
							</div>
						))}
					</div>
				</div>
				<div className="flex justify-center mt-16">
					<Button type="button" variant="outline" size="lg" asChild>
						<Link href="/posts">
							View all posts
							<ArrowRightIcon className="w-4 h-4 ml-2" />
						</Link>
					</Button>
				</div>
			</section>
		</>
	);
}
