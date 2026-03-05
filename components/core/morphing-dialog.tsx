"use client"

import {
	AnimatePresence,
	motion,
	type Variants,
	type Transition,
} from "framer-motion"
import { X } from "lucide-react"
import Image from "next/image"
import type {
	CSSProperties,
	ComponentProps,
	ReactElement,
	ReactNode,
} from "react"
import {
	type ButtonHTMLAttributes,
	type ComponentPropsWithoutRef,
	useId,
	MouseEvent,
	createContext,
	cloneElement,
	useContext,
	useMemo,
	useState,
} from "react"

type MorphingDialogContextValue = {
	isOpen: boolean
	open: () => void
	close: () => void
	transition: Transition
	layoutId: string
}

const MorphingDialogContext = createContext<MorphingDialogContextValue | null>(
	null,
)

type MorphingDialogProps = {
	children: ReactNode
	transition?: Transition
	id?: string
}

export function MorphingDialog({
	children,
	transition = { type: "spring", bounce: 0.05, duration: 0.25 },
	id,
}: MorphingDialogProps) {
	const fallbackId = useId()
	const [isOpen, setIsOpen] = useState(false)
	const dialogId = id ?? fallbackId
	const value = useMemo<MorphingDialogContextValue>(
		() => ({
			isOpen,
			open: () => setIsOpen(true),
			close: () => setIsOpen(false),
			transition,
			layoutId: dialogId,
		}),
		[isOpen, transition, dialogId],
	)

	return (
		<MorphingDialogContext.Provider value={value}>
			{children}
		</MorphingDialogContext.Provider>
	)
}

function useMorphingDialog() {
	const context = useContext(MorphingDialogContext)

	if (!context) {
		throw new Error(
			"MorphingDialog components must be used within <MorphingDialog />",
		)
	}

	return context
}

type MorphingDialogTriggerProps = {
	children: ReactElement
	onClick?: ButtonHTMLAttributes<HTMLButtonElement>["onClick"]
} & Omit<ComponentPropsWithoutRef<"button">, "children" | "onClick">

export function MorphingDialogTrigger({
	children,
	onClick,
	...props
}: MorphingDialogTriggerProps) {
	const { open, layoutId, transition } = useMorphingDialog()

	const mergedOnClick = (event: MouseEvent<HTMLButtonElement>) => {
		onClick?.(event)
		open()
	}

	return (
		<motion.div
			layoutId={`${layoutId}-trigger`}
			layout
			transition={transition}
			whileTap={{ scale: 0.995 }}
		>
			{cloneElement(children, {
				...props,
				onClick: mergedOnClick,
			} as ComponentPropsWithoutRef<"button">)}
		</motion.div>
	)
}

export function MorphingDialogContainer({ children }: { children: ReactNode }) {
	return <>{children}</>
}

type MorphingDialogContentProps = ComponentProps<"div">

export function MorphingDialogContent({
	children,
	className,
	style,
	...props
}: MorphingDialogContentProps) {
	const { isOpen, close, transition, layoutId } = useMorphingDialog()
	const combinedClassName = className
	const overlayStyle: CSSProperties = {
		...style,
	}

	return (
		<AnimatePresence>
			{isOpen && (
				<motion.div
					className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-black/50 p-4 py-12 backdrop-blur-sm"
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					exit={{ opacity: 0 }}
					transition={transition}
					onClick={(event) => {
						if (event.target === event.currentTarget) {
							close()
						}
					}}
				>
					<motion.div
						layoutId={`${layoutId}-trigger`}
						layout
						className={combinedClassName}
						style={overlayStyle}
						initial={{ opacity: 0, scale: 0.98, y: 10 }}
						animate={{ opacity: 1, scale: 1, y: 0 }}
						exit={{ opacity: 0, scale: 0.98, y: 10 }}
						transition={transition}
						onClick={(event) => event.stopPropagation()}
					>
						{children}
					</motion.div>
				</motion.div>
			)}
		</AnimatePresence>
	)
}

export function MorphingDialogImage({ alt, ...props }: ComponentProps<typeof Image>) {
	return <Image alt={alt ?? ""} {...props} />
}

export function MorphingDialogTitle({
	className,
	...props
}: ComponentProps<"h3">) {
	return <h2 className={className} {...props} />
}

export function MorphingDialogSubtitle({
	className,
	...props
}: ComponentProps<"p">) {
	return <p className={className} {...props} />
}

type MorphingDialogDescriptionProps = {
	children?: React.ReactNode
	className?: string
	variants?: Variants
	disableLayoutAnimation?: boolean
}

export function MorphingDialogDescription({
	children,
	className,
	variants,
	disableLayoutAnimation,
}: MorphingDialogDescriptionProps) {
	return (
		<motion.div
			className={className}
			variants={variants}
			initial={variants ? "initial" : undefined}
			animate={variants ? "animate" : undefined}
			exit={variants ? "exit" : undefined}
			transition={{ duration: 0.3 }}
			layout={disableLayoutAnimation ? false : true}
		>
			{children}
		</motion.div>
	)
}

export function MorphingDialogClose({
	className = "",
	...props
}: ComponentProps<"button">) {
	const { close } = useMorphingDialog()

	return (
		<button
			type="button"
			onClick={close}
			className={`absolute right-3 top-3 inline-flex h-7 w-7 items-center justify-center rounded-full border border-current/10 text-current/60 transition hover:text-current ${className}`}
			{...props}
		>
			<X className="h-4 w-4" />
			<span className="sr-only">Close dialog</span>
		</button>
	)
}
