=== Faust.js ===
Contributors: antpb, apmatthe, blakewpe, chriswiegman, claygriffiths, jasonkonen, joefusco, markkelnar, matthewguywright, mindctrl, modernnerd, rfmeier, TeresaGobble, thdespou, wpengine
Tags: faustjs, faust, headless, decoupled, composable-architecture
Requires at least: 5.7
Tested up to: 6.4
Stable tag: 1.2.2
Requires PHP: 7.2
License: GPLv2 or later
License URI: https://www.gnu.org/licenses/gpl-2.0.html

Faust.js™ transforms your traditional WordPress installation into a flexible headless CMS.

== Description ==

In conjunction with the [Faust.js™ NPM packages](https://www.npmjs.com/search?q=%40faustwp), the Faust.js™ WordPress plugin enables a decoupled front-end to authenticate with WordPress through GraphQL mutations and REST API endpoints. It is the bridge between a Faust.js™ powered front-end application, and a WordPress backend.

The plugin also provides useful options for headless sites, such as the ability to:

- Hide “theme” admin pages.
- Redirect public route requests to the front-end application.
- Rewrite WordPress URLs to front-end URLs in queried content.

== Installation ==

1. Search for the plugin in WordPress under "Plugins -> Add New".
2. Click the “Install Now” button, followed by "Activate".

That's it! For more information on getting started with headless WordPress, see [Getting Started with Faust.js](https://faustjs.org/docs/tutorial/dev-env-setup).

== Frequently Asked Questions ==

= If I need more support, where should I ask questions? =
Use one of the channels below to contact the Faust.js team for support.
[GitHub](https://github.com/wpengine/faustjs) - Faust.js GitHub documentation and codebase.
[Discord](https://discord.gg/J2khkF9XYK) - Interactive chat support on Discord.

= Where can I find more information about development and future features for this plugin? =

Great question! The development team posts weekly summaries of sprints related to Faust.js, [here](https://faustjs.org/blog).

= Why the name “Faust.js”? =

Johann Faust was a German printer and was instrumental in the invention of the printing press, along with his partner Johann Gutenberg. In the same way the printing press democratized the spread of information, the mission of Faust.js is to support and further the vision of WordPress to democratize publishing on the web.

== Screenshots ==

1. The settings page
2. Portfolio, blog, and basic blueprints for headless sites built with Faust.js
3. A code snippet

plugins/faustwp/.wordpress-org/screenshot-1.png
plugins/faustwp/.wordpress-org/screenshot-2.png
plugins/faustwp/.wordpress-org/screenshot-3.png

== Changelog ==

= 1.2.2 =

### Patch Changes

- 47f6bd0: Faust now warns you if the secret key in your environment is invalid or incorrect.

= 1.2.1 =

### Patch Changes

- 05cc940: Fix: swap traditional custom post type URLs in WordPress admin for the headless frontend custom post type URLs.

= 1.2.0 =

### Minor Changes

- 5f78b15: Requests to robots.txt on the WordPress site are now accessible and are no longer redirected to the front-end site.
- c163fa5: Added support for anonymous opt-in telemetry. Previously this functionality was in the Faust CLI package, but has been moved to the WordPress plugin instead. All telemetry collection is optional and anonymous, and it is disabled by default. If you were previously opted in from Faust CLI, once you update the Faust CLI packages your site will no longer send telemetry data unless you opt in again from the WordPress plugin.

### Patch Changes

- 205fb09: Improved plugin's process for handling blockset file uploads by leveraging WordPress' native [unzip_file](https://developer.wordpress.org/reference/functions/unzip_file/) function.
- 41a6d9c: Fixed issue where term URIs were rewritten from relative to absolute during GraphQL requests when they should not have been. This was causing nodeByUri queries for terms to fail.
- e725bda: Adds phpstan to CI/CD workflow. Runs as part of the lint step.

[View the full changelog](https://github.com/wpengine/faustjs/blob/canary/plugins/faustwp/CHANGELOG.md)