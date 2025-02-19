import { getWpUrl } from './getWpUrl.js';

/**
 * Retrieves the URL to the admin area for the current site.
 *
 * @link https://developer.wordpress.org/reference/functions/admin_url/
 *
 * @param {string} path Path relative to the admin URL.
 */
export function getAdminUrl(path = ''): string {
	const adminUrl = getWpUrl('wp-admin');

	if (!path) {
		return adminUrl;
	}

	return `${adminUrl}/${path}`;
}
