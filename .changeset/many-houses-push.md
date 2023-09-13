---
'@faustwp/cli': patch
---

Fixed a regression where an improper exit code was being thrown when 1. the `NEXT_PUBLIC_WORDPRESS_URL` environment variable was not set or 2. the GraphQL endpoint was not available
