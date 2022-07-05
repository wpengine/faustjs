import { getWordPressProps, WordPressTemplate } from 'faust-nx';
import { GetStaticPropsContext } from 'next';
import templates from 'wp-templates';
import client from 'client';

export default function Page(props: any) {
  return <WordPressTemplate templates={templates} {...props} />;
}

export function getStaticProps(ctx: GetStaticPropsContext) {
  return getWordPressProps({ client, templates, ctx });
}

export async function getStaticPaths() {
  return {
    paths: [],
    fallback: 'blocking',
  };
}
