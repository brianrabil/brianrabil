"use client";

import { Button } from "@/components/ui/button";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { authClient } from "@/lib/auth-client";
import { ArrowRight, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LoginPage() {
	const router = useRouter();
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");
	const [loading, setLoading] = useState(false);

	async function handleSubmit(e: React.FormEvent) {
		e.preventDefault();
		setError("");
		setLoading(true);

		const { error } = await authClient.signIn.email({
			email,
			password,
		});

		if (error) {
			setError(error.message || "Invalid credentials");
			setLoading(false);
			return;
		}

		router.push("/dashboard");
	}

	return (
		<div className="flex min-h-svh items-center justify-center bg-background p-4">
			<div className="w-full max-w-sm">
				<div className="mb-8 text-center">
					<h1 className="text-lg font-medium text-foreground">
						Homelab Admin
					</h1>
					<p className="mt-1 text-sm text-muted-foreground">
						Sign in to access the dashboard
					</p>
				</div>

				<form onSubmit={handleSubmit} className="space-y-4">
					<Field>
						<FieldLabel>Email</FieldLabel>
						<Input
							type="email"
							placeholder="you@example.com"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							required
							autoComplete="email"
						/>
					</Field>

					<Field>
						<FieldLabel>Password</FieldLabel>
						<Input
							type="password"
							placeholder="Password"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							required
							autoComplete="current-password"
						/>
						{error && <FieldError>{error}</FieldError>}
					</Field>

					<Button type="submit" disabled={loading} className="w-full">
						{loading ? (
							<Loader2 className="size-4 animate-spin" />
						) : (
							<>
								Sign in
								<ArrowRight className="ml-1.5 size-4" />
							</>
						)}
					</Button>
				</form>

				<p className="mt-6 text-center text-[10px] text-muted-foreground/50 font-mono">
					Protected area. Authorized access only.
				</p>
			</div>
		</div>
	);
}
