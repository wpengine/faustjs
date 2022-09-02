import { gql } from '@apollo/client';

const Component = (props: any) => {
  if (props.loading) {
    return <>Loading...</>;
  }

  const { title, content } = props.data.post;

  return (
    <>
      <h1>{title}</h1>
      <div dangerouslySetInnerHTML={{ __html: content }} />
    </>
  );
};

const query = gql`
  query GetPost($databaseId: ID!, $asPreview: Boolean) {
    post(id: $databaseId, idType: DATABASE_ID, asPreview: $asPreview) {
      title
      content
      date
    }
  }
`;

const variables = (seedQuery: any, asPreview: boolean) => {
  return {
    asPreview,
    databaseId: seedQuery.databaseId,
  };
};

export default { Component, variables, query };
