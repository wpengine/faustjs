# Contributing

There are many ways to [contribute](/CONTRIBUTING.md) to this project.

- [Discuss open issues](https://github.com/wpengine/faustjs/issues) to help define the future of the project.
- [Submit bugs](https://github.com/wpengine/faustjs/issues) and help us verify fixes as they are checked in.
- Review and discuss the [source code changes](https://github.com/wpengine/faustjs/pulls).
- [Contribute bug fixes](/CONTRIBUTING.md)

## Project Structure

- `/docs` - Documentation
- `/packages` - NPM packages
- `/plugins` - WordPress Plugins

### NPM Packages

NPM packages are managed from the project root using [Workspaces](https://docs.npmjs.com/cli/v7/using-npm/workspaces). To get started, run:

1. `npm install`
2. `npm run dev`

The local copy of each package is automatically symlinked in `node_modules` when running `npm install` from the project root. Likewise, each package is automatically built when running `npm run dev`.

When switching git branch, run `npm run clean` from the root and then re-run `npm run dev`.

### Plugins

As this is a monorepo, you will not be able to check out this repository into `wp-content/themes` or `wp-content/plugins`.

Instead, you can create symlinks to the themes/plugins in this repository. Best of all, this will also sync your work across multiple local sites!

#### WPE Headless Plugin

**Setup**
To begin working with the WPE Headless WordPress plugin, you will need to symlink the plugin from the monorepo to your WordPress plugin development directory.

```
ln -s /path/to/faustjs/plugins/wpe-headless /path/to/wordpress/wp-content/plugins/wpe-headless
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

Use `phpcs` to fix some syntax errors:

```
composer phpcs:fix
```

**WordPress Unit Tests**
To run WordPress unit tests, set up the test framework:

```
/bin/bash /path/to/faustjs/plugins/wpe-headless/tests/install-wp-tests.sh faustwp_tests db_name db_password
```

If you connect to MySQL via a sock connection, you can run the following.

```
/bin/bash /path/to/faustjs/plugins/wpe-headless/tests/install-wp-tests.sh faustwp_tests db_name db_password localhost:/path/to/mysql/mysqld.sock
```

Install the composer packages from within `wpe-headless` directory if you haven't already.

```
composer install
```

Within the `wpe-headless` directory, run `phpunit` either directly or as a composer command:

```
vendor/bin/phpunit
```

or

```
composer test
```

## End-2-End Testing

Use [Codeception](https://codeception.com/) for running end-2-end tests in the browser.

### 1. Environment Setup

1. Install [Docker](https://www.docker.com/get-started).
1. Install [Composer](https://getcomposer.org/).
1. Install [Google Chrome](https://www.google.com/chrome/).
1. Install [Chromedriver](https://chromedriver.chromium.org/downloads)
   - The major version will need to match your Google Chrome [version](https://www.whatismybrowser.com/detect/what-version-of-chrome-do-i-have). See [Chromedriver Version Selection](https://chromedriver.chromium.org/downloads/version-selection).
   - Unzip the chromedriver zip file and move `chromedriver` application into the `/usr/local/bin` directory.
     `mv chromedriver /usr/local/bin`
   - In shell, run `chromedriver --version`. _Note: If you are using OS X, it may prevent this program from opening. Open "Security & Privacy" and allow chromedriver_.
   - Run `chromedriver --version` again. _Note: On OS X, you may be prompted for a final time, click "Open"_. When you can see the version, chromedriver is ready.

### 2. Front-end Setup

1. Create the following `.env.test` in `examples/next/getting-started`.
```
# Your WordPress site URL
NEXT_PUBLIC_WORDPRESS_URL=http://localhost:8080

# Plugin secret found in WordPress Settings->Headless
WP_HEADLESS_SECRET=00000000-0000-0000-0000-000000000001
```
2. From within `examples/next/getting-started`, run `NODE_ENV=test npm run dev`.

### 3. WordPress Setup

1. Leave the node server running and open a new shell.
1. Move into the WPE Headless plugin directory `plugins/wpe-headless`.
1. Run `composer install` if you haven't already.
1. Prepare a test WordPress site.
    1. Run `docker-compose up -d --build`. If building for the first time, it could take some time to download and build the images.
    1. Run `docker-compose exec --workdir=/var/www/html/wp-content/plugins/wpe-headless --user=www-data wordpress wp plugin install wp-graphql --activate`
    1. Run `docker-compose exec --workdir=/var/www/html/wp-content/plugins/wpe-headless --user=www-data wordpress wp db export tests/_data/dump.sql`
1. Copy `.env.testing.example` to `.env.testing`.
1. Run `vendor/bin/codecept run acceptance` to start the end-2-end tests.

### Browser testing documentation

- [Codeception Acceptance Tests](https://codeception.com/docs/03-AcceptanceTests)
  - Base framework for browser testing in php.
- [WPBrowser](https://wpbrowser.wptestkit.dev/)
  - WordPress framework wrapping Codeception for browser testing WordPress.

## Deployment

Developers with full GitHub repository access can create public releases:

### Release the wpe-headless plugin

1. Update the `Version` in the file header at `plugins/wpe-headless/wpe-headless.php`.
2. Update the changelog and 'stable tag' in `plugins/wpe-headless/readme.txt`.
3. Commit and push your changes for review **(DO NOT MERGE YET)**.
4. Tag the approved commit with `plugin/wpe-headless/[version]`, for example: `git tag plugin/wpe-headless/0.3.5` and push the tag (`git push --tags`). Or use GitHub to [create a new release](https://github.com/wpengine/faustjs/releases/new) with that tag. This must be done prior to merging changes into the `canary` branch.
5. Merge your changes into the `canary` branch

CircleCI will build and deploy the plugin zip. The latest version will be available here:

`https://wp-product-info.wpesvc.net/v1/plugins/wpe-headless?download`

### Release the @faustjs packages

1. From the monorepo root directory, run either `npm run patch` or `npm run minor`. This will increment all the packages' versions, keeping them in lockstep.
2. Remove `node_modules` and `package-lock.json` from the root directory.
3. Run `npm i && npm test` to verify that the packages are working.
4. Update the changelogs of the applicable packages.
5. Commit and push your changes for review.
6. Once reviewed and merged into `canary`, our GitHub Actions workflow will publish the packages to NPM.

Once deployed, the updated packages will be visible here:

- https://www.npmjs.com/package/@faustjs/core
- https://www.npmjs.com/package/@faustjs/react
- https://www.npmjs.com/package/@faustjs/next
