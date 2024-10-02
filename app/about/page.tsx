import * as Icon from "@/components/dev-icons";
import {
	TypographyH1,
	TypographyH2,
	TypographyH3,
	TypographyLarge,
	TypographyLead,
	TypographySmall,
} from "@/components/typography";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import React from "react";

const workExperience: Array<{
	title: string;
	company: string;
	startDate: string;
	endDate: string;
	description: string;
}> = [
	{
		title: "Senior UI Engineer",
		company: "Goldman Sachs",
		startDate: "2021",
		endDate: "Present",
		description:
			"I worked for Cognizant as a Senior Software Engineer for 3 years. I was responsible for designing and developing web and desktop applications for clients in the financial services industry.",
	},
	{
		title: "UX Architect",
		company: "Schema Driven",
		startDate: "2019",
		endDate: "2021",
		description:
			"Currently, I work for Schema Driven, a startup that provides enterprise-level automation software. As the lead UX Architect, I work closely with the engineering team to design and build powerful &amp; easy-to-use low-code tooling.",
	},
	{
		title: "Lead Frontend Developer",
		company: "SAIC",
		startDate: "2017",
		endDate: "2019",
		description:
			"I started my career at Accenture as a Software Engineer. I worked on a variety of projects for clients in the healthcare and retail industries.",
	},
	{
		title: "Founder",
		company: "Smart Sale",
		startDate: "2013",
		endDate: "2016",
		description:
			"I started my career at Accenture as a Software Engineer. I worked on a variety of projects for clients in the healthcare and retail industries.",
	},
	{
		title: "Graphic Designer",
		company: "Freelance",
		startDate: "2010",
		endDate: "2013",
		description: "",
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
										<div>
											<TypographyLarge>{work.title}</TypographyLarge>
											<TypographySmall>{work.company}</TypographySmall>
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
