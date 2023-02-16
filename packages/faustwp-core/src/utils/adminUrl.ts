import { untrailingslashit } from './untrailingslashit.js';

/**
 * Retrieves the URL to the admin area for the current site.
 *
 * @link https://developer.wordpress.org/reference/functions/admin_url/
 */
export function adminUrl(path = ''): string {
  const baseUrl: string = process.env.NEXT_PUBLIC_WORDPRESS_URL || '';
  const sanitizedBaseUrl = untrailingslashit(baseUrl);

  return `${sanitizedBaseUrl}/wp-admin/${path}`;
}