import { MagicCard as BaseMagicCard } from "@/components/ui/magic-card";
import type React from "react";
import { Card as BaseCard } from "@/components/ui/card";

export function Card({ children }: { children: React.ReactNode }) {
	return (
		<BaseMagicCard
			className="bg-card shadow-lg flex flex-col"
			gradientColor="hsl(var(--primary) / 0.2)"
			gradientOpacity={0.1}
			gradientSize={200}
		>
			<BaseCard className="bg-transparent border-none w-full">
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
