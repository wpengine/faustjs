import { errorLog, noticeLog } from './log.js';

/**
 * Validates that the appropriate Faust related environment variables are set.
 */
export const validateFaustEnvVars = () => {
  if (!process.env.NEXT_PUBLIC_WORDPRESS_URL) {
    errorLog('Please provide a NEXT_PUBLIC_WORDPRESS_URL environment variable');

    process.exit(0);
  }

  if (!process.env.FAUSTWP_SECRET_KEY) {
    noticeLog(
      'You do not have a headless secret key specified. Some functionality may be limited.',
    );
  }
};
