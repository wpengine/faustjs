import { getWpSecret, getWpUrl } from '../utils/index.js';
import { errorLog, warnLog } from '../stdout/index.js';

/**
 * Validates the NEXT_PUBLIC_WORDPRESS_URL environment variable by sending a POST request to the Faust Plugin API.
 * If the URL matches the Faust Plugin Headless URL, the validation fails, and an error is logged.
 */
export async function validateNextWordPressUrl(): Promise<void> {
	const apiUrl = `${getWpUrl()}/wp-json/faustwp/v1/validate_public_wordpress_url`;
	const headers = {
		'Content-Type': 'application/json',
		'x-faustwp-secret': getWpSecret() || '',
	};

	const postData = {
		public_wordpress_url: getWpUrl(),
	};
	try {
		const response = await fetch(apiUrl, {
			method: 'POST',
			headers,
			body: JSON.stringify(postData),
		});

		if (!response.ok) {
			if (response.status === 404) {
				// Handle the case when the route does not exist
				warnLog(
					'Route not found: Please update your FaustWP plugin to the latest version.',
				);
			} else {
				errorLog(
					'Validation Failed: Your Faust front-end site URL value is misconfigured. It should NOT match the `NEXT_PUBLIC_WORDPRESS_URL.`',
				);
				process.exit(1);
			}
		}
	} catch (error) {
		console.log('error', error);
	}
}
