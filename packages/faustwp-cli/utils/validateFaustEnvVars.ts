import { errorLog } from './log.js';

/**
 * Validates that the appropriate Faust related environment variables are set.
 */
export const validateFaustEnvVars = () => {
  if (!process.env.NEXT_PUBLIC_WORDPRESS_URL) {
    errorLog('Could not find NEXT_PUBLIC_WORDPRESS_URL environment variable.');

    process.exit(0);
  }

  if (!process.env.FAUSTWP_SECRET_KEY) {
    errorLog('Could not find FAUSTWP_SECRET_KEY environment variable.');

    process.exit(0);
  }
};
