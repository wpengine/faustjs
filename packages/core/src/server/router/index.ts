import { IncomingMessage, ServerResponse } from 'http';
import { isUndefined } from 'lodash';
import { authorizeHandler, logoutHandler } from '../auth/middleware';
import { getUrlPath } from '../../utils';
import {
  LOGOUT_ENDPOINT_PARTIAL_PATH,
  TOKEN_ENDPOINT_PARTIAL_PATH,
  headlessConfig,
} from '../../config';

/**
 * A node handler for processing all incoming Faust.js API requests.
 *
 * @example ```ts
 * // filename: pages/api/faust/[[...route]].ts
 * import 'faust.config';
 * import { apiRouter } from '@faustjs/core';
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
  const { apiBasePath } = headlessConfig();

  if (isUndefined(apiBasePath)) {
    throw new Error(
      `You must provide an apiBasePath value in your config in order to use the API router`,
    );
  }

  const route = getUrlPath(req.url);

  switch (route) {
    case `${apiBasePath}/${TOKEN_ENDPOINT_PARTIAL_PATH}`:
      return authorizeHandler(req, res);
    case `${apiBasePath}/${LOGOUT_ENDPOINT_PARTIAL_PATH}`:
      return logoutHandler(req, res);
    default:
      res.statusCode = 404;
      res.end();
  }
}
