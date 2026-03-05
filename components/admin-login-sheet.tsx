"use client";

import { GitHubIcon } from "@/components/social-icons";
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
import { Input } from "@/components/ui/input";
import { AnimatePresence, motion } from "motion/react";
import { ArrowRight, CheckCircle, Loader2 } from "lucide-react";
import dynamic from "next/dynamic";
import { useState } from "react";

const CanvasRevealEffect = dynamic(
	() =>
		import("@/components/ui/canvas-reveal-effect").then(
			(mod) => mod.CanvasRevealEffect,
		),
	{ ssr: false },
);

export function AdminLoginSheet({ children }: { children: React.ReactNode }) {
	const [email, setEmail] = useState("");
	const [error, setError] = useState("");
	const [loading, setLoading] = useState(false);
	const [sent, setSent] = useState(false);
	const [open, setOpen] = useState(false);

	// TODO: wire up auth provider
	const handleGitHub = async () => {};

	const handleMagicLink = async (e: React.FormEvent) => {
		e.preventDefault();
		setError("");
		setLoading(true);
		// TODO: wire up auth provider
		setTimeout(() => {
			setSent(true);
			setLoading(false);
		}, 500);
	};

	function handleOpenChange(next: boolean) {
		setOpen(next);
		if (!next) {
			setEmail("");
			setError("");
			setSent(false);
			setLoading(false);
		}
	}

	return (
		<>
			<AnimatePresence>
				{open && (
					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						transition={{ duration: 0.4 }}
						className="fixed inset-0 z-40"
					>
						<CanvasRevealEffect
							animationSpeed={3}
							containerClassName="bg-black"
							colors={[
								[255, 255, 255],
								[255, 255, 255],
							]}
							dotSize={6}
							totalSize={20}
							opacities={[0.3, 0.3, 0.3, 0.5, 0.5, 0.5, 0.8, 0.8, 0.8, 1]}
							showGradient={false}
							origin="bottom"
						/>
						<div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent_0%,_rgba(0,0,0,0.6)_100%)]" />
					</motion.div>
				)}
			</AnimatePresence>

			<Drawer
				shouldScaleBackground={false}
				open={open}
				onOpenChange={handleOpenChange}
			>
				<DrawerTrigger asChild>{children}</DrawerTrigger>
				<DrawerPortal>
					<DrawerOverlay className="bg-transparent" />
					<DrawerContent className="mx-auto max-w-md">
						<DrawerHeader className="px-6 pt-4 pb-0 text-left">
							<DrawerTitle>Admin</DrawerTitle>
							<DrawerDescription className="text-xs">
								Authorized personnel only.
							</DrawerDescription>
						</DrawerHeader>

						<div className="px-6 pb-8 pt-4 space-y-4">
							{/* GitHub OAuth */}
							<Button
								variant="outline"
								className="w-full gap-2"
								onClick={handleGitHub}
							>
								<GitHubIcon className="size-4 fill-current" />
								Continue with GitHub
							</Button>

							{/* Divider */}
							<div className="relative">
								<div className="absolute inset-0 flex items-center">
									<span className="w-full border-t" />
								</div>
								<div className="relative flex justify-center text-xs uppercase">
									<span className="bg-background px-2 text-muted-foreground">
										or
									</span>
								</div>
							</div>

							{/* Magic link */}
							<AnimatePresence mode="wait">
								{sent ? (
									<motion.div
										key="sent"
										initial={{ opacity: 0, y: 4 }}
										animate={{ opacity: 1, y: 0 }}
										className="flex items-center gap-2.5 rounded-lg border p-3.5"
									>
										<CheckCircle className="size-4 text-emerald-500" />
										<div>
											<p className="text-sm font-medium">Check your inbox</p>
											<p className="text-xs text-muted-foreground">{email}</p>
										</div>
									</motion.div>
								) : (
									<motion.form
										key="form"
										onSubmit={handleMagicLink}
										className="flex gap-2"
									>
										<Input
											type="email"
											placeholder="you@example.com"
											value={email}
											onChange={(e) => setEmail(e.target.value)}
											required
											autoComplete="email"
										/>
										<Button
											type="submit"
											disabled={loading}
											className="shrink-0 gap-1"
										>
											{loading ? (
												<Loader2 className="size-4 animate-spin" />
											) : (
												<>
													Send link
													<ArrowRight className="size-3" />
												</>
											)}
										</Button>
									</motion.form>
								)}
							</AnimatePresence>

							{error && <p className="text-sm text-destructive">{error}</p>}
						</div>
					</DrawerContent>
				</DrawerPortal>
			</Drawer>
		</>
	);
}
