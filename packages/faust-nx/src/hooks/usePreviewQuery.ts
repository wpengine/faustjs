// eslint-disable-next-line import/extensions
import { useState, useEffect } from 'react'
import { ApolloClient, InMemoryCache, ApolloQueryResult, ApolloError } from '@apollo/client';
import isNil from 'lodash/isNil.js';
import { useRouter } from 'next/router.js';
import { WordPressTemplate } from '../getWordPressProps';
import { SeedNode } from '../queries/seedQuery';
import { useAuth } from './useAuth';
import { getAccessToken } from '../auth';

export function usePreviewQuery(
  seedNode: SeedNode,
  template: WordPressTemplate | null
) {
  const {
    isReady,
    query: {
      p: postIdQuery,
      preview: previewQuery,
      typeName: typeNameQuery
    },
  } = useRouter();
  const [previewResponse, setPreviewResponse] = useState<ApolloQueryResult<any> | {data: undefined; loading: boolean; error: ApolloError | undefined}>({data: undefined, loading: true, error: undefined})

  const { isAuthenticated } = useAuth();

  useEffect(() => {
    if (!isReady || isAuthenticated === undefined || isAuthenticated === false) {
      return
    }

    if (!template?.query) {
      return
    }

    (async () => {
      const authClient = new ApolloClient({
        uri: `${process.env.NEXT_PUBLIC_WORDPRESS_URL}/graphql`,
        cache: new InMemoryCache(),
        headers: {
          'Authorization': `bearer ${getAccessToken()}`
        }
      });

      const result = await authClient.query({
        query: template?.query,
        variables: template?.variables(seedNode, { asPreview: true }),
      })

      setPreviewResponse(result)
    })()
  }, [isReady, isAuthenticated, template])

  if (isNil(postIdQuery) || isNil(previewQuery) || previewQuery !== 'true') {
    throw new Error(
      `usePreviewQuery() requires the "p" and "preview" ` +
        `URL query parameters i.e. ?p=123&preview=true`,
    );
  }

  if (Array.isArray(postIdQuery)) {
    throw new Error(
      'usePreviewQuery() requires the "p" URL query parameter to be a string',
    );
  }

  return previewResponse;
}
