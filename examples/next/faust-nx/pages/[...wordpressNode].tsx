import 'faustnx.config';
import { getWordPressProps, WordPressTemplate } from 'faust-nx';
import { GetStaticPropsContext } from 'next';
import client from 'client';

export default function Page(props: any) {
  return <WordPressTemplate {...props} />;
}

export function getStaticProps(ctx: GetStaticPropsContext) {
  return getWordPressProps({ client, ctx });
}

export async function getStaticPaths() {
  return {
    paths: [],
    fallback: 'blocking',
  };
}
