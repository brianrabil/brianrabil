export default function SiteSettings() {
	return (
		<div>
			<h1 className="text-2xl font-bold mb-4">Site Settings</h1>
			<div className="bg-white shadow overflow-hidden sm:rounded-lg">
				<div className="px-4 py-5 sm:px-6">
					<h3 className="text-lg leading-6 font-medium text-gray-900">
						Manage your site settings
					</h3>
				</div>
				<div className="border-t border-gray-200">
					<dl>
						<div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
							<dt className="text-sm font-medium text-gray-500">Site Name</dt>
							<dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
								Brian Rabil
							</dd>
						</div>
						<div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
							<dt className="text-sm font-medium text-gray-500">Theme</dt>
							<dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
								Light
							</dd>
						</div>
					</dl>
				</div>
			</div>
			{/* Add more site settings features here */}
		</div>
	);
}
