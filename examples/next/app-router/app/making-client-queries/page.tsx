'use client';

import { gql, useQuery } from '@apollo/client';

/**
 * You can make client side queries as well with Apollo's `useQuery` hook within
 * a client component ('use client' directive). Just make sure the <FaustProvider>
 * is wrapping the app (in app/layout.js)
 */

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
