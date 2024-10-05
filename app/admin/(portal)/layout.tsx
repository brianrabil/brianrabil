"use client";

import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import { redirect } from "next/navigation";

const isAuthenticated = true;

export default function AdminLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	if (!isAuthenticated) {
		redirect("/admin/login");
	}

	return (
		<div className="min-h-screen bg-gray-100">
			<nav className="bg-white shadow-md">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="flex justify-between h-16">
						<div className="flex">
							<Link href="/admin" className="flex-shrink-0 flex items-center">
								Admin Dashboard
							</Link>
							<div className="hidden sm:ml-6 sm:flex sm:space-x-8">
								<Link
									href="/admin/content"
									className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
								>
									Content
								</Link>
								<Link
									href="/admin/users"
									className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
								>
									Users
								</Link>
								<Link
									href="/admin/settings"
									className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
								>
									Settings
								</Link>
								<Link
									href="/admin/analytics"
									className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
								>
									Analytics
								</Link>
							</div>
						</div>
						{/* <div className="hidden sm:ml-6 sm:flex sm:items-center">
							<button
								type="button"
								onClick={handleLogout}
								className="bg-red-500 text-white px-3 py-2 rounded-md text-sm font-medium"
							>
								Logout
							</button> */}
						{/* </div> */}
					</div>
				</div>
			</nav>
			<main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">{children}</main>
		</div>
	);
}
