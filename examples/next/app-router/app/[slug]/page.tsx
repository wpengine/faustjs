import { getAuthClient, getClient } from '@faustwp/experimental-app-router';
import { gql } from '@apollo/client';
import { hasPreviewProps } from './hasPreviewProps';
import { PleaseLogin } from '@/components/please-login';

export default async function Page(props) {
  const slug = props.params.slug;
  const isPreview = hasPreviewProps(props);

  let client = isPreview ? await getAuthClient() : await getClient();

  if (!client) {
    return <PleaseLogin />;
  }

  /**
   * There is currently a bug in WPGraphQL where you can not query for previews
   * using the contentNode type. This bug will need to be resolved for preview
   * functionality in the below query to work properly. For now, it returns
   * the production ready data for the given contentNode regardless if
   * asPreview is true or false.
   *
   * @see https://github.com/wp-graphql/wp-graphql/issues/1673
   */
  const { data } = await client.query({
    query: gql`
      query GetContentNode($uri: ID!, $asPreview: Boolean!) {
        contentNode(id: $uri, idType: URI, asPreview: $asPreview) {
          ... on NodeWithTitle {
            title
          }
          ... on NodeWithContentEditor {
            content
          }
          date
        }
      }
    `,
    variables: {
      uri: slug,
      asPreview: isPreview,
    },
  });

  return (
    <main>
      <h2>{data?.contentNode?.title}</h2>
      <div
        dangerouslySetInnerHTML={{ __html: data?.contentNode?.content ?? '' }}
      />
    </main>
  );
}
