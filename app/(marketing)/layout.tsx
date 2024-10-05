import { Container } from "@/components/container";
import { Breadcrumb } from "@/components/breadcrumb";
import { auth } from "@/lib/auth";
import { db } from "@/db/client";

export default async function Layout({
	children,
}: { children: React.ReactNode }) {
	const session = await auth();

	console.log(session);

	const user = await await db.query.users.findFirst();
	console.log(user);

	return (
		<>
			<Container className="py-4">
				<Breadcrumb />
			</Container>
			{user?.email}
			{children}
		</>
	);
}
// Compare this snippet from app/%28portfolio%29/layout.tsx:
