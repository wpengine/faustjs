# Fetching WordPress Data With @wpengine/headless

**NOTE: This is prerelease software. As we work towards our first release, we will 💯 introduce breaking changes.**

In this guide we will talk about customizing GQL queries in your app. This app will go over how to do this in client-side queries as well as server-side queries if you are building an app with Next.js.

This guide assumes you have setup an initial application using `@wpengine/headless`. Please refer to the [Getting Started](/docs/getting-started/) guide if you need help setting up a project.

## Typical Queries

There are multiple ways to query your WordPress GraphQL API, and the framework provides you with some simple helper functions to get you started. The framework has built-in functions to support the following queries:

  1. Getting a list of posts
  1. Getting a single post or page
  1. Getting information about a URI
  1. Getting general WordPress settings

For this guide let's focus on the first two types of queries.

### Getting A List Of Posts

One of the most common scenarios when building a headless WordPress site is displaying a list of your posts. The framework provides an abstraction around this API request, with some sensible defaults. Depending upon the libraries and tools you are using to build your app, you can take advantage of one of the following:

#### getPosts

```tsx
import { getApolloClient, getPosts } from '@wpengine/headless';

// ...

const client = getApolloClient();
const postsData = await getPosts(client);

console.log(postsData);
```

The code above is the simplest example of using `getPosts` to make a query. This will work with any frontend toolset, and uses `@apollo/client` to make a GraphQL request to your WordPress GraphQL API. When you make the query without configuration it will request a default set of fields to be returned from the query. You can find these fields in `/packages/headless/src/api/queries/LIST_POST_DATA_FRAGMENTS.ts` and you can find the query in `/packages/headless/src/api/queries/getPosts.ts`. [Custom queries](#custom-queries) will be described later in this guide. The call to `getPosts` returns a type `WPGraphQL.RootQueryToPostConnection`, which can be found in `/packages/headless/src/types/wpgraphql.d.ts`. Assuming you are using TypeScript and a supported IDE you will get intellisense for the response.

> **NOTE:** In the code above, the call to `getApolloClient` expects an optional `context` value. You can ignore this if you are working strictly client-side. If you are making server-side requests you will want to use an Apollo client that persists for the duration of each request. In this case `context` should be your persistent object. In Next.js this will be the `context` value that is passed in `getStaticProps` or `getServerSideProps`. However, if you are using some other framework or vanilla Node you could also send in the `request` object.

#### usePosts

```tsx
import { usePosts } from '@wpengine/headless/react';

// ...
export default function Component() {
  const postsData = usePosts();

  console.log(postsData);
}
```

The code above is intended to be used in a React app. The framework provides a `usePosts` hook that acts exactly as the `getPosts` function, but works as a React hook. `usePosts` is the recommended way to make requests for posts when using React.

#### getContentNode

```tsx
import { getApolloClient, getContentNode } from '@wpengine/headless';

// ...

const client = getApolloClient();
const postData = await getContentNode(client, {
  variables: {
    id: '/hello-world',
  },
});

console.log(postData);
```

The code above is the simplest example of using `getContentNode` to make a query. You must pass in at least the `id` variable. The variables you can pass in are defined on `WPGraphQL.RootQueryContentNodeArgs`, which can be found in `/packages/headless/src/types/wpgraphql.d.ts`. `getContentNode` works for WordPress pages and posts, and will return a default set of fields for each. As with [`getPosts`](#getPosts), `getContentNode` expects the Apollo client in order to make queries.

#### usePost

```tsx
import { usePost } from '@wpengine/headless/react';

// ...
export default function Component() {
  const postData = usePost();

  console.log(postData);
}
```

The code above is intended to be used in a React app. The framework provides a `usePost` hook that acts exactly as the `getContentNode` function, but works as a React hook. `usePost` is the recommended way to make requests for posts when using React. With `usePost` you do not need to specify an `id` variable. If you leave out the options `usePost` will use the current URL to determine what post to fetch.

**If you are using Next.js** you should take advantage of the Next-specific `usePost` hook as follows:

```tsx
import { usePost } from '@wpengine/headless/next';

// ...
export default function Component() {
  const postData = usePost();

  console.log(postData);
}
```

The advantage of using the Next-specific `usePost` query is that it will work with Next's functionality for previewing posts.

## Custom Queries

Now that you are familiar with some of the basic queries the framework offers, let's take a look at how you might customize them. You can customize the fields returned from the queries as well as the variables passed in. The framework chooses a default set of fields, and some default arguments. These can be overridden by passing options into the corresponding functions.

### Customizing getPosts and usePosts

```tsx
import { getApolloClient, getPosts } from '@wpengine/headless';
import { gql } from '@apollo/client';

// ...

const client = getApolloClient();
const postsData = await getPosts(client, {
  fragments: {
    listPostData: gql`
      fragment listPostData on Post {
        title
        excerpt
        uri
      }
    `
  },
  variables: {
    first: 3,
  }
});

console.log(postsData);
```

The above code demonstrates how you can call `getPosts` and configure both the fields that are returned on each post as well as the number of posts that are returned. For variables, you are able to send in every variable that is accepted on the WPGraphQL `posts` query. For a look at what those are, look at `WPGraphQL.RootQueryPostsArgs` in `/packages/headless/src/types/wpgraphql.d.ts`.

The above code specifies the `listPostData` fragment, which will be used to retrieve the specified fields in the GQL query. If you specify a fragment it will override the default fragment. Your fragment **must be named listPostData** in order for it to work properly.

> **NOTE:** If you are using React/Next.js, `usePosts` takes the same arguments.

### Customizing getContentNode and usePost

```tsx
import { getApolloClient, getContentNode } from '@wpengine/headless';
import { gql } from '@apollo/client';

// ...

const client = getApolloClient();
const postData = await getContentNode(client, {
  fragments: {
    postData: gql`
      fragment postData on Post {
        title
        content
      }
    `,
    pageData: gql`
      fragment pageData on Page {
        title
        content
      }
    `,
  },
  variables: {
    id: '/hello-world',
    idType: 'URI',
  }
});

console.log(postData);
```

The above code demonstrates how you can call `getContentNode` and configure both the fields that are returned on the post or page as well as what post or page to fetch. For variables, you are able to send in every variable that is accepted on the WPGraphQL `contentNode` query. For a look at what those are, look at `WPGraphQL.RootQueryContentNodeArgs` in `/packages/headless/src/types/wpgraphql.d.ts`.

The above code specifies the `postData` fragment and `pageData` fragment, which will be used to retrieve the specified fields in the GQL query. If you specify a fragment it will override the default fragment. Your fragments **must be named postData or pageData** in order for them to work properly.

> **NOTE:** If you are using React/Next.js, `usePost` takes the same arguments.

### Custom Queries With Apollo

Note that while you can take advantage of some of the functions built into the framework for querying posts and pages, you can also use the Apollo client to make any other requests. When you call `getApolloClient` you will be provided with an Apollo client that is bound to your configured WordPress instance.

### Customizing Server-Side Fragments With Next.js

If you are writing a Next.js app and want to take advantage of Server-Side Rendering (SSR) or Static Site Generation (SSG) you can still customize the queries you want to make during `getServerSideProps` or `getStaticProps`. The framework provides two functions for setting up SSR and SSG as well as configuring queries ahead of time. Those functions are `getNextStaticProps` and `getNextServerSideProps`. Both functions operate the same, but `getNextStaticProps` is used with `getStaticProps` and `getNextServerSideProps` is used with `getServerSideProps`.

```tsx
import {
  NextTemplateLoader,
  getNextStaticPaths,
  getNextStaticProps,
} from '@wpengine/headless/next';
import { getApolloClient } from '@wpengine/headless';
import { usePosts } from '@wpengine/headless/react';
import { GetStaticPropsContext } from 'next';
import { gql, useQuery } from '@apollo/client';
import WPTemplates from '../wp-templates/_loader';

const menusQuery = gql`
  {
    menus {
      edges {
        node {
          menuItems {
            edges {
              node {
                url
                title
                label
              }
            }
          }
        }
      }
    }
  }
`;

export default function MyComponent() {
  const posts = usePosts();
  const menus = useQuery(menusQuery)

  // ...
}

export async function getStaticProps(context: GetStaticPropsContext) {
  const client = getApolloClient(context);
  await client.query({
    query: menusQuery
  });

  return getNextStaticProps(context, {
    templates: WPTemplates,
    queries: {
      posts: {
        fragments: {
          listPostData: gql`
            fragment listPostData on Post {
              title
              excerpt
              uri
            }
          `,
        },
      },
    },
  });
}
```

The above code does a few things. First, it gets a Next context-bound Apollo client. Then, it makes a query with the Apollo client. Finally, it calls `getNextStaticProps` and configures the fragment it wants to use for the `posts` query. Note that in MyComponent it simply calls `usePosts`. The call to `usePosts` will end up getting the posts with the configured fields from the Apollo client cache.

You can configure `getNextStaticProps` and `getNextServerSideProps` exactly the same way.

> **NOTE:** The order of operations matters in `getStaticProps` and `getServerSideProps`. In the code above `getNextStaticProps` is the final call in the function. In the `getNextStaticProps` it handles caching the Apollo client and storing it on props (among other things). This is how you can make a query with the Apollo client, and then make the same query from your component and it won't have to make a client-side API call.
