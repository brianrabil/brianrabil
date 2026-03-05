"use server"

import { kv } from "@vercel/kv"

export async function subscribe(formData: FormData) {
	const email = formData.get("email")

	if (!email || typeof email !== "string") {
		return { error: "Email is required." }
	}

	const normalized = email.toLowerCase().trim()

	if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalized)) {
		return { error: "Invalid email address." }
	}

	try {
		// Store in a sorted set with timestamp as score
		await kv.zadd("newsletter:subscribers", {
			score: Date.now(),
			member: normalized,
		})

		return { success: true }
	} catch {
		return { error: "Something went wrong. Please try again." }
	}
}
