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

Component.variables = ({ uri }: any, ctx: { asPreview: boolean }) => {
  const { asPreview } = ctx;
  return { uri, asPreview };
};

Component.query = gql`
  query GetPage($uri: ID!, $asPreview: Boolean) {
    page(id: $uri, idType: URI, asPreview: $asPreview) {
      title
      content
    }
  }
`;
