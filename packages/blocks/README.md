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

`@faustwp/blocks` provides conventional connector components for rendering WordPress blocks.

# Getting Started with Gutenberg Blocks Provider and Viewer

## Quick Start

Make sure you have completed the initial setup for Faust at [Getting Started](https://faustjs.org/docs/getting-started).

Install the blocks package:

```bash
npm i @faustwp/blocks
```

Install the peer dependencies:

```bash
npm i @wordpress/style-engine
```

Open `_app.js` and import the `WordPressBlocksProvider`:

```jsx
import { WordPressBlocksProvider } from '@faustwp/blocks';

<FaustProvider pageProps={pageProps}>
  <WordPressBlocksProvider
    config={{
      blocks,
    }}>
    <Component {...pageProps} key={router.asPath} />
  </WordPressBlocksProvider>
</FaustProvider>
```

Then, inside your templates you need to pass on the `editorBlocks` data in your `WordPressBlocksViewer`.

The helper function `flatListToHierarchical` is imported from `@faustwp/core`:

```js
import { flatListToHierarchical } from '@faustwp/core';
import { WordPressBlocksViewer } from '@faustwp/blocks';
import blocks from '../wp-blocks';

const { editorBlocks } = props.data.post;
const blocks = flatListToHierarchical(editorBlocks, {childrenKey: 'innerBlocks'});

return <WordPressBlocksViewer blocks={blocks}/>
```
By default the API brings all the nodes back in one array instead of a bunch of separate nodes with their own arrays. Therefore we use the `flatListToHierarchical` to convert the list back to the hierarchical tree type.

Example `editorBlocks` GraphQL query fragment:

```graphql
${components.CoreParagraph.fragments.entry}
editorBlocks {
  __typename
  name
  renderedHtml
  id: clientId
  parentClientId
  ...${components.CoreParagraph.fragments.key}
}
```

## A Simple Block Example
This is a simple block called `CoreParagraph`. The block is a `p` tag that sets its content to `attributes.content` which is passed in from the props.

`CoreParagraph.fragments` does a WPGraphQL query for the `content` and `cssClassName` and sets it as the fragment `CoreParagraphFragment`.

```jsx
import { gql } from '@apollo/client';
import React from 'react';

export default function CoreParagraph(props) {
  const attributes = props.attributes;
  return (
    <p
      className={attributes?.cssClassName}
      dangerouslySetInnerHTML={{ __html: attributes.content }}></p>
  );
}

CoreParagraph.fragments = {
  entry: gql`
    fragment CoreParagraphFragment on CoreParagraph {
      attributes {
        content
        cssClassName
      }
    }
  `,
  key: `CoreParagraphFragment`,
};
```
Use a default barrel export of the CoreParagraph Block in `index.js`:

```js
import CoreParagraph from './CoreParagraph';
export default {
  'CoreParagraph': CoreParagraph,
};
```

By doing so the framework will match the name of the export `CoreParagraph` with the `__typename`
or `name` fields in the query response. If it finds a match it will resolve the Component associated with that name.

## Further Learning

More details on the [WordPressBlocksProvider](https://faustjs.org/docs/reference/WordPressBlocksProvider).

More details on the [WordPressBlocksViewer](https://faustjs.org/docs/reference/WordPressBlocksViewer).

Continue learning about the project structure, how to change styles, layout, etc. by referencing the [Example Project Walkthrough Structure.](https://faustjs.org/docs/next/guides/project-walkthrough)

Please see [https://faustjs.org/docs/gutenberg/getting-started](https://faustjs.org/docs/gutenberg/getting-started) for the Getting Started Guide for Gutenberg Blocks.
