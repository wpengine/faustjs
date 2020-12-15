import { ServerResponse } from 'http';
import Cookies from 'universal-cookie';
import { base64Decode, base64Encode, trimTrailingSlash } from '../utils';

let cookies = new Cookies();
const WP_URL = trimTrailingSlash(
  process.env.NEXT_PUBLIC_WORDPRESS_URL || process.env.WORDPRESS_URL,
);
const TOKEN_KEY = `${WP_URL as string}-at`;

/**
 * Initializes cookies for the server
 *
 * @export
 * @param {(string | undefined)} cookie
 */
export function initializeServerCookie(cookie: string | undefined) {
  cookies = new Cookies(cookie);
}

/* eslint-disable consistent-return */
/**
 * Gets an Access Token from the cookie, if it exists
 *
 * @export
 * @returns {(string | undefined)}
 */
export function getAccessToken(): string | undefined {
  const token: string = cookies.get(TOKEN_KEY);

  if (!token) {
    return;
  }

  return base64Decode(token);
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
) {
  if (!token) {
    cookies.remove(TOKEN_KEY);
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    res.setHeader(
      'Set-Cookie',
      `${TOKEN_KEY}=; expires=${yesterday.toUTCString()}; path=/`,
    );

    return;
  }

  const encodedToken = base64Encode(token);

  cookies.set(TOKEN_KEY, encodedToken);
  res.setHeader(
    'Set-Cookie',
    `${TOKEN_KEY}=${encodedToken}; Max-Age=2592000; path=/`,
  );
}
