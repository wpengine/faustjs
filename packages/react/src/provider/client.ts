import { createReactClient, ReactClient } from '@gqless/react';
import {
  client as createClient,
  GeneratedSchema,
} from '@wpengine/headless-core';

/* eslint-disable @typescript-eslint/ban-types */
export function client<
  Schema extends {
    query: {};
    mutation: {};
    subscription: {};
  } = GeneratedSchema,
>(): ReactClient<Schema> {
  const coreClient = createClient<Schema>();

  const reactClient = createReactClient<Schema>(coreClient, {
    defaults: {
      // Set this flag as "true" if your usage involves React Suspense
      // Keep in mind that you can overwrite it in a per-hook basis
      suspense: false,

      // Set this flag based on your needs
      staleWhileRevalidate: false,
    },
  });

  return reactClient;
}
