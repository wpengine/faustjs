/**
 * GQLESS: You can safely modify this file and Query Fetcher based on your needs
 */

import { createClient, GQlessClient } from 'gqless';
import { queryFetcher } from '@wpengine/headless-core';
import { client as reactClient } from '@wpengine/headless-next';
import {
  generatedSchema,
  scalarsEnumsHash,
  GeneratedSchema,
  SchemaObjectTypes,
  SchemaObjectTypesNames,
} from './schema.generated';

export const customClient = createClient<
  GeneratedSchema,
  SchemaObjectTypesNames,
  SchemaObjectTypes
>({
  schema: generatedSchema,
  scalarsEnumsHash,
  queryFetcher,
});

export type Client = GQlessClient<GeneratedSchema>;

export function client() {
  // @ts-ignore
  return reactClient<GeneratedSchema>();
}

export * from './schema.generated';
