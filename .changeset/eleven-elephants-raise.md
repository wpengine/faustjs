---
'@faustwp/core': minor
---

Added the ability to provide multiple queries to a given Faust Template:

```js
import {GET_POST, GET_LAYOUT} from './queries.js'

export default function Component(props) {
}

Component.queries = [
  {
    query: GET_LAYOUT
  },
  {
    query: GET_POST,
    variables: (seedNode, ctx) {
      return {
        id: seedNode.databaseId,
        asPreview: ctx?.asPreview
      }
    }
  }
]
```

**Note:** Your Faust template can use either `Component.queries` or `Component.query`, but not both.
