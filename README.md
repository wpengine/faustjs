# WP Engine Atlas

This monorepo contains all of the **public** plugins and packages that we plan on publishing.

## Project Structure

* `packages` - NPM packages
* `plugins` - WordPress Plugins
* `themes` - WordPress Themes

## Developing

### Plugins

As this is a monorepo, you will not be able to check out this repository into `wp-content/themes` or `wp-content/plugins`. 

Instead, you can create symlinks to the themes/plugins in this repository. Best of all, this will also sync your work 
across multiple local sites!

### NPM Packages

When working on the NPM packages in this repository, you'll likely want to test them in a project that pulls them in
as dependencies.

To pull in your code changes into the dependent project, you can [npm link](https://docs.npmjs.com/cli/v6/commands/npm-link) 
or [yarn link](https://classic.yarnpkg.com/en/docs/cli/link/). This will create symlinks from your dependent project's 
`node_modules` directory into this repository.

**Note!** If using Next.js, you'll likely need to add [`next-transpile-modules`](https://www.npmjs.com/package/next-transpile-modules) 
to your `next.config.js`. Without doing this, you may run errors such as `Error: Cannot find module 'react'`.
