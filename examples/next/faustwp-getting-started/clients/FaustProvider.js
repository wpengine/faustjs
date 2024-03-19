import { FaustProvider as Provider, getApolloClient } from '@faustwp/core';
import { useRouter } from 'next/router';
import { getResourcesClient } from '../clients/resources/client';

export function FaustProvider(props) {
  const { pageProps } = props;
  const router = useRouter();

  const client = router.asPath.startsWith('/resources/')
    ? getResourcesClient()
    : getApolloClient();

  return (
    <Provider pageProps={pageProps} client={client}>
      {props.children}
    </Provider>
  );
}
