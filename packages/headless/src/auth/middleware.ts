import { IncomingMessage, ServerResponse } from 'http';
import { authorize } from './authorize';
import { storeAccessToken } from './cookie';
import { getQueryParam } from '../utils';

/**
 * A Node handler for processing incoming requests to exchange an Authorization Code
 * for an Access Token using the WordPress API. Once the code is exchanged, this
 * handler stores the Access Token on the cookie and redirects to the frontend.
 *
 * @export
 * @param {IncomingMessage} req
 * @param {ServerResponse} res
 * @returns
 */
export async function authorizeHandler(
  req: IncomingMessage,
  res: ServerResponse,
) {
  try {
    const url = req.url as string;
    const code = getQueryParam(url, 'code');
    const redirectUri = getQueryParam(url, 'redirect_uri');

    if (!code || !redirectUri) {
      res.statusCode = 401;
      res.end();

      return;
    }

    const result = await authorize(code);
    storeAccessToken(result.access_token, res);
    res.statusCode = 302;
    res.setHeader('Location', redirectUri);
    res.end();
  } catch (e) {
    res.statusCode = 500;
    res.end();
  }
}
