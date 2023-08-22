import { getWpUrl } from '@faustwp/core/dist/cjs/lib/getWpUrl.js';
// eslint-disable-next-line import/extensions
import { cookies } from 'next/headers';
import { AuthorizeResponse } from '../routeHandler/tokenHandler.js';
import { getUrl } from '../../lib/getUrl.js';

export async function fetchAccessToken(code?: string) {
  const cookieStore = cookies();
  const cookieName = `${getWpUrl()}-rt`;

  if (!cookieStore.has(cookieName) && !code) {
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
    });

    if (!response.ok) {
      return null;
    }

    const data = (await response.json()) as AuthorizeResponse;

    return data.accessToken;
  } catch (err) {
    console.log('There was an error fetching the access token', err);

    return null;
  }
}
