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
import type React from "react";
import Image from "next/image";
import { RadarChart, type RadarChartProps } from "@/components/radar-chart";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/card";

const workExperience: Array<{
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
const skills: RadarChartProps["data"] = [
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
		<div className="grid grid-cols-2 py-12  md:pt-24 md:pb-12">
			{/* <SEO title="Page two" /> */}
			<div>
				<TypographyH1>I&apos;m Brian Rabil</TypographyH1>
				<TypographyLead>Full-Stack Developer</TypographyLead>
			</div>
			<div>
				<div className={"max-w-2xl mx-auto"}>
					<TypographyLead className={"mb-5"}>
						My name is Brian Rabil, and I am full-stack software developer based
						in Washington D.C. with over 8 years of experience in designing,
						planning, and developing web and desktop applications.
					</TypographyLead>
					<TypographyH3 className="mb-6">Skills</TypographyH3>
					<RadarChart title="Skills" data={skills} width={500} height={500} />
					<div className="flex flex-col gap-4">
						<div
							className={
								"grid grid-cols-5 gap-3 md:flex md:justify-start md:flex-wrap"
							}
						>
							<Icon.TypescriptIcon />
							<Icon.PythonIcon />
							<Icon.JavascriptIcon />
							<Icon.GoIcon />
							<Icon.RustIcon />
							<Icon.BashIcon />
							<Icon.FigmaIcon />
							<Icon.AWSIcon />
							<Icon.DockerIcon />
							<Icon.GitlabIcon />
							<Icon.GithubIcon />
							<Icon.AppleIcon />
							<Icon.ArchLinuxIcon />
							<Icon.FedoraIcon />
							<Icon.ChromeIcon />
							<Icon.CypressIcon />
							<Icon.JiraIcon />
							<Icon.PostCSSIcon />
							<Icon.RedHatIcon />
							<Icon.RollupIcon />
							<Icon.NextIcon />
							<Icon.VercelIcon />
							<Icon.PNPMIcon />
							<Icon.PrismaIcon />
							<Icon.TailwindIcon />
							<Icon.ExpressIcon />
							<Icon.BunIcon />
							<Icon.NodeIcon />
							<Icon.TauriIcon />
							<Icon.StorybookIcon />
							<Icon.PostgresIcon />
							<Icon.WebpackIcon />
							<Icon.GraphQL />
						</div>

						<div
							className={
								"grid grid-cols-5 gap-3 md:flex md:justify-start md:flex-wrap"
							}
						/>
					</div>
					<TypographyH3 className="mb-6">Work Experience</TypographyH3>
					<div className="flex flex-col gap-y-4">
						{workExperience.map((work) => (
							<Card key={work.title}>
								<CardHeader>
									<div className="flex justify-between items-center">
										<div className="flex items-center gap-4">
											{work.logo && work.logo}
											<div>
												<TypographyLarge>{work.title}</TypographyLarge>
												<TypographySmall>{work.company}</TypographySmall>
											</div>
										</div>
										<div>
											<TypographySmall>
												{work.startDate}--{work.endDate}
											</TypographySmall>
										</div>
									</div>
								</CardHeader>
							</Card>
						))}
					</div>

					<h2 className={"text-md text-black dark:text-white leading-loose"}>
						{/* <p className={`mb-5`}>
              Currently, I work for Schema Driven, a startup that provides
              enterprise-level automation software. As the lead UX Architect, I
              work closely with the engineering team to design and build
              powerful &amp; easy-to-use low-code tooling.
            </p> */}
						{/* <p className={`mb-5`}>
              When I&apos;m not busy working on my various projects, I like to
              enjoy some well-deserved leisure time by reading books and
              watching low-grade reality TV with my wife and Yorkie puppy.
            </p> */}
						{/* <p className={`mb-5`}>
              If you need an app developer for your next project, please
              don&apos;t hesitate to get in touch. I live for the days spent
              solving problems with technology - it&apos;s my passion.
            </p> */}
					</h2>
				</div>
			</div>
			<Link href="/">Go back to the homepage</Link>
		</div>
	);
}
