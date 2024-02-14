import { getWpSecret } from '../utils/index.js';
import { errorLog, infoLog, warnLog } from '../stdout/index.js';

export function isWPEngineComSubdomain(url: string) {
  const regex = /\b\w+\.wpengine\.com\b/;

  return regex.test(url);
}

/**
 * Validates that the appropriate Faust related environment variables are set.
 */
export const validateFaustEnvVars = () => {
  if (!process.env.NEXT_PUBLIC_WORDPRESS_URL) {
    errorLog('Could not find NEXT_PUBLIC_WORDPRESS_URL environment variable.');

    process.exit(1);
  }

  if (isWPEngineComSubdomain(process.env.NEXT_PUBLIC_WORDPRESS_URL)) {
    infoLog(`Found NEXT_PUBLIC_WORDPRESS_URL using wpengine.com TLD.`);
    infoLog(`It is recommended to use the wpenginepowered.com TLD instead.`);
    infoLog(
      `Ex: https://example.wpengine.com -> https://example.wpenginepowered.com`,
    );
    infoLog(
      `This will leverage WP Engine's Advanced Network CDN. See: https://wpengine.com/support/network/`,
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
