'use client';

import { gql, useQuery } from '@apollo/client';

export default function Page() {
  const res = useQuery(
    gql`
      query GetPage {
        generalSettings {
          title
        }
      }
    `,
  );

  return <div>{res?.data?.generalSettings?.title}</div>;
}
