import React from 'react';
import { useGeneralSettings, usePost } from '@wpengine/headless';
import type { GetServerSidePropsContext, GetStaticPropsContext } from 'next';
import type { ApolloClient, NormalizedCacheObject } from '@apollo/client';
import { gql } from '@apollo/client';
import { CTA, Footer, Header, Hero } from '../components';

export default function Single(): JSX.Element {
  const post = usePost();
  const settings = useGeneralSettings();

  return (
    <>
      <Header title={settings?.title} description={settings?.description} />
      <main className="content content-single">
        {post?.title && <Hero title={post?.title} />}
        <div className="wrap">
          {post && (
            <div>
              <div>
                {/* eslint-disable-next-line react/no-danger */}
                <div dangerouslySetInnerHTML={{ __html: post.content ?? '' }} />
              </div>
            </div>
          )}
        </div>
        <CTA
          title="Start your headless journey today"
          buttonText="Get Started"
          buttonURL="https://github.com/wpengine/headless-framework/"
          headingLevel="h2">
          <p>
            Learn more in the{' '}
            <a href="https://github.com/wpengine/headless-framework">
              Headless Framework GitHub repository
            </a>
            .
          </p>
        </CTA>
      </main>
      <Footer copyrightHolder={settings?.title} />
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
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
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
