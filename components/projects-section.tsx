import { Container } from "@/components/container";
import { ProjectCard } from "@/components/project-card";
import {
  LeadText,
  TypographyH2,
  TypographyLarge,
} from "@/components/typography";
import { Button } from "@/components/ui/button";
import type { appConfig } from "@/lib/app-config";
import { ArrowRightIcon } from "@radix-ui/react-icons";
import Link from "next/link";

interface ProjectsSectionProps {
  readonly projects: typeof appConfig.projects;
}

export function ProjectsSection({ projects }: ProjectsSectionProps) {
  return (
    <section className="bg-background max-w-[100vw] overflow-x-hidden">
      <Container>
        {/* <div className="text-center mb-12">
					<TypographyH2>Check out my latest work</TypographyH2>
					<TypographyLarge>
						My goal is to create effective digital experiences that make people's lives easier and
						better. I hope my work is a reflection of this.
					</TypographyLarge>
				</div> */}
        <div className="my-12 w-full">
          {projects
            .filter((project) => project.status === "featured")
            .map((project) => (
              <ProjectCard
                key={project.title}
                title={project.title}
                company={project.company}
                description={project.description}
                images={project.images}
                status={project.status}
              />
            ))}
        </div>
        <div className="grid grid-cols-2 gap-12">
          {projects
            .filter((project, i) => project.status === "default" && i <= 4)
            .map((project) => (
              <ProjectCard
                key={project.title}
                title={project.title}
                company={project.company}
                description={project.description}
                images={project.images}
                status={project.status}
              />
            ))}
        </div>

        <div className="flex justify-center mt-16">
          <Button type="button" variant="outline" size="lg" asChild>
            <Link href="/projects">
              View all projects
              <ArrowRightIcon className="w-4 h-4 ml-2" />
            </Link>
          </Button>
        </div>
      </Container>
    </section>
  );
}
