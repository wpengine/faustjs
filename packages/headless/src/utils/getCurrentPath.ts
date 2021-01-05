import { GetServerSidePropsContext, GetStaticPropsContext } from 'next';
import { isPreviewPath } from './preview';

export default function getCurrentPath(
  context: GetServerSidePropsContext | GetStaticPropsContext,
): string {
  let url: string;

  if (context.params?.page && Array.isArray(context.params?.page)) {
    let pagePath: string[] = context.params?.page;

    /**
     * Remove preview and preview ID if provided as WP GraphQL will not be able to resolve queries such as nodeByUri
     * properly.
     */
    if (isPreviewPath(context)) {
      pagePath = pagePath.slice(0, pagePath.length - 2);
    }

    url = `/${pagePath.join('/')}`;
  } else {
    url = `/${(context.params?.page as string) ?? ''}`;
  }

  return url;
}
