=== FaustWP ===
Contributors: antpb, apmatthe, blakewpe, claygriffiths, joefusco, markkelnar, mindctrl, modernnerd, rfmeier, wpengine
Tags: faustjs, faust, headless, decoupled
Requires at least: 5.7
Tested up to: 5.9
Stable tag: 0.7.3
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

= 0.7.3 =

### Patch Changes

- ab4a661: Fixed issue where file editor was unable to save

= 0.7.2 =

### Patch Changes

- 4cff9dc: feat: add link to Settings page on Installed Plugins list page
- 3c1280b: Adds the GraphQL `Type` name to the preview URL to avoid making a request to get the content type in the Faust.js packages

= 0.7.1 =

### Patch Changes

- f948c04: Fixed plugin icon SVG display issue in Chrome [#683](https://github.com/wpengine/faustjs/pull/683)

[View the full changelog](https://faustjs.org/docs/changelog/faustwp)