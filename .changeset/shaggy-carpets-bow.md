---
'@faustwp/cli': patch
---

Faust CLI now outputs version number when running dev|build|start commands.

When running those commands it will print the current Faust core and cli versions in the console:

```bash
% npm run dev -w examples/next/faustwp-getting-started
info - Faust.js v3.0.1
info - Faust.js CLI v3.0.1
ready - started server on 0.0.0.0:3000, url: http://localhost:3000
...
```
