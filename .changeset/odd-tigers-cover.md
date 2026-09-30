---
'@faustwp/core': patch
---

Adds new hook wpAdminUrl that lets user customize the wp-admin url in toolbar

Usage:

```js
export class MyPlugin {
  apply(hooks) {
    const { addAction, addFilter } = hooks;

    addFilter(
      'wpAdminUrl',
      'my-namespace',
      (wpAdminUrl, context) => {
        // replaces default wp-admin url at /wp-admin with /wp/wp-admin
        return wpAdminUrl.replace('/wp-admin', '/wp/wp-admin')
      },
    );
  }
}

/**
 * @type {import('@faustwp/core').FaustConfig}
 **/
export default setConfig({
  templates,
  plugins: [new MyPlugin()],
  experimentalToolbar: true,
  possibleTypes,
});

```
