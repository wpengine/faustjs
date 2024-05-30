---
'@faustwp/block-editor-utils': patch
---

Adds missing TextAreaControl handler when specifing a `control: 'textarea'` in Component.config.editorFields.

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
      control: 'textarea' // <--- Render a TextAreaControl field in the Gutenberg editor
    },
  },
};
```
