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

1. `npm run bootstrap`
2. `npm run dev`

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
