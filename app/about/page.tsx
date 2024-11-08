import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/card";
import { config } from "@/lib/config";
import { HighlightText } from "@/components/typography";
import { Button } from "@/components/ui/button";
import { DownloadIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import type React from "react";
import { Container } from "@/components/container";
import { SocialIcon } from "react-social-icons";
import {
	Table,
	TableHeader,
	TableBody,
	TableHead,
	TableRow,
	TableCell,
} from "@/components/ui/table";

export default function About() {
	return (
		<>
			<section className="bg-secondary py-24 relative">
				<Container className="grid grid-cols-1 lg:grid-cols-12 gap-12">
					{/* Left section: Introduction Text */}
					<div className="col-span-1 lg:col-span-8 prose prose-lg">
						<h1 className="text-5xl font-bold text-foreground leading-tight">
							Hi, I'm {config.profile.firstName} and I’m a{" "}
							<HighlightText>{config.profile.jobTitle}</HighlightText>
						</h1>
						<p>
							I'm a passionate software engineer with over 8 years of experience in developing
							robust and scalable applications. My journey in the tech world began with a
							fascination for problem-solving and has evolved into a career focused on creating
							innovative solutions. I specialize in full-stack development, with expertise in
							JavaScript, React, Node.js, and cloud technologies.
						</p>
						<p>
							Throughout my career, I've had the opportunity to work on diverse projects, from
							building high-performance web applications to developing complex backend systems. I'm
							particularly interested in user-centric design and always strive to create intuitive,
							efficient interfaces that enhance the user experience.
						</p>
						<p>
							I'm a strong advocate for clean code, test-driven development, and continuous
							learning. In this rapidly evolving field, I believe it's crucial to stay updated with
							the latest technologies and best practices. When I'm not coding, you can find me
							contributing to open-source projects, mentoring junior developers, or exploring new
							tech stacks.
						</p>
						<p className="text-xl my-12 font-bold italic text-foreground">Brian Rabil</p>
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
				</Container>
			</section>

			<section className="bg-background py-24">
				<Container className="grid grid-cols-1 lg:grid-cols-12 gap-12">
					{/* Title Section */}
					<div className="col-span-1 lg:col-span-4 prose prose-lg">
						<h2 className="text-5xl font-bold text-foreground leading-tight">
							My career <HighlightText>journey</HighlightText> so far
						</h2>
						<p className="text-foreground mt-8">
							Panna french americano macchiato breve roast cinnamon cortado strong white pumpkin et
							single press aftertaste.
						</p>
						<Button type="button" className="mt-6" variant="secondary" size="lg">
							Download CV <DownloadIcon className="w-4 h-4 ml-2" />
						</Button>
					</div>

					{/* Roles Grid */}
					<div className="col-span-1 lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-8">
						{config.profile.career.map((role, index) => (
							<Card key={role.company}>
								<CardHeader className="flex flex-row justify-between items-center">
									<div className="flex flex-col space-y-2">
										{role.logo && (
											<Image src={role.logo} alt={`${role.company} logo`} width={24} height={24} />
										)}
										<p className="font-semibold text-accent-foreground text-xs">
											{role.startDate} - {role.endDate}
										</p>
										<p className="text-lg font-bold text-foreground">{role.company}</p>
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
				</Container>
			</section>

			<section className="bg-secondary py-24">
				<div className="container grid grid-cols-1 lg:grid-cols-12 gap-12">
					<div className="col-span-1 lg:col-span-6 prose prose-lg">
						<h2 className="text-5xl font-bold text-foreground leading-tight">
							A tour of my gadgets and workstation
						</h2>
						<p>
							Lorem ipsum, dolor sit amet consectetur adipisicing elit. Maiores impedit perferendis
							suscipit eaque, iste dolor cupiditate blanditiis ratione. Instant extraction mazagran
							milk instant milk foam café iced aftertaste iced brewed.
						</p>
						<Button type="button" className="mt-6" variant="outline" size="lg">
							Follow me on{" "}
							<SocialIcon
								className="max-w-5 max-h-5"
								bgColor="transparent"
								fgColor="currentColor"
								url={config.social.x.href}
								as="span"
							/>
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
							A simple stack that you can <HighlightText>always trust</HighlightText>
						</h2>
						<p className="mt-4 text-foreground">
							I've been a software developer for over 13 years, and while my stack has shifted over
							the years, I kept coming back to the same technologies. The following is the stack
							that I've developed & honed over the years as a software developer.
						</p>

						<div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
							{config.profile.stack
								.filter((tech) => tech.featured)
								.map((tech) => (
									<Card key={tech.name}>
										<CardHeader>
											<div className="flex items-center gap-4">
												<Image src={tech.logo} alt={`${tech.name} logo`} width={28} height={28} />
												<div>
													<CardTitle>{tech.name}</CardTitle>
													<CardDescription>{tech.description}</CardDescription>
												</div>
											</div>
										</CardHeader>
									</Card>
								))}
						</div>
					</div>
				</div>
			</section>
			{/* <section className="bg-background py-12 md:py-20 lg:py-24">
				<Container>
					<div className="flex flex-col ">
						<h1>
							<h2 className="text-4xl font-bold text-foreground text-center md:text-left mb-12">
								My <HighlightText>Complete</HighlightText> Tech Stack
							</h2>
						</h1>
						<p className="text-foreground text-lg">
							Here's a comprehensive list of technologies I have used in my development workflow.
						</p>
					</div>

					<Table>
						<TableHeader>
							<TableRow>
								<TableHead className="w-[20px]" />
								<TableHead>Name</TableHead>
								<TableHead>Description</TableHead>
								<TableHead>Category</TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							{config.profile.stack.map((tech) => (
								<TableRow key={tech.name}>
									<TableCell>
										<Image src={tech.logo} alt={`${tech.name} logo`} width={24} height={24} />
									</TableCell>
									<TableCell>
										<a
											href={tech.url}
											target="_blank"
											rel="noopener noreferrer"
											className="font-medium hover:underline"
										>
											{tech.name}
										</a>
									</TableCell>
									<TableCell>{tech.description}</TableCell>
									<TableCell>
										<Badge variant="outline">{tech.category}</Badge>
									</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				</Container>
			</section> */}
		</>
	);
}
