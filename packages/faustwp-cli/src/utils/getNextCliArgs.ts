import { getCliArgs } from './getCliArgs.js';

export const FAUST_CLI_FLAGS = ['--skip-health-checks'];

/**
 * Gets the CLI Args and filters out any Faust specific args so the Next
 * CLI does not complain about unrecognized flags.
 *
 * @returns array
 */
export const getNextCliArgs = () => {
  return getCliArgs().filter((arg) => !FAUST_CLI_FLAGS.includes(arg));
};
