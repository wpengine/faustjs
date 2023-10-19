import { getClient } from '@faustwp/experimental-app-router';
import { gql } from '@apollo/client';
import Link from 'next/link';
import { BlocksViewerRSC } from '@faustwp/blocks';
import blocks from '../wp-blocks';

import { flatListToHierarchical } from '@faustwp/core';

export default async function Home() {
  let client = await getClient();
  const editorBlocks = [
    {
      "name": "core/columns",
      "__typename": "CoreColumns",
      "renderedHtml": "\n<div class=\"wp-block-columns is-layout-flex wp-container-3 wp-block-columns-is-layout-flex\">\n<div class=\"wp-block-column is-layout-flow wp-block-column-is-layout-flow\">\n<p>Hello World</p>\n</div>\n\n\n\n<div class=\"wp-block-column is-layout-flow wp-block-column-is-layout-flow\">\n<p>How are you?</p>\n</div>\n</div>\n",
      "id": "65312d0165882",
      "parentId": null,
      "attributes": {
        "align": null,
        "anchor": null,
        "layout": null,
        "cssClassName": "wp-block-columns is-layout-flex wp-container-9 wp-block-columns-is-layout-flex",
        "isStackedOnMobile": true,
        "verticalAlignment": null,
        "borderColor": null,
        "backgroundColor": null,
        "fontSize": null,
        "fontFamily": null,
        "style": null,
        "textColor": null,
        "gradient": null
      }
    },
    {
      "name": "core/column",
      "__typename": "CoreColumn",
      "renderedHtml": "\n<div class=\"wp-block-column is-layout-flow wp-block-column-is-layout-flow\">\n<p>Hello World</p>\n</div>\n",
      "id": "65312d0165887",
      "parentId": "65312d0165882",
      "attributes": {
        "anchor": null,
        "borderColor": null,
        "backgroundColor": null,
        "cssClassName": "wp-block-column is-layout-flow wp-block-column-is-layout-flow",
        "fontSize": null,
        "fontFamily": null,
        "gradient": null,
        "layout": null,
        "style": null,
        "textColor": null,
        "verticalAlignment": null,
        "width": null
      }
    },
    {
      "name": "core/paragraph",
      "__typename": "CoreParagraph",
      "renderedHtml": "\n<p>Hello World</p>\n",
      "id": "65312d0165888",
      "parentId": "65312d0165887",
      "clientId": "65312d0165888",
      "parentClientId": "65312d0165887",
      "attributes": {
        "cssClassName": null,
        "backgroundColor": null,
        "content": "Hello World",
        "style": null,
        "textColor": null,
        "fontSize": null,
        "fontFamily": null,
        "direction": null,
        "dropCap": false,
        "gradient": null,
        "align": null
      }
    },
    {
      "name": "core/column",
      "__typename": "CoreColumn",
      "renderedHtml": "\n<div class=\"wp-block-column is-layout-flow wp-block-column-is-layout-flow\">\n<p>How are you?</p>\n</div>\n",
      "id": "65312d0165889",
      "parentId": "65312d0165882",
      "attributes": {
        "anchor": null,
        "borderColor": null,
        "backgroundColor": null,
        "cssClassName": "wp-block-column is-layout-flow wp-block-column-is-layout-flow",
        "fontSize": null,
        "fontFamily": null,
        "gradient": null,
        "layout": null,
        "style": null,
        "textColor": null,
        "verticalAlignment": null,
        "width": null
      }
    },
    {
      "name": "core/paragraph",
      "__typename": "CoreParagraph",
      "renderedHtml": "\n<p>How are you?</p>\n",
      "id": "65312d016588a",
      "parentId": "65312d0165889",
      "clientId": "65312d016588a",
      "parentClientId": "65312d0165889",
      "attributes": {
        "cssClassName": null,
        "backgroundColor": null,
        "content": "How are you?",
        "style": null,
        "textColor": null,
        "fontSize": null,
        "fontFamily": null,
        "direction": null,
        "dropCap": false,
        "gradient": null,
        "align": null
      }
    },
    {
      "name": "core/shortcode",
      "__typename": "CoreShortcode",
      "renderedHtml": "<p><a class=\"wp-embedded-audio\" href=\"http://”#”\">”#”</a></p>\n",
      "id": "65312d0165884",
      "parentId": null
    }
  ];

  const { data } = await client.query({
    query: gql`
      query GetPosts {
        posts {
          nodes {
            id
            title
            uri
            slug
          }
        }
      }
    `,
  });
  const content = flatListToHierarchical(editorBlocks, { childrenKey: 'innerBlocks' });
  return (
    <main>
      <h2>Posts</h2>
      <ul>
        {data.posts.nodes.map((post) => (
          <li>
            <Link href={`/${post.slug}`}>{post.title}</Link>
          </li>
        ))}
      </ul>
      <BlocksViewerRSC data={content} blocks={blocks} theme={null}/>
    </main>
  );
}
