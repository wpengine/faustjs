import { headlessConfig } from '../config';

export const log: typeof console.log = (...args) => {
  if (headlessConfig().disableLogging) {
    return;
  }

  // eslint-disable-next-line no-console
  console.log(...args);
};
