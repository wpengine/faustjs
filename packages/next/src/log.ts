import type { GQlessClient } from 'gqless';
import { LoggerOptions } from '@gqless/logger';
import defaults from 'lodash/defaults';

export async function logQueries(client: GQlessClient<any>, options?: LoggerOptions): Promise<() => void> {
  try {
    const { createLogger } = await import('@gqless/logger');
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
