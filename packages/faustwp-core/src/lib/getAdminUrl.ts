import { getWpUrl } from './getWpUrl.js';
import { hooks } from '../wpHooks/index.js';

/**
 * Retrieves the URL to the admin area for the current site.
 *
 * @link https://developer.wordpress.org/reference/functions/admin_url/
 *
 * @param {string} path Path relative to the admin URL.
 */
export function getAdminUrl(path = ''): string {
  let adminUrl = getWpUrl('wp-admin');

  adminUrl = hooks.applyFilters('wpAdminUrl', adminUrl, {}) as string;

  if (!path) {
    return adminUrl;
  }

  return `${adminUrl}/${path}`;
}
