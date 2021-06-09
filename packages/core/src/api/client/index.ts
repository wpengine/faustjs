import { createClient, GQlessClient, QueryFetcher } from 'gqless';
import fetch from 'isomorphic-fetch';
import isString from 'lodash/isString';
import isObject from 'lodash/isObject';
import { getAccessToken } from '../../auth';
import { headlessConfig } from '../../config';
import {
  generatedSchema,
  scalarsEnumsHash,
  GeneratedSchema,
  SchemaObjectTypes,
  SchemaObjectTypesNames,
} from './schema.generated';
import isFunction from 'lodash/isFunction';

export interface RequestContext {
  url: string;
  init: RequestInit;
}

export function applyRequestContext(
  url: string,
  init: RequestInit,
): RequestContext {
  const config = headlessConfig();
  const token = getAccessToken();

  if (isString(token)) {
    init.headers = {
      ...init.headers,
      authorization: `Bearer ${token}`,
    };
  }

  let requestContext = {
    url,
    init,
  };

  if (isFunction(config.applyRequestContext)) {
    requestContext = config.applyRequestContext(url, init);
  }

  return requestContext;
}

export const queryFetcher: QueryFetcher = async function (
  query,
  variables,
): Promise<any> {
  const { wpUrl } = headlessConfig();
  const { url, init } = applyRequestContext(`${wpUrl}/graphql`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query,
      variables,
    }),
    mode: 'cors',
  });

  const response = await fetch(url, init);
  const json = await response.json();

  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  return json;
};

const defaultClient = createClient<
  GeneratedSchema,
  SchemaObjectTypesNames,
  SchemaObjectTypes
>({
  schema: generatedSchema,
  scalarsEnumsHash,
  queryFetcher,
});

/* eslint-disable @typescript-eslint/ban-types */

export function client<
  Schema extends {
    query: {};
    mutation: {};
    subscription: {};
  } = GeneratedSchema,
>(): GQlessClient<Schema> {
  const { apiClient } = headlessConfig();

  if (!isObject(apiClient)) {
    return defaultClient as any as GQlessClient<Schema>;
  }

  return apiClient as GQlessClient<Schema>;
}
/* eslint-enable @typescript-eslint/ban-types */

export * from './schema.generated';
