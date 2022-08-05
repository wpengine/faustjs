// eslint-disable-next-line import/extensions
import { ContentNodeIdTypeEnum } from '@faustjs/core/client';
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
  typeName: string | null | undefined;
  node: Node | null | undefined;
};

export function usePreviewNode(
  template: WordPressTemplate,
  seedNode: SeedNode
) {
  const {
    isReady,
    query: { p: postIdQuery, preview: previewQuery, typeName: typeNameQuery },
  } = useRouter();
  const { isAuthenticated } = useAuth();

  console.log({isAuthenticated});

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

  console.log(
    'template query'
  );
  console.log(template?.query);

  const node = useQuery(template?.query as DocumentNode, {
    variables: template?.variables ? template?.variables(seedNode, true) : undefined,
    ssr: false,
    skip: !template?.query,
  });

  console.log({node});
  return notFoundResponse;

  // /**
  //  * `contentNode` returns null if the post does not exist
  //  * or if the preview has not been generated yet
  //  *
  //  * @link https://github.com/wp-graphql/wp-graphql/issues/2166
  //  */
  // if (node === null) {
  //   return notFoundResponse;
  // }

  // if (!isNil(typeNameQuery) && Array.isArray(typeNameQuery)) {
  //   throw new Error(
  //     'usePreviewNode() requires the "postType" URL' +
  //       'query parameter to be a string',
  //   );
  // }

  // // eslint-disable-next-line no-underscore-dangle
  // const previewNodeTypeName = typeNameQuery ?? node?.__typename;

  // if (isNil(previewNodeTypeName)) {
  //   return notFoundResponse;
  // }

  // const previewNode: Node = node?.$on?.[previewNodeTypeName];

  // /**
  //  * `previewNodeTypeName` could be `undefined` here if the postType
  //  * URL query param is manually specified and it is not valid.
  //  */
  // if (isUndefined(previewNode)) {
  //   return notFoundResponse;
  // }

  // return {
  //   typeName: previewNodeTypeName,
  //   node: previewNode,
  // };
}
