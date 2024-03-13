import { HttpLink } from '@apollo/client';
import {
  getWordPressProps,
  WordPressTemplate,
  getApolloClient,
} from '@faustwp/core';

export default function Page(props) {
  return <WordPressTemplate {...props} />;
}

export function getStaticProps(ctx) {
  /**
   * For pages under "/resources/*", modify the client.
   */
  if (ctx.params.wordpressNode[0] === 'resources') {
    const client = getApolloClient();
    // modify existing client or provide your own
    // client.link = new HttpLink()

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
