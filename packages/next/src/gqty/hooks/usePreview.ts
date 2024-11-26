// eslint-disable-next-line import/extensions
import { PageIdType, PostIdType } from '@faustjs/core/client';
import type { RequiredSchema } from '@faustjs/react';
import isUndefined from 'lodash/isUndefined.js';
import { useRouter } from 'next/router.js';
import { hasPageId, hasPostId } from '../../utils/index.js';
import type { NextClientHooks, NextClientHooksWithAuth } from '.';

export type UsePreviewResponse<Schema extends RequiredSchema> =
  | {
      type: 'page';
      page: ReturnType<Schema['query']['page']> | undefined;
    }
  | {
      type: 'post';
      post: ReturnType<Schema['query']['post']> | undefined;
    }
  | undefined;

export function create<Schema extends RequiredSchema>(
  useAuth: NextClientHooksWithAuth<Schema>['useAuth'],
  useQuery: NextClientHooks<Schema>['useQuery'],
): NextClientHooksWithAuth<Schema>['usePreview'] {
  function usePreview(): UsePreviewResponse<Schema> {
    const {
      query: { p, page_id: pageId },
    } = useRouter();
    const { isAuthenticated } = useAuth();
    const { post: postQuery, page: pageQuery } = useQuery();
    const isPage = !!pageId;
    const args = {
      pageId: isPage ? (p as string) : undefined,
      postId: !isPage ? (p as string) : undefined,
    };

    if (isUndefined(isAuthenticated) || isAuthenticated !== true) {
      return;
    }

    if (hasPageId(args)) {
      const page = pageQuery({
        id: args?.pageId ?? '',
        idType: PageIdType.DATABASE_ID,
      }) as ReturnType<Schema['query']['page']>;

      const mostRecentPageRevision = page?.revisions({ first: 1 })?.edges?.[0]
        ?.node as ReturnType<Schema['query']['page']> | undefined;
      // eslint-disable-next-line consistent-return
      return {
        type: 'page',
        page: mostRecentPageRevision?.id ? mostRecentPageRevision : page,
      };
    }
    if (hasPostId(args)) {
      const post = postQuery({
        id: args?.postId ?? '',
        idType: PostIdType.DATABASE_ID,
      }) as ReturnType<Schema['query']['post']>;

      const mostRecentPostRevision = post?.revisions({ first: 1 })?.edges?.[0]
        ?.node as ReturnType<Schema['query']['post']> | undefined;
      // eslint-disable-next-line consistent-return
      return {
        type: 'post',
        post: mostRecentPostRevision?.id ? mostRecentPostRevision : post,
      };
    }
  }

  return usePreview;
}
