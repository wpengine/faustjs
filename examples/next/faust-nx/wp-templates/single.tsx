import { gql } from '@apollo/client';

const Component = (props: any) => {
  const { title, content } = props.data.post;

  return (
    <>
      <h1>{title}</h1>
      <div dangerouslySetInnerHTML={{ __html: content }} />
    </>
  );
};

const query = gql`
  query GetPost($uri: ID!) {
    post(id: $uri, idType: URI, isPreview: $isPreview) {
      title
      content
    }
  }
`;

const variables = (seedQuery: any, isPreview: boolean) => {
  console.log(seedQuery);

  return {
    isPreview,
    uri: seedQuery.uri,
  };
};

export default { Component, variables, query };
