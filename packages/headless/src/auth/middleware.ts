import { NextApiRequest, NextApiResponse } from 'next';
import { authorize, ensureAuthorization } from './authorize';
import { getAccessTokenAsCookie, storeAccessToken } from './cookie';

/**
 * A Node handler for processing incomming requests to exchange an Authorization Code
 * for an Access Token using the WordPress API. Once the code is exchanged, this
 * handler stores the Access Token on the cookie and redirects to the frontend.
 */
export async function nextAuthorizeHandler(
  req: NextApiRequest,
  res: NextApiResponse,
): Promise<void> {
  try {
    const { code, redirect_uri: redirectUri } = req.query;

    const host = req.headers.host ?? '';
    const cookieOptions = {
      request: req,
    };
    const cookies = getAccessTokenAsCookie(cookieOptions);

    const protocol = /localhost/.test(host) ? 'http:' : 'https:';
    const fullRedirectUrl = `${protocol}//${host}/${redirectUri as string}`;

    /**
     * If missing code, this is a request that's meant to trigger authorization such as a preview.
     */
    if (!code && redirectUri) {
      const response = ensureAuthorization(fullRedirectUrl, cookieOptions);

      if (typeof response !== 'string' && response?.redirect) {
        res.redirect(response.redirect);

        return;
      }

      /**
       * Add server host to previewData so initializeNextStaticProps() can properly redirect as getStaticProps() does not
       * have the headers or host in the context.
       */
      res.setPreviewData({
        serverInfo: {
          host,
          cookies,
        },
      });

      /**
       * We already have an auth code stored, go ahead and redirect.
       */
      res.redirect(fullRedirectUrl);
      return;
    }

    if (!code || !redirectUri) {
      res.statusCode = 401;
      res.end();

      return;
    }

    const result = await authorize(code as string);
    storeAccessToken(result.access_token, res, {
      request: req,
    });

    /**
     * Set cookie to enable previewing.
     */
    console.debug('Setting Next.js Preview Data');

    /**
     * Add server host to previewData so initializeNextStaticProps() can properly redirect as getStaticProps() does not
     * have the headers or host in the context.
     */
    res.setPreviewData({
      serverInfo: {
        host,
        cookies,
      },
    });

    res.redirect(redirectUri as string);
  } catch (e) {
    console.debug('Clearing Next.js Preview Data');
    res.clearPreviewData();

    res.statusCode = 500;
    res.end();
  }
}
