# WordPress Headless Framework (PREVIEW/ALPHA)

[![Version](https://img.shields.io/npm/v/@wpengine/headless.svg)](https://npmjs.org/package/@wpengine/headless)

NOTE: This project is in the early stages of development, but it does contain useful functionality for headless WordPress sites like plugins and npm packages that assist in authentication and previews.

## Features

- Headless Auth Flows
  - OAuth token authentication for users
  - Auth handler for Express/Next that exchanges a code for an access token. The access token can be used to make authenticated calls to WordPress via WPGraphQL or REST.
- [Previews](./docs/previews/README.md)
  - Rewrite preview and draft links in WP Admin to redirect to the frontend.

## [Tryout Previews](./docs/previews/README.md)

We'll walk you through creating a Next.js app that uses the plugin and framework to enable post previews!

## Project Structure

- `/docs` - Documentation
- `/packages` - NPM packages
- `/plugins` - WordPress Plugins

# Contributing

Since we're in the early stages of development, we are not currently accepting outside contributions; although, we are interested in any problems that you encounter while using the framework.

Create an issue in this repository to report bugs or feature requests.

### Plugins

As this is a monorepo, you will not be able to check out this repository into `wp-content/themes` or `wp-content/plugins`.

Instead, you can create symlinks to the themes/plugins in this repository. Best of all, this will also sync your work
across multiple local sites!

#### WPE Headless Plugin

[Download](https://wp-product-info.wpesvc.net/v1/plugins/wpe-headless?download)

**Setup**
To begin working with the WPE Headless WordPress plugin, you will need to symlink the plugin from the monorepo to your WordPress plugin development directory.

```
ln -s /path/to/headless-framework/plugins/wpe-headless /path/to/wordpress/wp-content/plugins/wpe-headless
```

**PHP Code Sniffer**
[PHP Code Sniffer](https://github.com/squizlabs/PHP_CodeSniffer) is configured for the [WordPress code standards](https://make.wordpress.org/core/handbook/best-practices/coding-standards/).

Install the composer packages from within `wpe-headless` directory if you haven't already.
```
composer install
```

Run the syntax check.
```
composer phpcs
```

Some syntax errors can be fixed by phpcs.
```
composer phpcs:fix
```

**WordPress Unit Tests**
In order to run WordPress unit tests, the test framework needs to be set up.
```
/bin/bash /path/to/headless-framework/plugins/wpe-headless/tests/install-wp-tests.sh wpe_headless_tests db_name db_password
```

If you connect to mysql via a sock connection, you can run the following.
```
/bin/bash /path/to/headless-framework/plugins/wpe-headless/tests/install-wp-tests.sh wpe_headless_tests db_name db_password localhost:/path/to/mysql/mysqld.sock
```

Install the composer packages from within `wpe-headless` directory if you haven't already.
```
composer install
```

Within the `wpe-headless` directory, run `phpunit` either directly or as a composer command
```
vendor/bin/phpunit
```

or

```
composer test
```

### NPM Packages

When working on the NPM packages in this repository, you'll likely want to test them in a project that pulls them in
as dependencies.

To pull in your code changes into the dependent project, you can [npm link](https://docs.npmjs.com/cli/v6/commands/npm-link)
or [yarn link](https://classic.yarnpkg.com/en/docs/cli/link/). This will create symlinks from your dependent project's
`node_modules` directory into this repository.

**Note!** If using Next.js, you'll likely need to add [`next-transpile-modules`](https://www.npmjs.com/package/next-transpile-modules)
to your `next.config.js`. Without doing this, you may run errors such as `Error: Cannot find module 'react'`.
