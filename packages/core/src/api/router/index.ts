import { IncomingMessage, ServerResponse } from 'http';
import { isUndefined } from 'lodash';
import {
  authorizeHandler,
  getUrlPath,
  headlessConfig,
  logoutHandler,
} from '../..';

export const TOKEN_ENDPOINT_PARTIAL_PATH = 'auth/token';
export const LOGOUT_ENDPOINT_PARTIAL_PATH = 'auth/logout';

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
      res.setHeader('Content-Type', 'application/json');
      res.end(
        JSON.stringify({ error: `No Faust.js API route found at ${route}` }),
      );
  }
}
