=== Faust.js ===
Contributors: antpb, apmatthe, blakewpe, chriswiegman, claygriffiths, jasonkonen, joefusco, markkelnar, matthewguywright, mindctrl, modernnerd, rfmeier, TeresaGobble, thdespou, wpengine
Tags: faustjs, faust, headless, decoupled, composable-architecture
Requires at least: 5.7
Tested up to: 6.2
Stable tag: 1.0.0
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

= 1.0.0 =

### Major Changes

- 7952ebe: Transitioned to [Semantic Versioning](https://semver.org). There are no breaking changes in this release.

### Patch Changes

- ef92d02: Added `wp-graphql-content-blocks` version to the telemetry endpoint.

= 0.8.7 =

### Patch Changes

- 2eeb366: The default plugin setting for "Disable WordPress Theme Admin Pages" is now unchecked, requiring a user to opt-in after initial activation.

= 0.8.6 =

### Patch Changes

- 02f7f78: Registered a new GraphQL field, `globalStylesheet`, that returns [wp_get_global_stylesheet](https://developer.wordpress.org/reference/functions/wp_get_global_stylesheet/) and provides the same arguments as the core WordPress function.

[View the full changelog](https://faustjs.org/docs/changelog/faustwp)