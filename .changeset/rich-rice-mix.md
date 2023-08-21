---
'@faustwp/block-editor-utils': patch
---

Feat: Added a default EditFunction.

```js
import metadata from './block.json';

import MyFirstBlock from './MyFirstBlock';
import {registerFaustBlock} from '@faustwp/block-editor-utils';
registerFaustBlock(MyFirstBlock, {blockJson: metadata})
```
