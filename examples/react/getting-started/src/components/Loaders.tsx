import ContentLoader from 'react-content-loader';

export function PostPageLoader() {
  return (
    <ContentLoader
      viewBox="0 0 380 70"
      backgroundColor="#eee"
      foregroundColor="#ddd">
      {/* Only SVG shapes */}
      <rect x="0" y="0" rx="3" ry="3" width="200" height="20" />
      <rect x="0" y="30" rx="3" ry="3" width="380" height="15" />
      <rect x="0" y="55" rx="3" ry="3" width="380" height="15" />
    </ContentLoader>
  );
}

export function PostListItemLoader() {
  return (
    <ContentLoader
      viewBox="0 0 380 110"
      backgroundColor="#eee"
      foregroundColor="#ddd">
      {/* Only SVG shapes */}
      <rect x="0" y="0" rx="3" ry="3" width="200" height="20" />
      <rect x="0" y="30" rx="3" ry="3" width="380" height="15" />
      <rect x="0" y="55" rx="3" ry="3" width="380" height="15" />
      <rect x="0" y="55" rx="3" ry="3" width="50" height="10" />
    </ContentLoader>
  );
}

export function PostListLoader() {
  return (
    <>
      <PostListItemLoader />
      <PostListItemLoader />
      <PostListItemLoader />
      <PostListItemLoader />
      <PostListItemLoader />
    </>
  );
}
