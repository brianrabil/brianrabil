"use client";

import { ThemeProvider, useTheme } from "next-themes";
import { usePathname } from "next/navigation";
import { createContext, useEffect, useRef } from "react";

function usePrevious<T>(value: T) {
	const ref = useRef<T>(null);

	useEffect(() => {
		ref.current = value;
	}, [value]);

	return ref.current;
}

function ThemeWatcher() {
	return null;
}

export const AppContext = createContext<{ previousPathname?: string | null }>(
	{},
);

export function Providers({ children }: { children: React.ReactNode }) {
	const pathname = usePathname();
	const previousPathname = usePrevious(pathname);

	return (
		<AppContext.Provider value={{ previousPathname }}>
			<ThemeProvider
				attribute="class"
				defaultTheme="system"
				enableSystem
				disableTransitionOnChange
				storageKey="theme-system-locked"
			>
				<ThemeWatcher />
				{children}
			</ThemeProvider>
		</AppContext.Provider>
	);
}
