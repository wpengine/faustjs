import 'faustnx.config';
import { getWordPressProps, WordPressTemplate, usePreviewNode } from 'faust-nx';
import { GetServerSidePropsContext } from 'next';
import client from 'client';

export function getServerSideProps(ctx: GetServerSidePropsContext) {
  return getWordPressProps({ client, ctx });
}

export default function Preview(props: any) {
  const { node } = usePreviewNode();

  if (node === null) {
    return <p>Post not found</p>;
  }

  return <WordPressTemplate {...props} />;
}
