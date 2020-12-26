/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { useNextUriInfo, initializeNextStaticProps } from '@wpengine/headless';
import Posts from '../lib/components/Posts';
import Post from '../lib/components/Post';

export default function Page() {
  const pageInfo = useNextUriInfo();

  if (!pageInfo) {
    return <></>;
  }

  if (pageInfo.isPostsPage) {
    return <Posts />;
  }

  return <Post />;
}

/**
 * @todo Show how to switch between static and SSR
 */

export function getStaticProps(context: any) {
  return initializeNextStaticProps(context);
}

export function getStaticPaths() {
  return {
    paths: ['/'],
    fallback: true,
  };
}
