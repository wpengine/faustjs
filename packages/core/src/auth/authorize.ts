import fetch from 'isomorphic-fetch';
import { isUndefined } from 'lodash';
import isString from 'lodash/isString';
import { headlessConfig } from '../config';
import { getQueryParam, removeURLParam } from '../utils';
import { setAccessToken } from './token';

export interface AuthorizeOptions {
  code?: string;
  refreshToken?: string;
}

export interface AuthorizeResponse {
  accessToken: string;
  accessTokenExpiration: number;
  refreshToken: string;
  refreshTokenExpiration: number;
}

/**
 * Exchanges an Authorization Code or Refresh Token and client secret for an Access Token that you can use to make authenticated requests to
 * the WordPress API
 *
 * @async
 * @export
 * @param {object} options
 * @returns {Promise<AuthorizeResponse>}
 */
export async function authorize(
  options?: AuthorizeOptions,
): Promise<AuthorizeResponse> {
  const { code, refreshToken } = options || {};
  const { wpUrl, apiClientSecret } = headlessConfig();

  if (!isString(apiClientSecret)) {
    throw new Error(
      'You must provide an apiClientSecret value in your Headless config in order to use the authorize middleware',
    );
  }

  const response = await fetch(`${wpUrl}/wp-json/wpac/v1/authorize`, {
    headers: {
      'Content-Type': 'application/json',
      'x-wpe-headless-secret': apiClientSecret,
    },
    method: 'POST',
    body: JSON.stringify({
      code,
      refreshToken,
    }),
  });

  const result = (await response.json()) as AuthorizeResponse;

  if (!response.ok) {
    throw {
      error: result,
      status: response.status,
    };
  }

  return result;
}

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
