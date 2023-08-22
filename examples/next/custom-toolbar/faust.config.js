import { setConfig } from '@faustwp/core';
import possibleTypes from './possibleTypes.json';
import { CustomToolbarPlugin } from './plugins/CustomToolbarPlugin.js';
import templates from './wp-templates';

/**
 * @type {import('@faustwp/core').FaustConfig}
 **/
export default setConfig({
  experimentalPlugins: [new CustomToolbarPlugin()],
  experimentalToolbar: true,
  possibleTypes,
  templates,
});
