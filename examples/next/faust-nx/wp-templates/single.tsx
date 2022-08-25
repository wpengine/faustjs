import { gql } from '@apollo/client';
import { Header, Footer, Main, Container, EntryHeader, ContentWrapper } from "components";

const Component = (props: any) => {
  const { title, content } = props.data.post;

  console.log({props});

  return (
    <>
      <Header />
      <Main>
        <>
          <EntryHeader title={title} />
          <Container>
            <ContentWrapper content={content} />
          </Container>
        </>
      </Main>
      <Footer />
    </>
  );
};

const query = gql`
  query GetPost($uri: ID!) {
    post(id: $uri, idType: URI) {
      title
      content
    }
  }
`;

const variables = (seedQuery: any) => {
  console.log(seedQuery);

  return {
    uri: seedQuery.uri,
  };
};

export default { Component, variables, query };
