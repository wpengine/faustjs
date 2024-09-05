import type { LoggerOptions } from '@gqty/logger';
import defaults from 'lodash/defaults.js';
import { createLogger } from '@gqty/logger';
import type { NextClient } from '../gqty/client.js';

export function logQueries(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  client: NextClient<any>,
  options?: LoggerOptions,
): () => void {
  try {
    const logOptions = defaults({}, options, {
      showSelections: false,
      showCache: false,
    } as LoggerOptions);
    const logger = /* #__PURE__ */ createLogger(client.client, logOptions);
    const authLogger = /* #__PURE__ */ createLogger(
      client.auth.client,
      logOptions,
    );

    const unsubLogger = logger.start();
    const unsubAuthLogger = authLogger.start();

    return /* #__PURE__ */ () => {
      unsubLogger();
      unsubAuthLogger();
    };
  } catch (e) {
    return () => {};
  }
}
