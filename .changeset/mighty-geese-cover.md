---
'@faustwp/core': minor
---

The Faustjs plugin system is no longer experimental. We have maintained backward compatibility as we move towards deprecating `experimentalPlugins` from the Faust config file `faust.config.js` in favor of `plugins`. We recommend moving over to using `plugins` instead of `experimentalPlugins` as soon as possible as a future version will remove the experimental config option.
