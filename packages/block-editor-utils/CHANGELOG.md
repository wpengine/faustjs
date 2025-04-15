# @faustwp/block-editor-utils

## 0.3.3

### Patch Changes

- 709fe4a: chore: Forced an update for babel packages for security vulnerability - GHSA-968p-4wvh-cqc8

## 0.3.2

### Patch Changes

- f4c0abb: chore: Update various babel packages.

## 0.3.1

### Patch Changes

- 74e55bc: Updated code formatting config and switch to tabs. Configure your editor config settings for tab sizing preferences.

## 0.3.0

### Minor Changes

- 53bb9a6d: Updated dependencies, peerDependencies and devDependencies to better support local development and debugging.

## 0.2.1

### Patch Changes

- f0543e0e: Adds missing TextAreaControl handler when specifing a `control: 'textarea'` in Component.config.editorFields.

  Adding this configuration to your blocks will render TextAreaControls component in the editor.

  ```js
  // Component.js

  Component.config = {
  	name: 'CreateBlockBlockB',
  	editorFields: {
  		textArea: {
  			type: 'string',
  			label: 'My Message',
  			location: 'editor',
  			control: 'textarea', // <--- Render a TextAreaControl field in the Gutenberg editor
  		},
  	},
  };
  ```

## 0.2.0

### Minor Changes

- aad3bbc: BREAKING CHANGE: With the deprecation of node version 16.x and it no longer being maintained we have updated our engines and workflows to only use 18+. Please update to use node version 18+.

## 0.1.0

### Minor Changes

- 8dcda28: Add support for RichText control fields.

  Add a `source` and `selector` in your block attributes string field:

  ```json
  ...
  "attributes": {
  		"richText": {
  			"type": "string",
  			"source": "html",
  			"selector": ".rich-text",
  			"default": "Hello World"
  		}
  	}
  ```

  Then in your component definition make sure the selector specifier matches the component you want to render as rich text:

  ```js
  <div
  	style={styles}
  	className="rich-text"
  	dangerouslySetInnerHTML={{ __html: attributes.richText }}
  />
  ```

  Once the blocks are synced you will be able to use it as a RichText field.

### Patch Changes

- 66c1e24: Publish Readme to NPM

## 0.0.5

### Patch Changes

- 604e9e3: Update block-editor-utils dependencies.

## 0.0.4

### Patch Changes

- ae69cfb: Feat: Add `CheckboxControl` field in `block-editor-utils`.
- ee8c08e: Feat: Add `RangeControl` field in `block-editor-utils`.

## 0.0.3

### Patch Changes

- 457933b: Feat: Handle NumberControl fields in the block-editor-utils.
- 40c836a: Feat: Handle RadioControl fields in the block-editor-utils.
- deb5767: Feat: Handle SelectControl fields in the block-editor-utils.
- db848c4: Feat: Handle TextControl fields in block-editor-utils.
- 1bb5e94: Feat: Handle ColorControl fields in block-editor-utils

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
