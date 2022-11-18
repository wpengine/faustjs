import { errorLog, warnLog, infoLog } from './log.js';
import { disableCliInteraction } from './disableCliInteraction.js';

/**
 * Validates that the appropriate Faust related environment variables are set.
 */
export const validateFaustEnvVars = () => {
  if (!process.env.NEXT_PUBLIC_WORDPRESS_URL) {
    errorLog('Could not find NEXT_PUBLIC_WORDPRESS_URL environment variable.');

    process.exit(0);
  }

  if (!process.env.FAUSTWP_SECRET_KEY) {
    warnLog('Could not find FAUSTWP_SECRET_KEY environment variable.');
    warnLog('Some functionality may be limited.');
  }

  if (disableCliInteraction()) {
    infoLog('FAUST_NO_INTERACTION is set. Specify `false`, `0`, or remove to disable.');
  }
};
