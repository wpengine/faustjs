import { hooks } from '../hooks/index.js';

export function getWpUrl(): string {
  let wpUrl = process.env.NEXT_PUBLIC_WORDPRESS_URL;

  wpUrl = hooks.applyFilters('wpUrl', wpUrl, {}) as string;

  return wpUrl;
}
