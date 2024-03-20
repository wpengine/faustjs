import { getWordPressProps, WordPressTemplate } from '@faustwp/core';
import { getDocsClient } from '../clients/docs/client.js';
import { getStaticProps as getStaticPropsMultipleClients } from '../clients/getStaticProps.js'

export default function Page(props) {
  return <WordPressTemplate {...props} />;
}

export function getStaticProps(ctx) {
  return getStaticPropsMultipleClients(ctx)
}

export async function getStaticPaths() {
  return {
    paths: [],
    fallback: 'blocking',
  };
}
