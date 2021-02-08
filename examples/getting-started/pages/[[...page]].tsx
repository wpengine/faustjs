import React from 'react';
import {
  NextTemplateLoader,
  initializeNextStaticProps,
  initializeNextStaticPaths,
} from '@wpengine/headless';

import WPTemplates from '../wp-templates/_loader';

/**
 * @todo make conditionalTags available
 */
export default function Page() {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  return <NextTemplateLoader templates={WPTemplates} />;
}

/**
 * @todo Show how to switch between static and SSR
 */

export function getStaticProps(context: any) {
  return initializeNextStaticProps(context, WPTemplates);
}

export function getStaticPaths() {
  return initializeNextStaticPaths();
}
