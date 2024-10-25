import * as Icon from "@/components/dev-icons";
import {
	TypographyH1,
	TypographyH2,
	TypographyH3,
	TypographyLarge,
	TypographyLead,
	TypographySmall,
} from "@/components/typography";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import type React from "react";
import { DownloadIcon } from "lucide-react";
import Image from "next/image";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/card";

const roles: Array<{
	title: string;
	company: string;
	startDate: string;
	endDate: string;
	description: string;
	logo: React.ReactNode;
}> = [
	{
		title: "Senior UI Engineer",
		company: "Goldman Sachs",
		startDate: "2021",
		endDate: "Present",
		description:
			"I worked for Cognizant as a Senior Software Engineer for 3 years. I was responsible for designing and developing web and desktop applications for clients in the financial services industry.",
		logo: (
			<svg
				xmlns="http://www.w3.org/2000/svg"
				viewBox="0 0 24 24"
				width="24"
				height="24"
			>
				<title>Goldman Sachs</title>
				<path
					fill="currentColor"
					d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z"
				/>
			</svg>
		),
	},
	{
		title: "UX Architect",
		company: "Schema Driven",
		startDate: "2019",
		endDate: "2021",
		description:
			"Currently, I work for Schema Driven, a startup that provides enterprise-level automation software. As the lead UX Architect, I work closely with the engineering team to design and build powerful &amp; easy-to-use low-code tooling.",
		logo: (
			<svg
				xmlns="http://www.w3.org/2000/svg"
				viewBox="0 0 24 24"
				width="24"
				height="24"
			>
				<title>Schema Driven</title>
				<path
					fill="currentColor"
					d="M3 3h18v18H3V3zm16 16V5H5v14h14zM7 7h2v2H7V7zm0 4h2v2H7v-2zm0 4h2v2H7v-2zm4-8h6v2h-6V7zm0 4h6v2h-6v-2zm0 4h6v2h-6v-2z"
				/>
			</svg>
		),
	},
	{
		title: "Lead Frontend Developer",
		company: "SAIC",
		startDate: "2017",
		endDate: "2019",
		description:
			"I started my career at Accenture as a Software Engineer. I worked on a variety of projects for clients in the healthcare and retail industries.",
		logo: (
			<svg
				xmlns="http://www.w3.org/2000/svg"
				viewBox="0 0 24 24"
				width="24"
				height="24"
			>
				<title>SAIC</title>
				<path
					fill="currentColor"
					d="M12 2L1 21h22L12 2zm0 3.83L19.13 19H4.87L12 5.83zM11 16h2v2h-2v-2zm0-6h2v4h-2v-4z"
				/>
			</svg>
		),
	},
	{
		title: "Founder",
		company: "Smart Sale",
		startDate: "2013",
		endDate: "2016",
		description:
			"I started my career at Accenture as a Software Engineer. I worked on a variety of projects for clients in the healthcare and retail industries.",
		logo: (
			<svg
				xmlns="http://www.w3.org/2000/svg"
				viewBox="0 0 24 24"
				width="24"
				height="24"
			>
				<title>Smart Sale</title>
				<path
					fill="currentColor"
					d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z"
				/>
			</svg>
		),
	},
	{
		title: "Graphic Designer",
		company: "Freelance",
		startDate: "2010",
		endDate: "2013",
		description: "",
		logo: (
			<svg
				xmlns="http://www.w3.org/2000/svg"
				viewBox="0 0 24 24"
				width="24"
				height="24"
			>
				<title>Adobe Illustrator</title>
				<path
					fill="currentColor"
					d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z"
				/>
			</svg>
		),
	},
];

const stack = [
	{
		name: "Rails",
		experience: "7+ years of experience",
		logo: "/path-to-rails-logo.png",
	},
	{
		name: "Python",
		experience: "4 years of experience",
		logo: "/path-to-python-logo.png",
	},
	{
		name: "Tailwind",
		experience: "3 years of experience",
		logo: "/path-to-tailwind-logo.png",
	},
	{
		name: "Javascript",
		experience: "8+ years of experience",
		logo: "/path-to-js-logo.png",
	},
	{
		name: "Postgresql",
		experience: "6 years of experience",
		logo: "/path-to-postgresql-logo.png",
	},
	{
		name: "Ruby",
		experience: "9 years of experience",
		logo: "/path-to-ruby-logo.png",
	},
];
const skills = [
	{
		name: "Experience (Years)",
		axes: [
			{ axis: "Marketing", value: 3 },
			{ axis: "Design", value: 7 },
			{ axis: "Frontend", value: 8 },
			{ axis: "Backend", value: 5 },
			{ axis: "Infrastructure", value: 4 },
		],
	},
	{
		name: "Current Interest",
		axes: [
			{ axis: "Marketing", value: 5 },
			{ axis: "Design", value: 9 },
			{ axis: "Frontend", value: 10 },
			{ axis: "Backend", value: 8 },
			{ axis: "Infrastructure", value: 7 },
		],
	},
];

export default function About() {
	return (
		<>
			<section className="bg-secondary py-24 relative">
				<div className="container grid grid-cols-1 lg:grid-cols-12 gap-12">
					{/* Left section: Introduction Text */}
					<div className="col-span-1 lg:col-span-8 prose prose-lg">
						<h1 className="text-5xl font-bold text-foreground leading-tight">
							Hi, I'm Jane and I’m a{" "}
							<span className="underline decoration-orange-500">
								designer & developer
							</span>
						</h1>
						<p>
							I'm a passionate software engineer with over 8 years of experience
							in developing robust and scalable applications. My journey in the
							tech world began with a fascination for problem-solving and has
							evolved into a career focused on creating innovative solutions. I
							specialize in full-stack development, with expertise in
							JavaScript, React, Node.js, and cloud technologies.
						</p>
						<p>
							Throughout my career, I've had the opportunity to work on diverse
							projects, from building high-performance web applications to
							developing complex backend systems. I'm particularly interested in
							user-centric design and always strive to create intuitive,
							efficient interfaces that enhance the user experience.
						</p>
						<p>
							I'm a strong advocate for clean code, test-driven development, and
							continuous learning. In this rapidly evolving field, I believe
							it's crucial to stay updated with the latest technologies and best
							practices. When I'm not coding, you can find me contributing to
							open-source projects, mentoring junior developers, or exploring
							new tech stacks.
						</p>
						<p className="text-xl my-12 font-bold italic text-foreground">
							Brian Rabil
						</p>
					</div>

					{/* Right section: Image */}
					<div className="col-span-1 lg:col-span-4">
						<Image
							src="https://placehold.co/990x1346"
							alt="Placeholder profile image"
							width={990}
							height={1346}
							className="h-full w-full object-cover rounded-lg overflow-hidden"
						/>
					</div>
				</div>
			</section>

			<section className="bg-background py-24">
				<div className="container grid grid-cols-1 lg:grid-cols-12 gap-12">
					{/* Title Section */}
					<div className="col-span-1 lg:col-span-4 prose prose-lg">
						<h2 className="text-5xl font-bold text-foreground leading-tight">
							My career{" "}
							<span className="underline decoration-blue-500">journey</span> so
							far
						</h2>
						<p className="text-foreground mt-8">
							Panna french americano macchiato breve roast cinnamon cortado
							strong white pumpkin et single press aftertaste.
						</p>
						<Button
							type="button"
							className="mt-6"
							variant="secondary"
							size="lg"
						>
							Download CV <DownloadIcon className="w-4 h-4 ml-2" />
						</Button>
					</div>

					{/* Roles Grid */}
					<div className="col-span-1 lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-8">
						{roles.map((role, index) => (
							<Card key={role.company}>
								<CardHeader className="flex flex-row justify-between items-center">
									<div className="flex flex-col space-y-2">
										{role.logo && role.logo}
										<p className="font-semibold text-accent-foreground text-xs">
											{role.startDate} - {role.endDate}
										</p>
										<p className="text-lg font-bold text-foreground">
											{role.company}
										</p>
									</div>

									<div className="text-muted-foreground/10 text-8xl font-bold m-0 p-0">
										{`0${index + 1}`}
									</div>
								</CardHeader>
								{/* Number behind each item */}

								{/* Role Info */}
								<CardContent>
									<div className="">
										<p className="text-muted-foreground">{role.description}</p>
									</div>
								</CardContent>
							</Card>
						))}
					</div>
				</div>
			</section>

			<section className="bg-secondary py-24">
				<div className="container grid grid-cols-1 lg:grid-cols-12 gap-12">
					<div className="col-span-1 lg:col-span-6 prose prose-lg">
						<h2 className="text-5xl font-bold text-foreground leading-tight">
							A tour of my gadgets and workstation
						</h2>
						<p>
							Lorem ipsum, dolor sit amet consectetur adipisicing elit. Maiores
							impedit perferendis suscipit eaque, iste dolor cupiditate
							blanditiis ratione. Instant extraction mazagran milk instant milk
							foam café iced aftertaste iced brewed.
						</p>
						<Button
							type="button"
							className="mt-6"
							variant="secondary"
							size="lg"
						>
							Follow me on X
						</Button>
					</div>
					<div className="col-span-1 lg:col-span-6">
						<Image
							src="https://placehold.co/743x1048"
							alt="Placeholder profile image"
							width={743}
							height={1048}
							className="object-cover rounded-lg overflow-hidden"
						/>
					</div>
				</div>
			</section>

			<section className="bg-background py-24">
				<div className="container grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
					{/* Left Section: Image and Badge */}
					<div className="relative col-span-1">
						<Image
							src="https://placehold.co/743x1048"
							alt="Placeholder profile image"
							width={743}
							height={1048}
							className="h-full w-full object-cover rounded-lg overflow-hidden"
						/>
						{/* Badge */}
						<div className="absolute bottom-4 left-4 bg-blue-600 text-white p-4 rounded-lg shadow-lg">
							<p className="font-semibold">55+ Clients have loved my work</p>
							<div className="flex mt-2">
								{/* Avatars Placeholder */}
								<img
									src="/path-to-avatar1.jpg"
									alt="Client 1"
									className="w-8 h-8 rounded-full border-2 border-white -ml-2"
								/>
								<img
									src="/path-to-avatar2.jpg"
									alt="Client 2"
									className="w-8 h-8 rounded-full border-2 border-white -ml-2"
								/>
								<img
									src="/path-to-avatar3.jpg"
									alt="Client 3"
									className="w-8 h-8 rounded-full border-2 border-white -ml-2"
								/>
								<img
									src="/path-to-avatar4.jpg"
									alt="Client 4"
									className="w-8 h-8 rounded-full border-2 border-white -ml-2"
								/>
							</div>
						</div>
					</div>

					{/* Right Section: Tech Stack */}
					<div className="col-span-1">
						<h2 className="text-4xl font-bold text-gray-900">
							A simple stack that you can{" "}
							<span className="underline decoration-blue-500">
								always trust
							</span>
						</h2>
						<p className="mt-4 text-gray-600">
							I've been a software developer for over 13 years, and while my
							stack has shifted over the years, I kept coming back to the same
							technologies. The following is the stack that I've developed &
							honed over the years as a software developer.
						</p>

						<div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
							{stack.map((tech) => (
								<div
									key={tech.name}
									className="flex items-center bg-gray-100 p-4 rounded-lg shadow-md"
								>
									<img
										src={tech.logo}
										alt={`${tech.name} logo`}
										className="w-10 h-10 mr-4"
									/>
									<div>
										<p className="font-semibold text-gray-900">{tech.name}</p>
										<p className="text-sm text-gray-600">{tech.experience}</p>
									</div>
								</div>
							))}
						</div>
					</div>
				</div>
			</section>
		</>
	);
}
