# @faustwp/blocks

<p align="center">
  <a aria-label="NPM version" href="https://www.npmjs.com/package/@faustwp/blocks">
    <img alt="" src="https://img.shields.io/npm/v/@faustwp/blocks?color=7e5cef&style=for-the-badge">
  </a>

  <a aria-label="License" href="https://github.com/wpengine/faustjs/blob/canary/LICENSE">
    <img alt="" src="https://img.shields.io/npm/l/@faustwp/blocks?color=7e5cef&style=for-the-badge">
  </a>
</p>

<p align="center">
  <a aria-label="Faust.js Blocks Downloads Per Month" href="https://www.npmjs.com/package/@faustwp/blocks">
    <img alt="" src="https://img.shields.io/npm/dm/@faustwp/blocks?color=7e5cef&style=for-the-badge&label=@faustwp/blocks">
  </a>
  <a aria-label="Faust.js Blocks Downloads Per Week" href="https://www.npmjs.com/package/@faustwp/blocks">
    <img alt="" src="https://img.shields.io/npm/dw/@faustwp/blocks?color=7e5cef&style=for-the-badge&label=@faustwp/blocks">
  </a>
</p>

🚧 Please note this is prerelease software and breaking changes may occur.

`@faustwp/blocks` provides conventional connector components for rendering WordPress blocks.

# Getting Started with Gutenberg Blocks Provider and Viewer

## Quick Start

:::note

Make sure you have completed the initial setup for Faust at [Getting Started](https://faustjs.org/docs/gutenberg/getting-started).

:::

Install the blocks:

```bash
npm i @faustwp/blocks
```

Open ```_app.js``` and import the blocks provider:

```js
import { WordPressBlocksProvider } from '@faustwp/blocks';
```

Then, inside your templates you need to pass on the ```contentBlocks``` data in your ```WordPressBlocksViewer```:

```js
import { WordPressBlocksViewer } from '@faustwp/blocks';

const { title, content, featuredImage, date, author, contentBlocks } =
    props.data.post;
const blocks = flatListToHierarchical(contentBlocks);

<ContentWrapper>
   <WordPressBlocksViewer contentBlocks={blocks} />
</ContentWrapper>
```

Example ```contentBlock``` GraphQL query fragment:
```
contentBlocks(flat: true) {
  __typename
  renderedHtml
  id: nodeId
  parentId
  ${fragmentData(components).keys}
}
```

## Further Learning

Continue learning about the project structure, how to change styles, layout, etc. by referencing the [Example Project Walkthrough Structure.](/docs/next/guides/project-walkthrough)


Please see [https://faustjs.org/docs/gutenberg/getting-started](https://faustjs.org/docs/gutenberg/getting-started) for the Getting Started Guide.
