/**
 * Small secondary action used across the brand kit (Copy SVG, Open, Copy
 * name). Colour changes only: nothing moves, so keyboard presses stay still.
 * Hover is gated to hover-capable pointers by Tailwind 4's `hover:` variant.
 */
export const actionClass =
	"inline-flex h-8 shrink-0 cursor-pointer select-none items-center justify-center rounded-md border border-line-2 bg-transparent px-2.5 text-xs font-medium whitespace-nowrap text-fg-2 transition-[color,background-color,border-color] duration-150 ease-out-expo hover:border-input-edge hover:bg-hover hover:text-fg active:bg-line-2 active:text-fg aria-disabled:cursor-default aria-disabled:opacity-60 data-[state=copied]:text-fg data-[state=failed]:border-[color-mix(in_oklab,var(--danger)_45%,transparent)] data-[state=failed]:text-danger";
