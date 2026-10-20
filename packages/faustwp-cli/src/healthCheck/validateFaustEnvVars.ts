import {
	getWpApplicationPassword,
	getWpAuthHeaders,
	getWpUrl,
	hasWpCredentials,
} from '../utils/index.js';
import { errorLog, infoLog, warnLog } from '../stdout/index.js';
import { validateNextWordPressUrl } from './validateNextWordPressUrl.js';

export function isWPEngineComSubdomain(url: string) {
	const regex = /\b\w+\.wpengine\.com\b/;

	return regex.test(url);
}

/**
 * Commands that call WordPress with their own permissions instead of
 * exchanging Faust tokens, so they work with an Application Password whose
 * user can't exchange tokens.
 */
const COMMANDS_WITHOUT_TOKEN_EXCHANGE = [
	'generatePossibleTypes',
	'generateGlobalStylesheet',
	'blockset',
];

/**
 * Validates that the appropriate Faust related environment variables are set.
 *
 * @param command The CLI command being run, if any.
 */
export const validateFaustEnvVars = async (command?: string) => {
	const hasCredentials = hasWpCredentials();
	const applicationPassword = getWpApplicationPassword();

	if (!process.env.NEXT_PUBLIC_WORDPRESS_URL) {
		errorLog('Could not find NEXT_PUBLIC_WORDPRESS_URL environment variable.');

		process.exit(1);
	}

	if (isWPEngineComSubdomain(process.env.NEXT_PUBLIC_WORDPRESS_URL)) {
		infoLog(`Found NEXT_PUBLIC_WORDPRESS_URL using wpengine.com TLD.`);
		infoLog(`It is recommended to use the wpenginepowered.com TLD instead.`);
		infoLog(
			`Ex: https://example.wpengine.com -> https://example.wpenginepowered.com`,
		);
		infoLog(
			`This will leverage WP Engine's Advanced Network CDN. See: https://wpengine.com/support/network/`,
		);
	}

	if (
		!applicationPassword &&
		(process.env.FAUST_APPLICATION_USER ||
			process.env.FAUST_APPLICATION_PASSWORD)
	) {
		warnLog(
			'Set both FAUST_APPLICATION_USER and FAUST_APPLICATION_PASSWORD to use an Application Password.',
		);
	}

	if (!hasCredentials) {
		warnLog(
			'Could not find FAUST_SECRET_KEY, or FAUST_APPLICATION_USER and FAUST_APPLICATION_PASSWORD, environment variables.',
		);
		warnLog('Some functionality may be limited.');
	}

	if (
		process.env.NEXT_PUBLIC_WORDPRESS_URL.startsWith('http://') &&
		hasCredentials
	) {
		warnLog('Your WordPress site is not running on https!');
		warnLog(
			'This is a security concern as all traffic with your credentials is in plain text.',
		);
		warnLog(
			'Please make sure your production Faust app runs with a WordPress instance on https!',
		);
	}

	if (hasCredentials) {
		const apiUrl = `${getWpUrl()}/?rest_route=/faustwp/v1/validate_secret_key`;
		const headers = getWpAuthHeaders();
		try {
			const response = await fetch(apiUrl, {
				headers,
				method: 'POST',
			});
			// WordPress answers 401 when the credentials aren't accepted, and 403
			// when an Application Password's user lacks the capability.
			if (
				applicationPassword &&
				response.status === 403 &&
				command &&
				COMMANDS_WITHOUT_TOKEN_EXCHANGE.includes(command)
			) {
				warnLog(
					"The FAUST_APPLICATION_USER user can't exchange Faust tokens, so logins and previews won't work. Give it a role with the faustwp_exchange_tokens capability if you need them.",
				);
				return;
			}

			if (response.status === 401 || response.status === 403) {
				const wwwAuth = response.headers.get('www-authenticate') || '';
				if (wwwAuth.toLowerCase().includes('basic')) {
					errorLog(
						'Your WordPress site appears to be protected with HTTP Basic Authentication.',
					);
					errorLog(
						'Faust cannot validate the secret key until Basic Auth credentials are provided or the protection is removed.',
					);
				} else if (applicationPassword && response.status === 403) {
					errorLog(
						"The FAUST_APPLICATION_USER user can't exchange Faust tokens. Give it a role with the faustwp_exchange_tokens capability.",
					);
				} else if (applicationPassword) {
					errorLog(
						'Ensure FAUST_APPLICATION_USER and FAUST_APPLICATION_PASSWORD are a valid WordPress Application Password.',
					);
					errorLog(
						'If they are, your server may be removing the Authorization header before it reaches WordPress.',
					);
				} else {
					errorLog(
						'Ensure your FAUST_SECRET_KEY environment variable matches your Secret Key in the Faust WordPress plugin settings',
					);
				}
				process.exit(1);
			}
			await validateNextWordPressUrl();
		} catch (error) {
			console.log('error', error);
		}
	}
};
