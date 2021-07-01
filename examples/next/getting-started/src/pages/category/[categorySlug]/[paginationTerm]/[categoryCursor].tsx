import { GetStaticPropsContext } from 'next';
import Page from 'pages/category/[categorySlug]';
import { getNextStaticProps } from '@faustjs/next';
import { client } from 'client';

export default Page;

export async function getStaticProps(context: GetStaticPropsContext) {
  const { paginationTerm } = context.params;
  if (!(paginationTerm === 'after' || paginationTerm === 'before')) {
    return {
      notFound: true,
    };
  }

  return getNextStaticProps(context, {
    Page,
    client,
  });
}

export function getStaticPaths() {
  return {
    paths: [],
    fallback: 'blocking',
  };
}
