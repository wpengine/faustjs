import React from 'react';
import { usePost, WPHead } from '@wpengine/headless';
import type { GetServerSidePropsContext, GetStaticPropsContext } from 'next';
import type { ApolloClient, NormalizedCacheObject } from '@apollo/client';
import { gql } from '@apollo/client';

export default function Single() {
  const post = usePost();

  return (
    <>
      <WPHead />

      <div>
        {post && (
          <div>
            <div>
              <h5>{post.title}</h5>
              <p dangerouslySetInnerHTML={{ __html: post.content ?? '' }} />
            </div>
          </div>
        )}
      </div>
    </>
  );
}

/**
 * Middleware that can be used to fetch addition (or less data) when the Next.js Data Fetcher is ran. This is
 * particularly useful if some data needed is not requested by default in the Headless framework.
 *
 * @param promises Array of promises fetching data that can be manipulated to include more data or less data
 * @param currentUrlPath Current URL/path being displayed/rendered
 * @param apolloClient Apollo Client instance
 * @param context Next.js context
 */
export function getPropsMiddleware(
  promises: Array<Promise<unknown> | undefined>,
  apolloClient: ApolloClient<NormalizedCacheObject>,
  currentUrlPath: string,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  context: GetStaticPropsContext | GetServerSidePropsContext,
): Array<Promise<unknown> | undefined> {
  /**
   * Fetch all menus and menu items on every page using the "single" template.
   */
  promises.push(
    apolloClient.query<string[]>({
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      query: gql`
        {
          menus {
            edges {
              node {
                menuItems {
                  edges {
                    node {
                      url
                      title
                      label
                    }
                  }
                }
              }
            }
          }
        }
      `,
    }),
  );

  return promises;
}
