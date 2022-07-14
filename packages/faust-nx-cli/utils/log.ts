import chalk from 'chalk';

export const noticeLog = (message: string, ...args: any) => {
  log('notice', message, ...args);
};

export const errorLog = (message: string, ...args: any) => {
  log('error', message, ...args);
};

export const log = (
  logLevel: 'notice' | 'error',
  message: string,
  ...args: any
) => {
  let logLevelMessage = chalk.whiteBright('faustnx: ');

  switch (logLevel) {
    case 'notice': {
      logLevelMessage += chalk.yellow('notice');
      break;
    }
    case 'error': {
      logLevelMessage += chalk.red('error');
    }
  }

  console.log(`${logLevelMessage} - ${message}`, ...args);
};
