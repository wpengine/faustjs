# Getting started

This guide will get you up and running with our Headless Framework and help you understand what it offers.

Make sure to install the latest version of[Node.js](https://nodejs.org/en/download/) before using this guide.

## Create a Next.js app

Our headless framework is built on top of [Next.js](https://nextjs.org/). You get all the fantastic features that Next.js provides, plus an easy way to use it with WordPress!

We’ll start with an [example project](https://github.com/wpengine/headless-framework/tree/canary/examples/getting-started) to quickly see the power of our framework. To pull it down, use `npx` (which comes with Node.js) with the URL to our example project:

```npx create-next-app -e https://github.com/wpengine/headless-framework/tree/canary --example-path examples/preview --use-npm```

`create-next-app` prompts you to provide a name for your project. Once you do that and the dependencies are installed, cd into the new project:

```cd your-app-name```

Create a file to hold your environment variables, such as your WordPress site URL:

```
cp .env.local.sample .env.local
```

You don't need to edit `.env.local` just yet.

Then `npm run dev` and visit your site at http://localhost:3000.

## Connect the app to your WordPress site

The sample app loads WordPress content from our demo site at https://headlessfw.wpengine.com.

To point it to a different WordPress site:

1. Create a WordPress site if you haven't already. We recommend [Local](https://localwp.com/) to try things out locally, or you can use a live WordPress site.
2. Download, upload, and activate the `wpe-headless` plugin. [(Plugin Download)](https://wp-product-info.wpesvc.net/v1/plugins/wpe-headless?download)
3. Install [WP GraphQL](https://wordpress.org/plugins/wp-graphql/) on the WordPress site.

Next, go to your frontend app directory and:

4. Change `NEXT_PUBLIC_WORDPRESS_URL` in `.env.local` to the full URL to your WordPress site, including the `http://` or `https://` prefix.
5. Change `WP_HEADLESS_SECRET` in `.env.local` to the secret key found at Settings → Headless in your WordPress admin area.
6. `npm run dev` (kill and restart npm if it was already running)

Open or refresh http://localhost:3000. You should see a list of posts from your WordPress site at the bottom of the front page and view a single post.

## Set up the WordPress plugin

Install our [Headless WordPress plugin](https://github.com/wpengine/headless-framework#wordpress-plugin) to get the full benefits of the framework. We recommend [Local](https://localwp.com/) to spin up a local WordPress site quickly. After you have a WordPress site up and running, [download the plugin](https://wp-product-info.wpesvc.net/v1/plugins/wpe-headless?download) and upload and activate it [through the WordPress Admin](https://wordpress.org/support/article/managing-plugins/#manual-upload-via-wordpress-admin).

After activation, WordPress redirects to the Headless settings page. The plugin has a dependency on WPGraphQL, so you’ll see a button on the right under the “Get Started with Headless” box to install and activate the WPGraphQL plugin if it’s not already active.

At this point, if you know what the URL to your frontend site is (or is going to be), you can enter that now in the Front-end Site URL field. That’s all you need to do for now through WordPress

### What is the WordPress plugin doing?

The plugin ensures that your WordPress site runs smoothly as a headless CMS. From smart content redirects to enabling post previewing to providing the right data is available in WPGraphQL, installing the plugin gives you the things you need to run WordPress as a headless CMS. Find a [full list of plugin features here](https://github.com/wpengine/headless-framework#plugin-features).


## Breaking down the example project

The example project is set up with most of the features our [@wpengine/headless](https://npmjs.org/package/@wpengine/headless) npm package provides, along with a way to structure your app. 

### pages/_app.tsx

Currently, we’re using a Next.js [Custom App](https://nextjs.org/docs/advanced-features/custom-app) to override the default `App` to inject our `<HeadlessProvider />` wrapper component. `HeadlessProvider` sets up an Apollo client connected to WordPress via the `NEXT_PUBLIC_WORDPRESS_URL` environment variable. Our Apollo client is all set up to support both server-side and client-side rendering out of the box.

### pages/[[..page]].tsx

Next.js uses pages for both rendering and routing purposes. For instance, an `about.tsx` file automatically renders and outputs in the `/about` directory. In our example, we’re using an [optional catch-all route](https://nextjs.org/docs/routing/dynamic-routes#optional-catch-all-routes) - `[[..page]].tsx`, which Next.js will hit any time a request is made. This component returns a `<TemplateLoader />` component. `TemplateLoader` is imported from the [@wpengine/headless](https://npmjs.org/package/@wpengine/headless) npm package and is responsible for determining what template to render based on the requested URL’s content type in WordPress. This allows you to mimic the [WordPress template hierarchy](https://developer.wordpress.org/themes/basics/template-hierarchy/) inside your Next.js app.

### /wp-templates/

The `wp-templates/` folder contains templates that are responsible for the final rendering of a page. Templates from the `<NextTemplateLoader />` (`<TemplateLoader />` if not using Next.js) in the catch-all route page mentioned above, similar to how WordPress PHP theme files are loaded according to the template hierarchy. Template injection is accomplished by the `TemplateLoader` picking up WordPress content from GraphQL. The naming convention of files in the `wp-templates/` directory follows 1:1 with the WordPress template hierarchy. For example, `single.tsx` is the template rendered for single posts, `page.tsx` is the template for pages, `category.tsx` is for categories, and so on.

Our example includes an `index.tsx` and `single.tsx` template. To handle other content types like pages or custom types, you can create a new `.tsx` file with the desired template's name.

[More information about how the `TemplateLoader` works can be found here](/docs/templating/).

### Hooks

The [@wpengine/headless](https://npmjs.org/package/@wpengine/headless) npm package contains several custom React hooks for interacting with WPGraphQL. In the example project’s `index.tsx` template, the `usePosts` hook gets a list of all posts. Similarly, `usePost` is used in `single.tsx` to get the single post data. The hooks permit specific parameters, which allow you to refine the data returned (passing in an `id` to `usePost`, for example, to get a particular post).

## Learn more

- [Enabling WordPress post previews](/docs/previews/)
- [Using the WordPress template hierarchy in Next.js](/docs/templating/)
