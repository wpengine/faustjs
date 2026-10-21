import 'isomorphic-fetch';
import { IncomingMessage, ServerResponse } from 'http';
import { errorLog, getQueryParam } from '../../utils/index.js';
import { getWpSecret } from '../../lib/getWpSecret.js';
import { getWpUrl } from '../../lib/getWpUrl.js';
import { Cookies } from './cookie.js';
import { OAuth } from './token.js';

export interface AuthorizeResponse {
	accessToken: string;
	accessTokenExpiration: number;
	refreshToken: string;
	refreshTokenExpiration: number;
}

/**
 * A Node handler for processing incoming requests to exchange an Authorization Code
 * for an Access Token using the WordPress API. Once the code is exchanged, this
 * handler stores the Access Token on the cookie and redirects to the frontend.
 *
 * @param {IncomingMessage} req
 * @param {ServerResponse} res
 *
 * @see https://faustjs.org/docs/next/guides/auth
 */
export async function authorizeHandler(
	req: IncomingMessage,
	res: ServerResponse,
): Promise<void> {
	const url = req.url as string;
	const code = getQueryParam(url, 'code');
	const oauth = new OAuth(new Cookies(req, res));
	const refreshToken = oauth.getRefreshToken();

	if (!refreshToken && !code) {
		res.statusCode = 401;
		res.setHeader('Content-Type', 'application/json');
		res.end(JSON.stringify({ error: 'Unauthorized' }));

		return;
	}

	try {
		const result = await oauth.fetch(code);

		if (oauth.isOAuthTokens(result)) {
			oauth.setRefreshToken(result.refreshToken);
			res.statusCode = 200;
			res.end(JSON.stringify(result));
		} else {
			const {
				response: { status },
			} = result;

			if (status > 299) {
				res.statusCode = result.response.status;
			} else {
				res.statusCode = 401;
			}

			/**
			 * If the response to the authorization request does not match
			 * isOAuthTokens, remove the refresh token from the cookie in the case
			 * the token is:
			 * - expired
			 * - invalid
			 * - revoked
			 * - from a different WordPress instance when developing on localhost
			 */
			oauth.setRefreshToken(undefined);

			res.setHeader('Content-Type', 'application/json');
			res.end(JSON.stringify(result.result));
		}
	} catch (e) {
		errorLog('Invalid response for authorize handler:', e);

		res.statusCode = 500;
		res.setHeader('Content-Type', 'application/json');
		res.end(JSON.stringify({ error: 'Internal Server Error' }));
	}
}

/**
 * Ask FaustWP for a URL that logs the user's browser out of WordPress.
 *
 * @param {string} refreshToken The user's refresh token.
 * @param {string} redirectUri Where WordPress redirects after logging out.
 *
 * @returns {Promise<string | null>} The URL, or null if FaustWP can't
 * provide one, for example because the plugin is older than this endpoint.
 */
async function getWordPressLogoutUrl(
	refreshToken: string,
	redirectUri: string,
): Promise<string | null> {
	const secret = getWpSecret();

	if (!secret) {
		return null;
	}

	try {
		const response = await fetch(
			`${getWpUrl()}/?rest_route=/faustwp/v1/logout`,
			{
				headers: {
					'Content-Type': 'application/json',
					'x-faustwp-secret': secret,
				},
				method: 'POST',
				body: JSON.stringify({ refreshToken, redirectUri }),
				// Don't let a slow WordPress hold up logging out of the frontend.
				signal: AbortSignal.timeout(5000),
			},
		);

		if (!response.ok) {
			return null;
		}

		const { logoutUrl } = (await response.json()) as { logoutUrl?: unknown };

		return typeof logoutUrl === 'string' ? logoutUrl : null;
	} catch {
		return null;
	}
}

/**
 * A Node handler for processing incoming requests to logout an authenticated user.
 * This handler clears the refresh token from the cookie and returns a response.
 *
 * If the request has a redirect_uri query parameter, the response also
 * includes wordpressLogoutUrl: sending the browser there ends its WordPress
 * session, so a user who logged in through WordPress isn't logged straight
 * back in, and then redirects to redirect_uri.
 *
 * @param {IncomingMessage} req
 * @param {ServerResponse} res
 *
 * @see https://faustjs.org/docs/next/guides/auth
 */
export async function logoutHandler(
	req: IncomingMessage,
	res: ServerResponse,
): Promise<void> {
	// Only allow POST requests, as browsers may pre-fetch GET requests.
	if (req.method !== 'POST') {
		res.statusCode = 405;
		res.end();

		return;
	}

	const oauth = new OAuth(new Cookies(req, res));
	const refreshToken = oauth.getRefreshToken();
	const redirectUri = getQueryParam(req.url ?? '', 'redirect_uri');

	oauth.setRefreshToken(undefined);

	const wordpressLogoutUrl =
		refreshToken && redirectUri
			? await getWordPressLogoutUrl(refreshToken, redirectUri)
			: null;

	if (wordpressLogoutUrl) {
		res.statusCode = 200;
		res.setHeader('Content-Type', 'application/json');
		res.end(JSON.stringify({ wordpressLogoutUrl }));

		return;
	}

	res.statusCode = 205;
	res.end();
}
