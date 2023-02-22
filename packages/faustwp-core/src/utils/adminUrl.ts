import trim from 'lodash/trim.js';

/**
 * Retrieves the URL to the admin area for the current site.
 *
 * @link https://developer.wordpress.org/reference/functions/admin_url/
 */
export function adminUrl(path = ''): string {
  const baseUrl: string = process.env.NEXT_PUBLIC_WORDPRESS_URL || '';
  const sanitizedBaseUrl = trim(baseUrl, '/');

  return `${sanitizedBaseUrl}/wp-admin/${path}`;
}
