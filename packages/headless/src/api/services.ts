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
import { ensureAuthorization, getAccessToken } from '../auth';
import { isServerSide } from '../utils';

export async function baseQuery<T>(
  client: ApolloClient<NormalizedCacheObject>,
  query: string,
) {
  const accessToken = getAccessToken();
  const context: { headers?: { Authorization: string } } = {};

  if (accessToken) {
    context.headers = {
      Authorization: `Bearer ${accessToken}`,
    };
  }

  return client.query<T>({
    query: gql`
      ${query}
    `,
    context,
  });
}

export async function getPosts(client: ApolloClient<NormalizedCacheObject>) {
  const result = await baseQuery<{ posts: Connection<Post> }>(
    client,
    `
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
  );

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

export async function getContentNode(
  client: ApolloClient<NormalizedCacheObject>,
  id: string,
  idType: ContentNodeIdType = ContentNodeIdType.URI,
  asPreview = false,
): Promise<Post | Page> {
  const result = await baseQuery<{ contentNode: Post | Page }>(
    client,
    `
      query {
        contentNode(id: "${id}", idType: ${idType}, asPreview: ${String(
      asPreview,
    )}) {
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
          }
        }
      }
    `,
  );

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
  };
}

export async function getGeneralSettings(
  client: ApolloClient<NormalizedCacheObject>,
): Promise<GeneralSettings> {
  const result = await baseQuery<{ generalSettings: GeneralSettings }>(
    client,
    `
      query {
        generalSettings {
          title
          description
        }
      }
    `,
  );

  return result?.data?.generalSettings;
}

/* eslint-disable consistent-return */
export async function getUriInfo(
  client: ApolloClient<NormalizedCacheObject>,
  uriPath: string,
): Promise<UriInfo | void> {
  const urlPath = utils.getUrlPath(uriPath);
  const isPreview = /preview=true/.test(uriPath);

  if (isPreview && !isServerSide()) {
    const response = ensureAuthorization(window.location.href);

    if (typeof response !== 'string' && typeof response.redirect === 'string') {
      window.location.replace(response.redirect);
      return;
    }
  }

  const response = await baseQuery<{ nodeByUri?: UriInfo }>(
    client,
    `
      query {
        nodeByUri(uri: "${urlPath}") {
          id
          ... on ContentType {
            isFrontPage
            isPostsPage
          }
        }
      }
    `,
  );
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

  const { isPostsPage, isFrontPage, id } = result;

  return {
    isPostsPage,
    isFrontPage,
    id,
    isPreview,
    uriPath,
  };
}
/* eslint-enable consistent-return */
