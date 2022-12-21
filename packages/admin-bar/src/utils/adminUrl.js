export function adminUrl(path) {
  const baseUrl = process.env.NEXT_PUBLIC_WORDPRESS_URL
  const sanitizedBaseUrl = removeTrailingSlash(baseUrl);

  return sanitizedBaseUrl + '/' + path;
}

function removeTrailingSlash(str) {
  return str.replace(/\/+$/, '');
}
