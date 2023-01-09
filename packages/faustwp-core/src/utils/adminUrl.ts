export function adminUrl(path: string): string {
  const baseUrl: string = process.env.NEXT_PUBLIC_WORDPRESS_URL || '';

  const sanitizedBaseUrl = removeTrailingSlash(baseUrl);

  return sanitizedBaseUrl + '/wp-admin/' + path;
}

function removeTrailingSlash(str: string): string {
  return str.replace(/\/+$/, '');
}
