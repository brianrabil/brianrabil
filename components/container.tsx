import { cn } from "@/lib/utils";
import { forwardRef } from "react";

export const Container = forwardRef<
	React.ComponentRef<"div">,
	React.ComponentPropsWithoutRef<"div">
>(function Container({ className, ...props }, ref) {
	return (
		<div
			ref={ref}
			className={cn("mx-auto w-full max-w-6xl px-6 lg:px-10", className)}
			{...props}
		/>
	);
});
