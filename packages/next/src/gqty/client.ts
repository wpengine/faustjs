import type { IncomingMessage } from 'http';
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
import noop from 'lodash/noop.js';
import isObject from 'lodash/isObject.js';
import merge from 'lodash/merge.js';
import React, { useContext } from 'react';

import {
  createAuthHooks,
  createHooks,
  NextClientHooks,
  NextClientHooksWithAuth,
} from './hooks/index.js';

export interface NextClient<
  Schema extends RequiredSchema,
  ObjectTypesNames extends string = never,
  ObjectTypes extends {
    [P in ObjectTypesNames]: {
      __typename?: P;
    };
  } = never,
> extends ReactClient<Schema>,
    Omit<NextClientHooks<Schema>, 'useClient'> {
  client: GQtyClient<Schema>;
  auth: ReactClient<Schema> &
    NextClientHooksWithAuth<Schema> & {
      client: GQtyClient<Schema>;
      useClient: () => NextClient<
        Schema,
        ObjectTypesNames,
        ObjectTypes
      >['auth'];
      useIsLoading(): boolean;
    };
  useClient: () => NextClient<Schema, ObjectTypesNames, ObjectTypes>;
  useIsLoading(): boolean;
  setAsRoot(): void;
  context: WithClient<IncomingMessage, Schema> | undefined;
}

export interface FaustContextType {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  client?: NextClient<RequiredSchema>;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const FaustContext = React.createContext<FaustContextType>({});

/* eslint-disable @typescript-eslint/ban-types, @typescript-eslint/explicit-module-boundary-types */
export function getClient<
  Schema extends RequiredSchema,
  ObjectTypesNames extends string = never,
  ObjectTypes extends {
    [P in ObjectTypesNames]: {
      __typename?: P;
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
  const authReactClient = createReactClient<Schema>(
    coreClient.auth,
    reactClientOpts,
  );
  const haveServerContext = isObject(clientConfig.context?.apiClient);
  let nextClient: NextClient<Schema, ObjectTypesNames, ObjectTypes>;

  function useClient() {
    let client: typeof nextClient | undefined = useContext(FaustContext)
      ?.client as typeof nextClient;

    if (haveServerContext || !isObject(client)) {
      client = nextClient;
    }

    return client;
  }

  function useAuthClient() {
    let client: typeof nextClient | undefined = useContext(FaustContext)
      ?.client as typeof nextClient;

    if (haveServerContext || !isObject(client)) {
      client = nextClient;
    }

    return client.auth;
  }

  const hooks = createHooks(useClient);
  const authHooks = createAuthHooks(useAuthClient);

  function useIsLoading() {
    const { isLoading } = nextClient.useQuery().$state;
    const isAuthLoading = nextClient.auth.useQuery().$state.isLoading;

    return isLoading || isAuthLoading;
  }

  function setAsRoot() {
    nextClient.useQuery = reactClient.useQuery;
    nextClient.useLazyQuery = reactClient.useLazyQuery;
    nextClient.useTransactionQuery = reactClient.useTransactionQuery;
    nextClient.usePaginatedQuery = reactClient.usePaginatedQuery;
    nextClient.useMutation = reactClient.useMutation;
    nextClient.useSubscription = reactClient.useSubscription;
    nextClient.useClient = () => {
      // eslint-disable-next-line react-hooks/rules-of-hooks
      useContext(FaustContext);
      return nextClient;
    };

    nextClient.auth.useQuery = authReactClient.useQuery;
    nextClient.auth.useLazyQuery = authReactClient.useLazyQuery;
    nextClient.auth.useTransactionQuery = authReactClient.useTransactionQuery;
    nextClient.auth.usePaginatedQuery = authReactClient.usePaginatedQuery;
    nextClient.auth.useMutation = authReactClient.useMutation;
    nextClient.auth.useSubscription = authReactClient.useSubscription;
    nextClient.auth.useClient = () => {
      // eslint-disable-next-line react-hooks/rules-of-hooks
      useContext(FaustContext);
      return nextClient.auth;
    };

    nextClient.setAsRoot = noop;
  }

  nextClient = {
    client: coreClient,
    ...reactClient,
    auth: {
      client: coreClient.auth,
      ...authReactClient,
      ...authHooks,
      useClient: useAuthClient,
      useIsLoading,
    },
    setAsRoot,
    context: clientConfig.context,
    ...hooks,
    useClient,
    useIsLoading,
  };

  return nextClient;
}
