// import {
//   categoryOptions,
//   getApolloClient,
//   getPosts,
// } from '@wpengine/headless-core';
// import {
//   getNextStaticPaths,
//   getNextStaticProps,
// } from '@wpengine/headless-next';
// import { useGeneralSettings, usePosts } from '@wpengine/headless-react';
// import { Footer, Header, Posts, Pagination } from 'components';
// import { GetStaticPropsContext } from 'next';
// import Head from 'next/head';
// import { useRouter } from 'next/router';
export default function Page() {
  return <>Category</>;
}
// const POSTS_PER_PAGE = 10;

// export default function Page() {
//   const router = useRouter();

//   const posts = usePosts(categoryOptions(router.asPath, POSTS_PER_PAGE));
//   const settings = useGeneralSettings();

//   return (
//     <>
//       <Header title={settings?.title} description={settings?.description} />

//       <Head>
//         <title>Posts - {settings?.title}</title>
//       </Head>

//       <main className="content content-index">
//         <Posts posts={posts?.nodes} />
//         {posts?.pageInfo && <Pagination pageInfo={posts.pageInfo} />}
//       </main>

//       <Footer copyrightHolder={settings?.title} />
//     </>
//   );
// }

// /**
//  * Fetch posts for the current category from WordPress. The query options in
//  * `getPosts()` here must match those from `usePosts()` in the component above.
//  *
//  * @see https://github.com/wpengine/headless-framework/tree/canary/docs/queries
//  */
// export async function getStaticProps(context: GetStaticPropsContext) {
//   const client = getApolloClient(context);

//   /**
//    * Construct the WordPress post category URL from getStaticProps params
//    * ex:
//    * category/uncategorized
//    * category/uncategorized/[before|after]/[abc123]
//    */
//   let urlPartFromParams = Array.from(context?.params?.category).join('/');
//   let categoryUrl = `category/${urlPartFromParams}`;

//   await getPosts(client, categoryOptions(categoryUrl, POSTS_PER_PAGE));

//   return getNextStaticProps(context);
// }

// export function getStaticPaths() {
//   return getNextStaticPaths();
// }
