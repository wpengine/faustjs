=== FaustWP ===
Contributors: antpb, apmatthe, blakewpe, claygriffiths, markkelnar, mindctrl, modernnerd, rfmeier, wpengine
Tags: faustjs, faust, headless, decoupled
Requires at least: 5.7
Tested up to: 5.8.2
Stable tag: 0.7.2
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

= 0.7.2 =

### Patch Changes

- 4cff9dc: feat: add link to Settings page on Installed Plugins list page
- 3c1280b: Adds the GraphQL `Type` name to the preview URL to avoid making a request to get the content type in the Faust.js packages

= 0.7.1 =

### Patch Changes

- f948c04: Fixed plugin icon SVG display issue in Chrome [#683](https://github.com/wpengine/faustjs/pull/683)

= 0.7.0 =

### Minor Changes

- Changed the plugin name to FaustWP.
- Changed all internal PHP function names to use namespaces.
- Changed the WP_HEADLESS_SECRET_KEY constant to FAUSTWP_SECRET_KEY.
- Changed the authentication endpoint namespace from `wpac/v1` to `faustwp/v1`
- Changed settings option name from `wpe_headless` to `faustwp_settings`
- Changed the following filter names:
  - `wpe_headless_setting` to `faustwp_setting`
  - `wpe_headless_settings` to `faustwp_settings`
  - `wpe_headless_domain_replacement_enabled` to `faustwp_domain_replacement_enabled`
- Changed the text domain to `faustwp`.
- Changed minimum required PHP version to 7.2.
- Changed minimum required WordPress version to 5.7.
- Changed the hook used for public route redirection.
- Fixed the "headless post preview" link on the FaustWP settings page.
- Fixed "unexpected output" error during plugin activation.
- Fixed skipped domain replacement in GraphQL responses that include `generalSettings`.
- Added LICENSE file.

[View the full changelog](https://faustjs.org/docs/changelog/faustwp)