import { Container } from "@/components/container";

export default async function Layout({
	children,
}: {
	children: React.ReactNode;
}) {
	return <>{children}</>;
}
