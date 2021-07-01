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
