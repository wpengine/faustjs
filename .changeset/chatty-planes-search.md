---
'@faustwp/cli': patch
---

Fixed a bug where the `NODE_ENV` was not being set properly when `faust start` was ran. Additionally, fixed a bug that halted the `faust start` command from running in some CI/node environments.
