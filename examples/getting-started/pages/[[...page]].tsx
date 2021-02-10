import React from 'react';
import {
  getApolloClient,
  gql,
  useQuery,
} from '@wpengine/headless';
import {
  NextTemplateLoader,
  getNextStaticPaths,
  getNextStaticProps,
} from '@wpengine/headless/next';

import WPTemplates from '../wp-templates/_loader';
import { GetStaticPropsContext } from 'next';

const query = gql`
  query MyQuery {
    allSettings {
      generalSettingsUrl
      generalSettingsTitle
    }
  }
`;

/**
 * @todo make conditionalTags available
 */
export default function Page() {
  const result = useQuery(query);

  console.log(result);
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  return <NextTemplateLoader templates={ WPTemplates } />;
}

/**
 * @todo Show how to switch between static and SSR
 */

export async function getStaticProps(context: GetStaticPropsContext) {
  const apollo = getApolloClient(context);
  await apollo.query({ query });

  return getNextStaticProps(context, {
    templates: WPTemplates,
  });
}

export function getStaticPaths() {
  return getNextStaticPaths();
}
