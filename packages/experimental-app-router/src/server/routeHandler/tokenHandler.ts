import { cookies } from 'next/headers.js';
import { NextResponse } from 'next/server.js';
import { getWpUrl, getWpSecret } from '../../faust-core-utils.js';

export type AuthorizeResponse = {
  accessToken: string;
  accessTokenExpiration: number;
  refreshToken: string;
  refreshTokenExpiration: number;
};

export async function tokenHandler(req: Request) {
  try {
    const secretKey = getWpSecret();

    if (!secretKey) {
      throw new Error('FAUST_SECRET_KEY must be set');
    }

    const { url } = req;
    const code = new URL(url).searchParams.get('code') ?? undefined;

    const cookieStore = cookies();
    const cookieName = `${getWpUrl()}-rt`;
    const refreshToken = cookieStore.get(cookieName)?.value;

    if (!refreshToken && !code) {
      return new Response(JSON.stringify({ error: 'Unauthorized' }), {
        status: 401,
        headers: {
          'Content-Type': 'application/json',
        },
      });
    }

    const wpFaustAuthorizeEndpoint = `${getWpUrl()}/?rest_route=/faustwp/v1/authorize`;

    const response = await fetch(wpFaustAuthorizeEndpoint, {
      headers: {
        'Content-Type': 'application/json',
        'x-faustwp-secret': secretKey,
      },
      method: 'POST',
      body: JSON.stringify({
        code,
        refreshToken,
      }),
    });

    if (!response.ok) {
      /**
       * Remove the refresh token from the cookie in the case the token is:
       * - expired
       * - invalid
       * - revoked
       * - from a different WordPress instance when developing on localhost
       */

      /**
       * @TODO Delete the cookie
       */
      // cookieStore.delete(cookieName);

      /**
       * @TODO throw different errors based on response
       */
      return new Response(JSON.stringify({ error: 'Unauthorized' }), {
        status: 401,
        headers: {
          'Content-Type': 'application/json',
        },
      });
    }

    const data = (await response.json()) as AuthorizeResponse;

    /**
     * @TODO Set the refresh token cookie with the new refresh token
     * and expiration.
     */

    const res = new NextResponse(JSON.stringify(data), {
      status: 200,
    });

    res.cookies.set(cookieName, data.refreshToken, {
      secure: true,
      httpOnly: true,
      path: '/',
      expires: new Date(data.refreshTokenExpiration * 1000),
      sameSite: 'lax',
    });

    return res;
  } catch (err) {
    console.error('Invalid response for authorize handler:', err);

    return new Response(JSON.stringify({ error: 'Internal Server Error' }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}
