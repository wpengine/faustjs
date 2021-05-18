/* eslint-disable @typescript-eslint/triple-slash-reference */
/// <reference path="./types/next.d.ts" />
/// <reference path="./types/wpgraphql.d.ts" />

import {
  authorizeHandler,
  headlessConfig,
  getApolloClient,
  getPosts,
} from '@wpengine/headless-core';
import { HeadlessProvider, useGeneralSettings } from '@wpengine/headless-react';

export * from './getProps';
export * from './getStaticPaths';
export * from './hooks';

export {
  authorizeHandler,
  HeadlessProvider,
  headlessConfig,
  useGeneralSettings,
  getApolloClient,
  getPosts,
};
