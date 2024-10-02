import type React from "react";

export function Section({ children }: { children?: React.ReactNode }) {
	return <section className="py-12">{children}</section>;
}
