---
'@faustjs/core': minor
---

Updated internal auth endpoints and headers for WPE Headless plugin rename.

The FaustWP plugin has deprecated the REST endpoint that `@faustjs/core` uses for authorization.
Both the plugin and the `@faustjs/core` package will continue to work with the deprecated endpoint
until it is removed in a future version. Make sure to always update your FaustWP plugin and `@faustjs`
packages together to avoid any issues that may arise from incompatible versions.
