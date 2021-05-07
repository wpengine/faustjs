export const POST_DATA_FRAGMENT = `
  fragment postData on Post {
    id
    slug
    title
    content
    isRevision
    isPreview
    isSticky
    excerpt
    uri
    status
    featuredImage {
      node {
        id
        altText
        sourceUrl
      }
    }
  }
`;
