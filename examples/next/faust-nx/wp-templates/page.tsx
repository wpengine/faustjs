import { gql } from '@apollo/client';

export default function Component(props: any) {
  const { title, content } = props?.data?.page;
  return (
    <>
      <h1>{title}</h1>
      <div dangerouslySetInnerHTML={{ __html: content }} />
    </>
  );
};

Component.variables = ({ uri }: any) => {
  return { uri };
};

Component.query = gql`
  query GetPage($uri: ID!) {
    page(id: $uri, idType: URI) {
      title
      content
    }
  }
`;

