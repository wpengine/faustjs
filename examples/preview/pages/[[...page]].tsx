import React from 'react';
import { TemplateLoader, initializeNextStaticProps } from '@wpengine/headless';

/**
 * @todo make conditionalTags available
 */
export default function Page({ ...props }) {
  return <TemplateLoader />;
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
