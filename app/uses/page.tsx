import { Card } from "@/components/card";
import { Section } from "@/components/section";
import { SimpleLayout } from "@/components/simple-layout";

function ToolsSection({
  children,
  ...props
}: React.ComponentPropsWithoutRef<typeof Section>) {
  return (
    <Section {...props}>
      <ul className="space-y-16">{children}</ul>
    </Section>
  );
}

function Tool({
  title,
  href,
  children,
}: {
  title: string;
  href?: string;
  children: React.ReactNode;
}) {
  return (
    <Card as="li">
      <Card.Title as="h3" href={href}>
        {title}
      </Card.Title>
      <Card.Description>{children}</Card.Description>
    </Card>
  );
}

export const metadata = {
  title: "Uses",
  description: "My Tools for Work and Productivity",
};

export default function Uses() {
  return (
    <SimpleLayout
      title="My Tools for Work and Productivity"
      intro="I use this hardware and software to build solutions, stay efficient, and get things done."
    >
      <div className="space-y-20">
        <ToolsSection title="Workstation">
          <Tool title="16” MacBook Pro, M1 Pro (2021)">
            Its bright, vibrant display and excellent speakers make it a
            standout for both work and personal tasks.
          </Tool>
          <Tool title="Apple Vision Pro">
            A cutting-edge device that transforms how I interact with digital
            spaces, offering exciting potential for coding and analysis.
          </Tool>
        </ToolsSection>
        <ToolsSection title="Development tools">
          <Tool title="Zed">
            A fast, ai-native code editor written in Rust, perfect for building
            complex projects.
          </Tool>
          <Tool title="Cursor">
            An AI-powered code editor that predicts my next steps, and can
            delegate coding tasks to AI agents.
          </Tool>
          <Tool title="v0.dev">
            A rapid prototyping tool that turns web interface ideas into working
            code in no time.
          </Tool>
          <Tool title="Vercel">
            A dependable and easy platform for deploying web apps. I deploy most
            of my apps to Vercel.
          </Tool>
          <Tool title="xAI Grok 3">
            My current favorite LLM for coding, research, and writing.
          </Tool>
          <Tool title="X">
            A go-to platform for real-time insights, collaboration, and staying
            updated on trends.
          </Tool>
        </ToolsSection>
        <ToolsSection title="Design">
          <Tool title="Figma">
            A flexible design tool that supports both solo work and team
            collaboration with powerful features.
          </Tool>
          <Tool title="Framer">
            Probably the best no-code web builder for building interative,
            high-quality marketing pages quickly.
          </Tool>
        </ToolsSection>
        <ToolsSection title="Productivity">
          <Tool title="Notion (Notes, Calendar, and Email)">
            A unified ecosystem for notes, scheduling, and email, keeping
            everything organized and accessible.
          </Tool>
          <Tool title="Arc Browser">
            A modern browser that simplifies navigation and boosts daily
            efficiency.
          </Tool>
          <Tool title="Obsidian Notes">
            A note-taking system that links ideas into a structured network,
            great for deep thought and planning.
          </Tool>
        </ToolsSection>
      </div>
    </SimpleLayout>
  );
}
