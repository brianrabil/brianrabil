import { Card as BaseCard } from "@/components/ui/card";
import { MagicCard as BaseMagicCard } from "@/components/ui/magic-card";
import type React from "react";
import { cn } from "@/lib/utils";

export function Card({
	children,
	className,
	innerClassName,
}: { children: React.ReactNode; className?: string; innerClassName?: string }) {
	return (
		<BaseMagicCard
			className={cn("bg-card shadow-lg flex flex-col", className)}
			gradientColor="hsl(var(--primary) / 0.2)"
			gradientOpacity={0.1}
			gradientSize={200}
		>
			<BaseCard className={cn("bg-transparent border-none w-full", innerClassName)}>
				{children}
			</BaseCard>
		</BaseMagicCard>
	);
}

export {
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
