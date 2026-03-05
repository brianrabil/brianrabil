import {
	ActivityIcon,
	CpuIcon,
	HardDriveIcon,
	MemoryStickIcon,
	NetworkIcon,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import {
	Card,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";

export function SectionCards() {
	return (
		<div className="*:data-[slot=card]:shadow-xs @xl/main:grid-cols-2 @5xl/main:grid-cols-4 grid grid-cols-1 gap-4 px-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card lg:px-6">
			<Card className="@container/card">
				<CardHeader className="relative">
					<CardDescription>CPU Usage</CardDescription>
					<CardTitle className="@[250px]/card:text-3xl text-2xl font-semibold tabular-nums">
						23%
					</CardTitle>
					<div className="absolute right-4 top-4">
						<Badge
							variant="outline"
							className="flex gap-1 rounded-lg text-xs"
						>
							<CpuIcon className="size-3" />
							4 cores
						</Badge>
					</div>
				</CardHeader>
				<CardFooter className="flex-col items-start gap-1 text-sm">
					<div className="line-clamp-1 flex gap-2 font-medium">
						Intel Xeon E-2236
					</div>
					<div className="text-muted-foreground">
						Load avg: 0.42 0.38 0.31
					</div>
				</CardFooter>
			</Card>

			<Card className="@container/card">
				<CardHeader className="relative">
					<CardDescription>Memory</CardDescription>
					<CardTitle className="@[250px]/card:text-3xl text-2xl font-semibold tabular-nums">
						12.4 GB
					</CardTitle>
					<div className="absolute right-4 top-4">
						<Badge
							variant="outline"
							className="flex gap-1 rounded-lg text-xs"
						>
							<MemoryStickIcon className="size-3" />
							64 GB
						</Badge>
					</div>
				</CardHeader>
				<CardFooter className="flex-col items-start gap-1 text-sm">
					<div className="line-clamp-1 flex gap-2 font-medium">
						19% utilized
					</div>
					<div className="text-muted-foreground">
						51.6 GB available
					</div>
				</CardFooter>
			</Card>

			<Card className="@container/card">
				<CardHeader className="relative">
					<CardDescription>Storage</CardDescription>
					<CardTitle className="@[250px]/card:text-3xl text-2xl font-semibold tabular-nums">
						1.2 TB
					</CardTitle>
					<div className="absolute right-4 top-4">
						<Badge
							variant="outline"
							className="flex gap-1 rounded-lg text-xs"
						>
							<HardDriveIcon className="size-3" />
							4 TB
						</Badge>
					</div>
				</CardHeader>
				<CardFooter className="flex-col items-start gap-1 text-sm">
					<div className="line-clamp-1 flex gap-2 font-medium">
						30% used across 4 drives
					</div>
					<div className="text-muted-foreground">
						RAID-10 healthy
					</div>
				</CardFooter>
			</Card>

			<Card className="@container/card">
				<CardHeader className="relative">
					<CardDescription>Network</CardDescription>
					<CardTitle className="@[250px]/card:text-3xl text-2xl font-semibold tabular-nums">
						142 Mbps
					</CardTitle>
					<div className="absolute right-4 top-4">
						<Badge
							variant="outline"
							className="flex gap-1 rounded-lg text-xs"
						>
							<NetworkIcon className="size-3" />
							1 Gbps
						</Badge>
					</div>
				</CardHeader>
				<CardFooter className="flex-col items-start gap-1 text-sm">
					<div className="line-clamp-1 flex gap-2 font-medium">
						<ActivityIcon className="size-4" /> 12 active
						connections
					</div>
					<div className="text-muted-foreground">
						Uptime: 47d 12h 33m
					</div>
				</CardFooter>
			</Card>
		</div>
	);
}
