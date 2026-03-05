"use client";

import { Button } from "@/components/ui/button";
import {
	Drawer,
	DrawerContent,
	DrawerDescription,
	DrawerHeader,
	DrawerOverlay,
	DrawerPortal,
	DrawerTitle,
	DrawerTrigger,
} from "@/components/ui/drawer";
import {
	Field,
	FieldError,
	FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { authClient } from "@/lib/auth-client";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, CheckCircle, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export function AdminLoginSheet({
	children,
}: { children: React.ReactNode }) {
	const router = useRouter();
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");
	const [loading, setLoading] = useState(false);
	const [success, setSuccess] = useState(false);
	const [open, setOpen] = useState(false);

	const handleSignIn = async (e: React.FormEvent) => {
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

		setSuccess(true);
		setLoading(false);
		setTimeout(() => {
			setOpen(false);
			router.push("/dashboard");
		}, 800);
	};

	function handleOpenChange(next: boolean) {
		setOpen(next);
		if (!next) {
			setEmail("");
			setPassword("");
			setError("");
			setSuccess(false);
		}
	}

	return (
		<Drawer
			shouldScaleBackground={false}
			open={open}
			onOpenChange={handleOpenChange}
		>
			<DrawerTrigger asChild>{children}</DrawerTrigger>
			<DrawerPortal>
				<DrawerOverlay />
				<DrawerContent className="mx-auto max-w-md">
					<DrawerHeader className="px-6 pt-4 pb-0 text-left">
						<DrawerTitle>Admin</DrawerTitle>
						<DrawerDescription className="text-xs">
							Authorized personnel only.
						</DrawerDescription>
					</DrawerHeader>

					<div className="px-6 pb-8 pt-4">
						<AnimatePresence mode="wait">
							{success ? (
								<motion.div
									key="success"
									initial={{ opacity: 0, y: 4 }}
									animate={{ opacity: 1, y: 0 }}
									className="flex items-center gap-2.5 rounded-lg border border-emerald-500/20 bg-emerald-500/10 p-3.5"
								>
									<CheckCircle className="size-4 text-emerald-500" />
									<div>
										<p className="text-sm font-medium">
											Authenticated
										</p>
										<p className="text-xs text-muted-foreground">
											Redirecting to dashboard...
										</p>
									</div>
								</motion.div>
							) : (
								<motion.form
									key="form"
									onSubmit={handleSignIn}
									className="space-y-4"
								>
									<Field>
										<FieldLabel>Email</FieldLabel>
										<Input
											type="email"
											placeholder="you@example.com"
											value={email}
											onChange={(e) =>
												setEmail(e.target.value)
											}
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
											onChange={(e) =>
												setPassword(e.target.value)
											}
											required
											autoComplete="current-password"
										/>
										{error && (
											<FieldError>{error}</FieldError>
										)}
									</Field>

									<Button
										type="submit"
										disabled={loading}
										className="w-full"
									>
										{loading ? (
											<Loader2 className="size-4 animate-spin" />
										) : (
											<>
												Sign in
												<ArrowRight className="ml-1.5 size-4" />
											</>
										)}
									</Button>
								</motion.form>
							)}
						</AnimatePresence>
					</div>
				</DrawerContent>
			</DrawerPortal>
		</Drawer>
	);
}
