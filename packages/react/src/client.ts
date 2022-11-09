import { ClientConfig, getClient as getCoreClient } from '@faustjs/core';
import type {
  CategoryIdType,
  Maybe,
  PageIdType,
  PostIdType,
  ContentNodeIdTypeEnum,
  ContentTypeEnum,
} from '@faustjs/core/client'; // eslint-disable-line import/extensions
import {
  createReactClient,
  CreateReactClientOptions,
  ReactClient as GQtyReactClient,
} from '@gqty/react';
import { GQtyClient } from 'gqty';
import isObject from 'lodash/isObject.js';
import merge from 'lodash/merge.js';

export interface Node {
  id?: string | null;
  __typename?: string | null;
}

export interface WithRevisions {
  revisions: (arg0: { first?: number }) => Maybe<{
    edges?: Maybe<
      Maybe<{
        node?: Maybe<Node>;
      }>[]
    >;
  }>;
}

export interface WithOn {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  $on: any;
}

export interface RequiredQuery {
  posts: (args?: {
    where?: {
      categoryId?: number;
      categoryName?: string;
    };
  }) => unknown;
  post: (args: {
    id: string;
    idType?: PostIdType;
  }) => (Node & WithRevisions) | null | undefined;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  pages: (args?: any) => unknown;
  page: (args: {
    id: string;
    idType?: PageIdType;
  }) => (Node & WithRevisions) | null | undefined;
  category: (args: {
    id: string;
    idType?: CategoryIdType;
  }) => Node | null | undefined;
  contentNode: (args: {
    id: string;
    idType?: ContentNodeIdTypeEnum;
    contentType?: ContentTypeEnum;
    asPreview?: boolean;
  }) => (Node & WithOn) | null | undefined;
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
  auth: Omit<ReactClient<Schema>, 'auth'>;
  useIsLoading(): boolean;
}

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
) {
  const client = getCoreClient<Schema, ObjectTypesNames, ObjectTypes>(
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

  const reactClient = createReactClient<Schema>(client, reactClientOpts);
  const authReactClient = createReactClient<Schema>(
    client.auth,
    reactClientOpts,
  );

  const fullClient: ReactClient<Schema> = {
    client,
    ...reactClient,
    auth: {
      client: client.auth,
      ...authReactClient,
      useIsLoading() {
        return authReactClient.useQuery().$state.isLoading;
      },
    },
    useIsLoading() {
      return reactClient.useQuery().$state.isLoading;
    },
  };

  return fullClient;
}
