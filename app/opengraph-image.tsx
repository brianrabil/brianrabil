import { appConfig } from "@/lib/app-config";
import { ImageResponse } from "next/og";

export const alt = "AI software products, built and owned by Brian Rabil";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

async function loadGeist(weight: 500 | 800) {
	const css = await fetch(
		`https://fonts.googleapis.com/css2?family=Geist:wght@${weight}&display=swap`,
	).then((response) => response.text());
	const url = css.match(/src: url\((.+?)\) format/)?.[1];
	if (!url) throw new Error("Geist font URL not found");
	return fetch(url).then((response) => response.arrayBuffer());
}

export default async function OG() {
	const [medium, extraBold] = await Promise.all([
		loadGeist(500),
		loadGeist(800),
	]);

	return new ImageResponse(
		<div
			style={{
				display: "flex",
				flexDirection: "column",
				justifyContent: "space-between",
				width: "100%",
				height: "100%",
				padding: 72,
				background: "#080808",
				backgroundImage:
					"radial-gradient(circle at 1px 1px, rgba(237,237,237,0.09) 1px, transparent 0)",
				backgroundSize: "12px 12px",
				color: "#ededed",
				fontFamily: "Geist",
			}}
		>
			<div
				style={{
					display: "flex",
					fontSize: 30,
					fontWeight: 800,
					letterSpacing: "-0.05em",
				}}
			>
				brianrabil
			</div>
			<div style={{ display: "flex", flexDirection: "column" }}>
				<div
					style={{
						display: "flex",
						fontSize: 76,
						fontWeight: 500,
						lineHeight: 1,
						letterSpacing: "-0.06em",
						maxWidth: 900,
					}}
				>
					AI software products, built and owned by Brian Rabil.
				</div>
				<div
					style={{
						display: "flex",
						marginTop: 32,
						fontSize: 28,
						color: "#9b9b9b",
					}}
				>
					Hyperpost · Workbot · Brain · vswarm
				</div>
			</div>
		</div>,
		{
			...size,
			fonts: [
				{ name: "Geist", data: medium, weight: 500, style: "normal" },
				{ name: "Geist", data: extraBold, weight: 800, style: "normal" },
			],
		},
	);
}
