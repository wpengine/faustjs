import { IncomingMessage, ServerResponse } from 'http';
import trimEnd from 'lodash/trimEnd.js';
import { authorizeHandler, logoutHandler } from '../auth/middleware.js';
import { parseUrl } from '../../utils/index.js';
import {
  LOGOUT_ENDPOINT_PARTIAL_PATH,
  TOKEN_ENDPOINT_PARTIAL_PATH,
  FAUST_API_BASE_PATH,
} from '../../lib/constants.js';

/**
 * A node handler for processing all incoming Faust API requests.
 *
 * @example ```ts
 * // filename: pages/api/faust/[[...route]].ts
 * import 'faust.config';
 * import { apiRouter } from '@faustwp-core/api';
 *
 * export default apiRouter;
 * ```
 *
 * @param {IncomingMessage} req
 * @param {ServerResponse} res
 */
// eslint-disable-next-line consistent-return
export async function apiRouter(
  req: IncomingMessage,
  res: ServerResponse,
): Promise<void> {
  const parsedUrl = parseUrl(req.url);
  const pathname = trimEnd(parsedUrl?.pathname, '/');

  switch (pathname) {
    case `${FAUST_API_BASE_PATH}/${TOKEN_ENDPOINT_PARTIAL_PATH}`:
      return authorizeHandler(req, res);
    case `${FAUST_API_BASE_PATH}/${LOGOUT_ENDPOINT_PARTIAL_PATH}`:
      return logoutHandler(req, res);
    default:
      res.statusCode = 404;
      res.end();
  }
}
