export default function ContentManagement() {
	return (
		<div className="min-h-screen bg-gray-100 p-8">
			<div className="max-w-4xl mx-auto">
				<h1 className="text-3xl font-bold mb-8">Content Management</h1>
				<div className="bg-white shadow overflow-hidden sm:rounded-lg">
					<div className="px-4 py-5 sm:px-6">
						<h2 className="text-xl font-semibold text-gray-900">
							Manage Your Content
						</h2>
						<p className="mt-1 text-sm text-gray-500">
							Add, edit, or delete your website content here.
						</p>
					</div>
					<div className="border-t border-gray-200">
						<dl>
							<div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
								<dt className="text-sm font-medium text-gray-500">Pages</dt>
								<dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
									<button
										type="button"
										className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
									>
										Manage Pages
									</button>
								</dd>
							</div>
							<div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
								<dt className="text-sm font-medium text-gray-500">
									Blog Posts
								</dt>
								<dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
									<button
										type="button"
										className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
									>
										Manage Blog Posts
									</button>
								</dd>
							</div>
							<div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
								<dt className="text-sm font-medium text-gray-500">Media</dt>
								<dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
									<button
										type="button"
										className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
									>
										Manage Media
									</button>
								</dd>
							</div>
						</dl>
					</div>
				</div>
			</div>
		</div>
	);
}
