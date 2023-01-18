---
'@faustwp/core': patch
---

Created two new TypeScript types (`FaustPlugin` and `FaustHooks`) which can be used to type check Faust plugins:

```tsx
import { FaustHooks, FaustPlugin } from '@faustwp/core';

export class MyPlugin implements FaustPlugin {
  apply(hooks: FaustHooks) {}
}
```
