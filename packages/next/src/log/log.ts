import type { LoggerOptions } from '@gqty/logger';
import defaults from 'lodash/defaults.js';
import type { NextClient } from '../gqty/client.js';

export async function logQueries(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  client: NextClient<any>,
  options?: LoggerOptions,
): Promise<() => void> {
  try {
    const { createLogger } = await import('@gqty/logger');
    const logOptions = defaults({}, options, {
      showSelections: false,
      showCache: false,
    } as LoggerOptions);
    const logger = createLogger(client.client, logOptions);
    const authLogger = createLogger(client.auth.client, logOptions);

    const unsubLogger = logger.start();
    const unsubAuthLogger = authLogger.start();

    return () => {
      unsubLogger();
      unsubAuthLogger();
    };
  } catch (e) {
    return () => {};
  }
}
