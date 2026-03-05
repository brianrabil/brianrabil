"use client"

import { subscribe } from "@/app/actions/subscribe"
import { Button } from "@/components/ui/button"
import { Field, FieldError } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { useForm } from "@tanstack/react-form"
import { ArrowRight, Check, Loader2 } from "lucide-react"
import { useState } from "react"
import { z } from "zod"

const emailSchema = z.object({
	email: z.string().email("Enter a valid email address."),
})

export function NewsletterForm() {
	const [submitted, setSubmitted] = useState(false)
	const [serverError, setServerError] = useState<string | null>(null)

	const form = useForm({
		defaultValues: {
			email: "",
		},
		validators: {
			onSubmit: emailSchema,
		},
		onSubmit: async ({ value }) => {
			setServerError(null)
			const formData = new FormData()
			formData.set("email", value.email)
			const result = await subscribe(formData)
			if (result?.error) {
				setServerError(result.error)
			} else {
				setSubmitted(true)
			}
		},
	})

	if (submitted) {
		return (
			<div className="flex items-center gap-2 text-sm text-emerald-600 dark:text-emerald-400 font-mono">
				<Check className="h-4 w-4" />
				You&apos;re in. Thanks for subscribing.
			</div>
		)
	}

	return (
		<div className="w-full">
			<form
				onSubmit={(e) => {
					e.preventDefault()
					form.handleSubmit()
				}}
				className="flex w-full flex-col gap-3 sm:flex-row"
			>
				<form.Field
					name="email"
					// eslint-disable-next-line react/no-children-prop
					children={(field) => {
						const isInvalid =
							field.state.meta.isTouched && !field.state.meta.isValid
						return (
							<Field data-invalid={isInvalid} className="w-full">
								<Input
									id="newsletter-email"
									name={field.name}
									type="email"
									value={field.state.value}
									onBlur={field.handleBlur}
									onChange={(e) => field.handleChange(e.target.value)}
									aria-invalid={isInvalid}
									placeholder="you@example.com"
									autoComplete="email"
									disabled={form.state.isSubmitting}
									className="h-9 font-mono"
								/>
								{isInvalid && (
									<FieldError errors={field.state.meta.errors} />
								)}
							</Field>
						)
					}}
				/>
				<Button
					type="submit"
					className="h-9 shrink-0"
					disabled={form.state.isSubmitting}
				>
					{form.state.isSubmitting ? (
						<Loader2 className="h-3.5 w-3.5 animate-spin" />
					) : (
						<>
							Subscribe
							<ArrowRight className="ml-1 h-3.5 w-3.5" />
						</>
					)}
				</Button>
			</form>
			{serverError && (
				<p className="mt-2 text-xs text-red-500 font-mono">{serverError}</p>
			)}
		</div>
	)
}
