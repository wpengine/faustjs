import { gql, ApolloClient, NormalizedCacheObject } from '@apollo/client';
import { WPGraphQL, UriInfo } from '../types';
import * as utils from '../utils';
import { ensureAuthorization } from '../auth';
import { isServerSide } from '../utils';

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
): Promise<WPGraphQL.GetPostsQuery['posts']['nodes']> {
  const result = await client.query<WPGraphQL.GetPostsQuery>({
    query: gql`
      query GetPosts {
        posts {
          nodes {
            id
            slug
            title
            content
            isRevision
            isPreview
            isSticky
            excerpt
            uri
            status
            featuredImage {
              node {
                id
                altText
                sourceUrl
              }
            }
          }
        }
      }
    `,
  });

  return result.data.posts.nodes;
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
  id: string,
  idType: WPGraphQL.ContentNodeIdTypeEnum = WPGraphQL.ContentNodeIdTypeEnum.Uri,
  asPreview = false,
): Promise<
  | WPGraphQL.GetContentNodeQuery['contentNode']
  | WPGraphQL.GetContentNodeQuery['contentNode']['preview']['node']
  | undefined
> {
  const result = await client.query<WPGraphQL.GetContentNodeQuery>({
    query: gql`
      query GetContentNode(
        $id: ID!
        $idType: ContentNodeIdTypeEnum
        $asPreview: Boolean
      ) {
        contentNode(id: $id, idType: $idType, asPreview: $asPreview) {
          ... on Post {
            id
            slug
            title
            content
            isRevision
            isPreview
            isSticky
            excerpt
            uri
            status
            featuredImage {
              node {
                id
                altText
                sourceUrl
              }
            }
            preview {
              node {
                id
                slug
                title
                content
                isRevision
                isPreview
                isSticky
                excerpt
                uri
                status
                featuredImage {
                  node {
                    id
                    altText
                    sourceUrl
                  }
                }
              }
            }
            enqueuedStylesheets {
              nodes {
                src
                handle
              }
            }
          }
          ... on Page {
            id
            slug
            title
            content
            isPreview
            isRevision
            isFrontPage
            isPostsPage
            uri
            status
            featuredImage {
              node {
                id
                altText
                sourceUrl
              }
            }
            preview {
              node {
                id
                slug
                title
                content
                isPreview
                isRevision
                isFrontPage
                isPostsPage
                uri
                status
                featuredImage {
                  node {
                    id
                    altText
                    sourceUrl
                  }
                }
              }
            }
            enqueuedStylesheets {
              nodes {
                src
                handle
              }
            }
          }
        }
      }
    `,
    variables: {
      id,
      idType,
      asPreview,
    },
  });

  const node = result?.data?.contentNode;

  if (!node) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return undefined;
  }

  if (asPreview && node.isPreview) {
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
    query: gql`
      query GeneralSettings {
        generalSettings {
          title
          description
        }
      }
    `,
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
    query: gql`
      query GetUriInfo($uri: String!) {
        nodeByUri(uri: $uri) {
          id
          templates
          ... on ContentType {
            isFrontPage
            isPostsPage
          }
        }
      }
    `,
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
