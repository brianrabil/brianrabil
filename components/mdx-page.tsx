function MdxLayout({ children }: { children: React.ReactNode }) {
	// Create any shared layout or styles here
	return <article className="prose lg:prose-xl dark:prose-invert max-w-none">{children}</article>;
}

export default function MDXPage({ children }: { children: React.ReactNode }) {
	return <MdxLayout>{children}</MdxLayout>;
}
