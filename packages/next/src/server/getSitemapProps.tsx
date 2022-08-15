import { GetServerSidePropsContext } from 'next';

export function getSitemapProps(ctx: GetServerSidePropsContext) {
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
