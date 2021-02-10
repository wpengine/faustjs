import { IncomingMessage, ServerResponse } from 'http';
import { getQueryParam } from '../utils';
import { authorize, ensureAuthorization } from './authorize';
import { storeAccessToken } from './cookie';

function redirect(res: ServerResponse, url: string) {
  res.writeHead(302, {
    Location: url,
  });

  res.end();
}

/**
 * A Node handler for processing incomming requests to exchange an Authorization Code
 * for an Access Token using the WordPress API. Once the code is exchanged, this
 * handler stores the Access Token on the cookie and redirects to the frontend.
 */
export async function authorizeHandler(
  req: IncomingMessage,
  res: ServerResponse,
): Promise<void> {
  try {
    const url = req.url as string;
    const code = getQueryParam(url, 'code');
    const redirectUri = getQueryParam(url, 'redirect_uri');

    const host = req.headers.host ?? '';
    const cookieOptions = {
      request: req,
    };

    const protocol = /localhost/.test(host) ? 'http:' : 'https:';
    const fullRedirectUrl = `${protocol}//${host}/${redirectUri}`;

    /**
     * If missing code, this is a request that's meant to trigger authorization such as a preview.
     */
    if (!code && redirectUri) {
      const response = ensureAuthorization(fullRedirectUrl, cookieOptions);

      if (typeof response !== 'string' && response?.redirect) {
        redirect(res, response.redirect);

        return;
      }

      /**
       * We already have an auth code stored, go ahead and redirect.
       */
      redirect(res, fullRedirectUrl);
      return;
    }

    if (!code || !redirectUri) {
      res.statusCode = 401;
      res.end();

      return;
    }

    const result = await authorize(code);
    storeAccessToken(result.access_token, res, {
      request: req,
    });

    redirect(res, redirectUri);
  } catch (e) {
    res.statusCode = 500;
    res.end();
  }
}
