---
'@faustwp/block-editor-utils': patch
---

Feat: Add `registerFaustBlock`` helper that wraps `edit` and `save` functions used to register new blocks in Gutenberg.

Usage:

```js
import metadata from './block.json';

import MyFirstBlock from './MyFirstBlock';
import {registerFaustBlock} from '@faustwp/block-editor-utils'

import Edit from './edit';
import save from './save';

registerFaustBlock(MyFirstBlock, {blockJson: metadata, editFn: Edit, saveFn: save})
```
