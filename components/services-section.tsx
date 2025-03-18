import { Container } from "@/components/container";
import {
  TypographyH2,
  TypographyH3,
  TypographyH4,
  typographyStyles,
} from "@/components/typography";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import type { appConfig } from "@/lib/app-config";
import { cn } from "@/lib/utils";

interface ServicesSectionProps {
  readonly services: typeof appConfig.services;
}

export function ServicesSection({ services }: ServicesSectionProps) {
  return (
    <section>
      <Container>
        <TypographyH2 className={cn(typographyStyles.p, "mb-12")}>
          Services
        </TypographyH2>
      </Container>
      <Container>
        <Accordion type="multiple">
          {services.map((service) => (
            <AccordionItem key={service.title} value={service.title}>
              <AccordionTrigger>
                <TypographyH3 className={cn(typographyStyles.h3, "m-0 p-0")}>
                  {service.title}
                </TypographyH3>
              </AccordionTrigger>
              <AccordionContent asChild>
                {service.services.map((service) => (
                  <TypographyH4 className="leading-loose" key={service}>
                    {service}
                  </TypographyH4>
                ))}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </Container>
    </section>
  );
}
