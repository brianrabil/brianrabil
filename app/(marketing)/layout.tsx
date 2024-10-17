import { Container } from "@/components/container";
import { Breadcrumb } from "@/components/breadcrumb";
import { auth } from "@/lib/auth";
import { db } from "@/db/client";
import { Footer } from "@/components/footer";
import { Toaster } from "@/components/ui/sonner";
import { Header } from "@/components/header";

export default async function Layout({
	children,
}: { children: React.ReactNode }) {
	const session = await auth();

	console.log(session);

	const user = await await db.query.users.findFirst();
	console.log(user);

	return (
		<>
			<Header />
			<main>{children}</main>
			<Toaster />
			<Footer />
			<Container className="py-4">
				<Breadcrumb />
			</Container>
			{user?.email}
			{children}
		</>
	);
}
// Compare this snippet from app/%28portfolio%29/layout.tsx:
