import { GetServerSidePropsContext, GetStaticPropsContext } from 'next';
import isNumber from 'is-number';

export function isPreviewPath(
  contextOrUrl: GetServerSidePropsContext | GetStaticPropsContext | string,
  isDraftPreviewPath = false,
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
      if (isDraftPreviewPath) {
        return page?.[page.length - 3] === 'draft';
      }

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

/**
 * Unpublished/draft posts/pages are handled differently than previews of published content.
 *
 * Namely, when viewing an unpublished page, the ID after /preview is the actual revision ID. When previewing published
 * data, the ID after /preview is the published ID.
 *
 * @param context
 */
export function isDraftPreview(
  context: GetServerSidePropsContext | GetStaticPropsContext,
): boolean {
  if (!context.preview) {
    return false;
  }

  return isPreviewPath(context, true);
}

export function getPreviewID(
  contextOrUrl: GetServerSidePropsContext | GetStaticPropsContext | string,
): string | null {
  if (typeof contextOrUrl === 'string') {
    if (!isPreviewPath(contextOrUrl)) {
      return null;
    }

    const urlSplit = contextOrUrl.split('/');
    const id = urlSplit?.[urlSplit.length - 1];

    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    if (isNumber(id)) {
      return id;
    }

    return null;
  }

  if (!isPreview(contextOrUrl)) {
    return null;
  }

  if (contextOrUrl.params?.page && Array.isArray(contextOrUrl.params?.page)) {
    const { page } = contextOrUrl.params;

    const id = page?.[page.length - 1];

    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    if (isNumber(id)) {
      return id;
    }
  }

  return null;
}
