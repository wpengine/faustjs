import '../faustnx.config';
import { getWordPressProps, WordPressTemplate } from 'faust-nx';
import client from '../client';

export default function Page(props) {
  return <WordPressTemplate {...props} />;
}

export function getStaticProps(ctx) {
  return getWordPressProps({ client, ctx });
}

export async function getStaticPaths() {
  return {
    paths: [],
    fallback: 'blocking',
  };
}
