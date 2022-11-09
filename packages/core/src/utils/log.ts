import { config } from '../config/index.js';

export const log: typeof console.log = (...args) => {
  if (config().disableLogging) {
    return;
  }

  // eslint-disable-next-line no-console
  console.log(...args);
};
