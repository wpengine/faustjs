import { GetServerSidePropsContext } from 'next';
import { createRootSitemapIndex } from '../middleware/sitemaps/createSitemaps.js';
import { HandleSitemapRequestsConfig } from '../middleware/sitemaps/handleSitemapRequests.js';

export async function getSitemapProps(
  ctx: GetServerSidePropsContext,
  config: any,
) {
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

    // ctx.res.setHeader('Content-Type', 'application/xml');

    ctx.res.write(await response?.text());

    ctx.res.end();
  }

  if (urlParams.get('sitemap')) {
    // handle sitemap path if query string
    // eslint-disable-next-line no-console
    console.log('sitemap path', urlParams.get('sitemap'));
  }

  if (
    urlParams.get('sitemap') &&
    urlParams.get('sitemap') === 'sitemap-faust-pages.xml'
  ) {
    // handle next.js pages
    // eslint-disable-next-line no-console
    console.log('next pages sitemap');
  }

  return {
    props: {},
  };
}
