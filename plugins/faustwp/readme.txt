=== Faust.js ===
Contributors: antpb, apmatthe, blakewpe, chriswiegman, claygriffiths, colin-murphy, jasonkonen, joefusco, markkelnar, matthewguywright, mindctrl, modernnerd, rfmeier, teresagobble, thdespou, wpengine
Tags: faustjs, faust, headless, decoupled, composable-architecture
Requires at least: 5.7
Tested up to: 7.0
Stable tag: 1.9.0
Requires PHP: 7.4
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

= Why the name “Faust.js”? =

Johann Faust was a German printer and was instrumental in the invention of the printing press, along with his partner Johann Gutenberg. In the same way the printing press democratized the spread of information, the mission of Faust.js is to support and further the vision of WordPress to democratize publishing on the web.

== Screenshots ==

1. The settings page
2. Portfolio, blog, and basic blueprints for headless sites built with Faust.js
3. A code snippet

== Upgrade Notice ==

= 1.8.10 =
Maintenance release. Sites still on 1.8.0 should update to address GHSA-q6pm-r77q-qcv3 / CVE-2026-54239.

== Changelog ==

= 1.9.0 =


### Features

* connect Faust.js to WordPress with an Application Password ([#2676](https://github.com/wpengine/faustjs/issues/2676)) ([f34412c](https://github.com/wpengine/faustjs/commit/f34412ca683c6663a5176ffb590845721ff59f34))


### Bug Fixes

* end the WordPress session when logging out of the frontend ([#2684](https://github.com/wpengine/faustjs/issues/2684)) ([f32eb6b](https://github.com/wpengine/faustjs/commit/f32eb6b3295a812354d405028c8d97b2ead173b5))
* **faustwp:** make blockset files readable by the web server ([#2681](https://github.com/wpengine/faustjs/issues/2681)) ([89561a5](https://github.com/wpengine/faustjs/commit/89561a50384d4970a2f79e34c25e2b9c8beaec5d))

= 1.8.14 =


### Bug Fixes

* **faustwp:** keep posts and pages in Rank Math sitemaps when URL rewrites are on ([#2664](https://github.com/wpengine/faustjs/issues/2664)) ([288a7b1](https://github.com/wpengine/faustjs/commit/288a7b10374ee882c67816a0a8f864b2b0d0d6f7))
* **faustwp:** keep the View Post link after publishing in the block editor ([#2667](https://github.com/wpengine/faustjs/issues/2667)) ([183572b](https://github.com/wpengine/faustjs/commit/183572b242bc5623fd3f012ce737e8b58ccf0655))
* **faustwp:** only rewrite the block editor's save notice link ([#2671](https://github.com/wpengine/faustjs/issues/2671)) ([bbcd312](https://github.com/wpengine/faustjs/commit/bbcd31254244d771b2cafc9bc9f8245c89a050d6))

= 1.8.13 =


### Bug Fixes

* **faustwp:** stop repeating the subdirectory in public route redirects ([#2642](https://github.com/wpengine/faustjs/issues/2642)) ([e5f813a](https://github.com/wpengine/faustjs/commit/e5f813a53bceed7adad13dd54a2458bed3ba557b))

[View the full changelog](https://github.com/wpengine/faustjs/blob/canary/plugins/faustwp/CHANGELOG.md)