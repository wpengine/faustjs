import { getNextStaticProps } from '@wpengine/headless-next';
import { GetStaticPropsContext } from 'next';
import Page from '..';

export default Page;

export async function getStaticProps(context: GetStaticPropsContext) {
  return getNextStaticProps(context, {
    Page,
  });
}

export function getStaticPaths() {
  return {
    paths: [],
    fallback: 'blocking',
  };
}
