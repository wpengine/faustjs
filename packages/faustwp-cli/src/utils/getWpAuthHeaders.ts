import { getWpSecret } from './getWpSecret.js';

/**
 * Returns the WordPress Application Password credentials from the project's env,
 * or undefined unless both are set.
 */
export function getWpApplicationPassword() {
	const user = process.env.FAUST_APPLICATION_USER;
	const password = process.env.FAUST_APPLICATION_PASSWORD;

	if (!user || !password) {
		return undefined;
	}

	return { user, password };
}

/**
 * Whether the project's env has credentials the CLI can send to WordPress.
 */
export function hasWpCredentials() {
	return Boolean(getWpApplicationPassword() || getWpSecret());
}

/**
 * Returns the headers that authenticate the CLI with WordPress. An Application
 * Password is used when configured, otherwise the Faust secret key.
 *
 * @param secretHeader The header that carries the secret key.
 */
export function getWpAuthHeaders(
	secretHeader = 'x-faustwp-secret',
): Record<string, string> {
	const applicationPassword = getWpApplicationPassword();

	if (applicationPassword) {
		const credentials = Buffer.from(
			`${applicationPassword.user}:${applicationPassword.password}`,
		).toString('base64');

		return { Authorization: `Basic ${credentials}` };
	}

	const secret = getWpSecret();

	return secret ? { [secretHeader]: secret } : {};
}
