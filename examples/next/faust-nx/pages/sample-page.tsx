import { GetStaticPropsContext } from 'next';
import { getNextStaticProps } from 'faust-nx';
import { useQuery, gql } from '@apollo/client';

export default function Page(props: any) {
  const { data } = useQuery(Page.query);
  const title = data?.page?.title;
  const content = data?.page?.content;
  return (
    <div>
      <h1>{title}</h1>
      <div dangerouslySetInnerHTML={{ __html: content }} />
    </div>
  );
}

Page.query = gql`
  query SamplePage {
    page(id: "sample-page", idType: URI) {
      title
      content
    }
  }
`;

export function getStaticProps(ctx: GetStaticPropsContext) {
  return getNextStaticProps(ctx, {
    Page: Page,
  });
}
