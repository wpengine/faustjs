import { gql, ApolloClient, NormalizedCacheObject } from '@apollo/client';

export interface Post {
  id: string;
  title: string;
  slug: string;
  status: string;
  content: string;
  excerpt: string;
}

export enum PostIdType {
  DATABASE_ID = 'DATABASE_ID',
  ID = 'ID',
  URI = 'URI',
  SLUG = 'SLUG',
}

export async function posts(client: ApolloClient<NormalizedCacheObject>) {
  const result = await client.query<{ posts: { nodes: Post[] } }>({
    query: gql`
      query {
        posts {
          nodes {
            id
            title
            slug
            status
            content
            excerpt
          }
        }
      }
    `,
  });

  return result?.data?.posts?.nodes;
}

export async function post(
  client: ApolloClient<NormalizedCacheObject>,
  id: string,
  idType = PostIdType.SLUG,
): Promise<Post | void> {
  if (!id) {
    return Promise.resolve();
  }

  const result = await client.query<{ post: Post }>({
    query: gql`
            query {
                post(idType: ${idType}, id: "${id}") {
                    id
                    title
                    slug
                    status
                    content
                    excerpt
                }
            }
        `,
  });

  return result?.data?.post;
}

export async function revision(
  client: ApolloClient<NormalizedCacheObject>,
  id: string,
): Promise<Post | void> {
  if (!id) {
    return Promise.resolve();
  }

  const result = await client.query<{ revisions: { nodes: Post[] } }>({
    query: gql`
            query {
                revisions(where: {id: ${id}}) {
                    nodes {
                    ... on Post {
                        id
                        title
                        slug
                        status
                        content
                        excerpt
                    }
                    }
                }
            }
        `,
  });

  return result?.data?.revisions.nodes[0];
}
