import 'faustnx.config';
import { getWordPressProps, WordPressTemplate } from 'faust-nx';
import { GetStaticPropsContext } from 'next';

export default function Page(props: any) {
  return <WordPressTemplate {...props} />;
}

export function getStaticProps(ctx: GetStaticPropsContext) {
  return getWordPressProps({ ctx });
}

export async function getStaticPaths() {
  return {
    paths: [],
    fallback: 'blocking',
  };
}
