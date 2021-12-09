// eslint-disable-next-line import/extensions
import { ContentNodeIdTypeEnum } from '@faustjs/core/client';
import type { RequiredSchema, Node } from '@faustjs/react';
import isNil from 'lodash/isNil.js';
import isUndefined from 'lodash/isUndefined.js';
import { useRouter } from 'next/router.js';
import type { NextClientHooks, NextClientHooksWithAuth } from '.';

export type UsePreviewNodeResponse = {
  postType: string | null | undefined;
  node: Node | null | undefined;
};

export function create<Schema extends RequiredSchema>(
  useAuth: NextClientHooksWithAuth<Schema>['useAuth'],
  useQuery: NextClientHooks<Schema>['useQuery'],
): NextClientHooksWithAuth<Schema>['usePreviewNode'] {
  function usePreviewNode(): UsePreviewNodeResponse {
    const {
      isReady,
      query: { p: postId, preview },
    } = useRouter();
    const { isAuthenticated } = useAuth();
    const { contentNode } = useQuery();

    const unreadyResponse: UsePreviewNodeResponse = {
      postType: undefined,
      node: undefined,
    };

    const notFoundResponse: UsePreviewNodeResponse = {
      postType: null,
      node: null,
    };

    if (!isReady) {
      return unreadyResponse;
    }

    if (isUndefined(isAuthenticated) || isAuthenticated !== true) {
      return unreadyResponse;
    }

    if (isNil(postId) || isNil(preview) || preview !== 'true') {
      throw new Error(
        `usePreviewNode() requires the "p" and "preview" ` +
          `URL query parameters i.e. ?p=123&preview=true`,
      );
    }

    if (Array.isArray(postId)) {
      throw new Error(
        'usePreviewNode() requires the "p" URL query parameter to be a string',
      );
    }

    const node = contentNode({
      id: postId,
      idType: ContentNodeIdTypeEnum.DATABASE_ID,
      asPreview: true,
    });

    /**
     * `contentNode` returns null if the post does not exist
     * or if the preview has not been generated yet
     *
     * @link https://github.com/wp-graphql/wp-graphql/issues/2166
     */
    if (node === null) {
      return notFoundResponse;
    }

    // eslint-disable-next-line no-underscore-dangle
    const postType = node?.__typename;

    if (isNil(postType)) {
      return notFoundResponse;
    }

    const postTypeNode = node?.$on?.[postType];

    return {
      postType,
      node: postTypeNode,
    };
  }

  return usePreviewNode;
}
