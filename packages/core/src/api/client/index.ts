/**
 * GQLESS: You can safely modify this file and Query Fetcher based on your needs
 */

import { createClient, QueryFetcher } from 'gqless';
import fetch from 'isomorphic-fetch';
import isObject from 'lodash/isObject';
import { headlessConfig } from '../../config';
import {
  generatedSchema,
  scalarsEnumsHash,
  GeneratedSchema,
  SchemaObjectTypes,
  SchemaObjectTypesNames,
} from './schema.generated';

export const queryFetcher: QueryFetcher = async function (query, variables) {
  const { wpUrl } = headlessConfig();
  const response = await fetch(`${wpUrl}/graphql`, {
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

  const json = await response.json();

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

export function client(): typeof defaultClient {
  const { apiClient } = headlessConfig();

  if (!isObject(apiClient)) {
    return defaultClient;
  }

  return apiClient as typeof defaultClient;
}

export * from './schema.generated';
