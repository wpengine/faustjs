import { gql } from "@apollo/client";
import { PropsWithChildren } from "react";

function Component(props: PropsWithChildren<{}>) {
  return <>Archive page</>;
}

const variables = ({ uri }: any) => {
  return { uri };
};

const query = gql`
  query GetArchivePage($uri: String!) {
    nodeByUri(uri: $uri) {
      ... on Category {
        name
      }
    }
  }
`;

export default { Component, variables, query };
