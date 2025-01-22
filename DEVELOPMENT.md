# Contributing

There are many ways to [contribute](/CONTRIBUTING.md) to this project.

- [Discuss open issues](https://github.com/wpengine/faustjs/issues) to help define the future of the project.
- [Submit bugs](https://github.com/wpengine/faustjs/issues) and help us verify fixes as they are checked in.
- Review and discuss the [source code changes](https://github.com/wpengine/faustjs/pulls).
- [Contribute bug fixes](/CONTRIBUTING.md)

## Project Structure

- `/packages` - NPM packages
- `/examples` - Example projects
- `/plugins` - WordPress Plugins
- `/scripts` - Packaging scripts

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

```sh
ln -s /path/to/faustjs/plugins/faustwp /path/to/wordpress/wp-content/plugins/faustwp
```

**PHP Code Sniffer**
[PHP Code Sniffer](https://github.com/squizlabs/PHP_CodeSniffer) is configured for the [WordPress code standards](https://make.wordpress.org/core/handbook/best-practices/coding-standards/).

Install the composer packages from within `plugins/faustwp` directory if you haven't already.

```sh
composer install
```

Run the syntax check.

```sh
composer phpcs
```

Use `phpcs` to fix some syntax errors:

```sh
composer phpcs:fix
```

**WordPress Unit Tests**

To run WordPress unit tests, first start the Docker application from the `plugins/faustwp` directory:

```sh
composer run docker:start
```

If desired, you may specify the WP_VERSION you'd like to run tests against:

```sh
WP_VERSION=6.4.2 composer run docker:start
```

Once the containers are up, set up the test framework. If you want to enable code coverage reporting, make sure you provide the `COVERAGE=1` environment variable as a parameter:

```sh
docker-compose exec -e COVERAGE=1 wordpress init-testing-environment.sh
```

Install and activate WP GraphQL:

```sh
docker exec --workdir=/var/www/html/wp-content/plugins/faustwp $(docker-compose ps -q wordpress) wp plugin install wp-graphql --activate --allow-root
```

Run the unit tests:

```sh
docker exec --workdir=/var/www/html/wp-content/plugins/faustwp $(docker-compose ps -q wordpress) composer test
```

Finally, to remove the containers:

```sh
composer run docker:stop
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

```sh
# Your WordPress site URL
NEXT_PUBLIC_WORDPRESS_URL=http://localhost:8080

# Plugin secret found in WordPress Settings->Headless
FAUST_SECRET_KEY=00000000-0000-4000-8000-000000000001
```

2. From within `examples/next/getting-started`, run `NODE_ENV=test npm run dev`.

### 3. WordPress Setup

1. Leave the node server running and open a new shell.
2. Move into the FaustWP plugin directory `plugins/faustwp`.
3. Run `composer install` if you haven't already.
4. Prepare a test WordPress site.
   1. Run `docker-compose up -d --build`. If building for the first time, it could take some time to download and build the images.
   2. Run `docker exec --workdir=/var/www/html/wp-content/plugins/faustwp $(docker-compose ps -q wordpress) wp plugin install wp-graphql --activate --allow-root`
   3. Run `docker exec --workdir=/var/www/html/wp-content/plugins/faustwp $(docker-compose ps -q wordpress) wp core update-db --allow-root `
   4. Run `docker exec --workdir=/var/www/html/wp-content/plugins/faustwp $(docker-compose ps -q wordpress) wp db export tests/_data/dump.sql --allow-root`
5. Copy `.env.testing.example` to `.env.testing`.
6. Run `vendor/bin/codecept run acceptance` to start the end-2-end tests.

### Browser testing documentation

- [Codeception Acceptance Tests](https://codeception.com/docs/03-AcceptanceTests)
  - Base framework for browser testing in php.
- [WPBrowser](https://wpbrowser.wptestkit.dev/)
  - WordPress framework wrapping Codeception for browser testing WordPress.

## Git Workflows

We have three notable branches:

- `canary` - This branch has the latest changes
- `main` - This branch is used to deploy changes to [faustjs.org](https://faustjs.org)

### Code Changes/Feature Workflow

We use the [feature branch workflow](https://www.atlassian.com/git/tutorials/comparing-workflows/feature-branch-workflow). The workflow for a typical code change looks like:

- Create a new branch for the feature
- Make changes to the code
- Use `npm run changeset` to create a changeset describing any package or plugin updates
- Commit your changes
- Open a pull request to the `canary` branch
- Squash and Merge the pull request into the `canary` branch

**Note**: We use Squash and Merge when merging pull requests into the `canary` branch.

## Deployment

Developers with full GitHub repository access can create public releases. We use [Changesets](https://github.com/atlassian/changesets) to automate the versioning and deployment process for all of our packages and plugins.

### Adding a changeset

To add a new changeset for a new feature, bugfix or other change please see the [changeset documentation](https://github.com/changesets/changesets/blob/main/docs/adding-a-changeset.md).

### Versioning

When you are ready to release, you should first create the new package and plugin versions.

1. Go to [pull requests](https://github.com/wpengine/faustjs/pulls), and view the "Version Packages" PR.
2. Review the PR:
   - [ ] Changelog entries were created in all updated packages or plugins.
   - [ ] Version numbers were appropriately bumped in the relevant package.json files.
   - [ ] All `.changeset/*.md` files were removed.
   - [ ] Version number updated in the main plugin file and readme.txt (Plugin versioning only)
   - [ ] The plugin's readme.txt changelog has been updated with the latest 3 versions (Plugin versioning only)
3. Approve, then "Squash and merge" the "Version Packages" PR into `canary`.

### Publishing the @faustwp packages

The @faustwp packages are automatically published to NPM through a GitHub action once the "Version Packages" PR is merged.

### Publishing the FaustWP plugin

Once the "Version Packages" PR is merged, create a new release on GitHub with a tag of `plugin/faustwp/v[version]`. This will kick off our GitHub Action to deploy the `faustwp` plugin to WordPress.org.

Once deployed, the updated packages and plugin will be visible here:

- https://www.npmjs.com/package/@faustwp/core
- https://www.npmjs.com/package/@faustwp/cli
- https://www.npmjs.com/package/@faustwp/block-editor-utils
- https://www.npmjs.com/package/@faustwp/blocks
- https://plugins.trac.wordpress.org/browser/faustwp/tags

### Working with the Monorepo

This section offers guidance for developers working within the monorepo environment, which utilizes npm for package management.

#### Navigation:

- Use your terminal or IDE to navigate the file structure.
- To locate a specific project, navigate to its directory within the packages folder. For example, `cd packages/faustwp-core` would take you to the `faustwp-core` project directory.

#### Building and Deploying:

- We use npm for managing dependencies and running build scripts.
- Individual projects often have their own package.json file with project-specific scripts for building and deploying. You can run these scripts using commands like `npm run build` or `npm run test` within the project directory (e.g., `packages/faustwp-core`).
- Refer to the project's README file or internal documentation for specific build and deploy instructions.
  For deploying the entire monorepo, there might be a top-level build script which you can invoke with `npm run build`.

#### Additional Considerations:

Use the `--workspaces` or `-w` flag to run a specific script command of a specified workspace. For example:

```bash
$ npm run build -w examples/next/faustwp-getting-started
```

It runs the `build` npm script for the `faustwp-getting-started` example project.
