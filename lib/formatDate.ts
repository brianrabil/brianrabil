export function formatDate(dateString: string) {
	return new Date(`${dateString}T00:00:00Z`).toLocaleDateString("en-US", {
		day: "numeric",
		month: "long",
		year: "numeric",
		timeZone: "UTC",
	});
}

/** "Mar 23, 2026": for index columns where dates line up. */
export function formatDateShort(dateString: string) {
	return new Date(`${dateString}T00:00:00Z`).toLocaleDateString("en-US", {
		day: "numeric",
		month: "short",
		year: "numeric",
		timeZone: "UTC",
	});
}
