# WordPress Headless Framework (PREVIEW/ALPHA)

🚧 **Note:** This project is in the early stages of development, but it does contain useful functionality for headless WordPress sites like plugins and npm packages that assist in authentication and previews.

## Quick Start

Eager to try out the Headless Framework? Here's how you can get started with our Preview example:

1. Create a WordPress site if you haven't already. We recommend using [Local](https://localwp.com/)!
2. Download, upload, and activate the `wpe-headless` plugin in this repository. [(Plugin Download)](https://wp-product-info.wpesvc.net/v1/plugins/wpe-headless?download)
3. Install [WP GraphQL](https://wordpress.org/plugins/wp-graphql/) on the WordPress site if it's not already installed
4. [Clone this repository](https://docs.github.com/en/free-pro-team@latest/github/creating-cloning-and-archiving-repositories/cloning-a-repository) to a directory of your choice
5. Navigate to `examples/preview` in the cloned repository
6. `cp .env.local.sample .env.local`
7. Populate `WORDPRESS_URL` (or `NEXT_PUBLIC_WORDPRESS_URL`) and `WPE_HEADLESS_SECRET` accordingly in `.env.local`
8. `npm install && npm run dev`

## Framework Features

- Headless Auth Flows
  - OAuth token authentication for users
  - Auth handler for Express/Next that exchanges a code for an access token. The access token can be used to make authenticated calls to WordPress via WPGraphQL or REST.
- [Previews](./docs/previews/README.md)
  - Rewrite preview and draft links in WP Admin to redirect to the frontend.

## Download & Installation

There are two key parts of the WordPress Headless Framework. To take full advantage, you will need to install the plugin
in addition to the npm package.

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

* [Creating a Next.js application from scratch and integrating `@wpengine/headless` to enable post previewing](./docs/previews/README.md)

## Contributing

Since we're in the early stages of development, we are not currently accepting outside contributions; although, we are
interested in any problems that you encounter while using the framework.

### [Development Guide](./docs/DEVELOPMENT.md)

As this repository contains a WordPress plugin as well as npm packages, we have a few recommendations to help
streamline your development process.

### License

* npm packages in this repository are MIT licensed
* WordPress plugins in this repository are GPLv2+ licensed
