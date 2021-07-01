import { IncomingMessage, ServerResponse } from 'http';
import Cookies from 'universal-cookie';
import { base64Decode, base64Encode, trimTrailingSlash } from '../utils';

export interface CookieOptions {
  request?: IncomingMessage;
  cookies?: string;
}

const WP_URL = trimTrailingSlash(
  process.env.NEXT_PUBLIC_WORDPRESS_URL || process.env.WORDPRESS_URL,
);
export const COOKIE_KEY = `${WP_URL as string}-at`;

export function initializeCookies({
  request,
  cookies,
}: CookieOptions = {}): Cookies {
  if (!(request || cookies)) {
    return new Cookies();
  }

  if (!cookies) {
    return new Cookies(request?.headers.cookie);
  }

  return new Cookies(cookies);
}

/* eslint-disable consistent-return */
/**
 * Gets an Access Token from the cookie, if it exists
 *
 * @export
 * @returns {(string | undefined)}
 */
export function getAccessToken(options?: CookieOptions): string | undefined {
  const cookies = initializeCookies(options);
  const token: string = cookies.get(COOKIE_KEY);

  if (!token) {
    return;
  }

  return base64Decode(token);
}
/* eslint-enable consistent-return */

/* eslint-disable consistent-return */
/**
 * Gets an Access Token from the cookie and formats it as a cookie pair
 *
 * @export
 * @returns {(string | undefined)}
 */
export function getAccessTokenAsCookie(
  options?: CookieOptions,
): string | undefined {
  const cookies = initializeCookies(options);
  const token: string = cookies.get(COOKIE_KEY);

  if (!token) {
    return;
  }

  return `${COOKIE_KEY}=${token};`;
}
/* eslint-enable consistent-return */

/**
 * Stores an Access Token on the cookie
 *
 * @export
 * @param {(string | undefined)} token
 * @param {ServerResponse} res
 */
export function storeAccessToken(
  token: string | undefined,
  res: ServerResponse,
  options: CookieOptions,
): void {
  const cookies = initializeCookies(options);
  if (!token) {
    cookies.remove(COOKIE_KEY);
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    res.setHeader(
      'Set-Cookie',
      `${COOKIE_KEY}=; expires=${yesterday.toUTCString()}; path=/`,
    );

    return;
  }

  const encodedToken = base64Encode(token);

  cookies.set(COOKIE_KEY, encodedToken);
  res.setHeader(
    'Set-Cookie',
    `${COOKIE_KEY}=${encodedToken}; Max-Age=2592000; path=/`,
  );
}
