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
    templates
    featuredImage {
      node {
        id
        altText
        sourceUrl
      }
    }
    enqueuedStylesheets {
      nodes {
        src
        handle
      }
    }
  }
`;
