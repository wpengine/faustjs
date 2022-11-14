/* eslint-disable import/extensions */
import { getQueryParam } from '@faustjs/core/utils';
import { GetServerSidePropsContext } from 'next';
import {
  createPagesSitemap,
  createRootSitemapIndex,
  handleSitemapPath,
} from '../middleware/sitemaps/createSitemaps.js';
import {
  GetSitemapPropsConfig,
  NormalizedServerConfig,
  validateConfig,
} from '../middleware/sitemaps/handleSitemapRequests.js';

export async function getSitemapProps(
  ctx: GetServerSidePropsContext,
  config: GetSitemapPropsConfig,
) {
  // config validation with middleware flag
  validateConfig(config, false);

  // Normalize config if some optional values are missing
  const normalizedConfig: NormalizedServerConfig = {
    ...config,
    replaceUrls: true,
  };

  if (!ctx.req.url) {
    throw new Error('A context url is required.');
  }

  const queryParam = getQueryParam(ctx.req.url, 'sitemap');

  if (queryParam === '') {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    const response = await createRootSitemapIndex(
      ctx.req,
      normalizedConfig,
      false,
    );
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
    const response = await handleSitemapPath(ctx.req, normalizedConfig, false);

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
    const response = createPagesSitemap(ctx.req, normalizedConfig, false);

    ctx.res.setHeader('Content-Type', 'application/xml');

    ctx.res.write(await response?.text());

    ctx.res.end();
  }

  return {
    props: {},
  };
}
