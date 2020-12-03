import { gql, ApolloClient, NormalizedCacheObject } from '@apollo/client';
import moize from 'moize';
import {
  GeneralSettings,
  ContentNodeIdType,
  Connection,
  Post,
  Page,
  UriInfo,
} from '../types';
import * as utils from '../utils';

export const posts = moize(
  async function posts(client: ApolloClient<NormalizedCacheObject>) {
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
  },
  {
    isDeepEqual: false,
    isPromise: true,
    isSerialized: true,
    maxAge: 1000,
  },
);

export const contentNode = moize(async function contentNode(
  client: ApolloClient<NormalizedCacheObject>,
  id: string,
  idType: ContentNodeIdType = ContentNodeIdType.URI,
  asPreview = false,
): Promise<Post | Page> {
  const result = await client.query<{ contentNode: Post | Page }>({
    query: gql`
      query {
        contentNode(id: "${id}", idType: ${idType}, asPreview: ${asPreview}) {
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
  };
});

export const generalSettings = moize(async function generalSettings(
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
});

export const uriInfo = moize(
  async function uriInfo(
    client: ApolloClient<NormalizedCacheObject>,
    uri: string,
  ): Promise<UriInfo> {
    const uriPath = utils.getUrlPath(uri);
    const isPreview = /preview=true/.test(uriPath);
    const response = await client.query<{ nodeByUri?: UriInfo }>({
      query: gql`
            query {
              nodeByUri(uri: "${uriPath}") {
                id
                ... on ContentType {
                  isFrontPage
                  isPostsPage
                }
              }
            }
          `,
    });
    const result = response?.data?.nodeByUri;

    if (!result) {
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
  },
  {
    isDeepEqual: false,
    isPromise: true,
    isSerialized: true,
    maxAge: 1000,
  },
);
