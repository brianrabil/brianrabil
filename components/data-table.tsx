"use client";

import { Badge } from "@/components/ui/badge";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";

type Service = {
	id: string;
	name: string;
	status: string;
	type: string;
	port: number;
	cpu: string;
	memory: string;
	uptime: string;
};

const typeColors: Record<string, string> = {
	container: "text-blue-500",
	database: "text-violet-500",
	monitoring: "text-amber-500",
	media: "text-pink-500",
	automation: "text-emerald-500",
	ai: "text-cyan-500",
	network: "text-orange-500",
};

export function DataTable({ data }: { data: Service[] }) {
	return (
		<div className="px-4 lg:px-6">
			<div className="overflow-hidden rounded-lg border">
				<Table>
					<TableHeader>
						<TableRow>
							<TableHead className="w-[200px]">
								Service
							</TableHead>
							<TableHead>Status</TableHead>
							<TableHead>Type</TableHead>
							<TableHead className="text-right">Port</TableHead>
							<TableHead className="text-right">CPU</TableHead>
							<TableHead className="text-right">
								Memory
							</TableHead>
							<TableHead className="text-right">
								Uptime
							</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{data.map((svc) => (
							<TableRow key={svc.id}>
								<TableCell className="font-medium">
									{svc.name}
								</TableCell>
								<TableCell>
									<div className="flex items-center gap-2">
										<span
											className={`relative flex h-2 w-2 ${svc.status === "running" ? "" : "opacity-50"}`}
										>
											{svc.status === "running" && (
												<span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-75" />
											)}
											<span
												className={`relative inline-flex h-2 w-2 rounded-full ${svc.status === "running" ? "bg-emerald-500" : "bg-muted-foreground/40"}`}
											/>
										</span>
										<span
											className={
												svc.status === "running"
													? "text-foreground"
													: "text-muted-foreground"
											}
										>
											{svc.status}
										</span>
									</div>
								</TableCell>
								<TableCell>
									<Badge
										variant="outline"
										className={`text-xs ${typeColors[svc.type] || ""}`}
									>
										{svc.type}
									</Badge>
								</TableCell>
								<TableCell className="text-right font-mono text-xs tabular-nums">
									:{svc.port}
								</TableCell>
								<TableCell className="text-right font-mono text-xs tabular-nums">
									{svc.cpu}
								</TableCell>
								<TableCell className="text-right font-mono text-xs tabular-nums">
									{svc.memory}
								</TableCell>
								<TableCell className="text-right font-mono text-xs tabular-nums text-muted-foreground">
									{svc.uptime}
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</div>
		</div>
	);
}
