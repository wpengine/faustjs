import { ContentNodeIdType } from '@faustjs/core/client';
import type { RequiredSchema, Node } from '@faustjs/react';
import isNil from 'lodash/isNil';
import isUndefined from 'lodash/isUndefined';
import { useRouter } from 'next/router';
import type { NextClientHooks, NextClientHooksWithAuth } from '.';

export type UsePreviewNodeResponse = {
  type: string | undefined;
  node: Node | undefined;
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

    if (!isReady) {
      return {
        type: undefined,
        node: undefined,
      };
    }

    if (isUndefined(isAuthenticated) || isAuthenticated !== true) {
      return {
        type: undefined,
        node: undefined,
      };
    }

    if (!postId) {
      throw new Error('usePreviewNode needs "p" query parameter');
    }

    if (isNil(preview) || preview !== 'true') {
      throw new Error(
        'usePreviewNode needs "preview" query parameter to be "true"',
      );
    }

    const node = contentNode({
      id: postId as string,
      idType: ContentNodeIdType.DATABASE_ID,
      asPreview: true,
    });

    // eslint-disable-next-line no-underscore-dangle
    const postType = node?.__typename;

    if (isNil(postType)) {
      return {
        type: undefined,
        node: undefined,
      };
    }

    const postTypeNode = node?.$on?.[postType];

    return {
      type: postType,
      node: postTypeNode,
    };
  }

  return usePreviewNode;
}
