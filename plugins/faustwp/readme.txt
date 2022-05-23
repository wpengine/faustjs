=== FaustWP ===
Contributors: antpb, apmatthe, blakewpe, chriswiegman, claygriffiths, jasonkonen, joefusco, markkelnar, mindctrl, modernnerd, rfmeier, wpengine
Tags: faustjs, faust, headless, decoupled
Requires at least: 5.7
Tested up to: 6.0
Stable tag: 0.7.9
Requires PHP: 7.2
License: GPLv2 or later
License URI: https://www.gnu.org/licenses/gpl-2.0.html

FaustWP transforms your traditional WordPress installation into a flexible headless CMS.

== Description ==

In conjunction with Faust.js, FaustWP enables a decoupled front-end to authenticate with WordPress through GraphQL mutations and REST API endpoints. It is the connective glue between a Faust.js-powered front-end app, and a WordPress backend.

The plugin also provides useful options for headless sites, such as the ability to:
<ul>
<li>Hide “theme” admin pages.</li>
<li>Redirect public route requests to the front-end application.</li>
<li>Rewrite WordPress URLs to front-end URLs in queried content.</li>
</ul>

== Installation ==

1. Search for the plugin in WordPress under "Plugins -> Add New".
2. Click the “Install Now” button, followed by "Activate".

That's it! For more information on getting started with headless WordPress, see <a href="https://faustjs.org/docs/tutorial/dev-env-setup" target="_blank">Getting Started with Faust.js</a>.

== Changelog ==

= 0.7.9 =

### Patch Changes

- 4ab6cdf: Fix menu paths when activated within a multisite using subdirectories.
- ccb7ff3: Fix page preview links
- bb59263: The plugin's default settings are now working when activated within a multisite installation.
- 6c04567: Fixes a conflict between public route redirects and the full site editor
- d12f938: Updates an icon on the settings page

= 0.7.8 =

### Patch Changes

- 8942b83: Adds warning when known incompatible plugins are active.
- 6d3f5de: Fix conflict with PublishPress that caused preview links to fail

= 0.7.7 =

### Patch Changes

- 6a75593: Fixes a PHP 8 warning that occured on post types not registered with WP GraphQL [#812](https://github.com/wpengine/faustjs/pull/812)

[View the full changelog](https://faustjs.org/docs/changelog/faustwp)