---
title: "FaustProvider"
description: "Reference for the FaustProvider component that sets up Apollo Client and Faust.js context for your app."
---

`FaustProvider` is a React component that wraps your app in the context Faust.js needs. It provides the Apollo Client your components query with, the results of your templates' queries, and the toolbar when it's enabled.

## Usage

Wrap your app's `Component` with `FaustProvider` in `pages/_app.js` and pass it the `pageProps`:

```js title="pages/_app.js"
import "../faust.config";
import React from "react";
import { useRouter } from "next/router";
import { FaustProvider } from "@faustwp/core";

export default function MyApp({ Component, pageProps }) {
	const router = useRouter();

	return (
		<FaustProvider pageProps={pageProps}>
			<Component {...pageProps} key={router.asPath} />
		</FaustProvider>
	);
}
```

Import your `faust.config.js` before rendering `FaustProvider`, so your config and plugins are set before the Apollo Client is created.

## Props

Below are `FaustProvider`'s props defined as a TypeScript interface:

```ts
interface FaustProviderProps {
	children: React.ReactNode;
	pageProps: FaustPageProps;
}
```

- `children`: Your app, usually the page `Component`.
- `pageProps`: The `pageProps` that Next.js passes to your `_app.js`. `FaustProvider` reads the data that `getWordPressProps`, `getNextStaticProps` and `getNextServerSideProps` add to them.

## What it provides

`FaustProvider` renders the following around your app:

1. A Faust context that holds the results of a template's `Component.queries`. The `useFaustQuery` hook reads from this context and throws an error if it's used outside of `FaustProvider`. The stored results are replaced when you navigate to a page with new query results.
2. An Apollo [`ApolloProvider`](https://www.apollographql.com/docs/react/api/react/hooks), so Apollo hooks such as `useQuery` work anywhere in your app.
3. The Faust toolbar, when the deprecated `experimentalToolbar` option is set to `true` in your [config](/docs/reference/set-config/).

## Apollo Client

`FaustProvider` doesn't accept an Apollo Client as a prop. It creates the client from your Faust config and hydrates its cache with the Apollo state in `pageProps`. On the server it creates a new client for each render, and in the browser it reuses a single client across page navigations.

To customize the client, use a [Faust plugin](/docs/how-to/create-a-plugin/) with these filters:

- [`apolloClientOptions`](/docs/reference/faust-plugin-system-filters/#apolloclientoptions) to change the client options, such as adding links.
- [`apolloClientInMemoryCacheOptions`](/docs/reference/faust-plugin-system-filters/#apolloclientinmemorycacheoptions) to change the cache config, such as type policies.

```js title="plugins/CustomApolloPlugin.js"
import { ApolloLink } from "@apollo/client";

const loggingLink = new ApolloLink((operation, forward) => {
	console.log(`GraphQL request: ${operation.operationName}`);
	return forward(operation);
});

export class CustomApolloPlugin {
	apply({ addFilter }) {
		addFilter("apolloClientOptions", "faust", (apolloClientOptions) => ({
			...apolloClientOptions,
			link: loggingLink.concat(apolloClientOptions.link),
		}));
	}
}
```

```js title="faust.config.js"
import { setConfig } from "@faustwp/core";
import templates from "./wp-templates";
import possibleTypes from "./possibleTypes.json";
import { CustomApolloPlugin } from "./plugins/CustomApolloPlugin";

export default setConfig({
	templates,
	possibleTypes,
	plugins: [new CustomApolloPlugin()],
});
```

The filters apply to every client Faust creates, including the one `FaustProvider` provides and the client returned by `getApolloAuthClient` for authenticated requests.

If you need to query a different GraphQL API, create a separate Apollo Client and pass it to individual queries with `useQuery`'s [`client` option](https://www.apollographql.com/docs/react/api/react/hooks) instead of replacing the one `FaustProvider` provides.
