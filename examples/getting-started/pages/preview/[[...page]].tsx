import React from 'react';
import {
  NextTemplateLoader,
  getNextServerSideProps,
} from '@wpengine/headless/next';

import WPTemplates from '../../wp-templates/_loader';
import { GetServerSidePropsContext } from 'next';

/**
 * @todo make conditionalTags available
 */
export default function Page() {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  return <NextTemplateLoader templates={ WPTemplates } />;
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  return getNextServerSideProps(context, {
    templates: WPTemplates,
  });
}
