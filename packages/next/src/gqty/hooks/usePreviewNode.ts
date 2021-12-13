// eslint-disable-next-line import/extensions
import { ContentNodeIdTypeEnum } from '@faustjs/core/client';
import type { RequiredSchema, Node } from '@faustjs/react';
import isNil from 'lodash/isNil.js';
import isUndefined from 'lodash/isUndefined.js';
import { useRouter } from 'next/router.js';
import type { NextClientHooks, NextClientHooksWithAuth } from '.';

export type UsePreviewNodeResponse = {
  typeName: string | null | undefined;
  node: Node | null | undefined;
};

export function create<Schema extends RequiredSchema>(
  useAuth: NextClientHooksWithAuth<Schema>['useAuth'],
  useQuery: NextClientHooks<Schema>['useQuery'],
): NextClientHooksWithAuth<Schema>['usePreviewNode'] {
  function usePreviewNode(): UsePreviewNodeResponse {
    const {
      isReady,
      query: { p: postIdQuery, preview: previewQuery, typeName: typeNameQuery },
    } = useRouter();
    const { isAuthenticated } = useAuth();
    const { contentNode } = useQuery();

    const unreadyResponse: UsePreviewNodeResponse = {
      typeName: undefined,
      node: undefined,
    };

    const notFoundResponse: UsePreviewNodeResponse = {
      typeName: null,
      node: null,
    };

    if (!isReady) {
      return unreadyResponse;
    }

    if (isUndefined(isAuthenticated) || isAuthenticated !== true) {
      return unreadyResponse;
    }

    if (isNil(postIdQuery) || isNil(previewQuery) || previewQuery !== 'true') {
      throw new Error(
        `usePreviewNode() requires the "p" and "preview" ` +
          `URL query parameters i.e. ?p=123&preview=true`,
      );
    }

    if (Array.isArray(postIdQuery)) {
      throw new Error(
        'usePreviewNode() requires the "p" URL query parameter to be a string',
      );
    }

    const node = contentNode({
      id: postIdQuery,
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

    if (!isNil(typeNameQuery) && Array.isArray(typeNameQuery)) {
      throw new Error(
        'usePreviewNode() requires the "postType" URL' +
          'query parameter to be a string',
      );
    }

    // eslint-disable-next-line no-underscore-dangle
    const previewNodeTypeName = typeNameQuery ?? node?.__typename;

    if (isNil(previewNodeTypeName)) {
      return notFoundResponse;
    }

    const previewNode: Node = node?.$on?.[previewNodeTypeName];

    /**
     * `previewNodeTypeName` could be `undefined` here if the postType
     * URL query param is manually specified and it is not valid.
     */
    if (isUndefined(previewNode)) {
      return notFoundResponse;
    }

    return {
      typeName: previewNodeTypeName,
      node: previewNode,
    };
  }

  return usePreviewNode;
}
