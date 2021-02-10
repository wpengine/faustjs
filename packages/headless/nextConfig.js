/**
 * Injects necessary config additions to the Next config to enable @wpengine/headless to function properly.
 *
 * Additionally, this improves the developer experience when working on @wpengine/headless directly.
 *
 * @param nextConfig Config passed through next.config.js
 */
module.exports = function withWPEHeadless(nextConfig = {}) {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call,@typescript-eslint/no-var-requires,global-require
  const withTM = require('next-transpile-modules')(['@wpengine/headless']);

  // eslint-disable-next-line @typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-return
  return withTM(nextConfig);
}
