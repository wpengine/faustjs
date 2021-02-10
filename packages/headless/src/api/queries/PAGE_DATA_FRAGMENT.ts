export const PAGE_DATA_FRAGMENT = `
  fragment pageData on Page {
    id
    slug
    title
    content
    isPreview
    isRevision
    isFrontPage
    isPostsPage
    uri
    status
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
