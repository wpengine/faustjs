# Contributing

Since we're in the early stages of development, we are not currently accepting outside contributions; although, we are interested in any problems that you encounter while using the framework.

Create an issue in this repository to report bugs or feature requests.

## Project Structure

- `/docs` - Documentation
- `/packages` - NPM packages
- `/plugins` - WordPress Plugins

### NPM Packages

When working on the NPM packages in this repository, we recommend utilizing our Lerna setup in the root of the repository.

To get going, you can run the following:

1. Ensure that `.env.local` is properly configured in `examples/preview`
2. `npm run bootstrap`
3. `npm run dev`

### Plugins

As this is a monorepo, you will not be able to check out this repository into `wp-content/themes` or `wp-content/plugins`.

Instead, you can create symlinks to the themes/plugins in this repository. Best of all, this will also sync your work
across multiple local sites!

#### WPE Headless Plugin

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

## End-2-End Testing

The end-2-end tests run using [Cypress](https://www.cypress.io/) while running on a local docker setup using [wp-env](https://github.com/WordPress/gutenberg/tree/master/packages/env#wp-env).

1. Ensure [Docker](https://docs.docker.com/get-docker/) is installed and running.
2. Ensure you have ran `npm install` from the `headless-framework` root directory.
3. Run `npm run wp:start` to start the development container.
    - **Note: This may take some time on the initial start as it has to download and setup the needed files.**
    - Development site `http://localhost:8888`.
    - Testing site `http://localhost:8889`.
    - The plugins [WPGraphQL](https://www.wpgraphql.com/) and `plugins/wpe-headless` will automatically be installed and activated.
4. Run `npm run cypress:open` to open the Cypress UI and manually run the end-2-end tests.
    - Run `npm run cypress:run` to run the end-2-end tests without the Cypress UI.
5. Run `npm run wp:stop` to stop the development containers.

## Deployment

Developers with full GitHub repository access can create public releases:

### Release the wpe-headless plugin

1. Update the `Version` in the file header at `plugins/wpe-headless/wpe-headless.php`.
2. Update the changelog in `plugins/wpe-headless/readme.txt`.
3. Commit and push your changes for review.
4. Tag the approved commit with `plugin/wpe-headless/[version]`, for example: `plugin/wpe-headless/0.3.5-alpha.1` and push the tag. Or use GitHub to [create a new release](https://github.com/wpengine/headless-framework/releases/new) with that tag.

CircleCI will build and deploy the plugin zip. The latest version will be available here:

`https://wp-product-info.wpesvc.net/v1/plugins/wpe-headless?download`
