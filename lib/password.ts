import bcrypt from "bcryptjs";

export async function saltAndHashPassword(password: string): Promise<string> {
	// Generate a salt
	const salt = await bcrypt.genSalt(10);

	// Hash the password with the salt
	const hashedPassword = await bcrypt.hash(password, salt);

	return hashedPassword;
}

// Optional: Add a function to verify passwords
export async function verifyPassword(
	password: string,
	hashedPassword: string,
): Promise<boolean> {
	return await bcrypt.compare(password, hashedPassword);
}
