import { Button as UIButton } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";

const variantMap = {
  primary: "default",
  secondary: "secondary",
} as const;

type ButtonProps = {
  variant?: keyof typeof variantMap;
} & (
  | (React.ComponentPropsWithoutRef<"button"> & { href?: undefined })
  | React.ComponentPropsWithoutRef<typeof Link>
);

export function Button({
  variant = "primary",
  className,
  ...props
}: ButtonProps) {
  const mappedVariant = variantMap[variant];

  if (typeof props.href === "undefined") {
    return (
      <UIButton variant={mappedVariant} className={cn(className)} {...props} />
    );
  }

  return (
    <UIButton asChild variant={mappedVariant} className={cn(className)}>
      <Link {...props} />
    </UIButton>
  );
}
