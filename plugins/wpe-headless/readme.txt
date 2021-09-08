=== Headless Plugin ===
Contributors:
Tags:
Requires at least: 5.3
Tested up to: 5.5
Requires PHP: 5.6
Stable tag: 0.6.0
License: GPLv2 or later
License URI: https://www.gnu.org/licenses/gpl-2.0.html
Author: WP Engine

Transform your WordPress site to a powerful Headless API.

== Description ==

== Installation ==

== Frequently Asked Questions ==

= A question that someone might have =

== Screenshots ==

== Changelog ==

= 0.6.0 =
- [Breaking Change] Added support for access/refresh token based auth flow in the authorize endpoint. 
- Added `page_id` query param to preview pages when the content type is `page`

= 0.5.8 =

- Lowering link filter priority to allow other plugins to run prior to swapping the domain

= 0.5.7 =

- Updated settings page docs links
- Added an admin notice on the Headless settings page to prompt users to configure permalinks if they are not set

= 0.5.6 =

- Fixes an issue where the templates hierarchy from the templates hierarchy filter was not being returned.

= 0.5.5 =

- Prevents the frontend site URL being prepended to post URI paths in GraphQL responses if “Enable Post and Category URL rewrites” is checked.

= 0.5.4 =

- Prevents authentication failures when using an authorization header to authenticate with WPGraphQL JWT Authentication or similar.

= 0.5.3 =
Requires the @wpengine/headless package 0.6.3+ for features such as post previews. https://www.npmjs.com/package/@wpengine/headless

- Fixes post previews for frontend apps running from a subfolder.

= 0.5.2 =
Requires the @wpengine/headless package 0.6.2+ for features such as post previews. https://www.npmjs.com/package/@wpengine/headless

- Fixes an issue that could cause a 404 response for post previews.

= 0.5.1 =
Requires the @wpengine/headless package 0.6.1+ for features such as post previews. https://www.npmjs.com/package/@wpengine/headless

- The site URL is longer rewritten as the app URL in WPGraphQL responses for general settings queries.

= 0.5.0 =
- WPE_HEADLESS_SECRET_KEY has been renamed to WP_HEADLESS_SECRET_KEY.

= 0.4.1 =
- Fixed potential authentication issue with WP GraphQL

= 0.4.0 =
- Redesigned settings page.

= 0.1.0 =
- Proof of concept
