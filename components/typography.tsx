import * as React from "react";

interface TypographyProps {
  children: React.ReactNode;
}

export function TypographyH1({ children }: TypographyProps) {
  return (
    <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
      {children}
    </h1>
  );
}

export function TypographyH2({ children }: TypographyProps) {
  return (
    <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
      {children}
    </h2>
  );
}

export function TypographyH4({ children }: TypographyProps) {
  return (
    <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
      {children}
    </h4>
  );
}

export function TypographyP({ children }: TypographyProps) {
  return <p className="leading-7 [&:not(:first-child)]:mt-6">{children}</p>;
}

export function TypographySmall({ children }: TypographyProps) {
  return <small className="text-sm font-medium leading-none">{children}</small>;
}

export function TypographyLarge({ children }: TypographyProps) {
  return <div className="text-lg font-semibold">{children}</div>;
}

export function TypographyInlineCode({ children }: TypographyProps) {
  return (
    <code className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold">
      {children}
    </code>
  );
}

export function TypographyLead({ children }: TypographyProps) {
  return <p className="text-xl text-muted-foreground">{children}</p>;
}
