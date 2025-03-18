"use client";

import { TypographyH4 } from "@/components/typography";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import type { appConfig } from "@/lib/app-config";
import { cn } from "@/lib/utils";
import Autoplay from "embla-carousel-autoplay";
import Image from "next/image";

export enum ProjectCategory {
  APP = "Application",
  BRANDING = "Branding",
}

type Project = (typeof appConfig.projects)[0];

export interface ProjectCardProps {
  readonly title: Project["title"];
  readonly company: Project["company"];
  readonly description: Project["description"];
  readonly images: Project["images"];
  readonly status: Project["status"];
}

export function ProjectCard({
  title,
  company,
  description,
  images,
  status,
}: ProjectCardProps) {
  return (
    <Card className="shadow-none rounded-2xl">
      <CardHeader>
        <Carousel
          opts={{
            active: images.length > 1,
            loop: images.length > 1,
          }}
          plugins={[
            Autoplay({
              active: images.length > 1,
              delay: 5000,
            }),
          ]}
        >
          <CarouselContent>
            {images.map((image) => (
              <CarouselItem key={image.src}>
                <Image
                  src={image.src}
                  alt={title}
                  width={600}
                  height={400}
                  className={cn(
                    "w-full h-full rounded-2xl object-cover overflow-hidden aspect-video",
                  )}
                />
              </CarouselItem>
            ))}
          </CarouselContent>
          {/* <CarouselPrevious />
					<CarouselNext /> */}
        </Carousel>
      </CardHeader>
      <CardContent className="flex flex-row justify-between">
        {/* <CardDescription className="flex items-center gap-1 mb-2 text-base"></CardDescription> */}
        {/* <Separator className="mx-2" orientation="vertical" /> */}
        <div className="flex flex-col">
          <div className="flex items-center gap-1 mb-2 text-base">
            <Image
              src={company.logo}
              alt={company.name}
              width={20}
              height={20}
              className="w-5 h-5 rounded-full"
            />
            <span className="text-lg text-foreground">{company.name}</span>
          </div>
          <TypographyH4>{title}</TypographyH4>
        </div>
        <div>
          {status === "featured" && (
            <span className="text-sm text-foreground">Featured</span>
          )}
          {status === "archived" && (
            <span className="text-sm text-foreground">Archived</span>
          )}
        </div>
        {/* <TypographyP className="whitespace-nowrap truncate">{description}</TypographyP> */}
      </CardContent>
    </Card>
  );
}
