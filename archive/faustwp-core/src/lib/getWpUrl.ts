import trim from 'lodash/trim.js';
import { hooks } from '../wpHooks/index.js';

export function getWpUrl(path = ''): string {
	let wpUrl = trim(process.env.NEXT_PUBLIC_WORDPRESS_URL, '/');

	wpUrl = hooks.applyFilters('wpUrl', wpUrl, {}) as string;

	if (!path) {
		return wpUrl;
	}

	return `${wpUrl}/${path}`;
}
