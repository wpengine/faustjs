/* eslint-disable @typescript-eslint/triple-slash-reference */
/// <reference path="./types/next.d.ts" />
/// <reference path="./types/wpgraphql.d.ts" />

export {
  getNextServerSideProps,
  getNextStaticProps,
  NextPropsConfig,
  PagePropsWithApollo,
} from './getProps';
export { getNextStaticPaths } from './getStaticPaths';
export { useUriInfo, usePost } from './hooks';
