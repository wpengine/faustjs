---
'faustwp': patch
---

- Changed the plugin name to FaustWP.
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
