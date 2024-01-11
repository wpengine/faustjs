---
'@faustwp/wordpress-plugin': patch
---

Fixed issue where term URIs were rewritten from relative to absolute during GraphQL requests when they should not have been. This was causing nodeByUri queries for terms to fail.
