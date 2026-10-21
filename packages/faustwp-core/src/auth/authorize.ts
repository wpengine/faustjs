import 'isomorphic-fetch';
import isString from 'lodash/isString.js';
import { getWpUrl } from '../lib/getWpUrl.js';
import { errorLog, getQueryParam, removeURLParam } from '../utils/index.js';
import { fetchAccessToken, getAccessToken } from './client/accessToken.js';

export interface EnsureAuthorizationOptions {
	redirectUri?: string;
	loginPageUri?: string;
}

/* eslint-disable consistent-return */
/**
 * Checks for an existing Access Token and returns one if it exists. Otherwise returns
 * an object containing a redirect URI to send the client to for authorization.
 *
 * @export
 * @param {string} EnsureAuthorizationOptions
 * @returns {(string | { redirect: string })}
 */
export async function ensureAuthorization(
	options?: EnsureAuthorizationOptions,
): Promise<
	true | { redirect?: string | undefined; login?: string | undefined }
> {
	/**
	 * If there is already an access token saved in memory, we can assume they
	 * are already authorized.
	 */
	if (getAccessToken()) {
		return true;
	}

	const wpUrl = getWpUrl();
	const { redirectUri, loginPageUri } = options || {};

	// Get the authorization code from the URL if it exists
	const code: string | undefined =
		typeof window !== 'undefined'
			? getQueryParam(window.location.href, 'code')
			: undefined;

	const unauthorized: { redirect?: string; login?: string } = {};

	if (isString(redirectUri)) {
		unauthorized.redirect = `${wpUrl}/generate?redirect_uri=${encodeURIComponent(
			redirectUri,
		)}`;
	}

	if (isString(loginPageUri)) {
		unauthorized.login = loginPageUri;
	}

	const token = await fetchAccessToken(code);

	if (!token && code) {
		/**
		 * WordPress already issued a code, so the exchange itself failed, for
		 * example because the frontend's credentials were rejected. Sending the
		 * user back for another code would loop forever, so stop here, and drop
		 * the code so a reload starts over.
		 */
		window.history.replaceState(
			{},
			document.title,
			removeURLParam(window.location.href, 'code'),
		);
		errorLog(
			'Faust.js could not exchange the authorization code for an access token. Check your Next.js server logs.',
		);

		return {};
	}

	if (!token) {
		return unauthorized;
	}

	if (code) {
		window.history.replaceState(
			{},
			document.title,
			removeURLParam(window.location.href, 'code'),
		);
	}

	return true;
}
/* eslint-enable consistent-return */
