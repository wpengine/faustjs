import { gql } from '@apollo/client';

export default function Component(props: any) {
  if (props.loading) {
    return <>Loading...</>;
  }

  const { title, content } = props.data.page;

  return (
    <>
      <h1>{title}</h1>
      <div dangerouslySetInnerHTML={{ __html: content }} />
    </>
  );
}

Component.variables = (seedQuery: any, ctx: { asPreview: boolean }) => {
  const { asPreview } = ctx;
  const { databaseId } = seedQuery;

  return { databaseId, asPreview };
};

Component.query = gql`
  query GetPage($databaseId: ID!, $asPreview: Boolean) {
    page(id: $databaseId, idType: DATABASE_ID, asPreview: $asPreview) {
      title
      content
    }
  }
`;
