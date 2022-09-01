import 'faustnx.config';
import { getWordPressProps, WordPressTemplate } from 'faust-nx';
import { GetStaticPropsContext } from 'next';

export default function Page(props: any) {
  return <WordPressTemplate {...props} />;
}
