---
'@faustwp/wordpress-plugin': minor
---

### Fixes

- Fixes various issues with content replacement callback functions and replacing the site_url and media_urls
- Fixed an issue with content replacement when media replacement was disabled and rewrites enabled, it was overwriting and updating the media URL to the frontend URL rather than leaving it as the original site URL


### Added

- Added 6.6 and 6.7 to Github Actions
- Added 2 new filters for `faustwp_get_wp_site_urls` and `faustwp_get_wp_site_media_urls` to allow users add/remove/edit site and media URLS for the content replacement.
