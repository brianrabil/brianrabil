"use client"

import {
	type CSSProperties,
	type ReactElement,
	type ReactNode,
	type RefCallback,
	type RefObject,
	type FocusEvent,
	type MouseEvent,
	cloneElement,
	isValidElement,
	useLayoutEffect,
	useRef,
	useState,
} from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

type TabTransition = {
	type?: "spring" | "tween" | "inertia"
	bounce?: number
	duration?: number
}

type AnimatedBackgroundProps = {
	children: ReactNode
	defaultValue?: string
	transition?: TabTransition
	enableHover?: boolean
	className?: string
}

type ChildRefMap = Record<string, HTMLElement>

export function AnimatedBackground({
	children,
	defaultValue,
	transition,
	enableHover,
	className,
}: AnimatedBackgroundProps) {
	const containerRef = useRef<HTMLDivElement>(null)
	const childRefs = useRef<ChildRefMap>({})
	const [activeRect, setActiveRect] = useState<{
		left: number
		width: number
		top: number
		height: number
	} | null>(null)

	useLayoutEffect(() => {
		setRectFromId(defaultValue)
	}, [defaultValue])

	const setRectFromId = (id?: string | null) => {
		if (!id) {
			setActiveRect(null)
			return
		}

		const container = containerRef.current
		const target = childRefs.current[id]

		if (!container || !target) {
			return
		}

		const containerBounds = container.getBoundingClientRect()
		const targetBounds = target.getBoundingClientRect()

		setActiveRect({
			left: targetBounds.left - containerBounds.left,
			width: targetBounds.width,
			top: targetBounds.top - containerBounds.top,
			height: targetBounds.height,
		})
	}

	const handleActivate = (id: string) => {
		setRectFromId(id)
	}

	const handleReset = () => {
		setRectFromId(defaultValue ?? null)
	}

	const childrenWithInteraction = Array.isArray(children) ? children : [children]

	return (
		<div
			ref={containerRef}
			className={cn("relative inline-flex items-center gap-1", className)}
			onMouseLeave={() => {
				if (enableHover) {
					handleReset()
				}
			}}
		>
			{activeRect && (
				<motion.span
					layout
					transition={transition}
					className="pointer-events-none absolute left-0 top-0 rounded-md bg-white dark:bg-zinc-700"
					style={
						{
							width: activeRect.width,
							height: activeRect.height,
							transform: `translate(${activeRect.left}px, ${activeRect.top}px)`,
						} as CSSProperties
					}
				/>
			)}
			{childrenWithInteraction.map((child, index) => {
				if (!isValidElement(child)) {
					return child
				}

				const childId = String(
					(child as { props?: { "data-id"?: string | number } }).props?.["data-id"] ??
						`${index}`,
				)
				const childElement = child as ReactElement

				const childProps = (child as any).props ?? {}

				return cloneElement(childElement, {
					ref: (element: HTMLElement | null) => {
						if (element && childId) {
							childRefs.current[childId] = element
						}
						if (childProps.ref) {
							const originalRef = childProps.ref as
								| RefCallback<HTMLElement>
								| RefObject<HTMLElement>
								| null
							if (typeof originalRef === "function") {
								originalRef(element)
							} else if (originalRef) {
								;(originalRef as React.MutableRefObject<HTMLElement | null>).current = element
							}
						}
					},
					onMouseEnter: enableHover
						? (event: MouseEvent<HTMLElement>) => {
								childProps.onMouseEnter?.(event)
								handleActivate(childId)
						  }
						: childProps.onMouseEnter,
					onFocus: enableHover
						? (event: FocusEvent<HTMLElement>) => {
								childProps.onFocus?.(event)
								handleActivate(childId)
						  }
						: childProps.onFocus,
				} as never)
			})}
		</div>
	)
}
