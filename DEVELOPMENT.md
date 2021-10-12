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
/bin/bash /path/to/faustjs/plugins/wpe-headless/tests/install-wp-tests.sh wpe_headless_tests db_name db_password
```

If you connect to MySQL via a sock connection, you can run the following.

```
/bin/bash /path/to/faustjs/plugins/wpe-headless/tests/install-wp-tests.sh wpe_headless_tests db_name db_password localhost:/path/to/mysql/mysqld.sock
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

### 1. Launch Docker Containers via Docker Compose

From the monorepo root:

```
docker-compose up -d --build
```

### 2. Run Tests

From the monorepo root:

```
docker-compose \
    exec \
    --workdir=/var/www/html/wp-content/plugins/wpe-headless \
    wordpress \
    /bin/sh -c 'wait-for-it --timeout=30 --strict frontend:3000 -- vendor/bin/codecept run acceptance'
```

### 3. Destroy the containers

```
docker-compose down
```

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
