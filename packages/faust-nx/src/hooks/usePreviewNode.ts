// eslint-disable-next-line import/extensions
import type { Node } from '@faustjs/react';
import type { DocumentNode } from 'graphql';
import isNil from 'lodash/isNil.js';
import isUndefined from 'lodash/isUndefined.js';
import { useRouter } from 'next/router.js';
import { useQuery } from '@apollo/client';
import { WordPressTemplate } from '../getWordPressProps';
import { SeedNode } from '../queries/seedQuery';
import { useAuth } from './useAuth';

export type UsePreviewNodeResponse = {
  node: Node | null | undefined;
};

export function usePreviewNode(
  seedNode: SeedNode,
  template: WordPressTemplate | null
) {
  const {
    isReady,
    query: { p: postIdQuery, preview: previewQuery, typeName: typeNameQuery },
  } = useRouter();

  const { isAuthenticated } = useAuth();

  const unreadyResponse: UsePreviewNodeResponse = {
    node: undefined,
  };

  const notFoundResponse: UsePreviewNodeResponse = {
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

  const response = useQuery(template?.query as DocumentNode, {
    variables: template?.variables ? template?.variables(seedNode, true) : undefined,
    ssr: false,
    skip: !template?.query,
  });

  const { data, error, loading } = response ?? {};

  console.log({ response });

  return notFoundResponse;
}
