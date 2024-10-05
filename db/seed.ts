import { db, client } from "@/db/client";
import { users } from "@/db/schema";
import bcrypt from "bcryptjs";

try {
	const hashedPassword = await bcrypt.hash(
		process.env.AUTH_ADMIN_DEFAULT_PASSWORD,
		10,
	);

	await db
		.insert(users)
		.values({
			name: process.env.AUTH_ADMIN_DEFAULT_NAME,
			email: process.env.AUTH_ADMIN_DEFAULT_EMAIL,
			password: hashedPassword,
		})
		.onConflictDoNothing();

	console.log("Admin user seeded successfully");
} catch (error) {
	console.error("Error seeding admin user:", error);
}

client.close();
