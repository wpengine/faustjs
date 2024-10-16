// eslint-disable-next-line import/extensions
import { cookies } from 'next/headers.js';
import { AuthorizeResponse } from '../routeHandler/tokenHandler.js';
import { getUrl } from '../../lib/getUrl.js';
import { getWpUrl } from '../../faust-core-utils.js';

/**
 * Fetches tokens using either the refresh token cookie or the provided
 * authorization code.
 *
 * @param code string|undefined An authorization code to fetch tokens.
 * @returns string|null
 */
export async function fetchTokens(code?: string) {
  const cookieStore = cookies();
  const cookieName = `${getWpUrl()}-rt`;

  if (!cookieStore.get(cookieName)?.value && !code) {
    // The user is not authenticated.
    return null;
  }

  let url = `${getUrl()}/api/faust/token`;

  if (code) {
    url += `?code=${encodeURIComponent(code)}`;
  }

  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Cookie: cookieStore.toString(),
      },
      cache: 'no-store',
    });

    if (!response.ok) {
      if (response.status !== 401) {
        throw new Error('Invalid response from token endpoint');
      }

      return null;
    }

    if (!response.ok) {
      return null;
    }

    const data = (await response.json()) as AuthorizeResponse;

    return data;
  } catch (err) {
    // eslint-disable-next-line no-console
    console.log('There was an error fetching the access token', err);

    return null;
  }
}
