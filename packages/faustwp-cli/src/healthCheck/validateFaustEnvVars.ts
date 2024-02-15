import { getWpSecret, getWpUrl } from '../utils/index.js';
import { errorLog, infoLog, warnLog } from '../stdout/index.js';

export function isWPEngineComSubdomain(url: string) {
  const regex = /\b\w+\.wpengine\.com\b/;

  return regex.test(url);
}

/**
 * Validates that the appropriate Faust related environment variables are set.
 */
export const validateFaustEnvVars = async () => {
  const secretWp = getWpSecret();

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

  if (!secretWp) {
    warnLog('Could not find FAUST_SECRET_KEY environment variable.');
    warnLog('Some functionality may be limited.');
  }

  if (process.env.NEXT_PUBLIC_WORDPRESS_URL.startsWith('http://') && secretWp) {
    warnLog('Your WordPress site is not running on https!');
    warnLog(
      'This is a security concern as all traffic with your secret key is in plain text.',
    );
    warnLog(
      'Please make sure your production Faust app runs with a WordPress instance on https!',
    );
  }

  if (secretWp) {
    // send secret key
    const apiUrl = `${getWpUrl()}/?rest_route=/faustwp/v1/validate_secret_key`;
    const headers = {
      'x-faustwp-secret': secretWp,
    };
    try {
      const response = await fetch(apiUrl, {
        headers,
        method: 'POST',
      });
      if (response.status === 401) {
        // Unauthorized: User receives a 401 status code AND the message below
        errorLog(
          'Ensure your FAUST_SECRET_KEY environment variable matches your Secret Key in the Faust WordPress plugin settings',
        );
        process.exit(1);
      }
    } catch (error) {
      console.log('error', error);
    }
  }
};
