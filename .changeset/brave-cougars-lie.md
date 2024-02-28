---
'@faustwp/core': patch
---

Fixed the behavior of a request to the `api/faust/auth/token` endpoint on every page load when the toolbar is enabled. We now set a `WP_URL-has-rt` token with a `0` or `1` value that can be read client side (aka, not an `httpOnly` cookie) for determining if there is a logged in user or not.
