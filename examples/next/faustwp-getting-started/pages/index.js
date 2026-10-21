import { getWordPressProps, WordPressTemplate } from '@faustwp/core';

export default function Page(props) {
  return <WordPressTemplate {...props} bodyClass />;
}

export function getStaticProps(ctx) {
  return getWordPressProps({ ctx });
}
