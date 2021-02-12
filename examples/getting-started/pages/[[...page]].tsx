import React from 'react';
import {
  NextTemplateLoader,
  getNextStaticPaths,
  getNextStaticProps,
} from '@wpengine/headless/next';

import WPTemplates from '../wp-templates/_loader';
import { GetStaticPropsContext } from 'next';

/**
 * @todo make conditionalTags available
 */
export default function Page() {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  return <NextTemplateLoader templates={ WPTemplates } />;
}

export async function getStaticProps(context: GetStaticPropsContext) {
  return getNextStaticProps(context, {
    templates: WPTemplates,
  });
}

export function getStaticPaths() {
  return getNextStaticPaths();
}
