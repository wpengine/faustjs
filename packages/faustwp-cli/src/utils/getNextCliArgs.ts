import { getCliArgs } from './getCliArgs.js';

export const FAUST_CLI_FLAGS = ['--skip-health-checks'];

/**
 * Gets the CLI Args and filters out any Faust specific args so the Next
 * CLI does not complain about unrecognized flags.
 *
 * @returns array
 */
export const getNextCliArgs = () => {
  const cliArgs = getCliArgs();
  const filteredArgs = cliArgs.filter((arg) => !FAUST_CLI_FLAGS.includes(arg));

  return filteredArgs;
};
