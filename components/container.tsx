import clsx from "clsx";
import type React from "react";

interface ContainerProps {
	children?: React.ReactNode;
	className?: string;
}

export function Container({ children, className }: ContainerProps) {
	return (
		<div
			className={clsx(
				"w-full container mx-auto px-4 sm:px-6 lg:px-8",
				className,
			)}
		>
			{children}
		</div>
	);
}
