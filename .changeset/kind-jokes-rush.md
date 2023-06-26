---
'@faustwp/blocks': minor
---

Introduced the `CoreList` block. It can be used like:

`wp-blocks/index.js`:

```jsx
import { CoreBlocks } from '@faustwp/blocks';

export default {
  // Your other blocks...
  CoreList: CoreBlocks.CoreList,
};
```
