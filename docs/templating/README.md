# Template Hierarchy

Arguably, one of the most powerful systems in WordPress' Theme API is its [Template Hierarchy](https://developer.wordpress.org/themes/basics/template-hierarchy/). Template Hierarchy is WordPress' way of allowing customizations of various page types on highly dynamic websites while also allowing fine granularity to make templating exceptions.

### Template Hierarchy Visual Overview

In the overview below, if you start with a page on the left and trace it to the right, you'll see what template files WordPress will attempt to load. If there are no templates found, it will fallback to `index.php`.

![WordPress Template Hierarchy Diagram](https://developer.wordpress.org/files/2014/10/Screenshot-2019-01-23-00.20.04.png)
(Credit: https://developer.wordpress.org/themes/basics/template-hierarchy/#visual-overview)

## Template Hierarchy in Next.js

While Next.js has a robust [routing layer](https://nextjs.org/docs/routing/introduction), it is not always ideal for WordPress-based sites as the routes are built around directory and file structures rather than content types.

As an example, you can customize pages under an `/account` path by adding files to `pages/account`. While this is powerful, it doesn't immediately offer ways to customize specific content types like WordPress' Template Hierarchy allows for by adding files such as `single-$posttype.php` or `category.php`.

Luckily, the WP Engine Headless Framework brings WordPress Template Hierarchy to Next.js! 🚀

### Enabling Template Hierarchy in Next.js

The steps below assume that you have created a `pages/_app.tsx` file that uses `<HeadlessProvider />`.

#### 1. Embed `<NextTemplateLoader />`

The first step in enabling Template Hierarchy in your Next.js project using this framework is to create an [optional catch-all route](https://nextjs.org/docs/routing/dynamic-routes#optional-catch-all-routes) in the `pages` directory named `[[...page]].tsx`.

This optional catch-all route will act as a fallback for all pages and route all requests to the Headless Framework's Template Loader.

The component in this page should simply return `<NextTemplateLoader />` with a `templates` prop. Example:

```tsx
import React from 'react';
import {
  NextTemplateLoader,
  getNextStaticPaths,
  getNextStaticProps,
} from '@wpengine/headless/next';

import WPTemplates from '../wp-templates/_loader';

export default function Page() {
  return <NextTemplateLoader templates={WPTemplates} />;
}

export function getStaticProps(context: any) {
  return getNextStaticProps(context, WPTemplates);
}

export function getStaticPaths() {
  return getNextStaticPaths();
}
```

#### 2. Add Templates

After setting up the Template Loader, the next step is to add templates and a loader file that exports all of the templates. Templates should be added to a directory named `wp-templates` adjacent to the `pages` folder in a Next.js project.

The name of the template should follow WordPress' template hierarchy above, but the files should be JSX/TSX instead of PHP.

**Examples:**

* `wp-templates/index.tsx`
* `wp-templates/single.tsx`
* `wp-templates/page.tsx`
* `wp-templates/page-example-slug.tsx`

#### 2b. Export templates

After adding the templates, you will want to export them in a file named `wp-templates/_loader.ts`.

```typescript
const templates = {
  index: import('./index'),
  page: import('./page'),
  'page-example-slug': import('./page-example-slug'),
  single: import('./single'),
};

export default templates;
```

## Anatomy of a Template

### React Component

Much like a Next.js page, templates need to export a React component at a minimum.

### `getServerSideProps` and `getStaticProps`

Optionally, you can export named functions in the template called `getServerSideProps` and `getStaticProps` with the following signatures:

```tsx
export async function getStaticProps(
  context: GetStaticPropsContext,
): Promise<void>;

export async function getServerSideProps(
  context: GetServerSidePropsContext,
): Promise<void>;
```

These functions can be used to make additional requests using the Apollo Client that will be executed when Next.js [Data Fetchers](https://nextjs.org/docs/basic-features/data-fetching) run.

You may find this useful if you find that you need additional data from the WordPress backend that isn't otherwise fetched by default.

In a normal Next.js page you would only implement one of these functions. Since theme components are not Next.js pages these functions are called on by the framework, not Next.js. If you are shipping a reusable Theme component you will want to export both functions. The framework will call on the function that corresponds to what the Next.js page uses. So if the Next.js page is using `getStaticProps`, the framework will call the `getStaticProps` function on your theme component.

### Example

See [`single.tsx`](https://github.com/wpengine/headless-framework/blob/canary/examples/preview/theme/single.tsx) in our preview example. This template exports the component, `getStaticProps`, and `getServerSideProps` to modify the default data requested in the Next.js Data Fetchers.

# CMS-Based Routing (Template Hierarchy) Flow

![CMS-Based Routing](/docs/templating/cms-based-routing.jpg)
