import { IncomingMessage, ServerResponse } from 'http';
import { authorize } from './authorize';
import { storeAccessToken } from './cookie';
import { getQueryParam } from '../utils';

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
