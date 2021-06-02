/* eslint-disable @typescript-eslint/triple-slash-reference */
/// <reference path="./types/wpgraphql.d.ts" />

export {
  usePosts,
  useGeneralSettings,
  UriInfo,
  useUriInfo,
  usePost,
} from './hooks';

export {
  HeadlessProvider,
  useApollo,
  addApolloState,
  QueriesConfig,
  HeadlessProviderPageProps,
} from './provider';
