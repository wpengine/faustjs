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

#### FaustWP Plugin

**Setup**
To begin working with the FaustWP WordPress plugin, you will need to symlink the plugin from the monorepo to your WordPress plugin development directory.

```
ln -s /path/to/faustjs/plugins/faustwp /path/to/wordpress/wp-content/plugins/faustwp
```

**PHP Code Sniffer**
[PHP Code Sniffer](https://github.com/squizlabs/PHP_CodeSniffer) is configured for the [WordPress code standards](https://make.wordpress.org/core/handbook/best-practices/coding-standards/).

Install the composer packages from within `faustwp` directory if you haven't already.

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

To run WordPress unit tests, first create the Docker containers from the `plugins/faustwp` directory:

```
docker-compose up -d
```

Once the containers are up, set up the test framework:

```
docker-compose exec wordpress init-testing-environment.sh
```

Run the unit tests:

```
docker-compose exec -w /var/www/html/wp-content/plugins/faustwp wordpress composer test
```

Finally, to remove the containers:

```
docker-compose down
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
1. Move into the FaustWP plugin directory `plugins/faustwp`.
1. Run `composer install` if you haven't already.
1. Prepare a test WordPress site.
   1. Run `docker-compose up -d --build`. If building for the first time, it could take some time to download and build the images.
   1. Run `docker-compose exec --workdir=/var/www/html/wp-content/plugins/faustwp --user=www-data wordpress wp plugin install wp-graphql --activate`
   1. Run `docker-compose exec --workdir=/var/www/html/wp-content/plugins/faustwp --user=www-data wordpress wp db export tests/_data/dump.sql`
1. Copy `.env.testing.example` to `.env.testing`.
1. Run `vendor/bin/codecept run acceptance` to start the end-2-end tests.

### Browser testing documentation

- [Codeception Acceptance Tests](https://codeception.com/docs/03-AcceptanceTests)
  - Base framework for browser testing in php.
- [WPBrowser](https://wpbrowser.wptestkit.dev/)
  - WordPress framework wrapping Codeception for browser testing WordPress.

## Deployment

Developers with full GitHub repository access can create public releases:

### Release the FaustWP plugin

1. Update the `Version` in the file header at `plugins/faustwp/faustwp.php`.
2. Update the changelog and 'stable tag' in `plugins/faustwp/readme.txt`.
3. Commit and merge your changes into the `canary` branch.
4. Create a new release on GitHub with a tag of `plugin/faustwp/[version]`. This will kick off our GitHub Action to deploy the `faustwp` plugin to WordPress.org

### Release the @faustjs packages

We use [Changesets](https://github.com/atlassian/changesets) to automate our deployment process for the @faustjs packages.

1. When you are ready to release the @faustjs packages, go to [pull requests](https://github.com/wpengine/faustjs/pulls), and view the "Release Packages" PR.
2. Review the changes and make sure that the packages are versioned appropriately, and that the changelogs reflect the changes accurately.
3. When ready to release, merge the PR into `canary`. This will kick off the GitHub Action to publish to NPM.

Once deployed, the updated packages will be visible here:

- https://www.npmjs.com/package/@faustjs/core
- https://www.npmjs.com/package/@faustjs/react
- https://www.npmjs.com/package/@faustjs/next
