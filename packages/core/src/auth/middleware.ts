import 'isomorphic-fetch';
import { IncomingMessage, ServerResponse } from 'http';
import { headlessConfig } from '../config';
import { getQueryParam } from '../utils';
import { getRefreshToken, storeRefreshToken } from './cookie';

export function redirect(res: ServerResponse, url: string): void {
  res.writeHead(302, {
    Location: url,
  });

  res.end();
}

export interface AuthorizeResponse {
  accessToken: string;
  accessTokenExpiration: number;
  refreshToken: string;
  refreshTokenExpiration: number;
}

/**
 * A Node handler for processing incoming requests to exchange an Authorization Code
 * for an Access Token using the WordPress API. Once the code is exchanged, this
 * handler stores the Access Token on the cookie and redirects to the frontend.
 */
export async function authorizeHandler(
  req: IncomingMessage,
  res: ServerResponse,
): Promise<void> {
  const url = req.url as string;
  const code = getQueryParam(url, 'code');
  const currentRefreshToken = getRefreshToken({ request: req });

  if (!currentRefreshToken && !code) {
    res.statusCode = 401;
    res.end(JSON.stringify({ error: 'Unauthorized' }));

    return;
  }

  const { wpUrl, apiClientSecret } = headlessConfig();

  if (!apiClientSecret) {
    throw new Error(
      'The apiClientSecret must be specified to use the auth middleware',
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
      refreshToken: currentRefreshToken,
    }),
  });

  const result = (await response.json()) as AuthorizeResponse;

  if (!response.ok) {
    res.statusCode = 401;
    res.end(JSON.stringify(result));

    return;
  }

  storeRefreshToken(result.refreshToken, res, { request: req });

  res.statusCode = 200;
  res.end(JSON.stringify(result));

  return;
}
