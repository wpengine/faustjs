/**
 * Trims the origin (protocol, host, port) from URL so only the path and query params remain
 */
export default function trimOriginFromUrl(url: string): string {
  try {
    const parsedUrl = new URL(url);

    return url.replace(parsedUrl.origin, '');
  } catch (e) {
    return url;
  }
}
