"use client"

import { useEffect } from "react"
import { motion, useMotionValue, useSpring, useTransform, type SpringOptions } from "framer-motion"
import { cn } from "@/lib/utils"

type AnimatedNumberProps = {
	value: number
	className?: string
	springOptions?: SpringOptions
}

export function AnimatedNumber({
	value,
	className,
	springOptions,
}: AnimatedNumberProps) {
	const count = useMotionValue(0)
	const spring = useSpring(count, springOptions)
	const display = useTransform(spring, (latest) => Math.round(latest).toLocaleString())

	useEffect(() => {
		count.set(value)
	}, [count, value])

	return (
		<motion.span className={cn("tabular-nums", className)}>
			{display}
		</motion.span>
	)
}
