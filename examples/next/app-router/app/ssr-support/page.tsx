'use client';

import { gql, useQuery } from '@apollo/client';

export default function Page() {
  const { data } = useQuery(gql`
    query MyQuery {
      generalSettings {
        title
      }
    }
  `);

  return <>{data?.generalSettings?.title}</>;
}
