import fetch from 'isomorphic-fetch';
import { isUndefined } from 'lodash';
import isString from 'lodash/isString';
import { headlessConfig } from '../config';
import { getQueryParam, removeURLParam } from '../utils';
import { setAccessToken } from './token';

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
 * @param {string} redirectUri
 * @returns {(string | { redirect: string })}
 */
export async function ensureAuthorization(
  options?: EnsureAuthorizationOptions,
): Promise<
  true | { redirect?: string | undefined; login?: string | undefined }
> {
  const { wpUrl } = headlessConfig();
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

  const token = await fetchToken(code);

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

/**
 * Fetch an access token from the authorizeHandler middleware
 *
 * @export
 * @param {string} code An authorization code to fetch an access token
 */
export async function fetchToken(code?: string): Promise<string | null> {
  const { apiEndpoint } = headlessConfig();

  if (isUndefined(apiEndpoint)) {
    throw new Error(
      'You must provide an apiEndpoint value in your Headless config in order to use the fetchToken middleware',
    );
  }

  let url = apiEndpoint;

  // Add the code to the url if it exists
  if (isString(code) && code.length > 0) {
    url += `?code=${code}`;
  }

  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  const result = (await response.json()) as {
    accessToken: string;
    accessTokenExpiration: number;
  };

  // If the response is not ok, clear the access token
  if (!response.ok) {
    setAccessToken(undefined, undefined);
    return null;
  }

  setAccessToken(result.accessToken, result.accessTokenExpiration);

  return result.accessToken;
}
