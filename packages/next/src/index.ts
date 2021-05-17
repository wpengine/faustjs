/* eslint-disable @typescript-eslint/triple-slash-reference */
/// <reference path="./types/wpgraphql.d.ts" />

import { authorizeHandler } from '@wpengine/headless-core';
import { HeadlessProvider } from '@wpengine/headless-react';

export * from './getProps';
export * from './getStaticPaths';
export * from './hooks';
export * from './WPHead';

export { authorizeHandler, HeadlessProvider };
