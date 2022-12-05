---
'@faustwp/core': patch
---

`getWordPressProps` now sets a smart default `revalidate` of `900` (15 minutes) when using `getStaticProps`
