import { getWpSecret, getWpUrl } from '../utils/index.js';
import { errorLog, warnLog } from '../stdout/index.js';

/**
 * Validates that the appropriate Faust related environment variables are set.
 */
export const validateFaustEnvVars = async () => {
  if (!process.env.NEXT_PUBLIC_WORDPRESS_URL) {
    errorLog('Could not find NEXT_PUBLIC_WORDPRESS_URL environment variable.');

    process.exit(1);
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
  if (getWpSecret()) {
    // send secret key
    console.log('NEW TESTING FOR SECRET KEY');
    const apiUrl = `${getWpUrl()}/wp-json/faustwp/v1/authorize`;
    console.log('apiUrl', apiUrl);
    const headers = {
      'x-faustwp-secret': getWpSecret() || '',
    };
    console.log('headers', headers);
    try {
      const response = await fetch(apiUrl, {
        headers,
        method: 'POST',
        timeout: 30000, // 30 seconds timeout
      } as unknown as RequestInit);
      if (response.status === 204) {
        // Success: User receives a 204 status code
      } else if (response.status === 401) {
        // Unauthorized: User receives a 401 status code AND the message below
        warnLog(
          'Check to ensure your FAUST_SECRET_KEY matches your Faust Secret Key under wp-admin settings',
        );
      }
    } catch (error) {
      console.log('error', error);
    }
  }
};
