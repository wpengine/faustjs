import type { IncomingMessage } from 'http';
import {
  ClientOptions,
  createClient,
  GQtyClient,
  QueryFetcher,
  ScalarsEnumsHash,
  Schema as GQtySchema,
} from 'gqty';
import fetch from 'isomorphic-fetch';
import isFunction from 'lodash/isFunction.js';
import isNil from 'lodash/isNil.js';
import isObject from 'lodash/isObject.js';
import omit from 'lodash/omit.js';
import { getAccessToken } from '../auth/index.js';
import { getGqlUrl } from '../config/config.js';

export * from './schema.generated.js';

export interface GqlClientSchema {
  query: any;
  mutation: any;
  subscription: any;
}

export interface RequestContext {
  url: string;
  init: RequestInit;
}

export function createQueryFetcher(
  applyRequestContext?: ClientConfig['applyRequestContext'],
): QueryFetcher {
  // eslint-disable-next-line func-names
  return async function (query, variables): Promise<any> {
    const url = getGqlUrl();
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
    };

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

export function createAuthQueryFetcher(
  context?: IncomingMessage,
  applyRequestContext?: ClientConfig['applyRequestContext'],
): QueryFetcher {
  const applyRequestContextFn: ClientConfig['applyRequestContext'] = async (
    url,
    init,
  ) => {
    let token: string | undefined;

    if (!isNil(context)) {
      const { Cookies } = await import('../server/auth/cookie.js');
      const { OAuth } = await import('../server/auth/token.js');
      const oauth = new OAuth(new Cookies(context));
      const oauthTokens = await oauth.fetch();

      if (oauth.isOAuthTokens(oauthTokens)) {
        token = oauthTokens.accessToken;
      }
    } else {
      token = getAccessToken();
    }
    // eslint-disable-next-line prefer-object-spread, no-param-reassign
    init.headers = Object.assign(
      { Authorization: `Bearer ${token as string}` },
      init.headers,
    );

    let requestContext = { url, init };

    if (isFunction(applyRequestContext)) {
      requestContext = await applyRequestContext(url, init);
    }

    return requestContext;
  };

  return createQueryFetcher(applyRequestContextFn);
}

export interface ClientConfig<
  Schema extends GqlClientSchema = never,
  ObjectTypesNames extends string = never,
  SchemaObjectTypes extends {
    [P in ObjectTypesNames]: {
      __typename?: P;
    };
  } = never,
> extends Omit<
    ClientOptions<ObjectTypesNames, SchemaObjectTypes>,
    'schema' | 'scalarsEnumsHash' | 'queryFetcher'
  > {
  schema?: Readonly<GQtySchema>;
  scalarsEnumsHash?: ScalarsEnumsHash;
  queryFetcher?: QueryFetcher;
  authQueryFetcher?: QueryFetcher;
  context?: WithClient<IncomingMessage, Schema>;
  /**
   * Called before every request, use this to apply any headers you might
   * need to for your requests or adjust the request to suite your needs.
   *
   * @param {string} url
   * @param {RequestInit} init
   * @returns {RequestContext}
   * @memberof ClientConfig
   */
  applyRequestContext?(
    url: string,
    init: RequestInit,
  ): Promise<RequestContext> | RequestContext;
}

export interface ApiClient<Schema extends GqlClientSchema>
  extends GQtyClient<Schema> {
  auth: GQtyClient<Schema>;
}

export type WithClient<Type, Schema extends GqlClientSchema> = Type & {
  apiClient?: ApiClient<Schema>;
};

export function contextHasClient<Schema extends GqlClientSchema>(
  context?: IncomingMessage,
): context is WithClient<IncomingMessage, Schema> &
  Required<Pick<WithClient<IncomingMessage, Schema>, 'apiClient'>> {
  return (
    isObject(context) &&
    isObject((context as WithClient<IncomingMessage, Schema>).apiClient)
  );
}

/* eslint-disable @typescript-eslint/ban-types */

export function getClient<
  Schema extends GqlClientSchema = never,
  ObjectTypesNames extends string = never,
  ObjectTypes extends {
    [P in ObjectTypesNames]: {
      __typename?: P;
    };
  } = never,
>(
  clientConfig: ClientConfig<Schema, ObjectTypesNames, ObjectTypes>,
): ApiClient<Schema> {
  const {
    context,
    schema,
    scalarsEnumsHash,
    queryFetcher: configQueryFetcher,
    authQueryFetcher: configAuthQueryFetcher,
    applyRequestContext,
  } = clientConfig;

  if (contextHasClient<Schema>(context)) {
    return context.apiClient;
  }

  if (isNil(schema) || isNil(scalarsEnumsHash)) {
    throw new Error(
      'You must specify a schema and scalarEnumsHash in order to create a client.',
    );
  }

  const apiClient = {
    ...createClient<Schema, ObjectTypesNames, ObjectTypes>({
      schema,
      scalarsEnumsHash,
      queryFetcher:
        configQueryFetcher ?? createQueryFetcher(applyRequestContext),
      ...omit(
        clientConfig,
        'context',
        'applyRequestContext',
        'authQueryFetcher',
        'schema',
        'scalarsEnumsHash',
      ),
    }),
    auth: {
      ...createClient<Schema, ObjectTypesNames, ObjectTypes>({
        schema,
        scalarsEnumsHash,
        queryFetcher:
          configAuthQueryFetcher ??
          createAuthQueryFetcher(context, applyRequestContext),
        ...omit(
          clientConfig,
          'context',
          'applyRequestContext',
          'authQueryFetcher',
          'schema',
          'scalarsEnumsHash',
        ),
      }),
    },
  };

  if (isObject(clientConfig.context)) {
    // eslint-disable-next-line no-param-reassign
    clientConfig.context.apiClient = apiClient;
  }

  return apiClient;
}
/* eslint-enable @typescript-eslint/ban-types */
