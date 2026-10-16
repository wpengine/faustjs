---
title: "Use Multiple Queries in a Template"
description: "Guide to splitting a Faust.js template's data into several GraphQL queries with Component.queries and reading each result with useFaustQuery."
---

A template can run several GraphQL queries instead of one. This lets you reuse a query across templates, such as a layout query for the site title and menus, and keep a separate query for the content of the post, page or archive being rendered.

Define the queries in a static `Component.queries` array, then read each result with the `useFaustQuery` hook.

## 0. Prerequisites

If you haven't already, follow the [Basic Setup](/docs/how-to/basic-setup/) steps to get Faust.js set up, and make sure your app renders templates from `wp-templates` through [`getWordPressProps`](/docs/reference/get-wordpress-props/) and `WordPressTemplate`.

## 1. Create a reusable query

Put the query you want to share in its own file so every template can import it. This layout query fetches the site's general settings and two menus:

```js title="fragments/LayoutQuery.js"
import { gql } from "@apollo/client";

export const GET_LAYOUT_QUERY = gql`
	query GetLayout(
		$headerLocation: MenuLocationEnum
		$footerLocation: MenuLocationEnum
	) {
		generalSettings {
			title
			description
		}
		headerMenuItems: menuItems(where: { location: $headerLocation }) {
			nodes {
				id
				uri
				label
			}
		}
		footerMenuItems: menuItems(where: { location: $footerLocation }) {
			nodes {
				id
				uri
				label
			}
		}
	}
`;
```

## 2. Add the queries to the template

In the template, list each query in `Component.queries`. Each entry has a `query` and an optional `variables` function:

```js title="wp-templates/single.js"
import { gql } from "@apollo/client";
import { GET_LAYOUT_QUERY } from "../fragments/LayoutQuery";

const GET_POST_QUERY = gql`
	query GetPost($databaseId: ID!, $asPreview: Boolean = false) {
		post(id: $databaseId, idType: DATABASE_ID, asPreview: $asPreview) {
			title
			content
		}
	}
`;

export default function Component(props) {
	// We'll fill this in next.
}

Component.queries = [
	{
		query: GET_LAYOUT_QUERY,
		variables: () => ({
			headerLocation: "PRIMARY",
			footerLocation: "FOOTER",
		}),
	},
	{
		query: GET_POST_QUERY,
		variables: ({ databaseId }, ctx) => ({
			databaseId,
			asPreview: ctx?.asPreview,
		}),
	},
];
```

Each `variables` function receives the same arguments as `Component.variables`: the [seed node](/docs/explanation/seed-query/), a context object with `asPreview` and `locale`, and any [`extra` arguments](/docs/reference/get-wordpress-props/#passing-extra-arguments) passed to `getWordPressProps`.

Faust runs all of the queries at the same time and stores each result for the template to read.

## 3. Read the results with `useFaustQuery`

Call `useFaustQuery` with the same query you listed in `Component.queries` to get its data:

```js title="wp-templates/single.js"
import { gql } from "@apollo/client";
import { useFaustQuery } from "@faustwp/core";
import { GET_LAYOUT_QUERY } from "../fragments/LayoutQuery";

// GET_POST_QUERY from step 2

export default function Component(props) {
	const { post } = useFaustQuery(GET_POST_QUERY) ?? {};
	const { generalSettings, headerMenuItems, footerMenuItems } =
		useFaustQuery(GET_LAYOUT_QUERY) ?? {};

	// Loading state for previews
	if (props.loading) {
		return <>Loading...</>;
	}

	return (
		<>
			<header>
				<h1>{generalSettings?.title}</h1>
				<nav>
					{headerMenuItems?.nodes?.map((item) => (
						<a key={item.id} href={item.uri}>
							{item.label}
						</a>
					))}
				</nav>
			</header>
			<main>
				<h2>{post?.title}</h2>
				<div dangerouslySetInnerHTML={{ __html: post?.content ?? "" }} />
			</main>
			<footer>
				{footerMenuItems?.nodes?.map((item) => (
					<a key={item.id} href={item.uri}>
						{item.label}
					</a>
				))}
			</footer>
		</>
	);
}

// Component.queries from step 2
```

`useFaustQuery` returns `undefined` until the query has data, for example while a preview loads in the browser, so fall back to an empty object as shown above. Call it before any early return, since it's a React hook. It reads from `FaustProvider`, so it throws if your app isn't wrapped in `FaustProvider` as shown in [Basic Setup](/docs/how-to/basic-setup/).

> [!note] Learn More
> The [getting started example](https://github.com/wpengine/faustjs/tree/canary/examples/next/faustwp-getting-started/wp-templates) uses `Component.queries` with a shared layout query in each of its templates.

## How `Component.queries` differs from `Component.query`

- **Use one or the other.** A template can define `Component.query` or `Component.queries`, not both. Faust throws ``Only either `Component.query` or `Component.queries` can be provided, but not both.`` if it finds both.
- **Results come from `useFaustQuery`, not `props.data`.** `props.data` is only filled in for `Component.query`.
- **Queries run again in the browser.** After the page loads, Faust runs the queries again in the browser, and on previews it only runs them there. In the browser, the `variables` functions receive the seed node and `asPreview`, but not `locale` or `extra`.
- **Each query can only be listed once.** Faust stores results by the query's text, so listing the same query twice with different variables keeps only the last result. To fetch the same data with different variables, define a second query with a different operation name. See [#1742](https://github.com/wpengine/faustjs/issues/1742).
