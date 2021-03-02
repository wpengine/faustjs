# Previews in Headless WordPress

**NOTE: This is prerelease software. As we work towards our first release, we will 💯 introduce breaking changes.**

In this guide, we'll walk through how to configure a Next.js site for previews.

We're going to use Next with TypeScript for this example.

```bash
npx create-next-app previews
cd previews
rm -r ./pages/*
npm i @wpengine/headless @apollo/client graphql
npm i typescript @types/react @types/react-dom @types/node -D
```

TL;DR
Checkout the [example project](/examples/preview) to see how it works.

## WPE Headless Plugin

In order to enable previews in WordPress, you'll first need to install the [wpe-headless plugin](https://wp-product-info.wpesvc.net/v1/plugins/wpe-headless?download). You also need to install [WPGraphQL](https://wordpress.org/plugins/wp-graphql/).

The plugin enables an OAuth flow for users to authenticate with WordPress and receive an access token which is used for subsequent API calls (i.e. GQL/REST).

In addition, the plugin will rewrite URLs in WordPress so that when a user clicks view/preview on a post, they will be taken to the frontend rather than WP.

### Plugin Settings

Go to Settings->Headless to view the plugin's settings page:

![Headless Plugin Menu](/docs/previews/headless-settings.jpg)

There are 2 settings that assist in previews. The first setting is the location of your frontend. You'll need to enter a `Front-end site URL`, which will be `http://localhost:3000` for this example.

The second one is read-only. It gives you an API secret key that you need to use on your backend for your frontend.

![Headless Plugin Auth Settings](/docs/previews/headless-settings-auth.jpg)

## Headless Framework (@wpengine/headless)

The `@wpengine/headless` package provides helpers to get previews working in a React application.

Install the npm package via:

```bash
npm i @wpengine/headless
```

The package contains an auth handler to get an access token for a user when trying to view a preview/draft post as well as React hooks to pull post(s).

### Authorization Flow

In order to submit secure requests to WordPress, we need to be able to verify that a user has access to the content that is being requested. The plugin exposes routes that allow us to create access codes and exchange them for access tokens.

The flow looks like this:

- User makes a request to a secure route (i.e. draft post)
- User is redirected to WordPress to login
- WordPress redirects back to frontend with a temporary code
- The frontend server exchanges the code for an access token
- The access token is stored in a cookie
- The user is finally redirected back to the original URL and uses the access token in the cookie to make the authenticated request

The framework provides a Node.js auth handler to do the exchange for you.

### Auth Handler

In order to support the exchange of the access code for an access token, the framework provides a Node authorization handler:

```ts
import { authorizeHandler } from '@wpengine/headless';
```

`authorizeHandler` accepts a Node request (IncomingMessage) and response (ServerResponse) and will work with any Node-based server library.

In order to enable the handler in Next, create a new API route:

`/pages/api/auth/wpe-headless.ts`

```ts
import { authorizeHandler } from '@wpengine/headless';

export default authorizeHandler;
```

### Next Integration

The framework provides a provider and hooks that assist in routing and server side rendering.

#### HeadlessProvider

The provider is the glue that allows the framework to communicate with WordPress. To set it up, create `/pages/_app.tsx`.

```tsx
import React from 'react';
import { AppContext, AppInitialProps } from 'next/app';
import { HeadlessProvider } from '@wpengine/headless/react';

export default function App({
  Component,
  pageProps,
}: AppContext & AppInitialProps) {
  return (
    <HeadlessProvider pageProps={pageProps}>
      <Component {...pageProps} />
    </HeadlessProvider>
  );
}
```

#### Routes and Hooks

For this example, we're only going to need two pages. One page will handle all of our public routes (`/pages/[[...page]].tsx`) and another will handle our preview routes (`/pages/preview/[[...page]].tsx`). `[[...page]].tsx` is a catch-all route in Next. We'll use hooks provided by the framework to load the right content for each URL. Below is what will go in `/pages/[[...page]].tsx`:

```tsx
import React from 'react';
import {
  useUriInfo,
  getNextStaticPaths,
  getNextStaticProps,
} from '@wpengine/headless/next';
import { GetStaticPropsContext } from 'next';
import Posts from '../lib/components/Posts';
import Post from '../lib/components/Post';

export default function Page() {
  const pageInfo = useUriInfo();

  if (!pageInfo) {
    return <></>;
  }

  if (pageInfo.isPostsPage) {
    return <Posts />;
  }

  return <Post />;
}

export function getStaticPaths() {
  return getNextStaticPaths();
}

export function getStaticProps(context: GetStaticPropsContext) {
  return getNextStaticProps(context);
}
```

`getNextStaticProps` is used to allow for Static Site Generation. It knows how to get URL information on the server so that we can query WP and pull the right `pageInfo` on the initial request. This is critical for SEO. We want to return the rendered page on the first request so that search engines can index our content.

`useUriInfo` gets the URL from the Next Router and queries WP to get information about the route. If the route has a list of posts, we'll show one component. If it has a single post, we'll show another. Let's add those components to `/lib/components`.


`/lib/components/Post.tsx`

```tsx
import React from 'react';
import { usePost } from '@wpengine/headless/next';

export default function Post() {
  const post = usePost();

  return (
    <div>
      {post && (
        <div>
          <div>
            <h5>{post.title}</h5>
            <div
              dangerouslySetInnerHTML={{
                __html: post.content ?? '',
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
}
```

`/lib/components/Posts.tsx`

```tsx
import React from 'react';
import Link from 'next/link';
import { usePosts } from '@wpengine/headless/react';

export default function Posts() {
  const posts = usePosts();

  return (
    <div>
      {posts &&
        posts.nodes.map((post) => (
          <div key={post.id} id={`post-${post.id}`}>
            <div>
              <Link href={post.uri}>
                <h5>
                  <a href={post.uri}>{post.title}</a>
                </h5>
              </Link>
              <div
                dangerouslySetInnerHTML={{
                  __html: post.excerpt ?? '',
                }}
              />
            </div>
          </div>
        ))}
    </div>
  );
}
```

To setup our previews route, we want to add the following to `/pages/preview/[[...page]].tsx`:

```tsx
import React from 'react';
import Post from '../lib/components/Post';

export default function Page() {
  return <Post />;
}
```

> **NOTE**: Our preview component does not export `getStaticProps` or `getStaticPaths`. This is because the logic for getting a preview post is dynamic and will be handled client-side.

#### Configuration

We need to let the frontend know about our WordPress instance. The framework expects a few environment variables with this information. Create a file in the root of the project `/.env.local`.

```bash
# Base URL for WordPress
NEXT_PUBLIC_WORDPRESS_URL=http://yourwpsite.com

# Plugin secret found in WordPress Settings->Headless
WP_HEADLESS_SECRET=YOUR_PLUGIN_SECRET
```

## Try it out!

You can run the project via:

```bash
npm run dev
```

The server will start on port 3000 by default: [http://localhost:3000](http://localhost:3000)

You should see a list of posts on the home page and be able to view a single post.

For previews, go to WP and create a new post, but don't publish it. Click preview, and you'll be sent to the frontend through the authorization flow.

NOTE: If you open the preview link in a private window, you'll be prompted to login to WP before being redirected back to the frontend.
