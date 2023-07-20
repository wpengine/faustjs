---
'@faustwp/core': minor
---

Allow passing extra parameters in Page.variables(). This is allowed in `getNextStaticProps`, `getServerSideProps` and `getWordPressProps`:

Ex:

```
export function getStaticProps(ctx) {
  return getWordPressProps({ ctx, extra: {hello: 'world'} }); // extra parameter will be forwarded to the Template `variables` callback
}

Component.variables = ({ databaseId }, ctx, extra) => {
  console.log(extra) // {hello: 'world'}
  ...
}
```
