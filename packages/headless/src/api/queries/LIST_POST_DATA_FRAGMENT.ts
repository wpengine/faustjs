export const LIST_POST_DATA_FRAGMENT = `
  fragment listPostData on Post {
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
