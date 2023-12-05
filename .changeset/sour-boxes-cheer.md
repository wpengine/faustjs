---
'@faustwp/block-editor-utils': minor
---

Add support for RichText control fields.

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
