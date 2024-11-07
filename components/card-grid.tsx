import type React from "react";

/**
 * A grid of cards.
 * @param children The cards to display.
 * @returns The card grid.
 * @example
 * ```tsx
 * <CardGrid>
 *  <Card title="Card 1" description="Description 1" />
 *  <Card title="Card 2" description="Description 2" />
 * </CardGrid>
 * ```
 */
export function CardGrid({ children }: { children: React.ReactNode }) {
	return <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">{children}</div>;
}
