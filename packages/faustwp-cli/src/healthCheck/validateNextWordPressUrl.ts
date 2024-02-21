import { getWpSecret, getWpUrl } from '../utils/index.js';
import { errorLog } from '../stdout/index.js';

/**
 * Validates the NEXT_PUBLIC_WORDPRESS_URL environment variable by sending a POST request to the Faust Plugin API.
 * If the URL matches the Faust Plugin Headless URL, the validation fails, and an error is logged.
 */
export async function validateNextWordPressUrl(): Promise<void> {
  const apiUrl = `${getWpUrl()}/wp-json/faustwp/v1/validate_public_wordpress_url`;
  const headers = {
    'Content-Type': 'application/json',
    'x-faustwp-secret': getWpSecret() || '',
  };

  const postData = {
    public_wordpress_url: getWpUrl(),
  };
  try {
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers,
      body: JSON.stringify(postData),
    });

    if (!response.ok) {
      errorLog(
        'Validation Failed: Ensure your NEXT_PUBLIC_WORDPRESS_URL does not match with Headless URL in the Faust WordPress plugin settings',
      );
      process.exit(1);
    }
  } catch (error) {
    console.log('error', error);
  }
}
