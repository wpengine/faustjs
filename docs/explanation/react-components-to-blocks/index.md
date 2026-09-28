---
title: "React Components to Blocks"
description: "The deprecated @faustwp/block-editor-utils package for converting React components into WordPress Block Editor blocks."
---

> [!CAUTION]
> The `@faustwp/block-editor-utils` package has been **deprecated** and will not receive further bug fixes or security patches. It only supports React 18 and depends on `@wordpress/*` editor packages that pull in `showdown`, which has unpatched security advisories. For new projects, see the [Headless WordPress Toolkit](https://github.com/wpengine/hwptoolkit).

The `@faustwp/block-editor-utils` package provided helper functions for converting React components into blocks, so the same components could be used in both a Next.js app and the WordPress Block Editor.

If you already use this package, it will keep working, but we recommend copying its source code directly into your project or using a tool such as [`patch-package`](https://www.npmjs.com/package/patch-package) if you need changes.

The code, the original version of this guide, and the example project are archived on the [`archive/block-editor-utils`](https://github.com/wpengine/faustjs/tree/archive/block-editor-utils) branch:

- [Package source](https://github.com/wpengine/faustjs/tree/archive/block-editor-utils/packages/block-editor-utils)
- [Original guide](https://github.com/wpengine/faustjs/blob/archive/block-editor-utils/docs/explanation/react-components-to-blocks/index.md)
- [Example project](https://github.com/wpengine/faustjs/tree/archive/block-editor-utils/examples/next/block-support)
- [RFC](https://github.com/wpengine/faustjs/issues/1522)

To render blocks from WordPress in your Next.js app, see [Rendering blocks](/docs/how-to/rendering-blocks/) and [Custom blocks](/docs/how-to/custom-blocks/). These use `@faustwp/blocks`, which is still maintained.
