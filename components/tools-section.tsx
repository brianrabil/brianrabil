import { TypographyH3 } from "@/components/typography";
import type { appConfig } from "@/lib/app-config";
import Image from "next/image";

interface ToolsSectionProps {
  readonly tools: typeof appConfig.tools;
}

export function ToolsSection({ tools }: ToolsSectionProps) {
  return (
    <section className="bg-background py-16">
      <div className="container mx-auto">
        <TypographyH3 className="text-center mb-8">
          The tools I use on my day-to-day
        </TypographyH3>

        <div className="overflow-x-auto">
          <div className="flex space-x-8 justify-center items-center flex-wrap">
            {tools.map((tool) => (
              <div
                key={tool.name}
                className="shrink-0 w-32 h-32 p-4 rounded-full  flex justify-center items-center  transition m-2"
              >
                <Image
                  src={tool.logo}
                  alt={`${tool.name} logo`}
                  width={32}
                  height={32}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
