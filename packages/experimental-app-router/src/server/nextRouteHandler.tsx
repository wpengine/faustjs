import { getWpUrl } from '@faustwp/core/dist/cjs/lib/getWpUrl.js';
import { getWpSecret } from '@faustwp/core/dist/cjs/lib/getWpSecret.js';
// eslint-disable-next-line import/extensions
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

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
    const code = new URL(url).searchParams.get('code');

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
      // cookieStore.delete(cookieName);

      // @todo throw different errors based on response
      return new Response(JSON.stringify({ error: 'Unauthorized' }), {
        status: 401,
        headers: {
          'Content-Type': 'application/json',
        },
      });
    }

    const data = (await response.json()) as AuthorizeResponse;

    // @todo set expiry
    // cookieStore.set(cookieName, 'testing');

    const res = NextResponse.json(data, { status: 200 });

    res.cookies.set(cookieName, 'testing', {
      httpOnly: true,
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

export async function GetFn(req: Request) {
  const { pathname } = new URL(req.url);

  switch (pathname) {
    case '/api/faust/token': {
      return tokenHandler(req);
    }
    default: {
      return new Response('Not Found', {
        status: 404,
      });
    }
  }
}

export async function PostFn(req: Request) {}

export const nextRouteHandler = {
  GET: (req: Request) => GetFn(req),
  POST: (req: Request) => PostFn(req),
};
