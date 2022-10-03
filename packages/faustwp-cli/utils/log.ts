import chalk from 'chalk';

export const log = (
  logLevel: 'notice' | 'error',
  message: string,
  ...args: any
) => {
  let logLevelMessage = chalk.whiteBright('faust: ');

  switch (logLevel) {
    case 'notice': {
      logLevelMessage += chalk.yellow('notice');
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

export const noticeLog = (message: string, ...args: any) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  log('notice', message, ...args);
};

export const errorLog = (message: string, ...args: any) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  log('error', message, ...args);
};
