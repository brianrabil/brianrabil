"use client";

import * as React from "react";
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";

import { useIsMobile } from "@/lib/hooks/use-mobile";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import {
	type ChartConfig,
	ChartContainer,
	ChartTooltip,
	ChartTooltipContent,
} from "@/components/ui/chart";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import {
	ToggleGroup,
	ToggleGroupItem,
} from "@/components/ui/toggle-group";

function generateSystemData() {
	const data = [];
	const now = new Date();
	for (let i = 89; i >= 0; i--) {
		const date = new Date(now);
		date.setDate(date.getDate() - i);
		data.push({
			date: date.toISOString().split("T")[0],
			cpu: Math.round(15 + Math.random() * 30 + Math.sin(i * 0.2) * 10),
			memory: Math.round(
				18 + Math.random() * 8 + Math.cos(i * 0.15) * 3,
			),
		});
	}
	return data;
}

const chartData = generateSystemData();

const chartConfig = {
	system: { label: "System" },
	cpu: { label: "CPU %", color: "hsl(var(--chart-1))" },
	memory: { label: "Memory %", color: "hsl(var(--chart-2))" },
} satisfies ChartConfig;

export function ChartAreaInteractive() {
	const isMobile = useIsMobile();
	const [timeRange, setTimeRange] = React.useState("30d");

	React.useEffect(() => {
		if (isMobile) {
			setTimeRange("7d");
		}
	}, [isMobile]);

	const filteredData = chartData.filter((item) => {
		const date = new Date(item.date);
		const referenceDate = new Date(chartData[chartData.length - 1].date);
		let daysToSubtract = 90;
		if (timeRange === "30d") daysToSubtract = 30;
		else if (timeRange === "7d") daysToSubtract = 7;
		const startDate = new Date(referenceDate);
		startDate.setDate(startDate.getDate() - daysToSubtract);
		return date >= startDate;
	});

	return (
		<Card className="@container/card">
			<CardHeader className="relative">
				<CardTitle>System Resources</CardTitle>
				<CardDescription>
					<span className="@[540px]/card:block hidden">
						CPU and memory utilization over time
					</span>
					<span className="@[540px]/card:hidden">
						CPU & memory usage
					</span>
				</CardDescription>
				<div className="absolute right-4 top-4">
					<ToggleGroup
						type="single"
						value={timeRange}
						onValueChange={setTimeRange}
						variant="outline"
						className="@[767px]/card:flex hidden"
					>
						<ToggleGroupItem value="90d" className="h-8 px-2.5">
							90 days
						</ToggleGroupItem>
						<ToggleGroupItem value="30d" className="h-8 px-2.5">
							30 days
						</ToggleGroupItem>
						<ToggleGroupItem value="7d" className="h-8 px-2.5">
							7 days
						</ToggleGroupItem>
					</ToggleGroup>
					<Select value={timeRange} onValueChange={setTimeRange}>
						<SelectTrigger
							className="@[767px]/card:hidden flex w-40"
							aria-label="Select a value"
						>
							<SelectValue placeholder="30 days" />
						</SelectTrigger>
						<SelectContent className="rounded-xl">
							<SelectItem value="90d" className="rounded-lg">
								90 days
							</SelectItem>
							<SelectItem value="30d" className="rounded-lg">
								30 days
							</SelectItem>
							<SelectItem value="7d" className="rounded-lg">
								7 days
							</SelectItem>
						</SelectContent>
					</Select>
				</div>
			</CardHeader>
			<CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
				<ChartContainer
					config={chartConfig}
					className="aspect-auto h-[250px] w-full"
				>
					<AreaChart data={filteredData}>
						<defs>
							<linearGradient
								id="fillCpu"
								x1="0"
								y1="0"
								x2="0"
								y2="1"
							>
								<stop
									offset="5%"
									stopColor="var(--color-cpu)"
									stopOpacity={1.0}
								/>
								<stop
									offset="95%"
									stopColor="var(--color-cpu)"
									stopOpacity={0.1}
								/>
							</linearGradient>
							<linearGradient
								id="fillMemory"
								x1="0"
								y1="0"
								x2="0"
								y2="1"
							>
								<stop
									offset="5%"
									stopColor="var(--color-memory)"
									stopOpacity={0.8}
								/>
								<stop
									offset="95%"
									stopColor="var(--color-memory)"
									stopOpacity={0.1}
								/>
							</linearGradient>
						</defs>
						<CartesianGrid vertical={false} />
						<XAxis
							dataKey="date"
							tickLine={false}
							axisLine={false}
							tickMargin={8}
							minTickGap={32}
							tickFormatter={(value) => {
								const date = new Date(value);
								return date.toLocaleDateString("en-US", {
									month: "short",
									day: "numeric",
								});
							}}
						/>
						<ChartTooltip
							cursor={false}
							content={
								<ChartTooltipContent
									labelFormatter={(value) => {
										return new Date(
											value,
										).toLocaleDateString("en-US", {
											month: "short",
											day: "numeric",
										});
									}}
									indicator="dot"
								/>
							}
						/>
						<Area
							dataKey="memory"
							type="natural"
							fill="url(#fillMemory)"
							stroke="var(--color-memory)"
							stackId="a"
						/>
						<Area
							dataKey="cpu"
							type="natural"
							fill="url(#fillCpu)"
							stroke="var(--color-cpu)"
							stackId="a"
						/>
					</AreaChart>
				</ChartContainer>
			</CardContent>
		</Card>
	);
}
