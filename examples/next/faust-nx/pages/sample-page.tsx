import { GetStaticPropsContext } from 'next';
import { getNextStaticProps } from 'faust-nx';
import { useQuery, gql } from '@apollo/client';
import client from 'client';

export default function Page(props: any) {
  const {data} = useQuery(Page.query);
  const title = data?.page?.title;
  return <div>{title}</div>
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
    client: client,
    Page,
  });
}
