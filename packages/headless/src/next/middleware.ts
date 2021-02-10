import { NextApiRequest, NextApiResponse } from 'next';
import { getAccessTokenAsCookie, authorizeHandler as nodeAuthorizeHandler } from '../auth';

/**
 * A Node handler for processing incomming requests to exchange an Authorization Code
 * for an Access Token using the WordPress API. Once the code is exchanged, this
 * handler stores the Access Token on the cookie and redirects to the frontend.
 */
export async function authorizeHandler(
    req: NextApiRequest,
    res: NextApiResponse,
): Promise<void> {
    try {
        const host = req.headers.host ?? '';
        const protocol = /localhost/.test(host) ? 'http:' : 'https:';
        const cookieOptions = {
            request: req,
        };
        const cookies = getAccessTokenAsCookie(cookieOptions);

        /**
         * Add server host to previewData so initializeNextStaticProps() can properly redirect as getStaticProps() does not
         * have the headers or host in the context.
         */
        res.setPreviewData({
            serverInfo: {
                host,
                protocol,
                cookies,
            },
        } as PreviewData);

        await nodeAuthorizeHandler(req, res);

        return;
    } catch (e) {
        console.debug('Clearing Next.js Preview Data');
        res.clearPreviewData();

        res.statusCode = 500;
        res.end();
    }
}
