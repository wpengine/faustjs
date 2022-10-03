import { hooks } from '../hooks/index.js';
import { getWpUrl } from './getWpUrl.js';

export function getWpHostname(): string {
  const wpUrl = getWpUrl();
  let wpHostname = new URL(wpUrl).hostname;

  wpHostname = hooks.applyFilters('wpHostname', wpHostname, {
    wpUrl,
  }) as string;

  return wpHostname;
}
