import { gql } from '@apollo/client';

export default function Component({ loading, data }) {
  // Loading state for previews
  if (loading) {
    return <>Loading...</>;
  }

  const { title, content } = data?.page ?? { title: '' };

  return (
    <>
      <h1>{title}</h1>
      <div dangerouslySetInnerHTML={content} />
    </>
  );
}

Component.variables = ({ databaseId }, ctx) => {
  return {
    databaseId,
    asPreview: ctx?.asPreview,
  };
};

Component.query = gql`
  query GetPageData(
    $databaseId: ID!
    $asPreview: Boolean = false
  ) {
    page(id: $databaseId, idType: DATABASE_ID, asPreview: $asPreview) {
      title
      content
    }
  }
`;
