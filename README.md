# Headless WordPress Framework

## Introduction

WP Engine's Headless WordPress Framework provides a set of tools to make building front-end applications with WordPress as the headless CMS a pleasant experience for both developers and publishers. This framework consists of a WordPress plugin, a set of npm packages, and guides to get you started building headless WordPress sites in [Next.js](https://nextjs.org/).

_🚧 **Note:** This project is in the early stages of development_

## Quick Start

Eager to try out the Headless Framework? Here's how you can get started:

### Create a front-end app

1. Create a new Next.js app from our [getting-started project](https://github.com/wpengine/headless-framework/tree/canary/examples/getting-started): `npx create-next-app -e https://github.com/wpengine/headless-framework/tree/canary --example-path examples/getting-started --use-npm`
2. `cd my-app && cp .env.local.sample .env.local` to create a file that contains your environment variables.
3. `npm run dev` to start the development server.
4. See your site at http://localhost:3000.

### Point the app to your own WordPress site

The sample app loads WordPress content from our demo site at https://headlessfw.wpengine.com.

Point it to your own WordPress site instead:

1. Create a WordPress site if you haven't already. We recommend [Local](https://localwp.com/) to try things out locally, or you can use a live WordPress site.
2. Download, upload, and activate the `wpe-headless` plugin. [(Plugin Download)](https://wp-product-info.wpesvc.net/v1/plugins/wpe-headless?download)
3. Install [WP GraphQL](https://wordpress.org/plugins/wp-graphql/) on the WordPress site if it's not already installed.

Then, in your front-end app directory:

4. Change `NEXT_PUBLIC_WORDPRESS_URL` in `.env.local` to the full URL to your WordPress site, including the `http://` or `https://` prefix.
5. Change `WP_HEADLESS_SECRET` in `.env.local` to the secret key found at Settings → Headless in your WordPress admin area.
6. `npm run dev` (kill and restart npm if it was already running)

You'll see the same site with your WordPress posts instead of ours.

To enable post previews, set your front-end app URL on the WordPress Settings → Headless page (for example, `http://localhost:3000` when testing locally).

➡️ [Learn more about getting started](/docs/getting-started/)

## Framework Features

### Plugin Features

- **[Headless post previewing](/docs/previews/README.md)**
  - OAuth token authentication creation
  - Preview and draft link rewrites in WP Admin to redirect to the front-end
- **Smart content redirects**
  - Automatically redirects content from the WP site to the front-end site to minimize site visitors’ confusion and avoid SEO penalties for duplicate content
  - Redirects hyperlinks inserted into posts’ content to the front-end site
- **Disable WP theme admin pages**
  - Prevents access to admin pages that have no effect on the headless front-end appearance, such as Appearance → Themes.
- **Ability to define custom menus in a GUI**
- **Additional data exposed through WPGraphQL**
  - Block stylesheets

### npm Package Features

- [Post previewing integration](/docs/previews/README.md)
  - Auth handler that exchanges a code for an access token
- A `HeadlessProvider` component to ease communication with WordPress via [Apollo](https://www.apollographql.com/) and [WPGraphQL](https://www.wpgraphql.com/).
- A [TemplateLoader](/docs/templating/README.md) component that optionally allows you to follow the WordPress [template hierarchy](https://developer.wordpress.org/themes/basics/template-hierarchy/) pattern in Next.js
  - Load page templates based on the current URL path and page type
  - Utilize functions like `getPropsMiddleware` for adding to/manipulating data depending on the template
- Display WordPress menus with our `Menu` component
- React hooks for pulling data from WordPress
- “Sensible defaults” for Next.js props and paths

## Download & Installation

There are two key parts of the WordPress Headless Framework. To take full advantage, you will need to install the plugin in addition to the npm package.

### WordPress Plugin

[📥 Download Latest](https://wp-product-info.wpesvc.net/v1/plugins/wpe-headless?download)

After downloading the zip linked above, we recommend installing by [Manually Uploading via WordPress Admin](https://wordpress.org/support/article/managing-plugins/#manual-upload-via-wordpress-admin).

### `@wpengine/headless` npm Package

[![Version](https://img.shields.io/npm/v/@wpengine/headless.svg)](https://npmjs.org/package/@wpengine/headless)

#### Yarn

```shell
yarn add @wpengine/headless
```

### npm

```shell
npm install --save @wpengine/headless
```

## Guides

- [Getting started with the Headless Framework](/docs/getting-started/README.md)
- [Enabling post previews in Next.js](/docs/previews/README.md)
- [Using the WordPress template hieararchy in Next.js](/docs/previews/README.md)

## Contributing

Since we're in the early stages of development, we are not currently accepting outside contributions; although, we are
interested in any problems that you encounter while using the framework.

### [Development Guide](/docs/DEVELOPMENT.md)

As this repository contains a WordPress plugin as well as npm packages, we have a few recommendations to help
streamline your development process.

### License

- npm packages in this repository are MIT licensed
- WordPress plugins in this repository are GPLv2+ licensed
