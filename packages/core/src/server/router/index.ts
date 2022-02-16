import { IncomingMessage, ServerResponse } from 'http';
import isUndefined from 'lodash/isUndefined.js';
import { authorizeHandler, logoutHandler } from '../auth/middleware.js';
import { parseUrl } from '../../utils/index.js';
import {
  LOGOUT_ENDPOINT_PARTIAL_PATH,
  TOKEN_ENDPOINT_PARTIAL_PATH,
  config,
} from '../../config/index.js';

/**
 * A node handler for processing all incoming Faust.js API requests.
 *
 * @example ```ts
 * // filename: pages/api/faust/[[...route]].ts
 * import 'faust.config';
 * import { apiRouter } from '@faustjs/core/api';
 *
 * export default apiRouter;
 * ```
 *
 * @param {IncomingMessage} req
 * @param {ServerResponse} res
 */
export async function apiRouter(
  req: IncomingMessage,
  res: ServerResponse,
): Promise<void> {
  const { apiBasePath } = config();

  if (isUndefined(apiBasePath)) {
    throw new Error(
      `You must provide an apiBasePath value in your config in order to use the API router`,
    );
  }

  const parsedUrl = parseUrl(req.url);
  const pathname = parsedUrl?.pathname;

  switch (pathname) {
    case `${apiBasePath}/${TOKEN_ENDPOINT_PARTIAL_PATH}`:
      return authorizeHandler(req, res);
    case `${apiBasePath}/${LOGOUT_ENDPOINT_PARTIAL_PATH}`:
      return logoutHandler(req, res);
    default:
      res.statusCode = 404;
      res.end();
  }
}
