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
  UseMutationOptions,
} from '@gqty/react';
import type { GQtyClient, GQtyError } from 'gqty';
import type { IncomingMessage } from 'http';
import isObject from 'lodash/isObject';
import merge from 'lodash/merge';
import React, { useContext } from 'react';

import { createHooks } from './hooks';

export interface NextClient<
  Schema extends RequiredSchema,
  ObjectTypesNames extends string = never,
  ObjectTypes extends {
    [P in ObjectTypesNames]: {
      __typename: P | undefined;
    };
  } = never,
> extends ReactClient<Schema> {
  client: GQtyClient<Schema>;

  setAsRoot(): void;

  context: WithClient<IncomingMessage, Schema> | undefined;

  useQuery: ReactClient<Schema>['useQuery'];

  useClient(): NextClient<Schema, ObjectTypesNames, ObjectTypes>;

  useHydrateCache: ReactClient<Schema>['useHydrateCache'];

  useCategory(
    args?: Parameters<Schema['query']['category']>[0],
  ): ReturnType<Schema['query']['category']>;

  usePosts(
    args?: Parameters<Schema['query']['posts']>[0],
  ): ReturnType<Schema['query']['posts']>;

  usePost(
    args?: Parameters<Schema['query']['post']>[0],
  ): ReturnType<Schema['query']['post']>;

  usePage(
    args?: Parameters<Schema['query']['page']>[0],
  ): ReturnType<Schema['query']['page']>;

  usePreview(
    args: Record<'pageId', string>,
  ): ReturnType<Schema['query']['page']>;
  usePreview(
    args: Record<'postId', string>,
  ): ReturnType<Schema['query']['post']>;

  useIsLoading(): boolean;

  useAuth(): {
    isLoading: boolean;
    isAuthenticated: boolean | undefined;
    authResult:
      | true
      | { redirect?: string | undefined; login?: string | undefined }
      | undefined;
  };

  useLogin(options?: {
    useMutationOptions?: UseMutationOptions<{
      code?: string | null | undefined;
      error?: string | null | undefined;
    }>;
  }): {
    login: (usernameEmail: string, password: string) => Promise<void>;
    isLoading: boolean;
    data:
      | {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          error: any;
          code?: undefined;
        }
      | {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          code: any;
          error?: undefined;
        }
      | undefined;
    error: GQtyError | undefined;
  };
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
