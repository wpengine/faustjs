import { GetServerSidePropsContext, GetStaticPropsContext } from 'next';

export function isPreviewPath(
  contextOrUrl: GetServerSidePropsContext | GetStaticPropsContext | string,
): boolean {
  if (typeof contextOrUrl === 'string') {
    const urlSplit = contextOrUrl.split('/');

    return urlSplit?.[urlSplit.length - 2] === 'preview';
  }

  if (contextOrUrl.params?.page && Array.isArray(contextOrUrl.params?.page)) {
    const { page } = contextOrUrl.params;

    /**
     * Remove preview and preview ID if provided as WP GraphQL will not be able to resolve queries such as nodeByUri
     * properly.
     */
    if (page?.[page.length - 2] === 'preview') {
      return true;
    }
  }

  return false;
}

export function isPreview(
  context: GetServerSidePropsContext | GetStaticPropsContext,
): boolean {
  if (!context.preview) {
    return false;
  }

  return isPreviewPath(context);
}
