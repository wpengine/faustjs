import 'isomorphic-fetch';
import { IncomingMessage, ServerResponse } from 'http';
import { getQueryParam, log } from '../../utils';
import { Cookies } from './cookie';
import { OAuth } from './token';

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
 *
 * @param {IncomingMessage} req
 * @param {ServerResponse} res
 *
 * @see https://faustjs.org/docs/next/guides/auth
 */
export async function authorizeHandler(
  req: IncomingMessage,
  res: ServerResponse,
): Promise<void> {
  const url = req.url as string;
  const code = getQueryParam(url, 'code');
  const oauth = new OAuth(new Cookies(req, res));
  const refreshToken = oauth.getRefreshToken();

  if (!refreshToken && !code) {
    res.statusCode = 401;
    res.end(JSON.stringify({ error: 'Unauthorized' }));

    return;
  }

  try {
    const result = await oauth.fetch(code);

    if (oauth.isOAuthTokens(result)) {
      oauth.setRefreshToken(result.refreshToken);
      res.statusCode = 200;
      res.end(JSON.stringify(result));
    } else {
      const {
        response: { status },
      } = result;

      if (status > 299) {
        res.statusCode = result.response.status;
      } else {
        res.statusCode = 401;

        // If the response to the token endpoint is unauthorized, remove the existing refresh token.
        oauth.setRefreshToken(undefined);
      }

      res.end(JSON.stringify(result.result));
    }
  } catch (e) {
    log(e);

    res.statusCode = 500;
    res.end(JSON.stringify({ error: 'Internal Server Error' }));
  }
}

/**
 * A Node handler for processing incoming requests to logout an authenticated user.
 * This handler clears the refresh token from the cookie and returns a response.
 *
 * @param {IncomingMessage} req
 * @param {ServerResponse} res
 *
 * @see https://faustjs.org/docs/next/guides/auth
 */
export function logoutHandler(req: IncomingMessage, res: ServerResponse): void {
  // Only allow POST requests, as browsers may pre-fetch GET requests.
  if (req.method !== 'POST') {
    res.statusCode = 405;
    res.end();

    return;
  }

  const oauth = new OAuth(new Cookies(req, res));
  oauth.setRefreshToken(undefined);

  res.statusCode = 205;
  res.end();
}
