export * from './schema.generated';
import {
  ClientOptions,
  createClient,
  GQtyClient,
  QueryFetcher,
  ScalarsEnumsHash,
  Schema as GQtySchema,
} from 'gqty';
import type { IncomingMessage } from 'http';
import fetch from 'isomorphic-fetch';
import { isString } from 'lodash';
import isFunction from 'lodash/isFunction';
import isNil from 'lodash/isNil';
import isObject from 'lodash/isObject';
import omit from 'lodash/omit';
import { getAccessTokenNew } from '../../auth';
import { getGqlUrl } from '../../config/config';

export interface GqlClientSchema {
  query: any;
  mutation: any;
  subscription: any;
}

export interface RequestContext {
  url: string;
  init: RequestInit;
}

function createQueryFetcher(
  context?: IncomingMessage,
  applyRequestContext?: ClientConfig['applyRequestContext'],
) {
  return async function (query, variables): Promise<any> {
    const url = getGqlUrl();
    const token = getAccessTokenNew();
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
    };

    if (isString(token)) {
      headers.Authorization = `Bearer ${token}`;
    }

    const init: RequestInit = {
      method: 'POST',
      headers,
      body: JSON.stringify({
        query,
        variables,
      }),
      mode: 'cors',
    };

    let requestContext = { url, init };

    if (isFunction(applyRequestContext)) {
      requestContext = await applyRequestContext(url, init);
    }

    const response = await fetch(requestContext.url, requestContext.init);
    const json = await response.json();

    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return json;
  } as QueryFetcher;
}

export interface ClientConfig<
  Schema extends GqlClientSchema = never,
  ObjectTypesNames extends string = never,
  SchemaObjectTypes extends {
    [P in ObjectTypesNames]: {
      __typename: P | undefined;
    };
  } = never,
> extends Omit<
    ClientOptions<ObjectTypesNames, SchemaObjectTypes>,
    'schema' | 'scalarsEnumsHash' | 'queryFetcher'
  > {
  schema?: Readonly<GQtySchema>;
  scalarsEnumsHash?: ScalarsEnumsHash;
  queryFetcher?: QueryFetcher;
  context?: WithClient<IncomingMessage, Schema>;
  /**
   * Called before every request, use this to apply any headers you might
   * need to for your requests or adjust the request to suite your needs.
   *
   * @param {string} url
   * @param {RequestInit} init
   * @returns {RequestContext}
   * @memberof HeadlessConfig
   */
  applyRequestContext?(
    url: string,
    init: RequestInit,
  ): Promise<RequestContext> | RequestContext;
}

export type WithClient<Type, Schema extends GqlClientSchema> = Type & {
  apiClient?: GQtyClient<Schema>;
};

/* eslint-disable @typescript-eslint/ban-types */

export function getClient<
  Schema extends GqlClientSchema = never,
  ObjectTypesNames extends string = never,
  ObjectTypes extends {
    [P in ObjectTypesNames]: {
      __typename: P | undefined;
    };
  } = never,
>(
  clientConfig: ClientConfig<Schema, ObjectTypesNames, ObjectTypes>,
): GQtyClient<Schema> {
  const {
    context,
    schema,
    scalarsEnumsHash,
    queryFetcher: configQueryFetcher,
    applyRequestContext,
  } = clientConfig;

  if (isObject(context) && isObject(context.apiClient)) {
    return context.apiClient;
  }

  if (isNil(schema) || isNil(scalarsEnumsHash)) {
    throw new Error(
      'You must specify a schema and scalarEnumsHash in order to create a client.',
    );
  }

  const apiClient = createClient<Schema, ObjectTypesNames, ObjectTypes>({
    schema,
    scalarsEnumsHash,
    queryFetcher:
      configQueryFetcher ?? createQueryFetcher(context, applyRequestContext),
    ...omit(clientConfig, 'context', 'applyRequestContext'),
  });

  if (isObject(clientConfig.context)) {
    clientConfig.context.apiClient = apiClient;
  }

  return apiClient;
}
/* eslint-enable @typescript-eslint/ban-types */
