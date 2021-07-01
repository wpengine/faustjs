import {
  isServerSide,
  parseUrl,
  trimLeadingSlash,
  trimTrailingSlash,
} from '../utils';
import { CookieOptions, getAccessToken } from './cookie';

const WP_URL = trimTrailingSlash(
  process.env.NEXT_PUBLIC_WORDPRESS_URL || process.env.WORDPRESS_URL,
);
const AUTH_URL = trimTrailingSlash(
  process.env.NEXT_PUBLIC_AUTHORIZATION_URL ||
    process.env.AUTHORIZATION_URL ||
    '/api/auth/wpe-headless',
);

const API_CLIENT_SECRET = process.env.WP_HEADLESS_SECRET;

if (!API_CLIENT_SECRET && isServerSide()) {
  console.warn(
    'The WP_HEADLESS_SECRET environment variable is not set. Install the WP Engine Headless plugin and set WP_HEADLESS_SECRET to the “Secret Key” from Settings → Headless to enable post previews.',
  );
}

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
  const response = await fetch(
    `${WP_URL as string}/wp-json/wpac/v1/authorize`,
    {
      headers: {
        'Content-Type': 'application/json',
        'x-wpe-headless-secret': API_CLIENT_SECRET as string,
      },
      method: 'POST',
      body: JSON.stringify({
        code,
      }),
    },
  );

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
  const accessToken = getAccessToken(options);

  if (!WP_URL) {
    return undefined;
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
    redirect: `${WP_URL}/generate?redirect_uri=${encodeURIComponent(
      `${baseUrl}/${
        trimLeadingSlash(AUTH_URL as string) as string
      }?redirect_uri=${encodeURIComponent(redirectUri)}`,
    )}`,
  };
}
/* eslint-enable consistent-return */
