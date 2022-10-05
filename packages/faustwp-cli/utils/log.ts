import chalk from 'chalk';

export const log = (
  logLevel: 'info' | 'warn' | 'error',
  message: string,
  ...args: any
) => {
  let logLevelMessage = chalk.whiteBright('faustwp: ');

  switch (logLevel) {
    case 'info': {
      logLevelMessage += chalk.blue('info');
      break;
    }
    case 'warn': {
      logLevelMessage += chalk.yellow('warn');
      break;
    }
    case 'error': {
      logLevelMessage += chalk.red('error');
      break;
    }
    default: {
      break;
    }
  }
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, no-console
  console.log(`${logLevelMessage} - ${message}`, ...args);
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
