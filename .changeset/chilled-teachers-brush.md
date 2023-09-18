---
'@faustwp/experimental-app-router': patch
---

Fixed an issue where the client was being shipped on the client resulting in large bundle sizes (150kb+). For more context: https://github.com/apollographql/apollo-client-nextjs/issues/95
