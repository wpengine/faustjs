import { gql } from "@apollo/client";
import { PropsWithChildren } from "react";

export default function Component(props: PropsWithChildren<{}>) {
  return <>Archive page</>;
}

Component.variables = ({ uri }: any) => {
  return { uri };
};

Component.query = gql`
  query GetArchivePage($uri: String!) {
    nodeByUri(uri: $uri) {
      ... on Category {
        name
      }
    }
  }
`;
