"use client";

import { AnimatePresence, motion } from "framer-motion";
import type React from "react";
import { forwardRef, useState } from "react";

interface AnimatedSubscribeButtonProps {
	buttonColor: string;
	buttonTextColor?: string;
	subscribeStatus: boolean;
	initialText: React.ReactElement | string;
	changeText: React.ReactElement | string;
}

const MotionButton = motion.create(
	forwardRef<HTMLButtonElement, React.ButtonHTMLAttributes<HTMLButtonElement>>((props, ref) => (
		<button ref={ref} {...props} />
	)),
	{
		forwardMotionProps: true,
	},
);

const MotionSpan = motion.create(
	forwardRef<HTMLSpanElement, React.HTMLAttributes<HTMLSpanElement>>((props, ref) => (
		<span ref={ref} {...props} />
	)),
	{
		forwardMotionProps: true,
	},
);

export const AnimatedSubscribeButton: React.FC<AnimatedSubscribeButtonProps> = ({
	buttonColor,
	subscribeStatus,
	buttonTextColor,
	changeText,
	initialText,
}) => {
	const [isSubscribed, setIsSubscribed] = useState<boolean>(subscribeStatus);

	return (
		<AnimatePresence mode="wait">
			{isSubscribed ? (
				<MotionButton
					className="relative flex w-[200px] items-center justify-center overflow-hidden rounded-md bg-white p-[10px] outline outline-1 outline-black"
					onClick={() => setIsSubscribed(false)}
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					exit={{ opacity: 0 }}
				>
					<MotionSpan
						key="action"
						className="relative block h-full w-full font-semibold"
						initial={{ y: -50 }}
						animate={{ y: 0 }}
						style={{ color: buttonColor }}
					>
						{changeText}
					</MotionSpan>
				</MotionButton>
			) : (
				<MotionButton
					className="relative flex w-[200px] cursor-pointer items-center justify-center rounded-md border-none p-[10px]"
					style={{ backgroundColor: buttonColor, color: buttonTextColor }}
					onClick={() => setIsSubscribed(true)}
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					exit={{ opacity: 0 }}
				>
					<MotionSpan
						key="reaction"
						className="relative block font-semibold"
						initial={{ x: 0 }}
						exit={{ x: 50, transition: { duration: 0.1 } }}
					>
						{initialText}
					</MotionSpan>
				</MotionButton>
			)}
		</AnimatePresence>
	);
};
