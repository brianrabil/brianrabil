import Image from "next/image";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { TypographyH1 } from "@/components/typography";

export function Logo({ className }: { className?: string }) {
	return (
		<div className={cn("flex items-center space-x-2", className)}>
			<Avatar className={cn("size-10", className)}>
				<AvatarImage src="/brianrabil-avatar.png" alt="Brian Rabil" />
				<AvatarFallback>BR</AvatarFallback>
			</Avatar>
			<TypographyH1 className="font-medium text-sm md:text-base lg:text-sm xl:text-xl text-foreground m-0">
				Brian Rabil
			</TypographyH1>
		</div>
	);
}
