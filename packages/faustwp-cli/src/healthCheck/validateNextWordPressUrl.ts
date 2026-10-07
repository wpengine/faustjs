import { getWpSecret, getWpUrl } from '../utils/index.js';
import { errorLog, warnLog } from '../stdout/index.js';

/**
 * Validates the NEXT_PUBLIC_WORDPRESS_URL environment variable by sending a POST request to the Faust Plugin API.
 * If the URL matches the Faust Plugin Headless URL, the validation fails, and an error is logged.
 */

const FAILED_VALIDATION_MESSAGE = 'Validation Failed, Faust is shutting down:';

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
			errorLog(
				'Validation error:',
				String(response.status),
				'-',
				response.statusText,
			);

			if (response.status === 404) {
				// Handle the case when the route does not exist
				warnLog(
					'Route not found: Please update your FaustWP plugin to the latest version.',
				);
			} else if (response.status >= 500 && response.status < 600) {
				// Handle WordPress server error
				errorLog(
					FAILED_VALIDATION_MESSAGE,
					'Could not connect to the WordPress server. Please check your WordPress URL or server status, as your site may not function correctly.',
				);
				process.exit(1);
			} else {
				errorLog(
					FAILED_VALIDATION_MESSAGE,
					'Your Faust front-end site URL value is misconfigured. It should NOT match the `NEXT_PUBLIC_WORDPRESS_URL.`',
				);
				process.exit(1);
			}
		}
	} catch (error) {
		console.log('error', error);
	}
}
