---
'@faustwp/core': minor
---

The Faust.js plugin system is no longer experimental. We have maintained backward compatibility as we move towards deprecating `experimentalPlugins` in favor of `plugins` in the Faust config file `faust.config.js`. We recommend moving over to using `plugins` instead of `experimentalPlugins` as soon as possible as a future version will remove the experimental config option.
