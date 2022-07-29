import 'faustnx.config';
import { getWordPressProps, WordPressTemplate } from 'faust-nx';
import { GetServerSidePropsContext } from 'next';
import client from 'client';

export function getServerSideProps(ctx: GetServerSidePropsContext) {
  return getWordPressProps({ client, ctx });
}

export default function Preview() {
  // const isLoading = client.useIsLoading();
  // const { typeName, node } = client.auth.usePreviewNode();

  // if (isLoading || node === undefined) {
  //   return <p>Loading...</p>;
  // }

  // if (node === null) {
  //   return <p>Post not found</p>;
  // }

  // switch (typeName) {
  //   case 'Page': {
  //     return <WordPressTemplate {...props} />;
  //   }
  //   case 'Post': {
  //     return 'post';
  //   }
  //   // Add custom post types here as needed
  //   default: {
  //     throw new Error(`Unknown post type: ${typeName}`);
  //   }
  // }
}
