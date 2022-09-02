import { gql } from '@apollo/client';

export default function Component(props: any) {
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
}

Component.query = gql`
  query GetPost($databaseId: ID!, $asPreview: Boolean) {
    post(id: $databaseId, idType: DATABASE_ID, asPreview: $asPreview) {
      title
      content
      date
    }
  }
`;

Component.variables = (seedQuery: any, asPreview: boolean) => {
  return {
    asPreview,
    databaseId: seedQuery.databaseId,
  };
};
