---
'@faustwp/wordpress-plugin': patch
---

Fixed a bug where links were rewritten to the Faust Front-end Site URL when using the post editor, resulting in those rewritten links being saved to the post content and guid fields when they shouldn't be. These links are now saved with the URL pointing to the WP site, as they should be. They are still rewritten at runtime to link to the Front-end Site URL when appropriate.
