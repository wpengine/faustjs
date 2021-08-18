import type { GQtyClient } from 'gqty';
import { LoggerOptions } from '@gqty/logger';
import defaults from 'lodash/defaults';

export async function logQueries(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  client: GQtyClient<any>,
  options?: LoggerOptions,
): Promise<() => void> {
  try {
    const { createLogger } = await import('@gqty/logger');
    const logger = createLogger(
      client,
      defaults({}, options, {
        showSelections: false,
        showCache: false,
      } as LoggerOptions),
    );
    return logger.start();
  } catch (e) {
    return () => {};
  }
}
