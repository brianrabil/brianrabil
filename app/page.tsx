import { BlogSection } from "@/components/blog-section";
import { Container } from "@/components/container";
import * as Icon from "@/components/dev-icons";
import DotMatrix from "@/components/dot-matrix";
import { Section } from "@/components/section";
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

export default async function App() {
	return (
		<>
			<Section>
				<Container>
					<div className="grid grid-cols-2 gap-x-16">
						<div className="flex flex-col gap-4 justify-center items-start">
							<TypographyH1>Hi, I&apos;m Brian Rabil</TypographyH1>
							<TypographyP>
								I&apos;m a full-stack developer with a passion for building
								performant and scalable web applications. My core expertise lies
								in Rust, TypeScript, and the React framework Next.js. This
								powerful combination allows me to craft robust solutions that
								deliver exceptional user experiences.
							</TypographyP>
						</div>

						<div>
							<DotMatrix />
						</div>
					</div>
				</Container>
			</Section>

			<Section>
				<Container>
					<Alert>
						{/* <Terminal className="h-4 w-4" /> */}
						<div className="flex flex-row justify-between">
							<div>
								<AlertTitle>Heads up!</AlertTitle>
								<AlertDescription>
									You can add components to your app using the cli.
								</AlertDescription>
							</div>
							<Button>Chat now</Button>
						</div>
					</Alert>
				</Container>
			</Section>

			<Section>
				<Container className="flex flex-col">
					<div className="w-full flex justify-between items-end">
						<div>
							<TypographyD2>Latest Articles</TypographyD2>
							<TypographyLead>
								Read the latest articles from my blog
							</TypographyLead>
						</div>
						<Button variant="link" className="gap-x-1.5">
							See all posts
							<ArrowRightIcon className="h-4 w-4" />
						</Button>
					</div>
					<BlogSection />
				</Container>
			</Section>

			<Section>
				<Container>
					<TypographyH2>Hi, I&apos;m Brian Rabil</TypographyH2>
					<TypographyP>
						I&apos;m a full-stack developer with a passion for building
						performant and scalable web applications. My core expertise lies in
						Rust, TypeScript, and the React framework Next.js. This powerful
						combination allows me to craft robust solutions that deliver
						exceptional user experiences. Beyond my professional work, I&apos;m
						an avid tech enthusiast. I&apos;m fascinated by the potential of
						self-hosting, the flexibility of Linux, the importance of
						streamlined build tools, and the ever-evolving capabilities of
						Node.js. I believe in the power of open-source and continuously
						exploring new technologies.
					</TypographyP>
				</Container>
			</Section>

			<Section>
				<Container className="flex flex-col gap-y-4">
					<TypographyH2>My Tech Stack</TypographyH2>
					<TypographyLarge>Languages</TypographyLarge>
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
					</div>

					<TypographyLarge>Libraries</TypographyLarge>
					<div
						className={
							"grid grid-cols-5 gap-3 md:flex md:justify-start md:flex-wrap"
						}
					>
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

					<TypographyLarge>Services</TypographyLarge>
					<div
						className={
							"grid grid-cols-5 gap-3 md:flex md:justify-start md:flex-wrap"
						}
					>
						<Icon.FigmaIcon />
						<Icon.AWSIcon />
						<Icon.DockerIcon />
						<Icon.GitlabIcon />
						<Icon.GithubIcon />
					</div>

					<TypographyLarge>Operating Systems</TypographyLarge>
					<div
						className={
							"grid grid-cols-5 gap-3 md:flex md:justify-start md:flex-wrap"
						}
					>
						<Icon.AppleIcon />
						<Icon.ArchLinuxIcon />
						<Icon.FedoraIcon />
						<Icon.ChromeIcon />
						<Icon.CypressIcon />
						<Icon.JiraIcon />
						<Icon.PostCSSIcon />
						<Icon.RedHatIcon />
						<Icon.RollupIcon />
					</div>
				</Container>
			</Section>

			<div className={"py-12"}>
				<div className={"grid grid-cols-1 md:grid-cols-2 gap-6"}>
					{/* <Image
          title="Warrior Academy"
          image={
            <StaticImage
              src="../images/warrior-academy-mockup.png"
              alt="Warrior Academy"
              layout="fullWidth"
              placeholder="blurred"
              loading="lazy"
            />
          }
        />
        <Image
          title="My Financial"
          image={
            <StaticImage
              src="../images/my-financial-mockup.png"
              alt="My Financial"
              layout="fullWidth"
              placeholder="blurred"
              loading="lazy"
            />
          }
        /> */}
					{/* <Image
          title="Warrior Academy Course Platform"
          image={
            // <StaticImage
            //   src="../images/warrior-academy-learning-mockup.png"
            //   alt="Warrior Academy Course Platform"
            //   layout="fullWidth"
            //   placeholder="blurred"
            //   loading="lazy"
            // />
          }
        /> */}
					{/* <Image
          title="Synthetic Analyst"
          image={
            <StaticImage
              src="../images/sa-module-builder-mockup.png"
              alt="Synthetic Analyst"
              layout="fullWidth"
              placeholder="blurred"
              loading="lazy"
            />
          }
        /> */}
					{/* <Image
          title="Compeat"
          image={
            <StaticImage
              src="../images/compeat-mockup.png"
              alt="Compeat"
              layout="fullWidth"
              placeholder="blurred"
              loading="lazy"
            />
          }
        /> */}
					{/* <Image
          title="CAP Map"
          image={
            <StaticImage
              src="../images/cap-map-mockup.png"
              alt="CAP Map"
              layout="fullWidth"
              placeholder="blurred"
              loading="lazy"
            />
          }
        /> */}
					{/* <Image
          title="GMARS Logo"
          image={
            <StaticImage
              src="../images/gmars-logo.png"
              alt="GMARS Logo"
              layout="fullWidth"
              placeholder="blurred"
              loading="lazy"
            />
          }
        /> */}
				</div>
			</div>
		</>
	);
}
