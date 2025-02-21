---
'@faustwp/blocks': minor
---

### WHAT

Refactor: Added CoreListItem block to fix repeating sublist issue

- Added CoreListItem block
- Updated CoreList block
- Updated Corelist.test to accomodate new HTML structure
- Added a new scenario to test nested lists

### WHY

CoreList was rendering values attribute, which happens to return nested list items multiple times.

### HOW

You need to add new CoreListItem fragments to your queries:

```javascript
gql`
  ${blocks.CoreListItem.fragments.entry}
`;
```

Example query:

```javascript
SingleTemplate.query = gql`
  ${blocks.CoreList.fragments.entry}
  ${blocks.CoreListItem.fragments.entry}
  query GetPost(
    $uri: ID!
  ) {
    post(id: $uri, idType: URI) {
      title
      content
      editorBlocks {
        name
        __typename
        renderedHtml
        id: clientId
        parentId: parentClientId
        ...${blocks.CoreList.fragments.key}
        ...${blocks.CoreListItem.fragments.key}
      }
    }
  }
`;
```
