---
'@faustwp/experimental-app-router': patch
---

Fixed an issue where the Apollo Client was being shipped to the browser client bundle resulting in large bundle sizes (150kb+). For more context: https://github.com/apollographql/apollo-client-nextjs/issues/95
