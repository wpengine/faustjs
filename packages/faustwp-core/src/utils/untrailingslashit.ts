/**
 * Removes trailing forward slashes and backslashes if they exist.
 *
 * The primary use of this is for paths and thus should be used for paths. It is
 * not restricted to paths and offers no specific path support.
 *
 * @link https://developer.wordpress.org/reference/functions/untrailingslashit/
 */
export function untrailingslashit(str: string): string {
  return str.replace(/\/+$/, '');
}
