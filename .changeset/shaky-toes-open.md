---
'@faustwp/core': patch
---

Fixed an issue where dynamic template components were rendered via the next/dynamic wrapper directly, causing hydration mismatches and double renders, by resolving the dynamic component to its inner function and storing it in state before rendering.
