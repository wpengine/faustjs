import '../styles/index.css'
import { ApolloProvider } from '@apollo/client'
import { useApollo } from '../lib/apollo'

function MyApp({ Component, pageProps }) {
  const apolloClient = useApollo(pageProps)

  return (
    <ApolloProvider client={apolloClient}>
      <Component {...pageProps} />
    </ApolloProvider>
  )
}

export default MyApp
