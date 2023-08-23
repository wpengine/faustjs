# @faustwp/block-editor-utils

## 0.0.2

### Patch Changes

- 176bc82: Feat: Add `registerFaustBlock` helper that wraps `edit` and `save` functions used to register new blocks in Gutenberg.

  Usage:

  ```js
  import metadata from './block.json';

  import MyFirstBlock from './MyFirstBlock';
  import { registerFaustBlock } from '@faustwp/block-editor-utils';

  import Edit from './edit';
  import save from './save';

  registerFaustBlock(MyFirstBlock, {
    blockJson: metadata,
    editFn: Edit,
    saveFn: save,
  });
  ```

- d8c93fa: Feat: Added a default EditFunction.

  ```js
  import metadata from './block.json';

  import MyFirstBlock from './MyFirstBlock';
  import { registerFaustBlock } from '@faustwp/block-editor-utils';
  registerFaustBlock(MyFirstBlock, { blockJson: metadata });
  ```
