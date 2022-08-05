import 'faustnx.config';
import { getWordPressProps, WordPressTemplate } from 'faust-nx';
import { GetServerSidePropsContext } from 'next';
import client from 'client';

export function getServerSideProps(ctx: GetServerSidePropsContext) {
  return getWordPressProps({ client, ctx });
}

export default function Preview(props: any) {
  return <WordPressTemplate {...props} />;
}
