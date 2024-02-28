# Faust

## 1.2.2

### Patch Changes

- 47f6bd0: Faust now warns you if the secret key in your environment is invalid or incorrect.

## 1.2.1

### Patch Changes

- 05cc940: Fix: swap traditional custom post type URLs in WordPress admin for the headless frontend custom post type URLs.

## 1.2.0

### Minor Changes

- 5f78b15: Requests to robots.txt on the WordPress site are now accessible and are no longer redirected to the front-end site.
- c163fa5: Added support for anonymous opt-in telemetry. Previously this functionality was in the Faust CLI package, but has been moved to the WordPress plugin instead. All telemetry collection is optional and anonymous, and it is disabled by default. If you were previously opted in from Faust CLI, once you update the Faust CLI packages your site will no longer send telemetry data unless you opt in again from the WordPress plugin.

### Patch Changes

- 205fb09: Improved plugin's process for handling blockset file uploads by leveraging WordPress' native [unzip_file](https://developer.wordpress.org/reference/functions/unzip_file/) function.
- 41a6d9c: Fixed issue where term URIs were rewritten from relative to absolute during GraphQL requests when they should not have been. This was causing nodeByUri queries for terms to fail.
- e725bda: Adds phpstan to CI/CD workflow. Runs as part of the lint step.

## 1.1.2

### Patch Changes

- 78a061a: Fixed a bug that caused links to files in wp-content to be rewritten to the Faust Front-end site URL when they should not have been.
- 2559958: Bug Fix: Fixed missing call to autosave when using Post/Page previews.
- 75f5c80: Fixed a bug where links were rewritten to the Faust Front-end Site URL when using the post editor, resulting in those rewritten links being saved to the post content and guid fields when they shouldn't be. These links are now saved with the URL pointing to the WP site, as they should be. They are still rewritten at runtime to link to the Front-end Site URL when appropriate.

## 1.1.1

### Patch Changes

- b2c0fd3: Updated the settings page to improve descriptions and documentation links.

## 1.1.0

### Minor Changes

- c29f83d: Add blockset command in @faust/cli and faustwp plugin.

  Add your blocks inside `wp-blocks` folder. Then run `faust blockset` to compile and upload the blocks into WordPress. Blocks will be available in the editor.

- d3d30aa: Added support for authenticated WPGraphQL introspection queries using FAUST_SECRET_KEY. It is no longer required to enable "Public Introspection" in WPGraphQL.

## 1.0.4

### Patch Changes

- fcc6d37: Fixed a bug in the block editor screen where the preview link was missing the `p` and `previewPathName` query arguments after saving a draft.

## 1.0.3

### Patch Changes

- 188bd75: Auto-update enqueued asset versions whenenever the plugin is updated.

## 1.0.2

### Patch Changes

- 0c9f9b5: Image URLs (and any URLs with file extensions) are now excluded from the replacement that Faust does in the GraphQL query results.

## 1.0.1

### Patch Changes

- 9ed3c40: Bug: Fixed an issue where the preview button could crash the browser

## 1.0.0

### Major Changes

- 7952ebe: Transitioned to [Semantic Versioning](https://semver.org). There are no breaking changes in this release.

### Patch Changes

- ef92d02: Added `wp-graphql-content-blocks` version to the telemetry endpoint.

## 0.8.7

### Patch Changes

- 2eeb366: The default plugin setting for "Disable WordPress Theme Admin Pages" is now unchecked, requiring a user to opt-in after initial activation.

## 0.8.6

### Patch Changes

- 02f7f78: Registered a new GraphQL field, `globalStylesheet`, that returns [wp_get_global_stylesheet](https://developer.wordpress.org/reference/functions/wp_get_global_stylesheet/) and provides the same arguments as the core WordPress function.

## 0.8.5

### Patch Changes

- eaa5e48: Added the `shouldShowFaustToolbar` field on the `viewer` WPGraphQL type to determine if the Faust toolbar should be shown based on user preferences.

## 0.8.4

### Patch Changes

- 43205e1: Bug Fix: "Post and Category URL rewrites" setting ignores protocol of configured front-end site URL

## 0.8.3

### Patch Changes

- c4696ef: - Added new filter `faustwp_exclude_from_public_redirect`, allowing WordPress plugins and themes to exclude certain routes from being redirected when the [enable public route redirects](https://faustjs.org/docs/faustwp/settings#enabling-public-route-redirects) setting is active.

## 0.8.2

### Patch Changes

- 4dce6dc: Added support for FAUST_SECRET_KEY in addition to the pre-existing FAUSTWP_SECRET_KEY.

## 0.8.1

### Patch Changes

- c016c9f: Update plugin title in changelog

## 0.8.0

### Minor Changes

- b59d6c0: Renamed plugin from `FaustWP` to `Faust`.
- b59d6c0: Updated settings menu text from _Headless_ to _Faust_.

## 0.7.11

### Patch Changes

- b3c70a4: Prevent WordPress RSS feeds from redirecting to the front-end application.

## 0.7.10

### Patch Changes

- 88ce018: Fix generate endpoint when WordPress is installed within a subdirectory. Props to @kermage for the fix!
- 0c757a2: Remove unnecessary config from wordpress.org zip.

## 0.7.9

### Patch Changes

- 4ab6cdf: Fix menu paths when activated within a multisite using subdirectories.
- ccb7ff3: Fix page preview links
- bb59263: The plugin's default settings are now working when activated within a multisite installation.
- 6c04567: Fixes a conflict between public route redirects and the full site editor
- d12f938: Updates an icon on the settings page

## 0.7.8

### Patch Changes

- 8942b83: Adds warning when known incompatible plugins are active.
- 6d3f5de: Fix conflict with PublishPress that caused preview links to fail

## 0.7.7

### Patch Changes

- 6a75593: Fixes a PHP 8 warning that occured on post types not registered with WP GraphQL [#812](https://github.com/wpengine/faustjs/pull/812)

## 0.7.6

### Patch Changes

- 420d0b4: Remove trailing slash from frontend uri.
- 037b57b: Ensure sitemap URLs use the WordPress domain and not the headless frontend domain. Fixes a conflict with Yoast SEO that prevented post links from being added to the posts sitemap.

## 0.7.5

### Patch Changes

- b7af359: Simplify generation of preview links. Fixes an issue where preview links were missing slashes with certain permalink structures. Thanks @torounit!
- 662c377: Plugin settings are now validated and sanitized before saving.
- c730348: Disables access to the site editor when themes are disabled

## 0.7.4

### Patch Changes

- 1dcd987: Removes unused event callbacks for rewrite rule and post status changes. The `is_events_enabled()` function has also been removed.
- 5c69b68: ConditionalTags has been deprecated as it was introduced in an older version of the framework when routing was done from the NextTemplateLoader. Now that we are using Next.js pages for routing, conditionalTags are no longer needed.
- 7d156ba: Add a documentation link that explains "Features" checkbox settings in more detail

## 0.7.3

### Patch Changes

- ab4a661: Fixed issue where file editor was unable to save

## 0.7.2

### Patch Changes

- 4cff9dc: feat: add link to Settings page on Installed Plugins list page
- 3c1280b: Adds the GraphQL `Type` name to the preview URL to avoid making a request to get the content type in the Faust.js packages

## 0.7.1

### Patch Changes

- f948c04: Fixed plugin icon SVG display issue in Chrome [#683](https://github.com/wpengine/faustjs/pull/683)

## 0.7.0

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

## 0.6.1

- Fixed the headless options page sidebar links to new Faust.js documentation site.

## 0.6.0

- [Breaking Change] Added support for access/refresh token based auth flow in the authorize endpoint.
- Added `page_id` query param to preview pages when the content type is `page`

## 0.5.8

- Lowering link filter priority to allow other plugins to run prior to swapping the domain

## 0.5.7

- Updated settings page docs links
- Added an admin notice on the Headless settings page to prompt users to configure permalinks if they are not set

## 0.5.6

- Fixes an issue where the templates hierarchy from the templates hierarchy filter was not being returned.

## 0.5.5

- Prevents the frontend site URL being prepended to post URI paths in GraphQL responses if “Enable Post and Category URL rewrites” is checked.

## 0.5.4

- Prevents authentication failures when using an authorization header to authenticate with WPGraphQL JWT Authentication or similar.

## 0.5.3

Requires the @wpengine/headless package 0.6.3+ for features such as post previews. https://www.npmjs.com/package/@wpengine/headless

- Fixes post previews for frontend apps running from a subfolder.

## 0.5.2

Requires the @wpengine/headless package 0.6.2+ for features such as post previews. https://www.npmjs.com/package/@wpengine/headless

- Fixes an issue that could cause a 404 response for post previews.

## 0.5.1

Requires the @wpengine/headless package 0.6.1+ for features such as post previews. https://www.npmjs.com/package/@wpengine/headless

- The site URL is longer rewritten as the app URL in WPGraphQL responses for general settings queries.

## 0.5.0

- WPE_HEADLESS_SECRET_KEY has been renamed to WP_HEADLESS_SECRET_KEY.

## 0.4.1

- Fixed potential authentication issue with WP GraphQL

## 0.4.0

- Redesigned settings page.

## 0.1.0

- Proof of concept
