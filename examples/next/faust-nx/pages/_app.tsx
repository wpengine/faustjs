import client from "client";
import { FaustNXProvider } from "faust-nx";
import type { AppProps } from "next/app";

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <FaustNXProvider client={client} pageProps={pageProps}>
      <Component {...pageProps} />
    </FaustNXProvider>
  );
}
