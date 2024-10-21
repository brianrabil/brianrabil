import { BlogSection } from "@/components/blog-section";
import { Container } from "@/components/container";
import * as Icon from "@/components/dev-icons";
import { Section } from "@/components/section";
import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import {
	TypographyD2,
	TypographyH1,
	TypographyH2,
	TypographyH3,
	TypographyLarge,
	TypographyLead,
	TypographyP,
} from "@/components/typography";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { ArrowRightIcon } from "lucide-react";
import { config } from "@/lib/config";
import { CardGrid } from "@/components/card-grid";
import { BlogPostCard } from "@/components/blog-post-card";
import type { Viewport } from "next";
import Image from "next/image";
import Link from "next/link";
import { XIcon, GithubIcon } from "@/components/social-icons";
import { ProjectCard } from "@/components/project-card";

export const viewport: Viewport = {
	themeColor: "black",
};

const tools = [
	{ name: "Tailwind", icon: <Icon.TailwindIcon /> },
	{ name: "Figma", icon: <Icon.FigmaIcon /> },
	// { name: "Python", icon: <Icon.PythonIcon /> },
	{ name: "PostgreSQL", icon: <Icon.PostgresIcon /> },
	// { name: "TypeScript", icon: <Icon.TypescriptIcon /> },
	// { name: "JavaScript", icon: <Icon.JavascriptIcon /> },
	{ name: "Go", icon: <Icon.GoIcon /> },
	// { name: "Rust", icon: <Icon.RustIcon /> },
	{ name: "Bash", icon: <Icon.BashIcon /> },
	{ name: "Next.js", icon: <Icon.NextIcon /> },
	{ name: "Vercel", icon: <Icon.VercelIcon /> },
	// { name: "PNPM", icon: <Icon.PNPMIcon /> },
	{ name: "Prisma", icon: <Icon.PrismaIcon /> },
	// { name: "Express", icon: <Icon.ExpressIcon /> },
	{ name: "Bun", icon: <Icon.BunIcon /> },
	{ name: "Node.js", icon: <Icon.NodeIcon /> },
	// { name: "Tauri", icon: <Icon.TauriIcon /> },
	{ name: "Storybook", icon: <Icon.StorybookIcon /> },
	// { name: "Webpack", icon: <Icon.WebpackIcon /> },
	// { name: "GraphQL", icon: <Icon.GraphQL /> },
	{ name: "AWS", icon: <Icon.AWSIcon /> },
	{ name: "Docker", icon: <Icon.DockerIcon /> },
	{ name: "GitLab", icon: <Icon.GitlabIcon /> },
	{ name: "GitHub", icon: <Icon.GithubIcon /> },
	// { name: "Apple", icon: <Icon.AppleIcon /> },
	{ name: "Arch Linux", icon: <Icon.ArchLinuxIcon /> },
	{ name: "Fedora", icon: <Icon.FedoraIcon /> },
	{ name: "Chrome", icon: <Icon.ChromeIcon /> },
	{ name: "Cypress", icon: <Icon.CypressIcon /> },
	// { name: "Jira", icon: <Icon.JiraIcon /> },
	// { name: "PostCSS", icon: <Icon.PostCSSIcon /> },
	{ name: "Red Hat", icon: <Icon.RedHatIcon /> },
	// { name: "Rollup", icon: <Icon.RollupIcon /> },
];

const posts = [
	{
		title: "ChatGPT: A Developer's Best Friend or Worst Enemy?",
		category: "Web Development",
		date: "Mar 24, 2023",
		readTime: "11 minute read",
		image: "/path-to-openai-image.jpg", // Replace with actual image paths
		description:
			"Explore the pros and cons of ChatGPT as a tool for developers, and whether its AI-powered capabilities are a boon or a bane in...",
	},
	{
		title: "8 Ways Designers Can Make Money Online in 2022",
		category: "Business",
		date: "Mar 20, 2023",
		readTime: "10 minute read",
		image: "/path-to-designer-image.jpg",
		description:
			"Learn how to leverage your skills and capitalize on various platforms to boost your income and thrive in the digital landscape.",
	},
	{
		title: "Will Artificial Intelligence Replace Designers?",
		category: "Web Development",
		date: "Mar 5, 2023",
		readTime: "9 minute read",
		image: "/path-to-ai-robot-image.jpg",
		description:
			"Explore the future of AI in design as we examine its capabilities, limitations, and potential collaboration with human designers...",
	},
];

const work = [
	{
		title: "Warrior Academy",
		category: "Education",
		description:
			"Developed a comprehensive learning platform for martial arts enthusiasts.",
		image: "/images/warrior-academy-mockup.png",
	},
	{
		title: "My Financial",
		category: "Finance",
		description:
			"Created an intuitive personal finance management application.",
		image: "/images/my-financial-mockup.png",
	},
	{
		title: "Warrior Academy Course Platform",
		category: "Education",
		description:
			"Built an advanced course delivery system for Warrior Academy.",
		image: "/images/warrior-academy-learning-mockup.png",
	},
	{
		title: "Synthetic Analyst",
		category: "AI & Data",
		description:
			"Engineered an AI-powered data analysis tool for business intelligence.",
		image: "/images/sa-module-builder-mockup.png",
	},
	{
		title: "Compeat",
		category: "Business",
		description:
			"Designed a competitive analysis platform for small businesses.",
		image: "/images/compeat-mockup.png",
	},
	{
		title: "CAP Map",
		category: "Geospatial",
		description:
			"Developed a mapping solution for Civil Air Patrol operations.",
		image: "/images/cap-map-mockup.png",
	},
	{
		title: "GMARS Logo",
		category: "Branding",
		description: "Created a modern logo design for GMARS organization.",
		image: "/images/gmars-logo.png",
	},
];

const testimonials = [
	{
		name: "Katy Jackson",
		title: "Designer at Mailgorilla",
		image: "/path-to-katy-image.jpg", // Replace with actual image path
		quote: "Highly skilled and professional",
		feedback:
			"And robusta french bar luwak extra caffeine cup filter macchiato skinny shop cream that variety. Caramel black affogato con frappuccino mocha sweet milk and.",
		rating: 5,
	},
	{
		name: "Sean Murphy",
		title: "Founder of North Agency",
		image: "/path-to-sean-image.jpg",
		quote: "I highly recommend him",
		feedback:
			"And robusta french bar luwak extra caffeine cup filter macchiato skinny shop cream that variety. Caramel black affogato con frappuccino mocha sweet milk and.",
		rating: 5,
	},
	{
		name: "Elaine Foster",
		title: "CEO of Wakatech",
		image: "/path-to-elaine-image.jpg",
		quote: "I’m so lucky I found John!",
		feedback:
			"And robusta french bar luwak extra caffeine cup filter macchiato skinny shop cream that variety. Caramel black affogato con frappuccino mocha sweet milk and.",
		rating: 5,
	},
	{
		name: "Jeff Bick",
		title: "Developer at Bad Inc.",
		image: "/path-to-jeff-image.jpg",
		quote: "I’m really impressed with the quality of his work",
		feedback:
			"And robusta french bar luwak extra caffeine cup filter macchiato skinny shop cream that variety. Caramel black affogato con frappuccino mocha sweet milk and.",
		rating: 5,
	},
];

export default async function App() {
	return (
		<>
			<section className="bg-white py-24 relative">
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
						<h1 className="text-6xl font-extrabold text-foreground relative">
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
								className="absolute left-[-14px] top-[54px] fill-orange-500 z-0"
							>
								<title>Underline</title>
								<path d="M247.564 18.5807C241.772 13.3568 232.473 12.7526 225.225 11.4427C217.124 9.97395 208.996 8.57031 200.846 7.46093C186.542 5.51302 172.169 4.08854 157.79 3.01562C126.033 0.645827 94.0929 0.0338481 62.3387 2.36979C42.1785 3.85416 22.008 5.90885 2.32917 10.8463C-0.0155171 11.4349 0.207047 14.6719 2.6889 14.7083C22.0261 14.9896 41.3866 12.6406 60.7109 11.8568C79.9471 11.0807 99.2274 10.6719 118.484 10.9557C142.604 11.3125 166.719 12.8333 190.722 15.5156C199.956 16.5469 209.195 17.6016 218.411 18.8255C227.864 20.0807 237.259 22 246.767 20.7422C247.709 20.6198 248.426 19.3568 247.564 18.5807Z" />
							</svg>
						</h1>

						<p className="text-xl text-foreground">
							I'm a passionate developer, entrepreneur, and general technology
							enthusiast living in San Francisco. I've worked with hundreds of
							startups to help them develop their ideas into profitable
							businesses.
						</p>

						<div className="flex space-x-10">
							<Button type="button" size="lg" variant="default">
								Book a call with me
							</Button>
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
						<span className="absolute top-4 right-4 bg-white px-4 py-2 rounded-full shadow-lg text-sm text-gray-700">
							4 years of experience
						</span>
					</div>
				</Container>
			</section>

			<section className="bg-white py-16">
				<Container className="grid grid-cols-1 lg:grid-cols-2 gap-12">
					{/* Left Section - Features List */}
					<div>
						<h2 className="text-4xl font-bold text-gray-900">
							I'm your{" "}
							<span className="text-blue-600 underline">all-in-one</span>{" "}
							project solution
						</h2>
						<p className="mt-4 text-gray-600">
							Experience the advantage of an all-inclusive project solution,
							where excellence, speed, and responsiveness converge to ensure the
							highest quality outcome.
						</p>

						{/* Feature Items */}
						<div className="mt-8 space-y-8">
							<div className="flex items-start space-x-4">
								<div className="w-12 h-12 bg-gray-900 text-white rounded-full flex justify-center items-center">
									{/* Icon Placeholder - Replace with an actual icon */}
									<span className="text-2xl">🏆</span>
								</div>
								<div>
									<h3 className="text-xl font-semibold text-gray-900">
										Excellence
									</h3>
									<p className="text-gray-600">
										I take pride in doing things well. All client work is done
										with the best quality possible.
									</p>
								</div>
							</div>

							<div className="flex items-start space-x-4">
								<div className="w-12 h-12 bg-gray-900 text-white rounded-full flex justify-center items-center">
									<span className="text-2xl">⏱</span>
								</div>
								<div>
									<h3 className="text-xl font-semibold text-gray-900">Speed</h3>
									<p className="text-gray-600">
										I like to work hard and fast. I know how important deadlines
										are to my clients.
									</p>
								</div>
							</div>

							<div className="flex items-start space-x-4">
								<div className="w-12 h-12 bg-gray-900 text-white rounded-full flex justify-center items-center">
									<span className="text-2xl">📞</span>
								</div>
								<div>
									<h3 className="text-xl font-semibold text-gray-900">
										Responsiveness
									</h3>
									<p className="text-gray-600">
										You can rely on me to be responsive and clear whenever we
										work together.
									</p>
								</div>
							</div>
						</div>
					</div>

					{/* Right Section - Image with Stats and Download Button */}
					<div className="relative">
						{/* <Image
							src="/path-to-your-image.jpg" // Replace with actual image path
							alt="Client meeting"
							width={500}
							height={500}
							className="rounded-lg"
						/> */}

						{/* Download CV Circle Button */}
						<Button
							// href="/path-to-cv.pdf"
							type="button"
							className="absolute -top-12 right-12 bg-white p-4 rounded-full shadow-lg text-center"
						>
							<span className="block font-semibold text-sm">Download CV</span>
							<span className="block text-3xl">⬇️</span>
						</Button>

						{/* Experience and Projects Stats */}
						<div className="absolute bottom-0 right-0 bg-blue-600 text-white py-4 px-8 rounded-lg shadow-lg">
							<p className="text-2xl font-semibold">10</p>
							<p className="text-sm">Years of experience</p>
						</div>
						<div className="absolute bottom-0 right-32 bg-blue-600 text-white py-4 px-8 rounded-lg shadow-lg">
							<p className="text-2xl font-semibold">150</p>
							<p className="text-sm">Projects completed</p>
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
							{tools.map((tool) => (
								<div
									key={tool.name}
									className="flex-shrink-0 w-20 h-20 p-4 rounded-full shadow-md flex justify-center items-center bg-white hover:bg-gray-100 transition m-2"
								>
									{tool.icon}
								</div>
							))}
						</div>
					</div>
				</div>
			</section>
			<section className="bg-white py-16">
				<div className="container mx-auto">
					{/* Heading */}
					<div className="text-center mb-12">
						<h2 className="text-4xl font-bold text-gray-900">
							Check out my latest work
						</h2>
						<p className="mt-4 text-gray-600 max-w-2xl mx-auto">
							My goal is to create effective digital experiences that make
							people's lives easier and better. I hope my work is a reflection
							of this.
						</p>
					</div>

					{/* Work Item */}
					<div className="grid grid-cols-1 gap-8">
						{work.map((work) => (
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
			</section>

			<section className="bg-white py-16">
				<div className="container mx-auto">
					{/* Heading */}
					<div className="text-center mb-12">
						<h2 className="text-4xl font-bold text-gray-900">
							<span className="text-blue-600">Thoughts</span> on design,
							business, and indie-hacking
						</h2>
					</div>

					{/* Blog Post Cards */}
					<div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
						{posts.map((post) => (
							<div
								key={post.title}
								className="bg-white border border-gray-200 rounded-lg shadow-md overflow-hidden"
							>
								{/* <Image
                src={post.image}
                alt={post.title}
                width={600}
                height={400}
                className="w-full h-48 object-cover"
              /> */}
								<div className="p-6">
									<div className="text-blue-600 font-semibold">
										{post.category}
									</div>
									<h3 className="text-lg font-bold text-gray-900 mt-2">
										{post.title}
									</h3>
									<p className="mt-2 text-gray-600">{post.description}</p>
									<div className="mt-4 flex justify-between text-sm text-gray-500">
										<div>{post.date}</div>
										<div>{post.readTime}</div>
									</div>
								</div>
							</div>
						))}
					</div>
				</div>
			</section>

			<section className="bg-gray-50 py-16">
				<div className="container mx-auto text-center">
					<h2 className="text-4xl font-bold text-gray-900 mb-12">
						Here’s what past clients are saying about me
					</h2>

					{/* Testimonials Cards */}
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
						{testimonials.map((testimonial) => (
							<div
								key={testimonial.name}
								className="bg-white p-6 rounded-lg shadow-md flex flex-col"
							>
								<div className="flex justify-center mb-4">
									{/* Star Rating */}
									{Array.from({ length: testimonial.rating }).map((_, i) => (
										<svg
											// biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
											key={i}
											xmlns="http://www.w3.org/2000/svg"
											fill="currentColor"
											viewBox="0 0 24 24"
											stroke="none"
											className="w-5 h-5 text-yellow-400"
										>
											<title>Star Rating</title>
											<path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
										</svg>
									))}
								</div>
								<blockquote className="text-xl font-semibold text-gray-900 mb-4">
									“{testimonial.quote}”
								</blockquote>
								<p className="text-gray-600 mb-6">{testimonial.feedback}</p>
								<div className="mt-auto flex items-center justify-center">
									<img
										src={testimonial.image}
										alt={testimonial.name}
										className="w-12 h-12 rounded-full mr-4"
									/>
									<div className="text-left">
										<p className="font-bold text-gray-900">
											{testimonial.name}
										</p>
										<p className="text-sm text-gray-600">{testimonial.title}</p>
									</div>
								</div>
							</div>
						))}
					</div>
				</div>
			</section>
		</>
	);
}
