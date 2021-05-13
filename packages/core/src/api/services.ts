import { ApolloClient, gql } from '@apollo/client/core';
import { ensureAuthorization } from '../auth';
import {
  isServerSide,
  getUrlPath,
  resolvePrefixedUrlPath,
  isPreviewPath,
  stripPreviewFromUrlPath,
} from '../utils';
import {
  getPostsQuery,
  getContentNodeQuery,
  ListPostOptions,
  GENERAL_SETTINGS,
  GET_URI_INFO,
  ContentNodeOptions,
} from './queries';
import { headlessConfig } from '../config';
import trimStart from 'lodash/trimStart';

/**
 * WordPress URI information
 *
 * @export
 * @interface UriInfo
 */
export interface UriInfo {
  id?: string;
  idType?: WPGraphQL.ContentNodeIdTypeEnum;
  isPostsPage?: boolean;
  isFrontPage?: boolean;
  isPreview?: boolean;
  isArchive?: boolean;
  isSingular?: boolean;
  is404?: boolean;
  uriPath: string;
}

/**
 * Gets all posts from WordPress
 *
 * @async
 * @export
 * @param {ApolloClient<any>} client
 * @returns
 */
export async function getPosts(
  client: ApolloClient<any>,
  options?: ListPostOptions,
): Promise<WPGraphQL.RootQuery['posts']> {
  const result = await client.query<WPGraphQL.RootQuery>({
    query: getPostsQuery(options),
    variables: options?.variables,
  });

  return result?.data?.posts;
}

export function composeContentNodeOptions(
  options: ContentNodeOptions = {},
): ContentNodeOptions {
  let opts: ContentNodeOptions = options;

  if (!opts) {
    opts = {};
  }

  opts.variables = {
    idType: 'URI',
    asPreview: false,
    ...opts.variables,
  } as WPGraphQL.RootQueryContentNodeArgs;

  if (opts.variables.idType === 'URI') {
    opts.variables.id = trimStart(opts.variables.id, '/');

    if (!opts.variables.id) {
      opts.variables.id = '/';
    }
  }

  return opts;
}

export function parseContentNodeQuery(
  result: { data?: WPGraphQL.GetContentNodeQuery; },
  options: ContentNodeOptions,
): WPGraphQL.Post | WPGraphQL.Page | undefined {
  const node = result?.data?.contentNode as
    | WPGraphQL.RootQuery['post']
    | WPGraphQL.RootQuery['page'];

  if (!node) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return undefined;
  }

  const { asPreview } = options.variables ?? {};

  if (asPreview && !node.isPreview) {
    if (!node.preview?.node) {
      return node;
    }

    return node.preview.node;
  }

  return node;
}

/**
 * Gets an individual Post or Page from WordPress
 *
 * @async
 * @export
 * @param {ApolloClient<any>} client
 * @param {string} id The identifier for the Post or Page
 * @param [idType=ContentNodeIdType.URI] The type of identifier
 * @param {boolean} [asPreview=false] Whether or not to grab preview information (requires Authorization)
 * @returns {(Promise<Post | Page>)}
 */
export async function getContentNode(
  client: ApolloClient<any>,
  options: ContentNodeOptions = {},
): Promise<
  WPGraphQL.RootQuery['post'] | WPGraphQL.RootQuery['page'] | undefined
> {
  const opts = composeContentNodeOptions(options);

  const result = await client.query<WPGraphQL.GetContentNodeQuery>({
    query: getContentNodeQuery(),
    variables: opts.variables,
  });

  return parseContentNodeQuery(result, opts);
}

/**
 * Gets the General Settings from WordPress
 *
 * @async
 * @export
 * @param {ApolloClient<any>} client
 * @returns {Promise<GeneralSettings>}
 */
export async function getGeneralSettings(
  client: ApolloClient<any>,
): Promise<WPGraphQL.GeneralSettingsQuery['generalSettings']> {
  const result = await client.query<WPGraphQL.GeneralSettingsQuery>({
    query: gql`
      ${GENERAL_SETTINGS}
    `,
  });

  return result?.data?.generalSettings;
}

export function composeUrlPath(uriPath?: string):
  | {
      urlPath: string;
      isPreview: boolean;
    }
  | undefined {
  let urlPath = uriPath;
  const { blogUrlPrefix } = headlessConfig();

  if (typeof urlPath !== 'string') {
    if (isServerSide()) {
      console.warn('Getting uri info requires a URI when server-side.');

      return undefined;
    }

    urlPath = resolvePrefixedUrlPath(
      getUrlPath(window.location.href),
      blogUrlPrefix,
    );
  }

  urlPath = getUrlPath(urlPath);
  const isPreview = isPreviewPath(urlPath);

  if (isPreview) {
    urlPath = stripPreviewFromUrlPath(urlPath);
  }

  if (isPreview && !isServerSide()) {
    const response = ensureAuthorization(window.location.href);

    if (typeof response !== 'string' && response?.redirect) {
      setTimeout(() => {
        window.location.replace(response.redirect);
      }, 200);
      /* eslint-disable-next-line consistent-return */
      return;
    }
  }

  urlPath = trimStart(urlPath, '/');

  if (!urlPath) {
    urlPath = '/';
  }

  return {
    urlPath,
    isPreview,
  };
}

export function parseUriInfoQuery(
  response: { data?: WPGraphQL.GetUriInfoQuery; },
  uriPath: string,
  isPreview?: boolean,
): UriInfo {
  const result = response?.data?.nodeByUri;

  if (!result) {
    if (isPreview) {
      return {
        isPreview,
        uriPath,
      };
    }

    return {
      is404: true,
      uriPath,
    };
  }

  const { id } = result;

  const { isArchive, isSingular } =
    response?.data?.nodeByUri?.conditionalTags ?? {};

  return {
    isPostsPage: (result as { isPostsPage: boolean }).isPostsPage ?? false,
    isFrontPage: (result as { isFrontPage: boolean }).isFrontPage ?? false,
    id,
    isPreview,
    uriPath,
    isArchive,
    isSingular,
  };
}

/* eslint-disable consistent-return */
/**
 * Gets information about the URI from WordPress
 *
 * @async
 * @export
 * @param {ApolloClient<any>} client
 * @param {string} uriPath The path for the URI (e.g. '/hello-world')
 * @param {boolean} [isPreview] Whether or not the page being displayed is in preview mode or not.
 * @returns {(Promise<UriInfo | void>)}
 */
export async function getUriInfo(
  client: ApolloClient<any>,
  uriPath?: string,
): Promise<UriInfo | undefined> {
  const { urlPath, isPreview } = composeUrlPath(uriPath) ?? {};

  if (!urlPath) {
    return;
  }

  const response = await client.query<
    WPGraphQL.GetUriInfoQuery,
    WPGraphQL.GetUriInfoQueryVariables
  >({
    query: GET_URI_INFO,
    variables: {
      uri: urlPath,
    },
  });

  return parseUriInfoQuery(response, urlPath, isPreview);
}
/* eslint-enable consistent-return */
