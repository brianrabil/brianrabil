import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
	return new ImageResponse(
		<div
			style={{
				display: "flex",
				width: "100%",
				height: "100%",
				alignItems: "center",
				justifyContent: "center",
				background: "#080808",
			}}
		>
			<svg width="120" height="120" viewBox="0 0 32 32" aria-hidden="true">
				<path
					fill="#ededed"
					d="M16 9 L27 20.5 L22.5 20.5 L19.5 18 L16 20.5 L12.5 18 L9.5 20.5 L5 20.5 Z"
				/>
			</svg>
		</div>,
		size,
	);
}
