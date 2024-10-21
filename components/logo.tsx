import Image from "next/image";

export function Logo({ className }: { className?: string }) {
	return (
		<Image
			src="/brianrabil-logo-light.svg"
			alt="Logo"
			width={183}
			height={48}
			className={className}
		/>
	);
}
