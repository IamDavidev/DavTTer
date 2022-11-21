export function failedStatus(
	statusExpected: number,
	statusRequest: number
): string {
	return `Expected status code: ${statusExpected},but received:${statusRequest} `;
}
