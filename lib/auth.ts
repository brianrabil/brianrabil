import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { saltAndHashPassword } from "@/lib/password";
import { signInSchema } from "@/lib/zod";
import { db } from "@/db/client";
import { DrizzleAdapter } from "@auth/drizzle-adapter";

async function getUserFromDb(email: string, password: string) {
	const user = await db.query.users.findFirst({
		where: (user, { eq, and }) =>
			and(eq(user.email, email), eq(user.password, password)),
	});

	return user;
}

export const { handlers, signIn, signOut, auth } = NextAuth({
	adapter: DrizzleAdapter(db),
	providers: [
		Credentials({
			// You can specify which fields should be submitted, by adding keys to the `credentials` object.
			// e.g. domain, username, password, 2FA token, etc.
			credentials: {
				email: {},
				password: {},
			},
			authorize: async (credentials) => {
				let user = null;

				const { email, password } = await signInSchema.parseAsync(credentials);

				// logic to salt and hash password
				const pwHash = await saltAndHashPassword(password);

				// logic to verify if the user exists
				user = await getUserFromDb(email, pwHash);

				if (!user) {
					// No user found, so this is their first attempt to login
					// meaning this is also the place you could do registration
					throw new Error("User not found.");
				}

				// return user object with their profile data
				return user;
			},
		}),
	],
});
