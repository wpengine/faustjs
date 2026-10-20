import { base64Encode } from '../utils/convert.js';

/**
 * Returns an `Authorization` header value for the WordPress Application Password
 * in the project's env, or undefined if one isn't configured.
 */
export function getWpApplicationPasswordAuthorization() {
	const user = process.env.FAUST_APPLICATION_USER;
	const password = process.env.FAUST_APPLICATION_PASSWORD;

	if (!user || !password) {
		return undefined;
	}

	return `Basic ${base64Encode(`${user}:${password}`)}`;
}
