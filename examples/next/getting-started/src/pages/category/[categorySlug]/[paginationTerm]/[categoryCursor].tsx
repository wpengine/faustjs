import { GetStaticPropsContext } from 'next';
import Page from 'pages/category/[categorySlug]';
import { getNextStaticProps } from '@wpengine/headless-next';

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
  });
}

export function getStaticPaths() {
  return {
    paths: [],
    fallback: 'blocking',
  };
}
