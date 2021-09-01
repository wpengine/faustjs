import {
  ClientConfig,
  getClient as getCoreClient,
  WithClient,
} from '@faustjs/core';

import type { RequiredSchema } from '@faustjs/react';
import {
  createReactClient,
  CreateReactClientOptions,
  ReactClient,
} from '@gqty/react';
import type { GQtyClient } from 'gqty';
import type { IncomingMessage } from 'http';
import isObject from 'lodash/isObject';
import merge from 'lodash/merge';
import React, { useContext } from 'react';

import { createHooks, NextClientHooks } from './hooks';

export interface NextClient<
  Schema extends RequiredSchema,
  ObjectTypesNames extends string = never,
  ObjectTypes extends {
    [P in ObjectTypesNames]: {
      __typename: P | undefined;
    };
  } = never,
> extends ReactClient<Schema>,
    NextClientHooks<Schema, ObjectTypesNames, ObjectTypes> {
  client: GQtyClient<Schema>;
  setAsRoot(): void;
  context: WithClient<IncomingMessage, Schema> | undefined;
}

export interface HeadlessContextType {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  client?: NextClient<RequiredSchema>;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const HeadlessContext = React.createContext<HeadlessContextType>({});

/* eslint-disable @typescript-eslint/ban-types, @typescript-eslint/explicit-module-boundary-types */
export function getClient<
  Schema extends RequiredSchema,
  ObjectTypesNames extends string = never,
  ObjectTypes extends {
    [P in ObjectTypesNames]: {
      __typename: P | undefined;
    };
  } = never,
>(
  clientConfig: ClientConfig<Schema, ObjectTypesNames, ObjectTypes>,
  createReactClientOpts?: CreateReactClientOptions,
): NextClient<Schema, ObjectTypesNames, ObjectTypes> {
  const coreClient = getCoreClient<Schema, ObjectTypesNames, ObjectTypes>(
    clientConfig,
  );

  let reactClientOpts: CreateReactClientOptions = {
    defaults: {
      // Set this flag as "true" if your usage involves React Suspense
      // Keep in mind that you can overwrite it in a per-hook basis
      suspense: false,

      // Set this flag based on your needs
      staleWhileRevalidate: false,
    },
  };

  if (isObject(createReactClientOpts)) {
    reactClientOpts = merge(reactClientOpts, createReactClientOpts);
  }

  const reactClient = createReactClient<Schema>(coreClient, reactClientOpts);
  const haveServerContext = isObject(clientConfig.context?.apiClient);
  let nextClient: NextClient<Schema, ObjectTypesNames, ObjectTypes>;

  function useClient() {
    let client: typeof nextClient | undefined = useContext(HeadlessContext)
      ?.client as typeof nextClient;

    if (haveServerContext || !isObject(client)) {
      client = nextClient;
    }

    return client;
  }

  const hooks = createHooks(useClient);

  nextClient = {
    client: coreClient,
    ...reactClient,
    setAsRoot() {
      nextClient.useQuery = reactClient.useQuery;
      nextClient.useLazyQuery = reactClient.useLazyQuery;
      nextClient.useTransactionQuery = reactClient.useTransactionQuery;
      nextClient.usePaginatedQuery = reactClient.usePaginatedQuery;
      nextClient.useMutation = reactClient.useMutation;
      nextClient.useSubscription = reactClient.useSubscription;
      nextClient.useClient = () => nextClient;
    },
    context: clientConfig.context,
    ...hooks,
  };

  return nextClient;
}
