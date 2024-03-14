import DotMatrix from "@/components/dot-matrix";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Section } from "@/components/section";
import { Container } from "@/components/container";
import * as Icon from "@/components/icon";
import { CardGrid } from "@/components/card-grid";
import {
  TypographyH1,
  TypographyH2,
  TypographyLarge,
  TypographyP,
} from "@/components/typography";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";

export default function App() {
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
        <Container className="flex flex-col gap-6">
          <TypographyH2>Latest Articles</TypographyH2>
          <CardGrid>
            <Card>
              <CardHeader>
                <CardTitle>Review: Apple Vision Pro</CardTitle>
                <CardDescription>
                  Deploy your new project in one-click.
                </CardDescription>
              </CardHeader>
              <CardContent></CardContent>
              <CardFooter>
                <div className="flex flex-row items-center gap-x-1">
                  <Badge variant="outline">Review</Badge>
                  <Badge variant="outline">Technology</Badge>
                </div>
              </CardFooter>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>My Every Day Carry (EDC)</CardTitle>
                <CardDescription>
                  Deploy your new project in one-click.
                </CardDescription>
              </CardHeader>
              <CardContent></CardContent>
              <CardFooter>
                <div className="flex flex-row items-center gap-x-1">
                  <Badge variant="outline">Guide</Badge>
                  <Badge variant="outline">EDC</Badge>
                </div>
              </CardFooter>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>My Battle Station</CardTitle>
                <CardDescription>
                  Deploy your new project in one-click.
                </CardDescription>
              </CardHeader>
              <CardContent></CardContent>
              <CardFooter>
                <div className="flex flex-row items-center gap-x-1">
                  <Badge variant="outline">Guide</Badge>
                  <Badge variant="outline">EDC</Badge>
                </div>
              </CardFooter>
            </Card>
          </CardGrid>
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
            className={`grid grid-cols-5 gap-5 md:flex md:justify-start md:flex-wrap`}
          >
            <Icon.TypescriptIcon />
            <Icon.GoIcon />
            <Icon.RustIcon />
          </div>

          <TypographyLarge>Libraries</TypographyLarge>
          <div
            className={`grid grid-cols-5 gap-5 md:flex md:justify-start md:flex-wrap`}
          >
            <Icon.NextIcon />
            <Icon.PrismaIcon />
            <Icon.StorybookIcon />
            <Icon.BunIcon />
            <Icon.NodeIcon />
            <Icon.TauriIcon />
            <Icon.TailwindIcon />
            <Icon.PostgresIcon />
            <Icon.WebpackIcon />
          </div>

          <TypographyLarge>Services</TypographyLarge>
          <div
            className={`grid grid-cols-5 gap-5 md:flex md:justify-start md:flex-wrap`}
          >
            <Icon.VercelIcon />
            <Icon.FigmaIcon />
            <Icon.AWSIcon />
          </div>

          <TypographyLarge>Operating Systems</TypographyLarge>
          <div
            className={`grid grid-cols-5 gap-5 md:flex md:justify-start md:flex-wrap`}
          >
            <Icon.AppleIcon />
            <Icon.ArchLinuxIcon />
            <Icon.FedoraIcon />
          </div>
        </Container>
      </Section>

      <div className={`py-12`}>
        {/* <Fade> */}
        <h2 className={`text-3xl font-medium mb-8 flex items-center`}>
          <span
            className={`bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 to-red-400 block`}
          >
            Recent works
          </span>
        </h2>
        {/* </Fade> */}

        <div className={`grid grid-cols-1 md:grid-cols-2 gap-6`}>
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
