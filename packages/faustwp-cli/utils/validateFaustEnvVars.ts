import { errorLog, warnLog } from './log.js';

/**
 * Validates that the appropriate Faust related environment variables are set.
 */
export const validateFaustEnvVars = () => {
  const secretKey =
    process.env.FAUST_SECRET_KEY || process.env.FAUSTWP_SECRET_KEY;

  if (!process.env.NEXT_PUBLIC_WORDPRESS_URL) {
    errorLog('Could not find NEXT_PUBLIC_WORDPRESS_URL environment variable.');

    process.exit(0);
  }

  if (!secretKey) {
    warnLog('Could not find FAUST_SECRET_KEY environment variable.');
    warnLog('Some functionality may be limited.');
  }
};
