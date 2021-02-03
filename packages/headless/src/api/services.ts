import { ApolloClient, NormalizedCacheObject } from '@apollo/client';
import { UriInfo } from '../types';
import * as utils from '../utils';
import { ensureAuthorization } from '../auth';
import { isServerSide } from '../utils';
import {
  getPostsQuery,
  getContentNodeQuery,
  ListPostOptions,
  GENERAL_SETTINGS,
  GET_URI_INFO,
  ContentNodeOptions,
} from './queries';

/**
 * Gets all posts from WordPress
 *
 * @async
 * @export
 * @param {ApolloClient<NormalizedCacheObject>} client
 * @returns
 */
export async function getPosts(
  client: ApolloClient<NormalizedCacheObject>,
  options?: ListPostOptions,
): Promise<WPGraphQL.RootQuery['posts']> {
  const result = await client.query<WPGraphQL.RootQuery>({
    query: getPostsQuery(options),
    variables: options?.variables,
  });

  return result?.data?.posts;
}

/**
 * Gets an individual Post or Page from WordPress
 *
 * @async
 * @export
 * @param {ApolloClient<NormalizedCacheObject>} client
 * @param {string} id The identifier for the Post or Page
 * @param [idType=ContentNodeIdType.URI] The type of identifier
 * @param {boolean} [asPreview=false] Whether or not to grab preview information (requires Authorization)
 * @returns {(Promise<Post | Page>)}
 */
export async function getContentNode(
  client: ApolloClient<NormalizedCacheObject>,
  options: ContentNodeOptions = {}
): Promise<
  | WPGraphQL.RootQuery['post']
  | WPGraphQL.RootQuery['page']
  | undefined
> {
  let opts: ContentNodeOptions = options;

  if (!opts) {
    opts = {};
  }

  opts.variables = Object.assign({
    idType: 'URI',
    asPreview: false,
  }, opts.variables);

  const result = await client.query<WPGraphQL.GetContentNodeQuery>({
    query: getContentNodeQuery(),
    variables: opts.variables,
  });

  const node = result?.data?.contentNode as WPGraphQL.RootQuery['post'] | WPGraphQL.RootQuery['page'];

  if (!node) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return undefined;
  }

  const { asPreview } = opts.variables;

  if (asPreview && !node.isPreview) {
    if (!node.preview?.node) {
      return node;
    }

    return node.preview.node;
  }

  return node;
}

/**
 * Gets the General Settings from WordPress
 *
 * @async
 * @export
 * @param {ApolloClient<NormalizedCacheObject>} client
 * @returns {Promise<GeneralSettings>}
 */
export async function getGeneralSettings(
  client: ApolloClient<NormalizedCacheObject>,
): Promise<WPGraphQL.GeneralSettingsQuery['generalSettings']> {
  const result = await client.query<WPGraphQL.GeneralSettingsQuery>({
    query: GENERAL_SETTINGS,
  });

  return result?.data?.generalSettings;
}

/* eslint-disable consistent-return */
/**
 * Gets information about the URI from WordPress
 *
 * @async
 * @export
 * @param {ApolloClient<NormalizedCacheObject>} client
 * @param {string} uriPath The path for the URI (e.g. '/hello-world')
 * @param {boolean} [isPreview] Whether or not the page being displayed is in preview mode or not.
 * @returns {(Promise<UriInfo | void>)}
 */
export async function getUriInfo(
  client: ApolloClient<NormalizedCacheObject>,
  uriPath: string,
  isPreview?: boolean,
): Promise<UriInfo | void> {
  const urlPath = utils.getUrlPath(uriPath);

  if (isPreview && !isServerSide()) {
    const response = ensureAuthorization(window.location.href);

    if (typeof response !== 'string' && response?.redirect) {
      window.location.replace(response.redirect);
      return;
    }
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

  const { id, templates } = result;

  return {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    isPostsPage: result?.isPostsPage,
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    isFrontPage: result?.isFrontPage,
    id,
    isPreview,
    uriPath,
    templates,
  };
}
/* eslint-enable consistent-return */
