// import { fetchAccessToken } from "@/faust/auth/fetchAccessToken";
// import { getAuthClient, getClient } from "@/faust/client";
// import { isPreviewMode } from "@/faust/previews";
import { getClient } from '@faustwp/experimental-app-router';
import { gql } from '@apollo/client';

export default async function Page(props) {
  const postSlug = props.params.postSlug;

  // Depending on if isPreview or not use the auth client or regular client
  let client = await getClient();

  const { data } = await client.query({
    query: gql`
      query GetPost($postSlug: ID!) {
        post(id: $postSlug, idType: SLUG) {
          title
          content
          date
        }
      }
    `,
    variables: {
      postSlug,
    },
  });

  return (
    <main>
      <h2>{data?.post?.title}</h2>
      <div dangerouslySetInnerHTML={{ __html: data?.post?.content ?? '' }} />
    </main>
  );
}
