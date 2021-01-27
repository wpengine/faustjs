import React from 'react';
import Head from 'next/head';
import { usePost, useGeneralSettings } from '../api';
import { trimTrailingSlash } from '../utils';

const WP_URL = trimTrailingSlash(
  process.env.NEXT_PUBLIC_WORDPRESS_URL || process.env.WORDPRESS_URL,
);

export default function WPHead(): JSX.Element {
  const settings = useGeneralSettings();
  const post = usePost();

  let title = 'Loading...';
  let stylesheets: Array<
    Required<Pick<WPGraphQL.EnqueuedStylesheet, 'src' | 'handle'>>
  > = [];

  const siteTitle: string = settings?.title ?? '';
  const siteTagline: string = settings?.description ?? '';

  if (post?.title) {
    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
    title = `${post.title} – ${siteTitle}`;
  } else if (siteTitle && siteTagline) {
    title = `${siteTitle} – ${siteTagline}`;
  }

  if (post?.enqueuedStylesheets?.nodes) {
    stylesheets = post.enqueuedStylesheets.nodes.filter((node) => {
      return node.src?.indexOf('wp-content/themes') < 0;
    });
  }

  const stylesheetUrl = (
    stylesheet: Required<Pick<WPGraphQL.EnqueuedStylesheet, 'src'>>,
  ): string => {
    return stylesheet.src.indexOf('http') === 0
      ? stylesheet.src
      : `${WP_URL as string}${stylesheet.src}`;
  };

  return (
    <Head>
      <title>{title}</title>

      {stylesheets.map((stylesheet) => {
        if (!stylesheet.src) {
          return null;
        }

        return (
          <link
            href={stylesheetUrl(stylesheet)}
            rel="stylesheet"
            key={stylesheet.handle}
          />
        );
      })}
    </Head>
  );
}
