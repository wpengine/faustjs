import { gql } from '@apollo/client';

export default function Component(props: any) {
  const { title, content } = props.data.post;

  return (
    <>
      <h1>{title}</h1>
      <div dangerouslySetInnerHTML={{ __html: content }} />
    </>
  );
};

Component.query = gql`
  query GetPost($uri: ID!) {
    post(id: $uri, idType: URI) {
      title
      content
    }
  }
`;

Component.variables = (seedQuery: any) => {
  console.log(seedQuery);

  return {
    uri: seedQuery.uri,
  };
};
