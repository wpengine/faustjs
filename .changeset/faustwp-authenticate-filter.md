---
"@faustwp/wordpress-plugin": patch
---

Route the `generateAuthorizationCode` mutation through `wp_authenticate()` so login policies hooked on the WordPress `authenticate` filter are enforced.
