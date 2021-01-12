import { gql, ApolloClient, NormalizedCacheObject } from '@apollo/client';
import {
  GeneralSettings,
  ContentNodeIdType,
  Connection,
  Post,
  Page,
  UriInfo,
} from '../types';
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
): Promise<Post[]> {
  const result = await client.query<{ posts: Connection<Post> }>({
    query: gql`
      query {
        posts {
          pageInfo {
            endCursor
            hasNextPage
            hasPreviousPage
            startCursor
          }
          edges {
            cursor
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
            }
          }
        }
      }
    `,
  });

  const thePosts = result?.data?.posts?.edges.map(({ node }) => node);

  if (!thePosts) {
    return thePosts;
  }

  return thePosts.map((thePost) => {
    const {
      id,
      slug,
      title,
      content,
      isRevision,
      isPreview,
      isSticky,
      excerpt,
      uri,
      status,
    } = thePost;

    return {
      id,
      slug,
      title,
      content,
      isRevision,
      isPreview,
      isSticky,
      excerpt,
      uri: utils.getUrlPath(uri),
      status,
    };
  });
}

/**
 * Gets an individual Post or Page from WordPress
 *
 * @async
 * @export
 * @param {ApolloClient<NormalizedCacheObject>} client
 * @param {string} id The identifier for the Post or Page
 * @param {ContentNodeIdType} [idType=ContentNodeIdType.URI] The type of identifier
 * @param {boolean} [asPreview=false] Whether or not to grab preview information (requires Authorization)
 * @returns {(Promise<Post | Page>)}
 */
export async function getContentNode(
  client: ApolloClient<NormalizedCacheObject>,
  id: string,
  idType: ContentNodeIdType = ContentNodeIdType.URI,
  asPreview = false,
): Promise<Post | Page> {
  const result = await client.query<{ contentNode: Post | Page }>({
    query: gql`
      query($id: ID!, $idType: ContentNodeIdTypeEnum, $asPreview: Boolean) {
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

  let node = result?.data?.contentNode;

  if (!node) {
    return node;
  }

  if (asPreview && !node.isPreview) {
    if (!node.preview?.node) {
      return node;
    }

    node = node.preview.node;
  }

  return {
    id: node.id,
    slug: node.slug,
    title: node.title,
    content: node.content,
    isRevision: node.isRevision,
    isPreview: node.isPreview,
    isSticky: (node as Post).isSticky,
    excerpt: (node as Post).excerpt,
    uri: node.uri,
    status: node.status,
    isFrontPage: (node as Page).isFrontPage,
    isPostsPage: (node as Page).isPostsPage,
    enqueuedStylesheets: node.enqueuedStylesheets,
  };
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
): Promise<GeneralSettings> {
  const result = await client.query<{ generalSettings: GeneralSettings }>({
    query: gql`
      query {
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

  const response = await client.query<{ nodeByUri?: UriInfo }>({
    query: gql`
      query($uri: String!) {
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

  const { isPostsPage, isFrontPage, id, templates } = result;

  return {
    isPostsPage,
    isFrontPage,
    id,
    isPreview,
    uriPath,
    templates,
  };
}
/* eslint-enable consistent-return */
