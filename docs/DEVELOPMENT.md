# Contributing

Since we're in the early stages of development, we are not currently accepting outside contributions; although, we are interested in any problems that you encounter while using the framework.

Create an issue in this repository to report bugs or feature requests.

## Project Structure

- `/docs` - Documentation
- `/packages` - NPM packages
- `/plugins` - WordPress Plugins

### NPM Packages

When working on the npm packages in this repository, use our Lerna setup from the project root:

1. Ensure that `.env.local` exists and is properly configured in `examples/getting-started` and `examples/preview`.
2. `npm run bootstrap`
3. `npm run dev`

When switching git branch, run `npm run clean` from the root and then re-run `npm run bootstrap`.

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

[Codeception](https://codeception.com/) is used for running end-2-end tests in the browser.

### Getting started with browser tests
1. [Google Chrome](https://www.google.com/chrome/) will need to be install.
2. Download [Chromedriver](https://chromedriver.chromium.org/downloads)
  - The major version will need to match your [version](https://www.whatismybrowser.com/detect/what-version-of-chrome-do-i-have) of Google Chrome. See [Chromedriver Version Selection](https://chromedriver.chromium.org/downloads/version-selection).
  - Unzip the file and move `chromedriver` into the plugin `bin` directory.
  - In shell, run `./bin/chromedriver --version`. If you are using OS X, it may prevent this program from opening. Open "Security & Privacy" and allow chromedriver.
  - Run `./bin/chromedriver --version` again. If you are prompted again, click "Open". When you can see the version, chromedriver is ready.
3. Prepare a test WordPress site.
  - Codeception will need it's own WordPress site and database to run tests.
    - Install and activate [WPGraphQL](https://www.wpgraphql.com/).
    - Symlink the `wpe-headless` plugin and activate.
      - Complete plugin settings.
    - Enable permalinks.
  - After creating a WordPress site for Codeception, save a database dump as `tests/_data/dump.sql`. This database dump will be reimported into the the test WordPress site after every test.
4. Copy `.env.testing.example` to `.env.testing`.
  - Edit the `.env.testing` file with your test WordPress site information.
5. In a separate shell window, start chromedriver
  - `./bin/chromedriver --url-base=/wd/hub`
6. Run codeception acceptance tests.
  - `vendor/bin/codecept run acceptance`

### Browser testing documentation
- [Codeception Acceptance Tests](https://codeception.com/docs/03-AcceptanceTests)
  - Base framework for browser testing in php.
- [WPBrowser](https://wpbrowser.wptestkit.dev/)
  - WordPress framework wrapping Codeception for browser testing WordPress.

## Deployment

Developers with full GitHub repository access can create public releases:

### Release the wpe-headless plugin

1. Update the `Version` in the file header at `plugins/wpe-headless/wpe-headless.php`.
2. Update the changelog in `plugins/wpe-headless/readme.txt`.
3. Commit and push your changes for review.
4. Tag the approved commit with `plugin/wpe-headless/[version]`, for example: `plugin/wpe-headless/0.3.5-alpha.1` and push the tag. Or use GitHub to [create a new release](https://github.com/wpengine/headless-framework/releases/new) with that tag.

CircleCI will build and deploy the plugin zip. The latest version will be available here:

`https://wp-product-info.wpesvc.net/v1/plugins/wpe-headless?download`
