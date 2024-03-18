import { getWordPressProps, WordPressTemplate } from '@faustwp/core';
import { getResourcesClient } from '../clients/resources/client';

export default function Page(props) {
  return <WordPressTemplate {...props} />;
}

export function getStaticProps(ctx) {
  /**
   * For pages under "/resources/*", modify the client.
   */
  if (ctx.params.wordpressNode[0] === 'resources') {
    const client = getResourcesClient();

    // getWordPressProps accepts an optional client
    return getWordPressProps({ ctx, client });
  }

  return getWordPressProps({ ctx });
}

export async function getStaticPaths() {
  return {
    paths: [],
    fallback: 'blocking',
  };
}
