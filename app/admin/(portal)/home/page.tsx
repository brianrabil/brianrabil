"use client";

import Link from "next/link";

export default function AdminPage() {
	return (
		<div className="min-h-screen bg-gray-100 p-8">
			<div className="max-w-4xl mx-auto">
				<div className="flex justify-between items-center mb-8">
					<h1 className="text-3xl font-bold">Admin Dashboard</h1>
					{/* <button
						type="button"
						onClick={handleLogout}
						className="bg-red-500 text-white p-2 rounded"
					>
						Logout
					</button> */}
				</div>
				<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
					<div className="bg-white p-4 rounded shadow">
						<h2 className="text-xl mb-2">Manage Content</h2>
						<Link
							href="/admin/content"
							className="bg-blue-500 text-white p-2 rounded inline-block"
						>
							Go to Content Management
						</Link>
					</div>
					<div className="bg-white p-4 rounded shadow">
						<h2 className="text-xl mb-2">User Management</h2>
						<Link
							type="button"
							href={"/admin/users"}
							className="bg-blue-500 text-white p-2 rounded"
						>
							Go to User Management
						</Link>
					</div>
					<div className="bg-white p-4 rounded shadow">
						<h2 className="text-xl mb-2">Site Settings</h2>
						<Link
							href="/admin/settings"
							className="bg-blue-500 text-white p-2 rounded inline-block"
						>
							Go to Site Settings
						</Link>
					</div>
					<div className="bg-white p-4 rounded shadow">
						<h2 className="text-xl mb-2">Analytics</h2>
						<Link
							href="/admin/analytics"
							className="bg-blue-500 text-white p-2 rounded inline-block"
						>
							View Analytics
						</Link>
					</div>
				</div>
			</div>
		</div>
	);
}
