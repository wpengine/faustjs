import { setConfig } from '@faustwp/core';
import possibleTypes from './possibleTypes.json';
import { CustomToolbar } from './plugins/CustomToolbar.js';
import templates from './wp-templates';

/**
 * @type {import('@faustwp/core').FaustConfig}
 **/
export default setConfig({
  experimentalPlugins: [new CustomToolbar()],
  experimentalToolbar: true,
  possibleTypes,
  templates,
});
