import { FaustProvider as Provider, getApolloClient } from '@faustwp/core';
import { useRouter } from 'next/router';
import { getDocsClient } from '../clients/docs/client.js'

export function FaustProvider(props) {
  const { pageProps } = props;
  const router = useRouter();

  const client = router.asPath.startsWith('/docs/')
    ? getDocsClient()
    : getApolloClient();

  return (
    <Provider pageProps={pageProps} client={client}>
      {props.children}
    </Provider>
  );
}
