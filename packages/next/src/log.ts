import { LoggerOptions } from '@gqless/logger';
import defaults from 'lodash/defaults';
import { client } from './client';

export async function logQueries(options?: LoggerOptions): Promise<() => void> {
  try {
    const { createLogger } = await import('@gqless/logger');
    const logger = createLogger(
      client().client,
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
