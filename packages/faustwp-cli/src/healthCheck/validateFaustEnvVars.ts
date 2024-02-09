import { getWpSecret } from '../utils/index.js';
import { errorLog, infoLog, warnLog } from '../stdout/index.js';

/**
 * Validates that the appropriate Faust related environment variables are set.
 */
export const validateFaustEnvVars = () => {
  if (!process.env.NEXT_PUBLIC_WORDPRESS_URL) {
    errorLog('Could not find NEXT_PUBLIC_WORDPRESS_URL environment variable.');

    process.exit(1);
  }

  const regex = /\b\w+\.wpengine\.com\b/;
  if (regex.test(process.env.NEXT_PUBLIC_WORDPRESS_URL)) {
    infoLog(
      'We detected your NEXT_PUBLIC_WORDPRESS_URL is using wpengine.com. It is recommended to use the wpenginepowered.com TLD',
    );
  }

  if (!getWpSecret()) {
    warnLog('Could not find FAUST_SECRET_KEY environment variable.');
    warnLog('Some functionality may be limited.');
  }

  if (
    process.env.NEXT_PUBLIC_WORDPRESS_URL.startsWith('http://') &&
    getWpSecret()
  ) {
    warnLog('Your WordPress site is not running on https!');
    warnLog(
      'This is a security concern as all traffic with your secret key is in plain text.',
    );
    warnLog(
      'Please make sure your production Faust app runs with a WordPress instance on https!',
    );
  }
};
