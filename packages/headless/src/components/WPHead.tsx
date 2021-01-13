import React from 'react';
import Head from 'next/head';
import { usePost, useGeneralSettings } from '../api';
import { EnqueuedStylesheet } from '../types';
import { trimTrailingSlash } from '../utils';

const WP_URL = trimTrailingSlash(
  process.env.NEXT_PUBLIC_WORDPRESS_URL || process.env.WORDPRESS_URL,
);

export default function WPHead(): JSX.Element {
  const settings = useGeneralSettings();
  const post = usePost();

  let title: string;
  let stylesheet: EnqueuedStylesheet | undefined;

  const siteTitle: string = settings?.title ?? '';
  const siteTagline: string = settings?.description ?? '';

  if (post) {
    title = `${post.title} – ${siteTitle}`;
  } else {
    title = `${siteTitle} – ${siteTagline}`;
  }

  if (post?.enqueuedStylesheets?.nodes) {
    stylesheet = post.enqueuedStylesheets.nodes
      .filter((node) => {
        return node.handle === 'wp-block-library';
      })
      .pop();
  }

  return (
    <Head>
      <title>{title}</title>

      {stylesheet && (
        <link
          href={`${WP_URL as string}${stylesheet.src}`}
          rel="stylesheet"
          key={stylesheet.handle}
        />
      )}
    </Head>
  );
}
