/**
 * Returns the Faust secret key from the project's env.
 */
export function getWpSecret() {
  return process.env.FAUST_SECRET_KEY || process.env.FAUSTWP_SECRET_KEY;
}
