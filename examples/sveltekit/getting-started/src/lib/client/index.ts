/**
 * GQLESS: You can safely modify this file and Query Fetcher based on your needs
 */
import type { IncomingMessage } from 'http';
import { getClient, ClientConfig, getGqlUrl, getAccessToken } from '@faustjs/core';
import type { QueryFetcher } from 'gqless';
import {
	generatedSchema,
	scalarsEnumsHash,
	GeneratedSchema,
	SchemaObjectTypes,
	SchemaObjectTypesNames
} from './schema.generated';

import type { LoadInput } from "@sveltejs/kit"

import isFunction from 'lodash/isFunction.js';
import isString from 'lodash/isString.js';
function createQueryFetcher(
	fetch: (info: RequestInfo, init?: RequestInit) => Promise<Response>,
	context?: IncomingMessage,
	applyRequestContext?: ClientConfig['applyRequestContext'],
) {
	return async function (query, variables): Promise<any> {
		const url = getGqlUrl();
		const token = getAccessToken({
			request: context
		});
		const headers: HeadersInit = {
			'Content-Type': 'application/json'
		};

		if (isString(token)) {
			headers.Authorization = `Bearer ${token}`;
		}

		const init: RequestInit = {
			method: 'POST',
			headers,
			body: JSON.stringify({
				query,
				variables
			}),
			mode: 'cors'
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

export const client = (api: LoadInput) => getClient<GeneratedSchema, SchemaObjectTypesNames, SchemaObjectTypes>({
	schema: generatedSchema,
	scalarsEnumsHash,
	queryFetcher: createQueryFetcher(api.fetch)
});

export * from './schema.generated';
