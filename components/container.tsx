import clsx from "clsx";
import type React from "react";

interface ContainerProps {
	children?: React.ReactNode;
	className?: string;
	style?: React.CSSProperties;
}

export function Container({ children, className, style }: ContainerProps) {
	return (
		<div
			className={clsx("w-full max-w-[1800px] mx-auto px-4 sm:px-6 lg:px-8", className)}
			style={style}
		>
			{children}
		</div>
	);
}
