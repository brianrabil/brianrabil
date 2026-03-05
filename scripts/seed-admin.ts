import { auth } from "../lib/auth";

async function seed() {
	const email = "brianrabil@gmail.com";
	const password = process.argv[2];

	if (!password) {
		console.error("Usage: bun scripts/seed-admin.ts <password>");
		process.exit(1);
	}

	try {
		const user = await auth.api.signUpEmail({
			body: {
				name: "Brian Rabil",
				email,
				password,
			},
		});

		console.log("Admin user created:", user);
	} catch (e) {
		console.error("Failed to create admin user:", e);
	}
}

seed();
