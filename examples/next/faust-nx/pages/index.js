import { getWordPressProps, WordPressTemplate } from 'faust-nx';

export default function Page(props) {
  return <WordPressTemplate {...props} />;
}

export function getStaticProps(ctx) {
  return getWordPressProps({ ctx });
}
