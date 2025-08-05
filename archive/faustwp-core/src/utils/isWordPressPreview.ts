// Helper function to check if the URL is a WordPress preview
export function isWordPressPreview(search: string) {
	const params = new URLSearchParams(search);
	return params.has('preview') && params.get('preview') === 'true';
}
