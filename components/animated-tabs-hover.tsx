"use client"

import { AnimatedBackground } from "@/components/core/animated-background"
import { useState } from "react"

const TABS = ["Home", "About", "Services", "Contact"]

export function AnimatedTabsHover() {
	const [activeTab, setActiveTab] = useState(TABS[0])

	return (
		<div className="flex flex-row">
			<AnimatedBackground
				defaultValue={activeTab}
				className="rounded-lg bg-zinc-100 dark:bg-zinc-800"
				transition={{ type: "spring", bounce: 0.2, duration: 0.3 }}
				enableHover
			>
				{TABS.map((tab) => (
					<button
						key={tab}
						data-id={tab}
						type="button"
						onClick={() => setActiveTab(tab)}
						className="relative z-10 px-2 py-0.5 text-zinc-600 transition-colors duration-300 hover:text-zinc-950 dark:text-zinc-400 dark:hover:text-zinc-50"
					>
						{tab}
					</button>
				))}
			</AnimatedBackground>
		</div>
	)
}
