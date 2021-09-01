import {
  CategoryIdType,
  ClientConfig,
  getClient as getCoreClient,
  PageIdType,
  PostIdType,
} from '@faustjs/core';
import {
  createReactClient,
  CreateReactClientOptions,
  ReactClient as GQtyReactClient,
} from '@gqty/react';
import { GQtyClient } from 'gqty';
import isObject from 'lodash/isObject';
import merge from 'lodash/merge';

export interface Node {
  id?: string | null;
  revisions: (arg0: { first: number }) => {
    edges?: { node?: Node }[];
  };
}

export interface RequiredQuery {
  posts: (args?: {
    where?: {
      categoryId?: number;
      categoryName?: string;
    };
  }) => unknown;
  post: (args: { id: string; idType?: PostIdType }) => Node | null | undefined;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  pages: (args?: any) => unknown;
  page: (args: { id: string; idType?: PageIdType }) => Node | null | undefined;
  category: (args: {
    id: string;
    idType?: CategoryIdType;
  }) => Node | null | undefined;
  generalSettings?: unknown;
}

export interface RequiredSchema {
  query: RequiredQuery;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  mutation: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  subscription: any;
}

export interface ReactClient<Schema extends RequiredSchema>
  extends GQtyReactClient<Schema> {
  client: GQtyClient<Schema>;
  useIsLoading(): boolean;
}

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
) {
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

  const { useQuery } = reactClient;

  const useIsLoading = () => {
    return useQuery().$state.isLoading;
  };

  const c: ReactClient<Schema> = {
    client: coreClient,
    ...reactClient,
    useIsLoading,
  };

  return c;
}
