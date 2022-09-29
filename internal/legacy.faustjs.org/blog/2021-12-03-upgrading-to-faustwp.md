---
title: Upgrading to FaustWP
description: All you need to know about upgrading to FaustWP.
slug: upgrading-to-faustwp
hide_table_of_contents: true
---

The WP Engine Headless (or WPE Headless) plugin has been renamed to FaustWP starting with version 0.7.0.<!--truncate--> Along with the rename, distribution of the plugin has moved off of WP Engine servers and into the official wordpress.org plugin repository. In order to continue receiving plugin updates and remain compatible with future versions of Faust.js NPM packages, site owners will need to do the following:

1. Log in to your WordPress admin dashboard.
2. Go to “Plugins -> Add New” in the admin sidebar.
3. In the top right corner, enter "FaustWP" in the search box.
4. Click the “Install Now” button.
5. Once the installation is complete, click “Activate”.

Activating FaustWP will automatically deactivate WP Engine Headless if it is installed and active on your site. **All plugin settings will be preserved, including your secret key.** You can now remove the old, deactivated WP Engine Headless plugin:

1. Go to "Plugins -> Installed Plugins" in the admin sidebar.
2. Verify that FaustWP is installed and active.
3. Verify that WP Engine Headless is inactive.
4. Delete WP Engine Headless.

We have done our best to ensure a seamless upgrade experience, but we encourage users to review the [plugin changelog](https://faustjs.org/docs/changelog/faustwp) to evaluate any impacts these changes might have in their own applications.

## Package Updates

Version 0.7.0 of FaustWP is best suited for use with `@faustjs/core` version 0.14.0 or greater. As noted in the [changelog](https://faustjs.org/docs/changelog/core) for version 0.14.0:

> The FaustWP plugin has deprecated the REST endpoint that `@faustjs/core` uses for authorization. Both the plugin and the `@faustjs/core` package will continue to work with the deprecated endpoint until it is removed in a future version. Make sure to always update your FaustWP plugin and `@faustjs` packages together to avoid any issues that may arise from incompatible versions.

We recommend updating all of your Faust.js packages after installing the FaustWP plugin.

### Changelogs
- [@faustjs/core](https://faustjs.org/docs/changelog/core)
- [@faustjs/next](https://faustjs.org/docs/changelog/next)
- [@faustjs/react](https://faustjs.org/docs/changelog/react)
