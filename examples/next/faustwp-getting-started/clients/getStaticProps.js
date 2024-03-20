import { getWordPressProps, WordPressTemplate } from '@faustwp/core';
import { getDocsClient } from '../clients/docs/client.js';

export function getStaticProps(ctx) {
  /**
   * For pages under "/resources/*", modify the client.
   */
  if (ctx.params.wordpressNode[0] === 'docs') {
    const client = getDocsClient();

    // getWordPressProps accepts an optional client
    return getWordPressProps({ ctx, client });
  }

  return getWordPressProps({ ctx });
}

