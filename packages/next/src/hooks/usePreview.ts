import { PageIdType, PostIdType } from '@faustjs/core';
import type { RequiredSchema } from '@faustjs/react';
import isUndefined from 'lodash/isUndefined';
import { HasObject, hasPageId, hasPostId } from '../utils';
import type { NextClientHooks } from '.';

export function create<Schema extends RequiredSchema>(
  useAuth: NextClientHooks<Schema>['useAuth'],
  useQuery: NextClientHooks<Schema>['useQuery'],
): NextClientHooks<Schema>['usePreview'] {
  function usePreview(
    args: Record<'pageId', string>,
  ): ReturnType<Schema['query']['page']>;
  function usePreview(
    args: Record<'postId', string>,
  ): ReturnType<Schema['query']['post']>;
  function usePreview(
    args: HasObject,
  ): ReturnType<Schema['query']['page'] | Schema['query']['post']> | undefined {
    const { isAuthenticated } = useAuth();
    const { post: postQuery, page: pageQuery } = useQuery();

    if (isUndefined(isAuthenticated) || isAuthenticated !== true) {
      return;
    }

    const page = pageQuery({
      id: (args?.pageId as string) ?? '',
      idType: PageIdType.DATABASE_ID,
    }) as ReturnType<Schema['query']['page']>;

    const mostRecentPageRevision = page?.revisions({ first: 1 })?.edges?.[0]
      ?.node as ReturnType<Schema['query']['page']> | undefined;

    const post = postQuery({
      id: (args?.postId as string) ?? '',
      idType: PostIdType.DATABASE_ID,
    }) as ReturnType<Schema['query']['post']>;

    const mostRecentPostRevision = post?.revisions({ first: 1 })?.edges?.[0]
      ?.node as ReturnType<Schema['query']['post']> | undefined;

    if (hasPageId(args)) {
      // eslint-disable-next-line consistent-return
      return mostRecentPageRevision ?? page;
    }
    if (hasPostId(args)) {
      // eslint-disable-next-line consistent-return
      return mostRecentPostRevision ?? post;
    }
  }

  return usePreview;
}
