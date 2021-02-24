# Headless WordPress Framework

## Introduction

WP Engine's Headless WordPress Framework provides a set of tools to make building front-end applications with WordPress as the headless CMS a pleasant experience for both developers and publishers. This framework consists of a WordPress plugin, a set of npm packages, and guides to get you started building headless WordPress sites in [Next.js](https://nextjs.org/).

_🚧 **Note:** This project is in the early stages of development_

## Quick Start

Eager to try out the Headless Framework? Here's how you can get started:

1. Create a WordPress site if you haven't already. We recommend using [Local](https://localwp.com/)!
1. Download, upload, and activate the `wpe-headless` plugin. [(Plugin Download)](https://wp-product-info.wpesvc.net/v1/plugins/wpe-headless?download)
1. Install [WPGraphQL](https://wordpress.org/plugins/wp-graphql/) on the WordPress site if it's not already installed.
   - WPGraphQL can be installed directly from Settings → Headless as well!
1. Create a new Next.js app from our [getting-started project](https://github.com/wpengine/headless-framework/tree/canary/examples/getting-started): `npx create-next-app -e https://github.com/wpengine/headless-framework/tree/canary --example-path examples/getting-started --use-npm`
1. `cp .env.local.sample .env.local`
1. Populate `WORDPRESS_URL` in `.env.local` with the full URL to your WordPress site, including the `http://` or `https://` prefix.
1. Populate `WP_HEADLESS_SECRET` in `.env.local` with the secret key found at Settings → Headless in your WordPress admin area.
1. In WordPress Settings → Headless, populate the "Front-end site URL" with `http://localhost:3000`
1. `cd my-app && npm run dev`

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
