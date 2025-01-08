"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
	Carousel,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious,
} from "@/components/ui/carousel";
import { cn } from "@/lib/utils";
import { StarIcon, ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { Range } from "./range";
import type { config } from "@/lib/config";

interface TestimonialsSectionProps {
	readonly testimonials: typeof config.testimonials;
}

export function TestimonialsSection({ testimonials }: TestimonialsSectionProps) {
	return (
		<section className="bg-muted py-16 md:py-20 lg:py-24">
			<div className="container overflow-x-visible mx-auto">
				<div className="grid grid-cols-1 md:grid-cols-[1fr_384px] md:grid-rows-[1fr_auto] gap-8 h-auto mb-8 md:mb-12">
					<div className="lg:max-w-2xl">
						<h2 className="text-4xl md:text-5xl font-bold text-foreground leading-tight">
							Here’s what past clients are saying about me
						</h2>
					</div>
					<div className="max-w-md w-auto ml-auto">
						<p className="text-foreground text-lg leading-normal m-0">
							Iced pumpkin ristretto irish trifecta robusta trade froth affogato barista con barista
							cappuccino filter roast.
						</p>
					</div>
					<div className="w-full lg:max-w-2xl self-end">
						<Range className="w-full" />
					</div>
					<div className="flex max-w-md align-top gap-x-2">
						<Button type="button" variant="outline" size="icon">
							<ChevronLeftIcon className="w-4 h-4" />
						</Button>
						<Button type="button" variant="outline" size="icon">
							<ChevronRightIcon className="w-4 h-4" />
						</Button>
					</div>
				</div>
				<Carousel
					opts={{
						loop: false,
					}}
				>
					<CarouselPrevious />
					<CarouselNext />
					<CarouselContent className="ml-1 divide-x">
						{testimonials.map((testimonial, index) => (
							<CarouselItem key={testimonial.name} className="md:basis-1/2 lg:basis-1/3 pl-0">
								<Card
									key={testimonial.name}
									className={cn(
										"flex flex-col h-full border-y border-l-0 border-r-0 p-0 rounded-none",
										index === 0 && "rounded-tl-xl rounded-bl-xl border-l",
										index === testimonials.length - 1 && "rounded-tr-xl rounded-br-xl border-r",
									)}
								>
									<CardHeader className="py-10 px-10">
										<div className="flex items-center justify-start">
											{/* Star Rating */}
											{Array.from({ length: testimonial.rating }).map((_, i) => (
												<StarIcon
													// biome-ignore lint/suspicious/noArrayIndexKey: no need
													key={i}
													className="w-5 h-5 text-yellow-400 fill-current"
												/>
											))}
										</div>
										<blockquote className="text-xl font-semibold text-foreground mb-4">
											“{testimonial.quote}”
										</blockquote>
									</CardHeader>
									<CardContent className="px-10 py-0">
										<p className="text-muted-foreground leading-normal">{testimonial.feedback}</p>
									</CardContent>
									<CardFooter className="flex flex-col px-10 py-10 mt-auto">
										<Separator className="mb-5 mt-auto" />
										<div className="w-full flex justify-between items-center">
											<div className="text-left flex flex-col gap-y-1">
												<p className="font-bold text-foreground">{testimonial.name}</p>
												<p className="text-sm text-muted-foreground">{testimonial.title}</p>
											</div>
											<Avatar>
												<AvatarImage src={testimonial.image} />
												<AvatarFallback>
													{testimonial.name
														.split(" ")
														.map((n) => n[0])
														.join("")}
												</AvatarFallback>
											</Avatar>
										</div>
									</CardFooter>
								</Card>
							</CarouselItem>
						))}
					</CarouselContent>
				</Carousel>
			</div>
		</section>
	);
}
