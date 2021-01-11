import React from 'react';
import Head from 'next/head';
import { usePost, useGeneralSettings } from '../api';

export default function WPHead(): JSX.Element {
  const settings = useGeneralSettings();
  const post = usePost();

  let title: string;

  const siteTitle: string = settings?.title ?? '';
  const siteTagline: string = settings?.description ?? '';

  if (post) {
    title = `${post.title} – ${siteTitle}`;
  } else {
    title = `${siteTitle} – ${siteTagline}`;
  }

  return (
    <Head>
      <title>{title}</title>
    </Head>
  );
}
