/**
 * We are currently importing these utils from their deep paths because importing
 * from the main export will also include the FaustProvider component, which throws an error because
 * it does not have the "use client" directive set.
 *
 * @todo Find a workaround for importing these utils without invoking FaustProvider.
 * @see https://github.com/vercel/next.js/issues/12557#issuecomment-1427088366
 */
export { getConfig } from '@faustwp/core/dist/mjs/config/index.js';
export { getGraphqlEndpoint } from '@faustwp/core/dist/mjs/lib/getGraphqlEndpoint.js';
export { getWpUrl } from '@faustwp/core/dist/mjs/lib/getWpUrl.js';
export { getWpSecret } from '@faustwp/core/dist/mjs/lib/getWpSecret.js';
export { isValidEmail } from '@faustwp/core/dist/mjs/utils/assert.js';
