import { siteUrl } from "@/lib/agent-index";

export const dynamic = "force-static";

export function GET() {
	return Response.json({
		mcpServers: {
			brianrabil: { url: `${siteUrl()}/mcp` },
		},
	});
}
