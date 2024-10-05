import { Container } from "@/components/container";
import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
	return (
		<Container className="py-8">
			<div className="space-y-8">
				<Skeleton className="h-12 w-3/4" />
				<div className="space-y-4">
					<Skeleton className="h-4 w-full" />
					<Skeleton className="h-4 w-5/6" />
					<Skeleton className="h-4 w-4/6" />
				</div>
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
					{[...Array(3)].map((_, index) => (
						// biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
						<div key={index} className="space-y-4">
							<Skeleton className="h-48 w-full" />
							<Skeleton className="h-4 w-3/4" />
							<Skeleton className="h-4 w-1/2" />
						</div>
					))}
				</div>
			</div>
		</Container>
	);
}
