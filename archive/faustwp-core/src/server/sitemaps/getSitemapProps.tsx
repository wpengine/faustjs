import { GetServerSidePropsContext } from 'next';
import isUndefined from 'lodash/isUndefined.js';
import isString from 'lodash/isString.js';
import isArray from 'lodash/isArray.js';
import isObject from 'lodash/isObject.js';
import { getQueryParam } from '../../utils/convert.js';
import {
	createPagesSitemap,
	createRootSitemapIndex,
	handleSitemapPath,
} from './createSitemaps.js';
import { SitemapSchemaUrlElement } from './sitemapUtils.js';

/**
 * The pathname to the root sitemap index.
 */
export const SITEMAP_INDEX_PATH = '/sitemap.xml';

/**
 * The pathname to the Next.js pages sitemap file. We may want to make this
 * configurable in the future.
 */
export const FAUST_PAGES_PATHNAME = '/sitemap-faust-pages.xml';

/**
 * the "pages" config type
 */
export interface NextJSPage extends Omit<SitemapSchemaUrlElement, 'loc'> {
	/**
	 * The relative URL of the Next.js page.
	 *
	 * @example /about
	 */
	path: string;
}

export type GetSitemapPropsConfig = {
	/**
	 * The URL to your Faust site
	 */
	frontendUrl: string;
	/**
	 * A list of pathnames to ignore when proxying sitemaps.
	 */
	sitemapPathsToIgnore?: string[];
	/**
	 * The path to the sitemap index file in WordPress.
	 */
	sitemapIndexPath?: string;
	/**
	 * Next.js pages you want included in you sitemap. When provided, an index
	 * will be created specifically for these pages.
	 */
	pages?: NextJSPage[];
};

/**
 * Validates the structure of the user defined config.
 *
 * @param {Partial<HandleSitemapRequestsConfig>} config The user provided config
 */
export function validateConfig(config: Partial<GetSitemapPropsConfig>): void {
	if (!isString(config?.frontendUrl)) {
		throw new Error('frontendUrl must be a string');
	}

	try {
		// eslint-disable-next-line no-new
		const url = new URL(config.frontendUrl);

		if (url.protocol !== 'http:' && url.protocol !== 'https:') {
			throw new Error('URL must have protocol');
		}
	} catch (e) {
		throw new Error('frontendUrl must be a valid URL.');
	}

	if (!isUndefined(config?.sitemapPathsToIgnore)) {
		if (!isArray(config.sitemapPathsToIgnore)) {
			throw new Error('sitemapPathsToIgnore must be an array');
		}

		config?.sitemapPathsToIgnore?.forEach((path) => {
			if (!isString(path)) {
				throw new Error('sitemapPathsToIgnore must be an array of strings');
			}

			if (!path.startsWith('/')) {
				throw new Error(
					'Each sitemapPathsToIgnore must start with a forward slash',
				);
			}

			if (path.includes('*') && !path.endsWith('*')) {
				throw new Error(
					'sitemapPathsToIgnore with a wildcard must end with a wildcard',
				);
			}
		});
	}

	// Validate pages structure and required values
	if (!isUndefined(config?.pages)) {
		if (!isArray(config.pages)) {
			throw new Error('pages must be an array');
		}

		config?.pages?.forEach((page) => {
			if (!isObject(page)) {
				throw new Error('pages must be an array of objects');
			}

			if (isUndefined(page.path)) {
				throw new Error('pages must have a path property');
			}

			if (!isString(page.path)) {
				throw new Error('The pages path property must be a string');
			}
		});
	}
}

export async function getSitemapProps(
	ctx: GetServerSidePropsContext,
	config: GetSitemapPropsConfig,
) {
	// config validation with middleware flag
	validateConfig(config);

	if (!ctx.req.url) {
		throw new Error('A context url is required.');
	}

	const queryParam = getQueryParam(ctx.req.url, 'sitemap');

	if (queryParam === '') {
		// eslint-disable-next-line @typescript-eslint/no-unsafe-argument
		const response = await createRootSitemapIndex(ctx.req, config);
		if (!response || response?.status === 404) {
			return {
				notFound: true,
			};
		}
		ctx.res.setHeader('Content-Type', 'application/xml');

		ctx.res.write(await response?.text());

		ctx.res.end();
	}

	if (queryParam !== '' && queryParam !== 'sitemap-faust-pages.xml') {
		const response = await handleSitemapPath(ctx.req, config);

		if (!response || response?.status === 404) {
			return {
				notFound: true,
			};
		}
		ctx.res.setHeader('Content-Type', 'application/xml');

		ctx.res.write(await response?.text());
		ctx.res.end();
	}

	if (queryParam !== '' && queryParam === 'sitemap-faust-pages.xml') {
		// eslint-disable-next-line @typescript-eslint/no-unsafe-argument
		const response = createPagesSitemap(ctx.req, config);

		ctx.res.setHeader('Content-Type', 'application/xml');

		ctx.res.write(await response?.text());

		ctx.res.end();
	}

	return {
		props: {},
	};
}
