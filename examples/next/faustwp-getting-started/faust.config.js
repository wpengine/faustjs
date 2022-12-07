import { setConfig } from '@faustwp/core';
import templates from './wp-templates';
import possibleTypes from './possibleTypes.json';
import { SEOPlugin } from './plugins/SEOPlugin';

/**
 * @type {import('@faustwp/core').FaustConfig}
 **/
export default setConfig({
  templates,
  experimentalPlugins: [new SEOPlugin()],
  possibleTypes,
});
