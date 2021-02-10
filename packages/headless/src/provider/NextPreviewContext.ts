import React from 'react';

/**
 * Context to pass down whether or not we're in Next.js preview mode to client-side hooks.
 */
const NextPreviewContext = React.createContext<{ isPreview: boolean }>({
  isPreview: false,
});

export default NextPreviewContext;
