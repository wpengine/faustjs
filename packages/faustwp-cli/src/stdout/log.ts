import { isDebug } from '../utils/index.js';
import { styles } from './styles.js';

export const log = (
  logLevel: 'info' | 'warn' | 'error' | 'debug',
  message: string,
  ...args: any
) => {
  let styledLogLevel = '';

  switch (logLevel) {
    case 'info': {
      styledLogLevel = styles.info('info');
      break;
    }
    case 'warn': {
      styledLogLevel = styles.warn('warn');
      break;
    }
    case 'error': {
      styledLogLevel = styles.error('error');
      break;
    }
    case 'debug': {
      styledLogLevel = styles.debug('debug');
      break;
    }
    default: {
      break;
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  console.log(`${styledLogLevel} - ${message}`, ...args);
};

export const infoLog = (message: string, ...args: any) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  log('info', message, ...args);
};

export const warnLog = (message: string, ...args: any) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  log('warn', message, ...args);
};

export const errorLog = (message: string, ...args: any) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  log('error', message, ...args);
};

export const debugLog = (message: string, ...args: any) => {
  if (!isDebug()) {
    return;
  }

  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  log('debug', message, ...args);
};
