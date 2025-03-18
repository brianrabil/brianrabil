import { cn } from "@/lib/utils";
import { forwardRef } from "react";

export const ContainerOuter = forwardRef<
	React.ComponentRef<"div">,
	React.ComponentPropsWithoutRef<"div">
>(function OuterContainer({ className, children, ...props }, ref) {
	return (
		<div ref={ref} className={cn("sm:px-8", className)} {...props}>
			<div className="mx-auto w-full max-w-7xl lg:px-8">{children}</div>
		</div>
	);
});

export const ContainerInner = forwardRef<
	React.ComponentRef<"div">,
	React.ComponentPropsWithoutRef<"div">
>(function InnerContainer({ className, children, ...props }, ref) {
	return (
		<div
			ref={ref}
			className={cn("relative px-4 sm:px-8 lg:px-12", className)}
			{...props}
		>
			<div className="mx-auto max-w-2xl lg:max-w-5xl">{children}</div>
		</div>
	);
});

export const Container = forwardRef<
	React.ComponentRef<typeof ContainerOuter>,
	React.ComponentPropsWithoutRef<typeof ContainerOuter>
>(function Container({ children, ...props }, ref) {
	return (
		<ContainerOuter ref={ref} {...props}>
			<ContainerInner>{children}</ContainerInner>
		</ContainerOuter>
	);
});
