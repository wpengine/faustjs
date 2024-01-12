# Welcome to the Faust Custom Toolbar Example.

## Setup

See the [Getting Started](https://faustjs.org/tutorial/get-started-with-faust) to set up your base Faust project. In the tutorial you will see in the Quick Start section's first step that it says `To create a Faust project, run`:

```
npx create-next-app \
    -e https://github.com/wpengine/faustjs/tree/main \
    --example-path examples/next/faustwp-getting-started \
    --use-npm
```

You are going to modify the example used in the command. To use the Custom Toolbar example you must change `examples/next/faustwp-getting-started` to `examples/next/custom-toolbar`. It should look like this:

```
npx create-next-app \
    -e https://github.com/wpengine/faustjs/tree/main \
    --example-path examples/next/custom-toolbar \
    --use-npm
```

After this one change you can continue the rest of the guide per the instructions.

## Viewing the Toolbar

To view the toolbar, make sure you have completed the Getting Started steps and then click `Login`. After you are logged in and authenticated you will see the toolbar at the top of the template.

### Troubleshooting

If you don't see the toolbar and have already authenticated, make sure you have `experimentalToolbar` set to `true` in the [faust.config.js](./faust.config.js) file like below:

```
export default setConfig({
  templates,
  experimentalPlugins: [new CustomToolbar()],
  experimentalToolbar: true,
  possibleTypes,
});
```

## Customize the Example Plugin

To customize the example plugin, go to the plugin file [CustomToolbar.tsx](./plugins/CustomToolbar.tsx) and experiment.

## References

[Getting Started with Faust](https://faustjs.org/tutorial/get-started-with-faust)

[Customizing the Toolbar](https://faustjs.org/guide/how-to-customize-the-toolbar)

[How to Handle Authentication](https://faustjs.org/guide/how-to-handle-authentication)
