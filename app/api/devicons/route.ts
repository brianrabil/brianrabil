import type { NextRequest } from "next/server";

export const dynamic = "force-dynamic"; // defaults to auto

export async function GET(request: NextRequest) {
	// Your code logic here
	return new Response("Hello, World!", {
		status: 200,
	});
}
