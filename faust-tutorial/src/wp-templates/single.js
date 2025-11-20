import { gql } from "@apollo/client";

export default function SingleTemplate(props) {
  const { title, content } = props.data.post;

  return (
    <>
      <h1>{title}</h1>
      <div dangerouslySetInnerHTML={{ __html: content }} />
    </>
  );
}

SingleTemplate.query = gql`
  query GetPost($uri: ID!) {
    post(id: $uri, idType: URI) {
      title
      content
    }
  }
`;

SingleTemplate.variables = (seedQuery, ctx) => {
  return {
    uri: seedQuery?.uri,
  };
};
