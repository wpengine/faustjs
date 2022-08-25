import { PropsWithChildren } from "react";
import { gql } from "@apollo/client";
import { Header, Footer, Main, Container, EntryHeader } from "components";

function Component(props) {
  const { name } = props.data.nodeByUri;

  return (
    <>
      <Header />
      <Main>
        <>
          <EntryHeader title={`Category: ${name}`} />
          <Container>
            <>...</>
          </Container>
        </>
      </Main>
      <Footer />
    </>
  );
}

const query = gql`
  query GetArchivePage($uri: String!) {
    nodeByUri(uri: $uri) {
      ... on Category {
        name
      }
    }
  }
`;

const variables = ({ uri }) => {
  return { uri };
};

export default { Component, variables, query };
