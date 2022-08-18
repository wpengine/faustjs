import { isString, isUndefined } from '../middleware/sitemaps/sitemapUtils.js';
import { GetServerSidePropsContext } from 'next';
import { createPagesSitemap, createRootSitemapIndex, handleSitemapPath } from '../middleware/sitemaps/createSitemaps.js';
import { HandleSitemapRequestsConfig, validateConfig } from '../middleware/sitemaps/handleSitemapRequests.js';

export async function getSitemapProps(
  ctx: GetServerSidePropsContext,
  config: Partial<HandleSitemapRequestsConfig>,
) {
  // config validation with middleware flag
  validateConfig(config, false);

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const paramsIndex = ctx.req.url.indexOf('?');
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const searchParamString = ctx.req.url.substr(paramsIndex);
  const urlParams = new URLSearchParams(searchParamString);

  if (!urlParams.get('sitemap')) {
    // handle Root sitemap
    // eslint-disable-next-line no-console
    console.log('sitemap index');
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    const response = await createRootSitemapIndex(ctx.req, config, false);

    ctx.res.setHeader('Content-Type', 'application/xml');

    ctx.res.write(await response?.text());

    ctx.res.end();
  }

  if (
    urlParams.get('sitemap') &&
    urlParams.get('sitemap') !== 'sitemap-faust-pages.xml'
  ) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    const response = await handleSitemapPath(ctx.req, config, false);

    ctx.res.setHeader('Content-Type', 'application/xml');

    ctx.res.write(await response?.text());

    ctx.res.end();
  }

  if (
    urlParams.get('sitemap') &&
    urlParams.get('sitemap') === 'sitemap-faust-pages.xml'
  ) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    const response = createPagesSitemap(ctx.req, config, false);

    ctx.res.setHeader('Content-Type', 'application/xml');

    ctx.res.write(await response?.text());

    ctx.res.end();
  }

  return {
    props: {},
  };
}
