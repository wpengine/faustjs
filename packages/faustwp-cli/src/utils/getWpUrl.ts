import trim from 'lodash/trim.js';

/**
 * Returns the WordPress URL from the project's env.
 */
export function getWpUrl(path = ''): string {
  const wpUrl = trim(process.env.NEXT_PUBLIC_WORDPRESS_URL, '/');

  if (!path) {
    return wpUrl;
  }

  return `${wpUrl}/${trim(path, '/')}`;
}
