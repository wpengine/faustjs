import { headlessConfig } from '../config';
import isString from 'lodash/isString';
import { parseUrl } from '../utils';
import { CookieOptions, getAccessToken } from './cookie';

/**
 * Exchanges an Authorization Code for an Access Token that you can use to make authenticated requests to
 * the WordPress API
 *
 * @async
 * @export
 * @param {string} code
 * @returns {Promise<{ access_token?: string; }>}
 */
export async function authorize(
  code: string,
): Promise<{ access_token?: string }> {
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
    }),
  });

  const result = (await response.json()) as { access_token?: string };

  if (!response.ok) {
    // eslint-disable-next-line @typescript-eslint/no-throw-literal
    throw {
      error: result,
      status: response.status,
    };
  }

  return result;
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
export function ensureAuthorization(
  redirectUri: string,
  options?: CookieOptions,
): string | { redirect: string } | undefined {
  const { wpUrl, apiEndpoint } = headlessConfig();
  const accessToken = getAccessToken(options);

  if (!isString(apiEndpoint)) {
    throw new Error(
      'You must provide an apiEndpoint value in your Headless config in order to use the authorize middleware',
    );
  }

  if (!!accessToken && accessToken.length > 0) {
    return accessToken;
  }

  const parsedUrl = parseUrl(redirectUri);

  if (!parsedUrl) {
    throw new Error('Invalid redirectUri for authorization');
  }

  const { baseUrl } = parsedUrl;

  return {
    redirect: `${wpUrl}/generate?redirect_uri=${encodeURIComponent(
      `${baseUrl}/${apiEndpoint}?redirect_uri=${encodeURIComponent(
        redirectUri,
      )}`,
    )}`,
  };
}
/* eslint-enable consistent-return */
