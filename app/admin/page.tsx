import { redirect } from "next/navigation";
// import { cookies } from "next/headers";

export default async function AdminPage() {
	// const cookieStore = cookies();
	// const isAuthenticated = cookieStore.get("isAuthenticated");

	const isAuthenticated = true;

	if (!isAuthenticated) {
		redirect("/admin/login");
	} else {
		redirect("/admin/home");
	}
}
